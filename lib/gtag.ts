// GA4 event helpers. All calls are no-ops when the measurement ID isn't
// configured (NEXT_PUBLIC_GA_MEASUREMENT_ID unset — e.g. local dev, preview
// deploys), so this is always safe to call from client components without
// extra guards at the call site.
//
// IMPORTANT: this pushes directly to window.dataLayer rather than calling
// window.gtag(...). The base gtag.js <Script> tag in app/layout.tsx loads
// with strategy="afterInteractive", which races against client components'
// own useEffects — a component that mounts first (e.g. ViewItemTracker,
// which fires on every product page load) can run before window.gtag has
// been defined yet. Gating on `typeof window.gtag === "function"` was
// tried first and silently dropped the very first view_item on a page load
// in production. Pushing straight to the dataLayer queue works regardless
// of load order: gtag.js drains the whole queue once it finishes loading,
// so nothing pushed before that point is lost.
//
// ⚠️  THE ONE THING YOU MUST NOT CHANGE HERE (regression, fixed 2026-09-15)
//
// The pushed value MUST be a genuine `arguments` object. It must NOT be a
// plain array. gtag.js's shim is `function gtag(){dataLayer.push(arguments)}`
// and gtag.js identifies a queued entry as a *command* by checking that it
// is an Arguments object. A plain `Array` is interpreted as a GTM-style data
// push instead, so it is accepted onto the queue and then silently discarded
// by the command processor — no console error, no network request, nothing.
//
// This file previously did `dataLayer.push(["event", name, params])` and
// asserted in a comment that it was equivalent to the shim. It is not.
// Every view_item / add_to_cart / begin_checkout / purchase was dropped for
// the entire time that code was live, while page_view kept working (the
// inline snippet in layout.tsx calls the real gtag() function). GA4 showed
// healthy traffic and a completely empty commerce funnel.
//
// Verified against the GA4 realtime API on the live site, 2026-09-15:
//   plain array push      → event never arrives
//   arguments object push → event arrives
//   direct window.gtag()  → event arrives
//
// Note also that network sniffing is useless for debugging this: gtag
// batches events and the event name travels in the POST body, so
// intercepting fetch / sendBeacon / XHR shows nothing either way. Use the
// GA4 realtime report as the oracle.

import { mirrorToPosthog, PosthogItem } from "lib/posthog-mirror";

/**
 * Queues a gtag.js command, preserving the Arguments-object shape gtag.js
 * requires. Safe to call before gtag.js has finished loading.
 */
function pushGtagCommand(...args: unknown[]) {
  const dataLayer = (window.dataLayer = window.dataLayer || []);

  function queueAsArguments() {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  }

  (queueAsArguments as unknown as (...a: unknown[]) => void)(...args);
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Google Ads account 951-273-1803 ("Fingerboard Lab purchase (site)" conversion action).
// Public IDs, safe to ship. Configured in the same inline gtag bootstrap as GA4 in layout.tsx.
export const GOOGLE_ADS_ID = "AW-18455667239";
const GOOGLE_ADS_PURCHASE_LABEL = "c824CPa6_a4dEKfErOBE";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type GtagItem = {
  item_id: string;
  item_name: string;
  price?: number;
  quantity?: number;
  item_category?: string;
};

export function gtagEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (!GA_MEASUREMENT_ID) return;
  pushGtagCommand("event", name, params);
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/** Meta Pixel standard event. No-op until the pixel snippet in app/layout.tsx has loaded. */
function fbqTrack(
  event: "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase",
  items: GtagItem[],
  value: number,
  currency: string,
  eventId?: string,
) {
  if (typeof window === "undefined" || !META_PIXEL_ID) return;
  const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
  fbq?.(
    "track",
    event,
    {
      value,
      currency,
      content_ids: items.map((i) => i.item_id),
      content_type: "product",
      num_items: items.reduce((n, i) => n + (i.quantity ?? 1), 0),
    },
    eventId ? { eventID: eventId } : undefined,
  );
}

export function trackViewItem(item: GtagItem, currency = "USD") {
  gtagEvent("view_item", {
    currency,
    value: item.price ?? 0,
    items: [item],
  });
  fbqTrack("ViewContent", [item], item.price ?? 0, currency);
  mirrorToPosthog("view_item", item, currency);
}

export function trackAddToCart(item: GtagItem, currency = "USD") {
  gtagEvent("add_to_cart", {
    currency,
    value: (item.price ?? 0) * (item.quantity ?? 1),
    items: [item],
  });
  fbqTrack("AddToCart", [item], (item.price ?? 0) * (item.quantity ?? 1), currency);
  mirrorToPosthog("add_to_cart", item, currency);
}

export function trackBeginCheckout(
  items: GtagItem[],
  value: number,
  currency = "USD",
) {
  gtagEvent("begin_checkout", { currency, value, items });
  fbqTrack("InitiateCheckout", items, value, currency);
  items.forEach((it) => mirrorToPosthog("begin_checkout", it, currency, value));
}

export function trackPurchase(params: {
  transactionId: string;
  value: number;
  currency: string;
  shipping?: number;
  items: GtagItem[];
}) {
  gtagEvent("purchase", {
    transaction_id: params.transactionId,
    currency: params.currency,
    value: params.value,
    ...(params.shipping != null ? { shipping: params.shipping } : {}),
    items: params.items,
  });
  if (GA_MEASUREMENT_ID) {
    pushGtagCommand("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_PURCHASE_LABEL}`,
      value: params.value,
      currency: params.currency,
      transaction_id: params.transactionId,
    });
  }
  fbqTrack("Purchase", params.items, params.value, params.currency, params.transactionId);
  params.items.forEach((it) =>
    mirrorToPosthog("purchase", it, params.currency, params.value, params.transactionId),
  );
}

// Keep the posthog item type visible to TS consumers of this module.
export type { PosthogItem };
