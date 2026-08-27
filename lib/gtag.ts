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
// in production. Pushing straight to the dataLayer queue is the same
// pattern gtag.js's own shim uses internally (`function gtag(){dataLayer
// .push(arguments)}`) and works regardless of load order: gtag.js drains
// the whole queue once it finishes loading, so nothing pushed before that
// point is lost.

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", name, params]);
}

export function trackViewItem(item: GtagItem, currency = "USD") {
  gtagEvent("view_item", {
    currency,
    value: item.price ?? 0,
    items: [item],
  });
}

export function trackAddToCart(item: GtagItem, currency = "USD") {
  gtagEvent("add_to_cart", {
    currency,
    value: (item.price ?? 0) * (item.quantity ?? 1),
    items: [item],
  });
}

export function trackBeginCheckout(
  items: GtagItem[],
  value: number,
  currency = "USD",
) {
  gtagEvent("begin_checkout", { currency, value, items });
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
}
