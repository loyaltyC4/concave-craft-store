/**
 * Country landing pages (/shipping/[country]).
 *
 * We ship worldwide from the same supplier network at one flat USD rate and
 * one delivery window, regardless of destination — so every fact used on
 * these pages is genuinely true for all of them (see lib/shipping.ts /
 * lib/brand.ts). No page here invents country-specific delivery times,
 * customs guarantees, or "popular in [country]" claims we can't back with
 * real data — the popular categories shown are the same real catalog
 * categories, not fabricated localized bestseller lists.
 */

export type CountryPage = {
  slug: string;
  name: string;
  /** Demonym used in copy, e.g. "Australian riders". */
  demonym: string;
  /** ISO country code, matches lib/shipping.ts SHIP_COUNTRIES. */
  code: string;
  metaTitle: string;
  metaDescription: string;
  /** 2-3 real, genuinely relevant collection handles to feature. */
  featuredCollections: { handle: string; label: string }[];
};

export const COUNTRY_PAGES: CountryPage[] = [
  {
    slug: "australia",
    name: "Australia",
    demonym: "Australian riders",
    code: "AU",
    metaTitle: "Fingerboard Shop Shipping to Australia — Fingerboard Lab",
    metaDescription:
      "Buy fingerboards, ramps, obstacles and parts with delivery to Australia. Flat $12.95 USD shipping, free over $50, 7–14 business day delivery.",
    featuredCollections: [
      { handle: "completes", label: "Complete Fingerboards" },
      { handle: "ramps-obstacles", label: "Ramps & Obstacles" },
      { handle: "park-kits", label: "Park Kits & Sets" },
    ],
  },
  {
    slug: "united-kingdom",
    name: "the United Kingdom",
    demonym: "UK riders",
    code: "GB",
    metaTitle: "Fingerboard Shop Shipping to the UK — Fingerboard Lab",
    metaDescription:
      "Buy fingerboards, ramps, obstacles and parts with delivery to the UK. Flat $12.95 USD shipping, free over $50, 7–14 business day delivery.",
    featuredCollections: [
      { handle: "completes", label: "Complete Fingerboards" },
      { handle: "decks", label: "Decks" },
      { handle: "trucks", label: "Trucks" },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    demonym: "Canadian riders",
    code: "CA",
    metaTitle: "Fingerboard Shop Shipping to Canada — Fingerboard Lab",
    metaDescription:
      "Buy fingerboards, ramps, obstacles and parts with delivery to Canada. Flat $12.95 USD shipping, free over $50, 7–14 business day delivery.",
    featuredCollections: [
      { handle: "completes", label: "Complete Fingerboards" },
      { handle: "ramps-obstacles", label: "Ramps & Obstacles" },
      { handle: "wheels", label: "Wheels" },
    ],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    demonym: "New Zealand riders",
    code: "NZ",
    metaTitle: "Fingerboard Shop Shipping to New Zealand — Fingerboard Lab",
    metaDescription:
      "Buy fingerboards, ramps, obstacles and parts with delivery to New Zealand. Flat $12.95 USD shipping, free over $50, 7–14 business day delivery.",
    featuredCollections: [
      { handle: "completes", label: "Complete Fingerboards" },
      { handle: "park-kits", label: "Park Kits & Sets" },
      { handle: "grip-tape", label: "Grip Tape" },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    demonym: "German riders",
    code: "DE",
    metaTitle: "Fingerboard Shop Shipping to Germany — Fingerboard Lab",
    metaDescription:
      "Buy fingerboards, ramps, obstacles and parts with delivery to Germany. Flat $12.95 USD shipping, free over $50, 7–14 business day delivery.",
    featuredCollections: [
      { handle: "completes", label: "Complete Fingerboards" },
      { handle: "deck-building", label: "Deck Building & Molds" },
      { handle: "trucks", label: "Trucks" },
    ],
  },
];

export function getCountryPage(slug: string): CountryPage | undefined {
  return COUNTRY_PAGES.find((c) => c.slug === slug);
}
