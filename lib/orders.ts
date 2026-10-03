import Stripe from "stripe";
import { getSupabase } from "./supabase";

export type OrderItemInput = {
  productHandle: string | null;
  sku: string | null;
  title: string;
  quantity: number;
  unitAmount: number;
};

export type OrderInput = {
  stripeSessionId: string;
  stripePaymentIntent: string | null;
  customerEmail: string | null;
  customerName: string | null;
  shippingAddress: Stripe.Address | null | undefined;
  amountSubtotal: number | null;
  amountShipping: number | null;
  amountTotal: number;
  currency: string;
  items: OrderItemInput[];
};

export type Order = {
  id: string;
  stripeSessionId: string;
  customerEmail: string | null;
  customerName: string | null;
  amountTotal: number;
  currency: string;
  status: string;
  createdAt: string;
  items: {
    title: string;
    quantity: number;
    unitAmount: number;
    productHandle: string | null;
  }[];
};

/**
 * Records a paid order + its line items, idempotently (Stripe retries webhooks,
 * so a duplicate delivery of the same session must not create a second order
 * or double-decrement inventory).
 *
 * Returns the order id, or null if Supabase isn't configured yet (deploy-safe —
 * the webhook still acknowledges Stripe so it doesn't retry forever over a
 * config gap on our side).
 */
export async function recordOrder(
  input: OrderInput,
): Promise<{ orderId: string; isNew: boolean } | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  // Idempotency check first — avoids inserting duplicate items on retry.
  const { data: existing } = await supabase
    .from("fbl_orders")
    .select("id")
    .eq("stripe_session_id", input.stripeSessionId)
    .maybeSingle();

  if (existing) {
    return { orderId: existing.id as string, isNew: false };
  }

  const { data: order, error } = await supabase
    .from("fbl_orders")
    .insert({
      stripe_session_id: input.stripeSessionId,
      stripe_payment_intent: input.stripePaymentIntent,
      customer_email: input.customerEmail,
      customer_name: input.customerName,
      shipping_address: input.shippingAddress || null,
      amount_subtotal: input.amountSubtotal,
      amount_shipping: input.amountShipping,
      amount_total: input.amountTotal,
      currency: input.currency,
    })
    .select("id")
    .single();

  // Unique-constraint race (two webhook deliveries at once) -> treat as existing.
  if (error || !order) {
    const { data: raceExisting } = await supabase
      .from("fbl_orders")
      .select("id")
      .eq("stripe_session_id", input.stripeSessionId)
      .maybeSingle();
    if (raceExisting)
      return { orderId: raceExisting.id as string, isNew: false };
    return null;
  }

  if (input.items.length > 0) {
    await supabase.from("fbl_order_items").insert(
      input.items.map((it) => ({
        order_id: order.id,
        product_handle: it.productHandle,
        sku: it.sku,
        title: it.title,
        quantity: it.quantity,
        unit_amount: it.unitAmount,
      })),
    );
  }

  return { orderId: order.id as string, isNew: true };
}

/** Opt-in decrement: no-op for any SKU that isn't already being tracked. */
export async function decrementInventory(
  items: OrderItemInput[],
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  for (const item of items) {
    if (!item.sku) continue;
    await supabase.rpc("fbl_decrement_inventory", {
      p_sku: item.sku,
      p_qty: item.quantity,
    });
  }
}

export async function listRecentOrders(limit = 50): Promise<Order[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data: orders, error } = await supabase
    .from("fbl_orders")
    .select(
      "id,stripe_session_id,customer_email,customer_name,amount_total,currency,status,created_at",
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !orders) return [];

  const orderIds = orders.map((o) => o.id);
  const { data: items } = await supabase
    .from("fbl_order_items")
    .select("order_id,product_handle,title,quantity,unit_amount")
    .in("order_id", orderIds);

  return orders.map((o) => ({
    id: o.id,
    stripeSessionId: o.stripe_session_id,
    customerEmail: o.customer_email,
    customerName: o.customer_name,
    amountTotal: o.amount_total,
    currency: o.currency,
    status: o.status,
    createdAt: o.created_at,
    items: (items || [])
      .filter((it) => it.order_id === o.id)
      .map((it) => ({
        title: it.title,
        quantity: it.quantity,
        unitAmount: it.unit_amount,
        productHandle: it.product_handle,
      })),
  }));
}

export async function getOrdersSummary(): Promise<{
  count: number;
  revenueCents: number;
}> {
  const supabase = getSupabase();
  if (!supabase) return { count: 0, revenueCents: 0 };

  const { data, error } = await supabase
    .from("fbl_orders")
    .select("amount_total");
  if (error || !data) return { count: 0, revenueCents: 0 };

  return {
    count: data.length,
    revenueCents: data.reduce((sum, o) => sum + (o.amount_total || 0), 0),
  };
}

// ---------------------------------------------------------------------------
// Customer-facing order tracking ("Track my order")
// ---------------------------------------------------------------------------

export type TrackedOrder = Order & {
  /** Short, human-typeable reference derived from the row id — shown in the
   *  order-confirmation email so a customer can look their order up without
   *  needing an account. Not a secret; combined with the email it only
   *  narrows a lookup that's already scoped to that email address. */
  orderCode: string;
  shippingAddress: Stripe.Address | null;
};

const TRACKING_STATUS_COPY: Record<
  string,
  { label: string; detail: string }
> = {
  pending: {
    label: "Payment received",
    detail: "We're getting your order ready to send to the workshop.",
  },
  paid: {
    label: "Payment received",
    detail: "We're getting your order ready to send to the workshop.",
  },
  processing: {
    label: "Preparing to ship",
    detail: "Your order is being prepared at the supplier workshop.",
  },
  in_production: {
    label: "In production",
    detail: "Your order is being built at the supplier workshop.",
  },
  shipped: {
    label: "Shipped",
    detail: "Your order is on its way via EMS / local postal service.",
  },
  delivered: {
    label: "Delivered",
    detail: "This order has been delivered.",
  },
  cancelled: {
    label: "Cancelled",
    detail: "This order was cancelled.",
  },
};

export function trackingStatusCopy(status: string | null | undefined) {
  const key = (status || "").toLowerCase();
  return (
    TRACKING_STATUS_COPY[key] || {
      label: status ? status.replace(/_/g, " ") : "Processing",
      detail:
        "We're on it — most orders arrive within 7–14 business days of dispatch.",
    }
  );
}

/** Derives the short order code shown to customers from a row id. */
export function orderCodeFromId(id: string): string {
  return id.replace(/-/g, "").slice(0, 8).toUpperCase();
}

/**
 * Looks up orders for the "Track my order" page. Always scoped to an email
 * address (so this can't be used to browse someone else's orders); an
 * optional order code narrows further when a customer has more than one
 * order on file. Returns at most 10 most-recent matches.
 */
export async function findOrdersForTracking(
  email: string,
  orderCode?: string,
): Promise<TrackedOrder[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) return [];

  const { data: orders, error } = await supabase
    .from("fbl_orders")
    .select(
      "id,stripe_session_id,customer_email,customer_name,shipping_address,amount_total,currency,status,created_at",
    )
    .ilike("customer_email", normalizedEmail)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error || !orders || orders.length === 0) return [];

  const code = orderCode?.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  const matched = code
    ? orders.filter((o) =>
        orderCodeFromId(o.id as string).toLowerCase().startsWith(code),
      )
    : orders;

  if (matched.length === 0) return [];

  const orderIds = matched.map((o) => o.id);
  const { data: items } = await supabase
    .from("fbl_order_items")
    .select("order_id,product_handle,title,quantity,unit_amount")
    .in("order_id", orderIds);

  return matched.map((o) => ({
    id: o.id as string,
    orderCode: orderCodeFromId(o.id as string),
    stripeSessionId: o.stripe_session_id as string,
    customerEmail: o.customer_email as string | null,
    customerName: o.customer_name as string | null,
    shippingAddress: (o.shipping_address as Stripe.Address | null) || null,
    amountTotal: o.amount_total as number,
    currency: o.currency as string,
    status: o.status as string,
    createdAt: o.created_at as string,
    items: (items || [])
      .filter((it) => it.order_id === o.id)
      .map((it) => ({
        title: it.title as string,
        quantity: it.quantity as number,
        unitAmount: it.unit_amount as number,
        productHandle: it.product_handle as string | null,
      })),
  }));
}
