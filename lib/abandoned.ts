import type Stripe from "stripe";
import { getSupabase } from "./supabase";
import { sendAbandonedCartEmail } from "./email";

/**
 * Stores an expired Checkout Session (the abandoned cart) and sends one
 * reminder to the email the shopper typed into checkout, with the Stripe
 * recovery link and the first-order code. The email carries an opt-out line.
 * Idempotent: Stripe retries webhooks, so an existing row is left alone.
 */
export async function recordAbandonedCart(
  session: Stripe.Checkout.Session,
): Promise<{ stored: boolean; emailed: boolean }> {
  const supabase = getSupabase();
  const email = session.customer_details?.email?.trim().toLowerCase() || null;
  if (!supabase || !email) return { stored: false, emailed: false };

  const consent = session.consent?.promotions === "opt_in";
  const items = (session.line_items?.data ?? []).map((li) => ({
    title: li.description || "Item",
    quantity: li.quantity || 1,
    unitAmount: li.price?.unit_amount ?? 0,
  }));
  const recoveryUrl = session.after_expiration?.recovery?.url ?? null;

  const { data: existing } = await supabase
    .from("fbl_abandoned_carts")
    .select("session_id")
    .eq("session_id", session.id)
    .maybeSingle();
  if (existing) return { stored: true, emailed: false };

  const { error } = await supabase.from("fbl_abandoned_carts").insert({
    session_id: session.id,
    email,
    name: session.customer_details?.name || null,
    marketing_consent: consent,
    items,
    amount_total: session.amount_total ?? null,
    currency: session.currency || "usd",
    recovery_url: recoveryUrl,
  });
  if (error) {
    console.error("abandoned cart insert failed:", error.message);
    return { stored: false, emailed: false };
  }

  if (!recoveryUrl || items.length === 0) {
    return { stored: true, emailed: false };
  }

  const { sent } = await sendAbandonedCartEmail({
    to: email,
    items,
    amountTotal: session.amount_total ?? 0,
    currency: session.currency || "usd",
    recoveryUrl,
  });
  if (sent) {
    await supabase
      .from("fbl_abandoned_carts")
      .update({ status: "emailed", emailed_at: new Date().toISOString() })
      .eq("session_id", session.id);
  }
  return { stored: true, emailed: sent };
}

/** Marks the original abandoned cart as recovered once its recovery session pays. */
export async function markCartRecovered(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const supabase = getSupabase();
  const original = (session as any).recovered_from as string | null | undefined;
  if (!supabase || !original) return;
  await supabase
    .from("fbl_abandoned_carts")
    .update({ status: "recovered", recovered_at: new Date().toISOString() })
    .eq("session_id", original);
}
