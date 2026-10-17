"use server";

// Server action backing the /track form (2026-10-17 privacy fix).
//
// The old page read email+code from the query string (GET form), which put
// the customer's email into the URL — visible in browser history, Referer
// headers, and captured by PostHog as $current_url 15 times in 10 days.
// The lookup now travels in the action POST body; the URL stays /track,
// and only ?code= is ever accepted for prefill.

import {
  findOrdersForTracking,
  type TrackedOrder,
} from "lib/orders";
import { isSupabaseConfigured } from "lib/supabase";

export type TrackLookupState = {
  status: "idle" | "ok" | "empty" | "unconfigured" | "error";
  orders: TrackedOrder[];
};

export async function lookupOrders(
  _prev: TrackLookupState,
  formData: FormData,
): Promise<TrackLookupState> {
  const email = String(formData.get("email") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();

  if (!email || !code) {
    return { status: "error", orders: [] };
  }

  if (!isSupabaseConfigured()) {
    return { status: "unconfigured", orders: [] };
  }

  try {
    const orders = await findOrdersForTracking(email, code);
    return { status: orders.length > 0 ? "ok" : "empty", orders };
  } catch {
    return { status: "error", orders: [] };
  }
}
