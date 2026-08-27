"use client";

import { useEffect } from "react";
import { trackPurchase } from "lib/gtag";

/**
 * Fires the GA4 purchase event once per completed Stripe session. Dedupes
 * via sessionStorage keyed on the Stripe session id so refreshing the order
 * confirmation page (or the back button) never double-counts a sale.
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
      if (sessionStorage.getItem(dedupeKey)) return;
      sessionStorage.setItem(dedupeKey, "1");
    } catch {
      /* sessionStorage unavailable (private mode, etc.) — fire anyway;
         worst case is a duplicate purchase event on a refresh. */
    }

    trackPurchase({
      transactionId,
      value,
      currency,
      items: items.map((it) => ({
        item_id: it.name,
        item_name: it.name,
        price: it.amount / 100,
        quantity: it.quantity,
      })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]);

  return null;
}
