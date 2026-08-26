import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "lib/stripe";
import { getSupabase } from "lib/supabase";
import {
  decrementInventory,
  recordOrder,
  type OrderItemInput,
} from "lib/orders";
import {
  sendOrderConfirmationEmail,
  sendCustomOrderOwnerNotification,
} from "lib/email";

export const dynamic = "force-dynamic";

function extractItems(
  lineItems: Stripe.ApiList<Stripe.LineItem> | undefined,
): OrderItemInput[] {
  if (!lineItems) return [];
  return lineItems.data.map((li) => {
    const product = li.price?.product;
    const isExpandedProduct =
      product &&
      typeof product === "object" &&
      !("deleted" in product && product.deleted);
    const metadata = isExpandedProduct
      ? (product as Stripe.Product).metadata
      : undefined;

    return {
      productHandle: metadata?.handle || null,
      sku: metadata?.sku || null,
      title: li.description || "Item",
      quantity: li.quantity || 1,
      unitAmount: li.price?.unit_amount ?? 0,
    };
  });
}

/**
 * If the completed session carries a custom_order_id in its metadata,
 * update that custom_orders row to 'paid' and fire an owner notification
 * email so the order can be manually fulfilled. This runs alongside — and
 * does not affect — the existing recordOrder / decrementInventory path for
 * normal cart orders.
 */
async function handleCustomOrderPaid(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const customOrderId = session.metadata?.custom_order_id;
  if (!customOrderId) return;

  const supabase = getSupabase();
  if (!supabase) {
    console.warn(
      "custom_orders status not updated: Supabase not configured.",
    );
    return;
  }

  const { data: updatedRow, error } = await supabase
    .from("custom_orders")
    .update({
      status: "paid",
      stripe_session_id: session.id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", customOrderId)
    // Guard: only transition from pending_payment (idempotent on re-delivery)
    .in("status", ["pending_payment"])
    .select(
      "id, customer_email, size, wood_upgrade, rush_production, quantity, notes, file_paths, design_help_requested, amount_total",
    )
    .single();

  if (error) {
    console.error(
      `Failed to mark custom_order ${customOrderId} as paid:`,
      error,
    );
    // Do not return early — the row may already be paid (idempotent re-delivery).
    // We still want to attempt the notification if possible, but without the
    // fresh row data we cannot, so bail here.
    return;
  }

  console.log(`Custom order ${customOrderId} marked as paid.`);

  // --- Owner notification email ---
  // Wrapped in its own try/catch: a failed email must never cause the webhook
  // to return an error status (which would trigger Stripe retries and
  // potentially double-charge or confuse the customer flow).
  if (updatedRow) {
    try {
      await sendCustomOrderOwnerNotification(
        {
          orderId: updatedRow.id as string,
          customerEmail: (updatedRow.customer_email as string) ?? session.customer_details?.email ?? "",
          size: updatedRow.size as string,
          woodUpgrade: Boolean(updatedRow.wood_upgrade),
          rushProduction: Boolean(updatedRow.rush_production),
          quantity: Number(updatedRow.quantity ?? 1),
          notes: (updatedRow.notes as string | null) ?? null,
          filePaths: Array.isArray(updatedRow.file_paths)
            ? (updatedRow.file_paths as string[])
            : [],
          designHelpRequested: Boolean(updatedRow.design_help_requested),
          amountTotal: Number(updatedRow.amount_total ?? session.amount_total ?? 0),
        },
        supabase,
      );
    } catch (notifyErr) {
      // Intentionally swallowed — notification failure must not propagate.
      console.error(
        `[custom-order-notify] Unexpected error for order ${customOrderId}:`,
        notifyErr,
      );
    }
  }
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Deploy-safe: no webhook secret configured yet — tell whoever's testing
  // this clearly instead of throwing. Stripe will retry once it's set up.
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      {
        error: "webhook_unconfigured",
        message:
          "Stripe webhook isn't configured yet. Add STRIPE_WEBHOOK_SECRET.",
      },
      { status: 503 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature || "",
      webhookSecret,
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    // Acknowledge everything else — we only act on completed checkouts.
    return NextResponse.json({ received: true });
  }

  const sessionSummary = event.data.object as Stripe.Checkout.Session;

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionSummary.id, {
      expand: ["line_items", "line_items.data.price.product"],
    });
  } catch (err) {
    console.error("Failed to retrieve checkout session:", err);
    return NextResponse.json(
      { error: "session_retrieve_failed" },
      { status: 500 },
    );
  }

  // --- Custom fingerboard build orders (non-exclusive with normal cart path) ---
  await handleCustomOrderPaid(session);

  // --- Normal cart order path ---
  // Custom build sessions carry a custom_order_id but no product handle/sku
  // metadata on line items, so recordOrder will still insert a fbl_orders row
  // (with an empty items array after extractItems). That's acceptable; the
  // meaningful record lives in custom_orders. If you'd prefer to skip
  // fbl_orders insertion for custom builds, uncomment the early-return below.
  //
  // if (session.metadata?.custom_order_id) {
  //   return NextResponse.json({ received: true, custom_order: true });
  // }

  const items = extractItems(session.line_items);
  const shippingAddress =
    (session as any).shipping_details?.address ??
    (session as any).collected_information?.shipping_details?.address ??
    session.customer_details?.address ??
    null;

  const result = await recordOrder({
    stripeSessionId: session.id,
    stripePaymentIntent:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : null,
    customerEmail: session.customer_details?.email || null,
    customerName: session.customer_details?.name || null,
    shippingAddress,
    amountSubtotal: session.amount_subtotal ?? null,
    amountShipping: session.total_details?.amount_shipping ?? null,
    amountTotal: session.amount_total ?? 0,
    currency: session.currency || "usd",
    items,
  });

  if (!result) {
    // Supabase not configured — acknowledge Stripe (avoid endless retries
    // over a config gap on our side) but make it loud in server logs.
    console.warn(
      "Order not recorded: Supabase isn't configured (SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY).",
    );
    return NextResponse.json({ received: true, recorded: false });
  }

  if (result.isNew) {
    await decrementInventory(items);
    await sendOrderConfirmationEmail({
      to: session.customer_details?.email || null,
      orderId: result.orderId,
      items: items.map((it) => ({
        title: it.title,
        quantity: it.quantity,
        unitAmount: it.unitAmount,
      })),
      amountTotal: session.amount_total ?? 0,
      currency: session.currency || "usd",
    });
  }

  return NextResponse.json({ received: true, orderId: result.orderId });
}
