import { baseUrl } from "lib/utils";
import { allGuides } from "lib/all-guides";

/**
 * Central brand configuration for Fingerboard Lab.
 * Single source of truth for name, copy, palette, nav and footer data,
 * so the storefront stays consistent and rebrandable in one place.
 */

export const SITE_NAME = "Fingerboard Lab";
export const SITE_LEGAL_NAME = "Fingerboard Lab";
export const SITE_TAGLINE = "Fingerboard parks, ramps & gear";
export const SITE_DESCRIPTION =
  "Fingerboard Lab is a curated shop for fingerboard park kits, ramps, obstacles, completes and grip tape. Hand-picked gear, honest prices, and free build guides. Free sticker sheet in every box.";
export const SITE_URL = baseUrl;

// Contact / social
export const SUPPORT_EMAIL = "hello@fingerboardlab.com";
export const SOCIALS = {
  instagram: "https://instagram.com/fingerboardlab",
  youtube: "https://youtube.com/@fingerboardlab",
  tiktok: "https://tiktok.com/@fingerboardlab",
};

// Revenue mechanics
export const FREE_SHIPPING_THRESHOLD = 50; // USD subtotal; must match app/api/checkout logic
export const WELCOME_DISCOUNT_CODE = "LABFIRST10";
export const WELCOME_DISCOUNT_LABEL = "10% off your first order";

// Palette (mirrors globals.css tokens)
export const VOLT = "#c5f23c"; // signature acid volt-green
export const INK = "#0b0c0e"; // near-black canvas
export const PANEL = "#15171c"; // raised panel
export const CREAM = "#f3f1ea"; // primary text

// Collection handles used across the store (explicit, not keyword-guessed).
// Order here drives the header nav and the homepage category grid, so it runs
// from finished boards, through parts, to the deck-building range.
export const COLLECTIONS = [
  { handle: "completes", title: "Complete Fingerboards", short: "Completes" },
  { handle: "decks", title: "Decks", short: "Decks" },
  { handle: "trucks", title: "Trucks", short: "Trucks" },
  { handle: "wheels", title: "Wheels", short: "Wheels" },
  { handle: "grip-tape", title: "Grip Tape", short: "Grip Tape" },
  { handle: "tuning-hardware", title: "Tuning & Hardware", short: "Hardware" },
  { handle: "ramps-obstacles", title: "Ramps & Obstacles", short: "Obstacles" },
  { handle: "park-kits", title: "Park Kits & Sets", short: "Park Kits" },
  { handle: "deck-building", title: "Deck Building & Molds", short: "Molds" },
  { handle: "storage-display", title: "Storage & Display", short: "Storage" },
] as const;

// Banner image per collection (staged in /public/brand)
// Editorial macro product photography, one per collection. Locked art
// direction: matte OLED near-black background, single soft directional key
// light with a restrained volt yellow-green rim highlight, real materials
// (maple, brushed aluminum, urethane, foam grip). Feeds both the homepage
// "Shop by category" grid and the category page banner. Previous version
// mapped 10 handles onto 5 reused files — every tile now has its own image.
export const COLLECTION_IMAGE: Record<string, string> = {
  completes: "/brand/collections/completes.jpg",
  decks: "/brand/collections/decks.jpg",
  trucks: "/brand/collections/trucks.jpg",
  wheels: "/brand/collections/wheels.jpg",
  "grip-tape": "/brand/collections/grip-tape.jpg",
  "tuning-hardware": "/brand/collections/tuning-hardware.jpg",
  "ramps-obstacles": "/brand/collections/ramps-obstacles.jpg",
  "park-kits": "/brand/collections/park-kits.jpg",
  "deck-building": "/brand/collections/deck-building.jpg",
  "storage-display": "/brand/collections/storage-display.jpg",
};

// Cornerstone guides (drives the /guides hub, nav, sitemap, and internal
// links). Derived from the real guide content (lib/all-guides.ts) so this
// list can never drift out of sync with what's actually published.
export const GUIDES = allGuides.map((g) => ({ slug: g.slug, title: g.title }));

export type GuideMeta = (typeof GUIDES)[number];
