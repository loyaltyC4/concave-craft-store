"use client";

import { useEffect } from "react";
import { trackPurchase } from "lib/gtag";
import { trackPurchasePh } from "lib/posthog";

/**
 * Fires the GA4 + PostHog purchase events once per completed Stripe session.
 * Dedupes via localStorage keyed on the Stripe session id so refreshing the
 * order confirmation page (or the back button) never double-counts a sale.
 */
export function PurchaseTracker({
  transactionId,
  value,
  currency,
  items,
}: {
  transactionId: string;
  value: number;
  currency: string;
  items: { name: string; quantity: number; amount: number }[];
}) {
  useEffect(() => {
    const dedupeKey = `fbl_ga4_purchase_${transactionId}`;
    try {
      if (localStorage.getItem(dedupeKey)) return;
      localStorage.setItem(dedupeKey, "1");
    } catch {
      /* localStorage unavailable (private mode, etc.) — fire anyway;
         worst case is a duplicate purchase event on a refresh. */
    }

    const phItems = items.map((it) => ({
      item_id: it.name,
      item_name: it.name,
      price: it.amount / 100,
      quantity: it.quantity,
    }));

    trackPurchase({
      transactionId,
      value,
      currency,
      items: phItems,
    });

    // PostHog mirror — same event name GA4 uses, same items payload. This is
    // the first time `purchase` exists in PostHog at all (report: 0 tracked
    // purchases while the last funnel mile was dark).
    trackPurchasePh({
      transactionId,
      value,
      currency,
      items: phItems,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]);

  return null;
}
