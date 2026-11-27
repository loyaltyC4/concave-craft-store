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

// Black Friday 2026 sale tiers (handle -> discount). 15% on the original
// hand-picked best-value items, 10% on every other item whose margin survives
// it. Built from data/cost-basis.json and CHECKED AT BUILD TIME by
// scripts/margin-check.mjs: every variant must still earn money at its sale
// price under a worst case (item cost +25%, freight, Stripe fees). Items that
// were too thin were raised a little and left OUT of the sale on purpose, so no
// "was" price here is invented: it is always the live regular price.
// The 10% welcome code is switched off while any sale runs (see checkout).
export const SALE_TIERS: Record<string, number> = {
  "34mm-cruiser-fingerboard-deck-new-shape-with-graphic-for-professional-mini-finger-skateboard": 0.15,
  "36mm-fingerboard-deck-with-real-wear-graphic-finger-skateboard-wooden-board": 0.15,
  "36mm-pro-fingerboard-deck-wooden-board-with-new-graphic-for-finger-skateboard": 0.15,
  "alloy-fingerboard-park-set-4-in-1-terrain-combo": 0.15,
  "alloy-fingerboard-scene-set-modular-mini-park-combo": 0.15,
  "alloy-fingerboard-venue-set-modular": 0.15,
  "dtzero-chrome-fence-rail-poles-obstacle": 0.15,
  "dtzero-metal-park-bench-fingerboard-obstacle": 0.15,
  "dtzero-ome-surplus-complete-fingerboard-series": 0.15,
  "dtzero-park-arc-bench-fingerboard-obstacle": 0.15,
  "finger-ramp-obstacle-set-for-fingerboard-wooden-mini-skate-park-rails-ledges-for-skating-tricks": 0.15,
  "fingerboard-brick-ladder-obstacle-set": 0.15,
  "fingerboard-obstacle-set-wooden-rail-ledges-kit-for-finger-skateboarding-diy-skate-park-scene-props": 0.15,
  "fingerboard-practice-set-slope-curve-jump-bar": 0.15,
  "fingerboard-venue-set-4in1": 0.15,
  "hailey-fb2-34mm-complete-whale-yellow": 0.15,
  "handmade-fingerboard-obstacles-wood-ramp": 0.15,
  "leefai-cat-series-fingerboard-complete": 0.15,
  "mini-finger-skateboard-ramp-for-tricks-wooden-dining-table-style-ramp-railing-portable-tech-deck-accessory-for-beginners-pros": 0.15,
  "new-fingerboard-ramp-wooden-obstacle-quarter-pipe-for-finger-skateboard": 0.15,
  "professional-fingerboard-box-portable-aluminum-acrylic-finger-skateboard-storage-case-holds-6-fingerboards-compact-durable": 0.15,
  "professional-mini-wooden-skateboard-fingerboard-set-finger-scooter-finger-skate-board-maple-wood-kid-tabletop-toys-for-boys": 0.15,
  "professional-wooden-fingerboard-kicker-ramp-for-tech-decks-portable-tabletop-obstacle-for-skate-park-tricks-perfect-for-kids": 0.15,
  "professional-wooden-fingerboard-skate-set-with-aluminum-case-mini-finger-skateboard-toy-for-kids-collectors-cool-gift-for": 0.15,
  "team-heritage-reissue-deck-5-ply-maple-shallow-concave": 0.15,
  "wooden-fingerboard-ramp-set-quarter-pipe-grind-rail-obstacles-for-tech-deck-desktop-skate-park": 0.15,
  "wooden-fingerboard-stairs-with-brick-metal-rod-artificial-grass": 0.15,
  "0-5mm-thick-fingerboard-foam-grip-tape-110-38mm-uncut-deck-griptape": 0.1,
  "12-pcs-high-elastic-colorful-soft-pu-material-fingerboard-bushing": 0.1,
  "26mm-v3-fingerboard-trucks-normal-inverted-kingpin-for-pro-finger-skateboard": 0.1,
  "29mm-32mm-v3-fingerboard-trucks-for-pro-finger-skateboard": 0.1,
  "29mm-wooden-fingerboard-set-with-pro-deck-metal-truck-bearing-wheels": 0.1,
  "32mm-fingerboard-set-12-constellations-professional-finger-skateboard": 0.1,
  "32mm-fingerboard-single-axle-finger-skateboard-trucks-for-professional-mini-skate-board-toys": 0.1,
  "32mm-triple-dyed-maple-fingerboard-deck-dual-face-pack-of-2": 0.1,
  "34mm-32mm-fingerboard-single-axle-truck-for-finger-skate-board-mini-skateboard-toys-for-kids": 0.1,
  "34mm-32mm-maple-wooden-fingerboard-complete-finger-skateboard-with-truck-and-wheels": 0.1,
  "34mm-36mm-a2-fingerboard-trucks-with-new-hanger-and-base-for-pro-finger-skateboard": 0.1,
  "34mm-5-ply-northeast-maple-dyed-deck-double-kick-pack-of-2": 0.1,
  "34mm-cnc-setup-complete-beach-skeleton": 0.1,
  "34mm-cnc-setup-complete-cat": 0.1,
  "34mm-cnc-setup-complete-statue-of-liberty": 0.1,
  "34mm-complete-fingerboard-handmade-deck-single-axle-truck-cnc-bearing-wheels": 0.1,
  "34mm-fingerboard-complete-maple-wide-trucks-bearing-wheels": 0.1,
  "34mm-fingerboard-set-professional-wooden-deck-single-axle-truck-cnc-wheels-complete-mini-finger-skateboard": 0.1,
  "34mm-fingerboard-set-with-double-axle-trucks-bearing-wheels": 0.1,
  "34mm-pro-fingerboard-complete-5-ply-maple-deep-concave": 0.1,
  "34mm-pro-maple-complete-5-colourways": 0.1,
  "34mm-wooden-fingerboard-deck-with-graphic-for-professional-mini-finger-skateboard": 0.1,
  "34mm-wooden-fingerboard-deck-with-new-graphic": 0.1,
  "36mm-34mm-32mm-upgraded-single-alxe-fingerboard-trucks-for-professional-finger-skateboard-mini-skate-board-toys": 0.1,
  "36mm-a2-fingerboard-trucks-with-new-hanger-and-base-for-pro-finger-skateboard": 0.1,
  "36mm-fingerboard-set-professional-wooden-deck-36mm-single-axle-truck-cnc-wheels-complete-mini-finger-skateboard": 0.1,
  "36mm-pro-fingerboard-set-wooden-deck-professional-a2-trucks-cnc-wheels-for-finger-skateboard": 0.1,
  "4-in-1-fingerboard-display-stand-holds-4-decks-with-storage": 0.1,
  "4future-l-shaped-park-bench-recycle": 0.1,
  "4future-magnetic-obstacle-storage-box": 0.1,
  "4pcs-set-professional-pu-metal-urethane-cnc-bearing-wheel-for-wooden-fingerboard": 0.1,
  "5-ply-maple-complete-alloy-trucks-bearing-wheels-pack-of-2": 0.1,
  "6-pcs-fingerboard-locknuts-with-nylon-self-lock-anti-loose-nuts-stainless-steel": 0.1,
  "65d-urethane-fingerboard-wheels-mini-pro-shape-with-abec-7-bearing": 0.1,
  "70a-pro-fingerboard-bushing-durable-rubber-material-cone-shape": 0.1,
  "75d-fingerboard-wheels-for-professional-finger-skateboard": 0.1,
  "97-34mm-fingerboard-set-handmade-deck-professional-v2-finger-skateboard-trucks-abec-7-bearing-urethane-wheels": 0.1,
  "a2-34mm-fingerboard-trucks-36mm-32mm-new-design-for-professional-finger-skateboard": 0.1,
  "abec-7-bearing-for-fingerboard-wheels": 0.1,
  "alloy-fingerboard-park-set-kicker-stairs-rail": 0.1,
  "alloy-mini-fingerboard-park-combo-set": 0.1,
  "anti-once-candle-fingerboard-complete": 0.1,
  "anti-once-panda-fingerboard-complete": 0.1,
  "anti-once-revolver-fingerboard-complete": 0.1,
  "anti-once-shades-rabbit-fingerboard-complete": 0.1,
  "anti-once-skate-deer-fingerboard-complete": 0.1,
  "anti-once-skull-chaos-fingerboard-complete": 0.1,
  "anti-once-toon-bird-fingerboard-complete": 0.1,
  "anti-once-toxic-element-fingerboard-complete": 0.1,
  "antionce-34mm-complete-cute-series": 0.1,
  "antionce-berlin-fingerboard-complete": 0.1,
  "aolongfei-fingerboard-complete-bearing-wheels-double-kick": 0.1,
  "b27-high-kick-shallow-concave-fingerboard-mold": 0.1,
  "basic-shape-cnc-fingerboard-wheels-with-high-speed-bearing": 0.1,
  "bd26-deep-concave-high-kick-fingerboard-mold": 0.1,
  "bh25-high-concave-fingerboard-mold-diy-construction": 0.1,
  "bh25-pro-metal-concave-fingerboard-mold": 0.1,
  "big-tail-squirrel-wooden-fingerboard-park-obstacles": 0.1,
  "blackmarket-x-team-collab-fingerboard-complete-pro-maple": 0.1,
  "bm-fingerboard-wheels-nsk-bearings-dual-colour-metal-lock": 0.1,
  "bm-race-grade-fingerboard-wheels-metal-lock-quiet-running": 0.1,
  "bowl-shape-fingerboard-wheels-high-speed-bearing-for-pro-finger-skateboard-toys": 0.1,
  "cnc-fingerboard-wheels-swirl-color-for-finger-skateboard": 0.1,
  "colour-laminated-maple-deck": 0.1,
  "d27-deep-concave-high-kick-fingerboard-mold-metal-bump": 0.1,
  "deep-concave-complete-astro-rabbit": 0.1,
  "deep-concave-complete-cool-cat": 0.1,
  "deep-concave-complete-demon-mask": 0.1,
  "deep-concave-complete-doodle-sketch": 0.1,
  "diy-wooden-fingerboard-park-kit-assemble-yourself-halfpipe-bowl": 0.1,
  "dsg-8mm-pom-fingerboard-wheels-high-speed-white": 0.1,
  "dsg-fingerboard-cross-screwdriver-truck-maintenance-tool": 0.1,
  "dsg-fingerboard-wheels-wide-tyre-anti-slip-no-resistance": 0.1,
  "dsg-logo-deck-laser-etched-deep-concave-pro-maple": 0.1,
  "dtzero-eclipse-handmade-fingerboard-deck-complete": 0.1,
  "dtzero-half-u-ramp-fingerboard-obstacle": 0.1,
  "dtzero-pro-handmade-complete-colour-series": 0.1,
  "dtzero-realistic-slope-brick-box-obstacle": 0.1,
  "eureka-3-0-street-complete-anime": 0.1,
  "eureka-3-0-street-complete-cat": 0.1,
  "eureka-3-0-street-complete-cat-and-fish": 0.1,
  "eureka-3-0-street-complete-cheers": 0.1,
  "eureka-3-0-street-complete-gaze": 0.1,
  "eureka-3-0-street-complete-girl-and-cat": 0.1,
  "eureka-3-0-street-complete-lady": 0.1,
  "finger-deck-32mm-34mm-professional-fingerboard-wood-mini-skateboard-complete-set-for-tricks-flipping-grinding-collectible-toy": 0.1,
  "fingerboard-board-rails-with-screws": 0.1,
  "fingerboard-board-rails-with-screws-new-shape": 0.1,
  "fingerboard-deck-press-mold-with-metal-alignment-pins": 0.1,
  "fingerboard-foam-grip-tape-110-38mm-uncut-deck-griptape-stickers": 0.1,
  "fingerboard-foam-grip-tapes-for-finger-skateboard-anti-slip-wooden-fingerboard-deck-adhesive-tape-stickers-grip-tapes-black-mat": 0.1,
  "fingerboard-halfpipe-ramp-wooden-u-ramp-for-tech-deck-stunts-portable-desktop-railing-for-professional-practice-and-beginner": 0.1,
  "fingerboard-obstacles-wall": 0.1,
  "fingerboard-press-mold-3-piece-set-with-scribe-style-a-98-32mm": 0.1,
  "fingerboard-press-mold-4-piece-set-style-d": 0.1,
  "fingerboard-press-mold-b27-series": 0.1,
  "fingerboard-press-mold-with-scribe-style-k": 0.1,
  "fingerboard-rail-solid-rod-detachable": 0.1,
  "fingerboard-ramp-wooden-obstacle-triangular-shape-with-real-bricks": 0.1,
  "fingerboard-stairs-platform-set-with-alloy-rail": 0.1,
  "fingerboard-storage-bag-for-finger-skateboard": 0.1,
  "fingerboard-tool-for-open-screw-thread-on-truck-base": 0.1,
  "fingerboard-truck-pivot-cup": 0.1,
  "flipteam-brick-box-grass-pyramid-fingerboard-obstacle": 0.1,
  "gold-silver-black-self-lock-anti-loose-fingerboard-locknuts-with-nylon-inside": 0.1,
  "hailey-34mm-competition-complete-set": 0.1,
  "hailey-cnc-street-shape-fingerboard-wheels-pack-of-2": 0.1,
  "hailey-fb1-34mm-complete-mickey": 0.1,
  "hailey-fb3-34mm-deck-deep-concave": 0.1,
  "hailey-pink-graffiti-fingerboard-canadian-maple": 0.1,
  "hailey-pork-series-fingerboard-complete": 0.1,
  "hailey-razor-maple-fingerboard-complete": 0.1,
  "hailey-signature-34mm-complete": 0.1,
  "handmade-fingerboard-bushing-75a": 0.1,
  "inverted-kingpin-fingerboard-truck-34mm-32mm-with-soft-bushing-for-profession-finger-skateboard": 0.1,
  "leefai-dark-spider-fingerboard-series": 0.1,
  "leefai-dark-spider-series-deck-imported-maple-pro-fingerboard": 0.1,
  "leefai-wooden-park-bench-self-assembly": 0.1,
  "low-concave-fingerboard-deck-97-34mm-professional-handmade-canadian-maple-board-for-finger-skateboard": 0.1,
  "maple-fingerboard-complete-pro-bearing-wheels-double-kick": 0.1,
  "maple-fingerboard-veneer-blanks-100-30mm-pack-of-2": 0.1,
  "maple-fingerboard-veneer-blanks-100-32-34mm-pack-of-2": 0.1,
  "martlet-32mm-pro-complete-entry-wide": 0.1,
  "martlet-34mm-maple-complete-six-graphics": 0.1,
  "metal-fingerboard-tool-professional-made-for-finger-skateboard-screws-and-nuts": 0.1,
  "mini-finger-skateboard-ramp-set-wooden-obstacles-for-tech-deck-finger-board-training-perfect-gift-for-skaters-desktop-toy": 0.1,
  "mini-fingerboard-ramp-set-portable-quarter-pipe-rail-for-tech-deck-practice-desktop-skate-park-obstacles-for-fingerboarding": 0.1,
  "mini-plastic-fingerboard-fidget": 0.1,
  "mini-shape-urethane-fingerboard-wheels-65d-hardness-with-abec-7-bearing": 0.1,
  "natural-dyed-maple-wood-veneer-for-model-crafting-fingerboard-marquetry-diy-projects-colored-thin-wood-sheets-vibrant-tones": 0.1,
  "new-professional-finger-skateboarding-fingerboard-hobbies-novelty-stress-sensing-toys-puzzle-toys-mini-toys-gifts": 0.1,
  "new-street-shape-fingerboard-wheels-with-bearing-lock": 0.1,
  "northeast-maple-fingerboard-deck-blanks-32mm-wide-pack-of-2": 0.1,
  "novelty-graphics-fingerboard-complete": 0.1,
  "panda-10cm-double-kick-fingerboard-starter": 0.1,
  "plies-x-silent-collab-fingerboard-deck-34mm": 0.1,
  "pro-fingerboard-set-wooden-deck-professional-single-axle-trucks-cnc-wheels-for-finger-skateboard": 0.1,
  "professional-75a-fingerboard-bushing-high-elastic-solf-pu": 0.1,
  "professional-fingerboard-file-for-cutting-foam-tape-griptape": 0.1,
  "professional-fingerboard-truck-base-new-design-finger-skate-board-baseplate-mini-skateboard-toys": 0.1,
  "professional-fingerboard-wheels-abec-7-bearings-for-mini-skateboard-finger-skate-board": 0.1,
  "professional-maple-fingerboard-veneer-blanks-100-30mm-pack-of-2": 0.1,
  "professional-regular-kingpin-mini-skateboard-34mm-finger-skate-board-trucks": 0.1,
  "professional-wood-mini-skateboard-complete-finger-skateboard-maple-32mm-34mm-perfect-collectible-toy-gift-for-kids-teens": 0.1,
  "r1-metal-fingerboard-rail-for-finger-skateboard-obstacle": 0.1,
  "resin-fingerboard-swirl-wheels-with-abec-7-bearings-for-pro-finger-skateboard": 0.1,
  "s27-pro-finger-skateboard-mold-high-concave-with-metal-bumps": 0.1,
  "sdr-marble-box-platform-new-series": 0.1,
  "sdr-marble-brick-box-obstacle": 0.1,
  "sdr-marble-dining-table-box": 0.1,
  "sdr-marble-ledge-strips": 0.1,
  "sdr-marble-mini-half-u-ramp": 0.1,
  "sdr-marble-obstacle-barrier-box": 0.1,
  "sdr-transforming-marble-box-modular-park": 0.1,
  "silent-3d-prop-wave-platform": 0.1,
  "silent-team-fingerboard-grip-tape-anti-slip-foam-pads-5-pack": 0.1,
  "sk8crime-x-team-collab-fingerboard-maple-shallow-concave": 0.1,
  "t-shape-fingerboard-tool-allen-key-axle-wrench": 0.1,
  "v3-fingerboard-trucks-inverted-kingpin-29mm-32mm-34mm-36mm-for-professional-finger-skateboard": 0.1,
  "v3-pro-fingerboard-trucks-34mm-36mm-for-professional-finger-skateboard": 0.1,
  "w27-shallow-concave-high-kick-fingerboard-mold-metal-bump": 0.1,
  "whitepolar-brawl-five-ply-maple-fingerboard-34mm": 0.1,
  "wooden-fingerboard-ramp-obstacle-set-7-pieces": 0.1,
  "wp-bear-gummy-fingerboard-complete-maple-shallow-concave": 0.1,
  "wp-cthulhu-28mm-complete-shallow-concave": 0.1,
  "wp-final-match-30mm-complete-five-ply": 0.1,
  "wp-fingerboard-cross-screwdriver-blue-truck-tool-pack-of-3": 0.1,
  "wp-fingerboard-cross-screwdriver-truck-tool-pack-of-3": 0.1,
  "wp-fingerboard-hanging-pouch-handmade-faux-leather-with-clip": 0.1,
  "wp-fingerboard-spare-parts-kit-lock-nuts-and-pins-5-pack": 0.1,
  "wp-five-layer-maple-mini-complete-six-graphics": 0.1,
  "wp-flanuer-32mm-complete-double-concave": 0.1,
  "wp-grenade-storage-bag-fingerboard": 0.1,
  "wp-hard-bone-5-ply-maple-complete": 0.1,
  "wp-lucky-cat-34mm-deck-kit": 0.1,
  "wp-magic-girl-32mm-deck-shallow-concave": 0.1,
  "wp-magician-32mm-deck-shallow-concave": 0.1,
  "wp-pop-art-30mm-complete-five-ply": 0.1,
  "wp-pro-5-ply-maple-complete-tyler": 0.1,
};

const FLASH_SALE_PCT = 0.15;

export const FLASH_SALE = {
  name: "Black Friday Sale",
  /** Short label used in the announcement bar / badges. */
  shortLabel: "Black Friday",
  /** What is on sale, in the shopper's words, for the announcement bar. */
  blurb: "15% off best-value picks and 10% off most of the store, plus a free gift on orders over $50",
  // Thursday 26 Nov 00:00 to Monday 30 Nov 23:59, US Pacific (Black Friday + Cyber Monday).
  startsAt: "2026-11-26T00:00:00-08:00",
  endsAt: "2026-11-30T23:59:59-08:00",
  discountPct: FLASH_SALE_PCT,
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
        blurb: "10% off selected completes, decks and ramps, for a few hours only",
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
  return handle in SALE_TIERS;
}

/** Discount for a handle right now: its tier, capped by the running sale's own limit. */
export function salePctFor(handle: string): number {
  const a = activeSale();
  if (!a) return 0;
  return Math.min(SALE_TIERS[handle] ?? 0, a.discountPct);
}

/** Rounds a discounted price to 2dp. No psychological-pricing tricks. */
export function flashSalePrice(regularPrice: number, handle?: string): number {
  const pct = handle ? salePctFor(handle) : activeSale()?.discountPct ?? 0;
  return Math.round(regularPrice * (1 - pct) * 100) / 100;
}

export function getFlashSaleEndMs(): number {
  const a = activeSale();
  return a ? new Date(a.endsAt).getTime() : 0;
}
