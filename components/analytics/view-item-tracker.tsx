"use client";

import { useEffect } from "react";
import { trackViewItem } from "lib/gtag";

/**
 * Fires the GA4 view_item event for the product detail page. Renders
 * nothing — mounted alongside the server-rendered product content so the
 * page stays fully static/SSR while this one client leaf reports the event.
 */
export function ViewItemTracker({
  id,
  name,
  price,
  currency,
  category,
}: {
  id: string;
  name: string;
  price: number;
  currency: string;
  category?: string;
}) {
  useEffect(() => {
    trackViewItem(
      {
        item_id: id,
        item_name: name,
        price,
        quantity: 1,
        ...(category ? { item_category: category } : {}),
      },
      currency,
    );
    // Intentionally only re-fires if the product identity changes (e.g. a
    // client-side nav to a different product), not on every price re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return null;
}
