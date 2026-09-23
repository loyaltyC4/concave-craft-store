/**
 * Serve supplier product photos from our own domain.
 *
 * ~96% of catalog images were hotlinked from third-party hosts
 * (cdn.shopify.com of another store, img.alicdn.com / cbu01.alicdn.com).
 * That leaks "AliExpress listing" to shoppers and to Google's Merchant
 * Center review, and silently breaks if the supplier renames a file.
 * next/image optimisation is disabled on this plan (Hobby cap), so
 * app/pimg/[host]/[...path] streams the original once and lets the Vercel
 * CDN cache it for a year.
 *
 * Only the hosts below are proxied (short keys keep URLs tidy) — this is
 * deliberately NOT an open proxy.
 */
export const PROXY_HOSTS: Record<string, string> = {
  s: "cdn.shopify.com",
  a: "img.alicdn.com",
  c: "cbu01.alicdn.com",
};

const KEY_BY_HOST: Record<string, string> = Object.fromEntries(
  Object.entries(PROXY_HOSTS).map(([k, h]) => [h, k]),
);

export function proxiedImageUrl(src: string): string {
  if (!src || !src.startsWith("http")) return src;
  try {
    const u = new URL(src);
    const key = KEY_BY_HOST[u.hostname];
    if (!key) return src;
    return `/pimg/${key}${u.pathname}`;
  } catch {
    return src;
  }
}
