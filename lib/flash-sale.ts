/**
 * A single, honest, dated flash sale.
 *
 * Design constraints (do not weaken these — see docs/growth plan, "Ground
 * rules"): the discount is computed from a FIXED start/end timestamp that is
 * evaluated against the real server clock. It is not a per-session countdown
 * that resets on reload, and the "was" price shown during the sale is the
 * product's own real regular price, not an inflated anchor invented for the
 * sale. When `endsAt` passes, every price in this file automatically reverts
 * to the regular catalog price with zero further action required — nobody
 * has to remember to "undo" the sale.
 *
 * To run a new sale later: change the dates and the `handles`/`discountPct`
 * below. Keep it to a real, bounded window (days, not months) and to a
 * genuine subset of the catalog.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const productsData: { products: Array<{ handle: string; variants: Array<{ price: string }> }> } = require("../data/products.json");

// Sitewide this round, but gated by price: only items that weren't already
// cheap to begin with. Keeps the entry-level completes, basic grip tape and
// small tuning parts off the sale instead of discounting prices that are
// already low.
const MIN_SALE_PRICE = 35;

function getPrice(p: { variants: Array<{ price: string }> }): number | null {
  const raw = p.variants?.[0]?.price;
  if (raw == null) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

// Items whose supplier cost leaves no room for a 20% discount.
const SALE_EXCLUDED_PREFIXES = [
  "new-street-shape-fingerboard-wheels",
  "cnc-fingerboard-wheels-swirl-color",
];

const SITEWIDE_HANDLES = productsData.products
  .filter((p) => {
    if (SALE_EXCLUDED_PREFIXES.some((x) => p.handle.startsWith(x))) return false;
    const price = getPrice(p);
    return price !== null && price >= MIN_SALE_PRICE;
  })
  .map((p) => p.handle);

export const FLASH_SALE = {
  name: "Halloween Sale",
  /** Short label used in the announcement bar / badges. */
  shortLabel: "Halloween Sale",
  /** What is on sale, in the shopper's words, for the announcement bar. */
  blurb: "20% off sitewide (excludes already-low prices)",
  startsAt: "2026-10-31T00:00:00-07:00",
  // Extended one more week: Friday 14 Nov, 23:59 US Pacific.
  endsAt: "2026-11-14T23:59:59-08:00",
  discountPct: 0.2,
  handles: SITEWIDE_HANDLES,
} as const;

export function isFlashSaleActive(now: Date = new Date()): boolean {
  const t = now.getTime();
  return (
    t >= new Date(FLASH_SALE.startsAt).getTime() &&
    t <= new Date(FLASH_SALE.endsAt).getTime()
  );
}

export function isFlashSaleHandle(handle: string): boolean {
  return (FLASH_SALE.handles as readonly string[]).includes(handle);
}

/** Rounds a discounted price to 2dp. No psychological-pricing tricks. */
export function flashSalePrice(regularPrice: number): number {
  return Math.round(regularPrice * (1 - FLASH_SALE.discountPct) * 100) / 100;
}

export function getFlashSaleEndMs(): number {
  return new Date(FLASH_SALE.endsAt).getTime();
}
