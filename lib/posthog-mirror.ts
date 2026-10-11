// lib/posthog-mirror.ts — sends every GA4 ecommerce event to PostHog too.
//
// One event per item, same payload shape GA4 gets, plus a `site` property so
// dashboards can always tell which storefront an event came from even if
// this project later hosts more than one. All calls are safe no-ops when
// PostHog isn't configured (NEXT_PUBLIC_POSTHOG_KEY unset) or the snippet
// hasn't finished loading yet — posthog-js buffers captures itself, so
// ordering races are handled by the library.

import { POSTHOG_KEY } from "lib/posthog";

export type MirrorItem = {
  item_id: string;
  item_name: string;
  price?: number;
  quantity?: number;
  item_category?: string;
};

// Re-exported so gtag.ts (which imports it for type-compat with its own
// GtagItem) can keep a single import statement.
export type PosthogItem = MirrorItem;

export function mirrorToPosthog(
  event: "view_item" | "add_to_cart" | "begin_checkout" | "purchase",
  item: MirrorItem,
  currency = "USD",
  value?: number,
  transactionId?: string,
) {
  if (typeof window === "undefined") return;
  if (!POSTHOG_KEY) return;

  const props = {
    site: "fingerboardlab",
    item_id: item.item_id,
    item_name: item.item_name,
    price: item.price,
    quantity: item.quantity,
    item_category: item.item_category,
    currency,
    ...(value != null ? { value } : {}),
    ...(transactionId != null ? { transaction_id: transactionId } : {}),
  };

  // The PostHog script loads asynchronously. On the Stripe return page the
  // purchase fires before it is ready, and the old code silently dropped it.
  // Retry until PostHog can capture, for up to 20 seconds.
  const startedAt = Date.now();
  const attempt = () => {
    const ph = (window as { posthog?: { capture?: (e: string, p?: Record<string, unknown>) => void } }).posthog;
    if (ph && typeof ph.capture === "function") {
      try {
        ph.capture(event, props);
      } catch {
        // analytics must never break the store
      }
      return;
    }
    if (Date.now() - startedAt < 20000) window.setTimeout(attempt, 250);
  };
  attempt();
}
