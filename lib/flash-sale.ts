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

export const FLASH_SALE = {
  name: "End of Season Clearance",
  /** Short label used in the announcement bar / badges. */
  shortLabel: "Clearance",
  startsAt: "2026-09-26T00:00:00+10:00",
  endsAt: "2026-10-03T23:59:59+10:00",
  discountPct: 0.2,
  handles: [
    "fingerboard-halfpipe-ramp-wooden-u-ramp-for-tech-deck-stunts-portable-desktop-railing-for-professional-practice-and-beginner",
    "36mm-34mm-32mm-fingerboard-truck-professional-designed-for-finger-skateboard",
    "professional-fingerboard-wheels-abec-7-bearings-for-mini-skateboard-finger-skate-board",
    "alloy-fingerboard-park-set-4-in-1-terrain-combo",
    "professional-fingerboard-box-portable-aluminum-acrylic-finger-skateboard-storage-case-holds-6-fingerboards-compact-durable",
  ] as string[],
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
