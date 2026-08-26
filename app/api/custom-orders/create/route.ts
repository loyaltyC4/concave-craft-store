import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "lib/stripe";
import { getSupabase } from "lib/supabase";
import { baseUrl } from "lib/utils";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Pricing — all amounts in USD cents
// ---------------------------------------------------------------------------

const BASE_PRICE_CENTS = 8900; // $89.00 — 32mm or 34mm, standard maple, 1 graphic, up to 2 revision rounds
const WOOD_UPGRADE_CENTS = 1500; // +$15.00 — Select Hardwood Upgrade
const RUSH_PRODUCTION_CENTS = 2500; // +$25.00 — ships within 24-48h

// Multi-board discounts apply to the 2nd board and beyond (not the first).
const SECOND_BOARD_DISCOUNT = 0.1; // 10% off 2nd board
const ADDITIONAL_BOARD_DISCOUNT = 0.15; // 15% off 3rd+ boards

/**
 * Compute the total price in cents for a custom order.
 * Quantity must be >= 1 and <= 10.
 */
function computePriceCents({
  quantity,
  woodUpgrade,
  rushProduction,
}: {
  quantity: number;
  woodUpgrade: boolean;
  rushProduction: boolean;
}): number {
  const perBoardBase = BASE_PRICE_CENTS;
  const addons = (woodUpgrade ? WOOD_UPGRADE_CENTS : 0) + (rushProduction ? RUSH_PRODUCTION_CENTS : 0);
  const perBoardTotal = perBoardBase + addons;

  let total = perBoardTotal; // first board — full price
  for (let i = 2; i <= quantity; i++) {
    const discount = i === 2 ? SECOND_BOARD_DISCOUNT : ADDITIONAL_BOARD_DISCOUNT;
    total += Math.round(perBoardTotal * (1 - discount));
  }
  return total;
}

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

type CreateBody = {
  customerEmail?: string;
  size?: string;
  woodUpgrade?: boolean;
  rushProduction?: boolean;
  quantity?: number;
  notes?: string;
  filePaths?: string[];
  designHelpRequested?: boolean;
};

/**
 * POST /api/custom-orders/create
 *
 * Request body (JSON):
 * {
 *   customerEmail: string;           // required
 *   size: "32mm" | "34mm" | "36mm";  // required
 *   woodUpgrade?: boolean;           // default false
 *   rushProduction?: boolean;        // default false
 *   quantity?: number;               // 1–10, default 1
 *   notes?: string;                  // personalisation instructions
 *   filePaths?: string[];            // paths returned by /api/custom-orders/upload
 *   designHelpRequested?: boolean;   // true = no artwork uploaded, wants design assistance
 * }
 *
 * Response (200):
 * { url: string }  — Stripe Checkout Session URL; client should redirect to this.
 *
 * Response (4xx/5xx):
 * { error: string; message?: string }
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "checkout_unconfigured", message: "Checkout is not live yet." },
      { status: 503 },
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "db_unconfigured", message: "Order recording is not available yet." },
      { status: 503 },
    );
  }

  let body: CreateBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // --- Validate required fields ---
  const { customerEmail, size } = body;

  if (!customerEmail || typeof customerEmail !== "string" || !customerEmail.includes("@")) {
    return NextResponse.json(
      { error: "invalid_email", message: "A valid customer email is required." },
      { status: 400 },
    );
  }

  const VALID_SIZES = ["32mm", "34mm", "36mm"];
  if (!size || !VALID_SIZES.includes(size)) {
    return NextResponse.json(
      { error: "invalid_size", message: `size must be one of: ${VALID_SIZES.join(", ")}.` },
      { status: 400 },
    );
  }

  const woodUpgrade = Boolean(body.woodUpgrade);
  const rushProduction = Boolean(body.rushProduction);
  const designHelpRequested = Boolean(body.designHelpRequested);
  const notes = typeof body.notes === "string" ? body.notes.slice(0, 5000) : null;
  const filePaths: string[] = Array.isArray(body.filePaths)
    ? body.filePaths.filter((p) => typeof p === "string").slice(0, 10)
    : [];

  const quantity = Math.max(1, Math.min(10, Math.round(Number(body.quantity) || 1)));

  if (!designHelpRequested && filePaths.length === 0) {
    return NextResponse.json(
      {
        error: "no_artwork",
        message:
          "Please either upload your artwork files or check \"I want design help\" to continue.",
      },
      { status: 400 },
    );
  }

  // --- Server-side price computation ---
  const amountTotal = computePriceCents({ quantity, woodUpgrade, rushProduction });

  // --- Insert custom_orders row ---
  const { data: orderRow, error: insertError } = await supabase
    .from("custom_orders")
    .insert({
      customer_email: customerEmail.trim().toLowerCase(),
      size,
      wood_upgrade: woodUpgrade,
      rush_production: rushProduction,
      quantity,
      notes,
      file_paths: filePaths,
      design_help_requested: designHelpRequested,
      amount_total: amountTotal,
      status: "pending_payment",
    })
    .select("id")
    .single();

  if (insertError || !orderRow) {
    console.error("Failed to insert custom_orders row:", insertError);
    return NextResponse.json(
      { error: "order_create_failed", message: "Could not save your order. Please try again." },
      { status: 500 },
    );
  }

  const customOrderId: string = orderRow.id;

  // Build human-readable product name for Stripe
  const addOnLabels: string[] = [];
  if (woodUpgrade) addOnLabels.push("Select Hardwood Upgrade");
  if (rushProduction) addOnLabels.push("Rush Production");
  if (quantity > 1) addOnLabels.push(`×${quantity} boards`);
  const productName =
    "Custom Fingerboard Build" +
    (addOnLabels.length ? " — " + addOnLabels.join(", ") : "");

  const origin = req.headers.get("origin") || baseUrl;

  // --- Create Stripe Checkout Session ---
  let session: Awaited<ReturnType<typeof stripe.checkout.sessions.create>>;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountTotal,
            product_data: {
              name: productName.slice(0, 250),
              description:
                `Size: ${size}` +
                (woodUpgrade ? " | Select Hardwood Upgrade" : "") +
                (rushProduction ? " | Rush Production (24-48h)" : "") +
                (designHelpRequested ? " | Design help requested" : ""),
            },
          },
        },
      ],
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: [
          "US", "CA", "GB", "IE", "AU", "NZ", "DE", "FR", "ES", "IT",
          "NL", "BE", "AT", "CH", "SE", "NO", "DK", "FI", "PT", "PL",
          "CZ", "SK", "HU", "RO", "GR", "LU", "IS", "JP", "KR", "SG",
          "HK", "MY", "PH", "TH", "ZA", "AE", "SA", "IL", "MX", "BR",
          "CL", "AR",
        ] as any,
      },
      customer_email: customerEmail.trim().toLowerCase(),
      allow_promotion_codes: true,
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/custom-build`,
      metadata: {
        source: "fingerboardlab",
        custom_order_id: customOrderId,
      },
    });
  } catch (err) {
    console.error("Stripe checkout error (custom order):", err);
    // Best-effort: mark the orphaned row so it's visible in admin
    await supabase
      .from("custom_orders")
      .update({ status: "cancelled" })
      .eq("id", customOrderId);
    return NextResponse.json(
      { error: "stripe_error", message: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }

  // Backfill stripe_session_id now that we have it
  await supabase
    .from("custom_orders")
    .update({ stripe_session_id: session.id })
    .eq("id", customOrderId);

  return NextResponse.json({ url: session.url });
}
