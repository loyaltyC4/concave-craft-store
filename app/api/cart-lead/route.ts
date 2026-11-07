import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getSupabase } from "lib/supabase";
import { sendCartSavedEmail } from "lib/email";

export const dynamic = "force-dynamic";

type LeadItem = { title?: string; quantity?: number; unitAmount?: number };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Saves a shopper's email with their cart, so we can follow up if they leave.
 * Rows share the fbl_abandoned_carts table with Stripe-expired sessions, keyed
 * "lead_<hash of email>" so one shopper has one row that is refreshed, not
 * duplicated. `silent` stores the row without emailing (used when the shopper
 * goes straight on to checkout).
 */
export async function POST(req: NextRequest) {
  let body: { email?: string; items?: LeadItem[]; silent?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 160) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  const items = (Array.isArray(body.items) ? body.items : [])
    .slice(0, 20)
    .map((i) => ({
      title: String(i.title || "Item").slice(0, 140),
      quantity: Math.max(1, Math.min(99, Math.floor(Number(i.quantity) || 1))),
      unitAmount: Math.max(0, Math.floor(Number(i.unitAmount) || 0)),
    }));
  if (items.length === 0) {
    return NextResponse.json({ error: "empty_cart" }, { status: 400 });
  }
  const amountTotal = items.reduce((n, i) => n + i.unitAmount * i.quantity, 0);

  const supabase = getSupabase();
  if (!supabase) {
    // Not stored, but the shopper still gets their saved-cart email.
    if (body.silent) return NextResponse.json({ ok: true, stored: false, emailed: false });
    const r = await sendCartSavedEmail({ to: email, items, amountTotal, currency: "usd" });
    return NextResponse.json({ ok: true, stored: false, emailed: r.sent });
  }

  const sessionId = `lead_${createHash("sha256").update(email).digest("hex").slice(0, 24)}`;
  const { data: existing } = await supabase
    .from("fbl_abandoned_carts")
    .select("status")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("fbl_abandoned_carts")
      .update({ items, amount_total: amountTotal })
      .eq("session_id", sessionId);
  } else {
    const { error } = await supabase.from("fbl_abandoned_carts").insert({
      session_id: sessionId,
      email,
      marketing_consent: !body.silent,
      items,
      amount_total: amountTotal,
      currency: "usd",
      recovery_url: null,
    });
    if (error) {
      console.error("cart lead insert failed:", error.message);
      if (body.silent) return NextResponse.json({ ok: true, stored: false, emailed: false });
      const r = await sendCartSavedEmail({ to: email, items, amountTotal, currency: "usd" });
      return NextResponse.json({ ok: true, stored: false, emailed: r.sent });
    }
  }

  const alreadyEmailed = existing?.status === "emailed";
  if (body.silent || alreadyEmailed) {
    return NextResponse.json({ ok: true, stored: true, emailed: false });
  }

  const { sent } = await sendCartSavedEmail({
    to: email,
    items,
    amountTotal,
    currency: "usd",
  });
  if (sent) {
    await supabase
      .from("fbl_abandoned_carts")
      .update({ status: "emailed", emailed_at: new Date().toISOString() })
      .eq("session_id", sessionId);
  }
  return NextResponse.json({ ok: true, stored: true, emailed: sent });
}
