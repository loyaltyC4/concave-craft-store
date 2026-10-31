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

// The sale covers whole collections rather than a hand-kept list, so a new
// mold or ramp listing is included automatically.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const collectionMap: Record<string, string[]> = require("../data/collection-map.json");
const SALE_COLLECTIONS = ["deck-building", "ramps-obstacles", "park-kits"];

export const FLASH_SALE = {
  name: "Halloween Sale",
  /** Short label used in the announcement bar / badges. */
  shortLabel: "Halloween Sale",
  /** What is on sale, in the shopper's words, for the announcement bar. */
  blurb: "20% off molds, ramps & park kits",
  startsAt: "2026-10-31T00:00:00-07:00",
  // Sunday 1 Nov, 23:59 US Pacific (PST from 1 Nov).
  endsAt: "2026-11-01T23:59:59-08:00",
  discountPct: 0.2,
  handles: SALE_COLLECTIONS.flatMap((c) => collectionMap[c] ?? []),
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
