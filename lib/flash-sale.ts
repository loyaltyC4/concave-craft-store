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

// Black Friday 2026: 28 hand-picked items, chosen by margin. Every variant of
// every item here keeps at least 1.7x its estimated landed cost AFTER the
// discount (landed cost = 0.31 x supplier-side price + $6). Molds and anything
// near the price floor are deliberately left out. Regular prices are the live
// catalog prices; nothing is inflated for the sale.
const BLACK_FRIDAY_HANDLES = [
  "professional-wooden-fingerboard-skate-set-with-aluminum-case-mini-finger-skateboard-toy-for-kids-collectors-cool-gift-for",
  "fingerboard-practice-set-slope-curve-jump-bar",
  "alloy-fingerboard-venue-set-modular",
  "alloy-fingerboard-park-set-4-in-1-terrain-combo",
  "fingerboard-venue-set-4in1",
  "leefai-cat-series-fingerboard-complete",
  "team-heritage-reissue-deck-5-ply-maple-shallow-concave",
  "alloy-fingerboard-scene-set-modular-mini-park-combo",
  "dtzero-ome-surplus-complete-fingerboard-series",
  "professional-mini-wooden-skateboard-fingerboard-set-finger-scooter-finger-skate-board-maple-wood-kid-tabletop-toys-for-boys",
  "36mm-fingerboard-deck-with-real-wear-graphic-finger-skateboard-wooden-board",
  "34mm-cruiser-fingerboard-deck-new-shape-with-graphic-for-professional-mini-finger-skateboard",
  "hailey-fb2-34mm-complete-whale-yellow",
  "36mm-pro-fingerboard-deck-wooden-board-with-new-graphic-for-finger-skateboard",
  "fingerboard-brick-ladder-obstacle-set",
  "wooden-fingerboard-stairs-with-brick-metal-rod-artificial-grass",
  "silent-3d-prop-sidewalk",
  "professional-fingerboard-box-portable-aluminum-acrylic-finger-skateboard-storage-case-holds-6-fingerboards-compact-durable",
  "new-fingerboard-ramp-wooden-obstacle-quarter-pipe-for-finger-skateboard",
  "dtzero-park-arc-bench-fingerboard-obstacle",
  "wooden-fingerboard-ramp-set-quarter-pipe-grind-rail-obstacles-for-tech-deck-desktop-skate-park",
  "handmade-fingerboard-obstacles-wood-ramp",
  "professional-wooden-fingerboard-kicker-ramp-for-tech-decks-portable-tabletop-obstacle-for-skate-park-tricks-perfect-for-kids",
  "mini-finger-skateboard-ramp-for-tricks-wooden-dining-table-style-ramp-railing-portable-tech-deck-accessory-for-beginners-pros",
  "dtzero-chrome-fence-rail-poles-obstacle",
  "finger-ramp-obstacle-set-for-fingerboard-wooden-mini-skate-park-rails-ledges-for-skating-tricks",
  "fingerboard-obstacle-set-wooden-rail-ledges-kit-for-finger-skateboarding-diy-skate-park-scene-props",
  "dtzero-metal-park-bench-fingerboard-obstacle",
] as const;

export const FLASH_SALE = {
  name: "Black Friday Sale",
  /** Short label used in the announcement bar / badges. */
  shortLabel: "Black Friday",
  /** What is on sale, in the shopper's words, for the announcement bar. */
  blurb: "15% off 28 best-value completes, decks and ramps, plus a free gift on orders over $50",
  // Thursday 26 Nov 00:00 to Monday 30 Nov 23:59, US Pacific (Black Friday + Cyber Monday).
  startsAt: "2026-11-26T00:00:00-08:00",
  endsAt: "2026-11-30T23:59:59-08:00",
  discountPct: 0.15,
  handles: BLACK_FRIDAY_HANDLES,
} as const;

/**
 * Surprise flash deals: a fixed, pre-set list of real windows (hours long, on
 * scattered days in December). Customers can't predict them, but each one is a
 * true bounded window evaluated against the server clock, on the same
 * margin-checked items as Black Friday at a smaller 10% discount. Outside a
 * window every price is the regular price.
 */
const FLASH_DEAL_PCT = 0.1;
const FLASH_DEAL_WINDOWS = [
  { startsAt: "2026-12-02T11:00:00-08:00", endsAt: "2026-12-02T18:59:59-08:00" },
  { startsAt: "2026-12-04T19:00:00-08:00", endsAt: "2026-12-05T06:59:59-08:00" },
  { startsAt: "2026-12-09T09:00:00-08:00", endsAt: "2026-12-09T16:59:59-08:00" },
  { startsAt: "2026-12-10T14:00:00-08:00", endsAt: "2026-12-10T21:59:59-08:00" },
  { startsAt: "2026-12-16T09:00:00-08:00", endsAt: "2026-12-16T16:59:59-08:00" },
  { startsAt: "2026-12-20T09:00:00-08:00", endsAt: "2026-12-21T02:59:59-08:00" },
  { startsAt: "2026-12-26T17:00:00-08:00", endsAt: "2026-12-27T04:59:59-08:00" },
  { startsAt: "2026-12-27T09:00:00-08:00", endsAt: "2026-12-27T20:59:59-08:00" },
  { startsAt: "2026-12-30T07:00:00-08:00", endsAt: "2026-12-30T12:59:59-08:00" },
] as const;

export type ActiveSale = {
  name: string;
  shortLabel: string;
  blurb: string;
  startsAt: string;
  endsAt: string;
  discountPct: number;
};

/** The sale running right now (Black Friday or a surprise flash deal), if any. */
export function activeSale(now: Date = new Date()): ActiveSale | null {
  const t = now.getTime();
  if (t >= new Date(FLASH_SALE.startsAt).getTime() && t <= new Date(FLASH_SALE.endsAt).getTime()) {
    return { ...FLASH_SALE };
  }
  for (const w of FLASH_DEAL_WINDOWS) {
    if (t >= new Date(w.startsAt).getTime() && t <= new Date(w.endsAt).getTime()) {
      return {
        name: "Flash Deal",
        shortLabel: "Flash Deal",
        blurb: "10% off 28 best-value completes, decks and ramps, for a few hours only",
        startsAt: w.startsAt,
        endsAt: w.endsAt,
        discountPct: FLASH_DEAL_PCT,
      };
    }
  }
  return null;
}

export function isFlashSaleActive(now: Date = new Date()): boolean {
  return activeSale(now) !== null;
}

export function isFlashSaleHandle(handle: string): boolean {
  return (FLASH_SALE.handles as readonly string[]).includes(handle);
}

/** Rounds a discounted price to 2dp. No psychological-pricing tricks. */
export function flashSalePrice(regularPrice: number): number {
  const pct = activeSale()?.discountPct ?? 0;
  return Math.round(regularPrice * (1 - pct) * 100) / 100;
}

export function getFlashSaleEndMs(): number {
  const a = activeSale();
  return a ? new Date(a.endsAt).getTime() : 0;
}
