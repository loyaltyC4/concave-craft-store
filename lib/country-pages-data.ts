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
 *
 * One row per country Stripe checkout accepts (SHIP_COUNTRIES). To add a
 * destination, add it there AND as a row below.
 */

import {
  DELIVERY_MAX_DAYS,
  DELIVERY_MIN_DAYS,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE_USD,
} from "./brand";

export type Region =
  | "North America"
  | "Europe"
  | "Oceania"
  | "Asia"
  | "Middle East"
  | "Africa"
  | "Latin America";

export type CountryPage = {
  slug: string;
  name: string;
  /** Short form for titles, e.g. "the UK". */
  short: string;
  /** Demonym used in copy, e.g. "Australian riders". */
  demonym: string;
  /** ISO country code, matches lib/shipping.ts SHIP_COUNTRIES. */
  code: string;
  region: Region;
  /** ISO 4217 code and plain name of the local currency (prices stay USD). */
  currency: { code: string; name: string };
  /** True for EU member states (import VAT wording). */
  eu?: boolean;
  metaTitle: string;
  metaDescription: string;
  /** 2-3 real, genuinely relevant collection handles to feature. */
  featuredCollections: { handle: string; label: string }[];
};

const C = {
  completes: { handle: "completes", label: "Complete Fingerboards" },
  ramps: { handle: "ramps-obstacles", label: "Ramps & Obstacles" },
  parks: { handle: "park-kits", label: "Park Kits & Sets" },
  decks: { handle: "decks", label: "Decks" },
  trucks: { handle: "trucks", label: "Trucks" },
  molds: { handle: "deck-building", label: "Deck Building & Molds" },
};

type Row = [
  code: string,
  slug: string,
  name: string,
  short: string,
  demonym: string,
  region: Region,
  currency: string,
  currencyName: string,
  eu?: boolean,
];

const ROWS: Row[] = [
  ["US", "united-states", "the United States", "the USA", "American riders", "North America", "USD", "US dollars"],
  ["CA", "canada", "Canada", "Canada", "Canadian riders", "North America", "CAD", "Canadian dollars"],
  ["MX", "mexico", "Mexico", "Mexico", "Mexican riders", "North America", "MXN", "Mexican pesos"],
  ["AU", "australia", "Australia", "Australia", "Australian riders", "Oceania", "AUD", "Australian dollars"],
  ["NZ", "new-zealand", "New Zealand", "New Zealand", "New Zealand riders", "Oceania", "NZD", "New Zealand dollars"],
  ["GB", "united-kingdom", "the United Kingdom", "the UK", "UK riders", "Europe", "GBP", "pounds sterling"],
  ["IE", "ireland", "Ireland", "Ireland", "Irish riders", "Europe", "EUR", "euros", true],
  ["DE", "germany", "Germany", "Germany", "German riders", "Europe", "EUR", "euros", true],
  ["FR", "france", "France", "France", "French riders", "Europe", "EUR", "euros", true],
  ["ES", "spain", "Spain", "Spain", "Spanish riders", "Europe", "EUR", "euros", true],
  ["IT", "italy", "Italy", "Italy", "Italian riders", "Europe", "EUR", "euros", true],
  ["NL", "netherlands", "the Netherlands", "the Netherlands", "Dutch riders", "Europe", "EUR", "euros", true],
  ["BE", "belgium", "Belgium", "Belgium", "Belgian riders", "Europe", "EUR", "euros", true],
  ["AT", "austria", "Austria", "Austria", "Austrian riders", "Europe", "EUR", "euros", true],
  ["CH", "switzerland", "Switzerland", "Switzerland", "Swiss riders", "Europe", "CHF", "Swiss francs"],
  ["SE", "sweden", "Sweden", "Sweden", "Swedish riders", "Europe", "SEK", "Swedish kronor", true],
  ["NO", "norway", "Norway", "Norway", "Norwegian riders", "Europe", "NOK", "Norwegian kroner"],
  ["DK", "denmark", "Denmark", "Denmark", "Danish riders", "Europe", "DKK", "Danish kroner", true],
  ["FI", "finland", "Finland", "Finland", "Finnish riders", "Europe", "EUR", "euros", true],
  ["PT", "portugal", "Portugal", "Portugal", "Portuguese riders", "Europe", "EUR", "euros", true],
  ["PL", "poland", "Poland", "Poland", "Polish riders", "Europe", "PLN", "Polish zloty", true],
  ["CZ", "czechia", "Czechia", "Czechia", "Czech riders", "Europe", "CZK", "Czech koruna", true],
  ["SK", "slovakia", "Slovakia", "Slovakia", "Slovak riders", "Europe", "EUR", "euros", true],
  ["HU", "hungary", "Hungary", "Hungary", "Hungarian riders", "Europe", "HUF", "Hungarian forint", true],
  ["RO", "romania", "Romania", "Romania", "Romanian riders", "Europe", "RON", "Romanian lei", true],
  ["GR", "greece", "Greece", "Greece", "Greek riders", "Europe", "EUR", "euros", true],
  ["LU", "luxembourg", "Luxembourg", "Luxembourg", "Luxembourg riders", "Europe", "EUR", "euros", true],
  ["IS", "iceland", "Iceland", "Iceland", "Icelandic riders", "Europe", "ISK", "Icelandic krona"],
  ["JP", "japan", "Japan", "Japan", "Japanese riders", "Asia", "JPY", "Japanese yen"],
  ["KR", "south-korea", "South Korea", "South Korea", "South Korean riders", "Asia", "KRW", "Korean won"],
  ["SG", "singapore", "Singapore", "Singapore", "Singapore riders", "Asia", "SGD", "Singapore dollars"],
  ["HK", "hong-kong", "Hong Kong", "Hong Kong", "Hong Kong riders", "Asia", "HKD", "Hong Kong dollars"],
  ["MY", "malaysia", "Malaysia", "Malaysia", "Malaysian riders", "Asia", "MYR", "Malaysian ringgit"],
  ["PH", "philippines", "the Philippines", "the Philippines", "Filipino riders", "Asia", "PHP", "Philippine pesos"],
  ["TH", "thailand", "Thailand", "Thailand", "Thai riders", "Asia", "THB", "Thai baht"],
  ["AE", "united-arab-emirates", "the United Arab Emirates", "the UAE", "UAE riders", "Middle East", "AED", "UAE dirhams"],
  ["SA", "saudi-arabia", "Saudi Arabia", "Saudi Arabia", "Saudi riders", "Middle East", "SAR", "Saudi riyals"],
  ["IL", "israel", "Israel", "Israel", "Israeli riders", "Middle East", "ILS", "Israeli shekels"],
  ["ZA", "south-africa", "South Africa", "South Africa", "South African riders", "Africa", "ZAR", "South African rand"],
  ["BR", "brazil", "Brazil", "Brazil", "Brazilian riders", "Latin America", "BRL", "Brazilian reais"],
  ["CL", "chile", "Chile", "Chile", "Chilean riders", "Latin America", "CLP", "Chilean pesos"],
  ["AR", "argentina", "Argentina", "Argentina", "Argentine riders", "Latin America", "ARS", "Argentine pesos"],
];

/** Hand-picked collections for the first five pages (unchanged from before). */
const FEATURED_OVERRIDES: Record<string, CountryPage["featuredCollections"]> = {
  AU: [C.completes, C.ramps, C.parks],
  GB: [C.completes, C.decks, C.trucks],
  CA: [C.completes, C.ramps, C.parks],
  NZ: [C.completes, C.parks, C.trucks],
  DE: [C.completes, C.molds, C.trucks],
};

const REGION_FEATURED: Record<Region, CountryPage["featuredCollections"]> = {
  "North America": [C.completes, C.ramps, C.molds],
  Europe: [C.completes, C.decks, C.parks],
  Oceania: [C.completes, C.ramps, C.parks],
  Asia: [C.completes, C.decks, C.trucks],
  "Middle East": [C.completes, C.ramps, C.parks],
  Africa: [C.completes, C.ramps, C.parks],
  "Latin America": [C.completes, C.ramps, C.decks],
};

export const COUNTRY_PAGES: CountryPage[] = ROWS.map(
  ([code, slug, name, short, demonym, region, cur, curName, eu]) => ({
    slug,
    name,
    short,
    demonym,
    code,
    region,
    currency: { code: cur, name: curName },
    eu: eu || undefined,
    metaTitle: `Fingerboards Shipped to ${short} | Fingerboard Lab`,
    metaDescription: `Buy fingerboards, ramps, obstacles and parts with delivery to ${name}. Flat $${SHIPPING_FEE_USD} USD shipping, free over $${FREE_SHIPPING_THRESHOLD}, ${DELIVERY_MIN_DAYS}-${DELIVERY_MAX_DAYS} business day delivery.`,
    featuredCollections: FEATURED_OVERRIDES[code] ?? REGION_FEATURED[region],
  }),
);

export const REGIONS: Region[] = [
  "North America",
  "Europe",
  "Oceania",
  "Asia",
  "Middle East",
  "Africa",
  "Latin America",
];

export function getCountryPage(slug: string): CountryPage | undefined {
  return COUNTRY_PAGES.find((c) => c.slug === slug);
}

export function countriesInRegion(region: Region): CountryPage[] {
  return COUNTRY_PAGES.filter((c) => c.region === region);
}

/** Footer "ships to" shortlist: biggest destinations, then "all countries". */
export const FOOTER_COUNTRY_SLUGS = [
  "united-states",
  "australia",
  "united-kingdom",
  "canada",
  "germany",
  "france",
  "japan",
  "new-zealand",
];
