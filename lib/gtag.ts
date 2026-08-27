// GA4 event helpers. All calls are no-ops when the measurement ID isn't
// configured (NEXT_PUBLIC_GA_MEASUREMENT_ID unset — e.g. local dev, preview
// deploys) or when window.gtag hasn't loaded yet, so this is always safe to
// call from client components without extra guards at the call site.

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
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
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
