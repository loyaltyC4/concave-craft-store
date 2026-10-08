// lib/posthog.ts — shared PostHog bridge.
//
// PostHog project: "Fingerboard Lab" (id 653403, org fingerboardlab on us.posthog.com).
// The posthog-js snippet loads in app/layout.tsx right after the GA4 bootstrap;
// this module only exposes the typed capture helpers and event names, and adds
// a tiny mirror of every GA4 ecommerce event so GA4 and PostHog always agree.

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com";

export type PosthogItem = {
  item_id: string;
  item_name: string;
  price?: number;
  quantity?: number;
  item_category?: string;
};

// Type-only alias for call sites that import from either module.
export type GtagItem = PosthogItem;

// Stays false until the snippet's loaded() callback flips it. Capture calls
// before that are buffered by posthog-js itself, so this is purely a guard
// for analytics-side code that wants to know whether PostHog is live.
declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
      identify: (distinctId: string, properties?: Record<string, unknown>) => void;
      loaded: (cb: () => void) => void;
      __loaded?: boolean;
    };
  }
}

function phCapture(event: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (!POSTHOG_KEY) return;
  if (!window.posthog) return;
  try {
    window.posthog.capture(event, { ...props, site: "fingerboardlab" });
  } catch {
    // never let analytics break the store
  }
}

// ---------------------------------------------------------------------------
// Ecommerce mirrors — one PostHog event per GA4 event, same items payload.
// ---------------------------------------------------------------------------

export function trackViewItemPh(item: PosthogItem, currency = "USD") {
  phCapture("view_item", {
    currency,
    value: item.price ?? 0,
    items: [item],
  });
}

export function trackAddToCartPh(item: PosthogItem, currency = "USD") {
  phCapture("add_to_cart", {
    currency,
    value: (item.price ?? 0) * (item.quantity ?? 1),
    items: [item],
  });
}

export function trackBeginCheckoutPh(items: PosthogItem[], value: number, currency = "USD") {
  phCapture("begin_checkout", { currency, value, items });
}

export function trackPurchasePh(params: {
  transactionId: string;
  value: number;
  currency: string;
  shipping?: number;
  items: PosthogItem[];
}) {
  phCapture("purchase", {
    transaction_id: params.transactionId,
    currency: params.currency,
    value: params.value,
    ...(params.shipping != null ? { shipping: params.shipping } : {}),
    items: params.items,
  });
}
