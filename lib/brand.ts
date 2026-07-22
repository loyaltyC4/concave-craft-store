import { baseUrl } from "lib/utils";
import { allGuides } from "lib/all-guides";

/**
 * Central brand configuration for Fingerboard Lab.
 * Single source of truth for name, copy, palette, nav and footer data,
 * so the storefront stays consistent and rebrandable in one place.
 */

export const SITE_NAME = "Fingerboard Lab";
export const SITE_LEGAL_NAME = "Fingerboard Lab";
export const SITE_TAGLINE = "Precision-engineered fingerboard hardware";
export const SITE_DESCRIPTION =
  "Fingerboard Lab builds precision-engineered fingerboard hardware for real skating — complete setups, hand-pressed maple decks, CNC concave molds, trucks, wheels, bearings, and wooden ramps. Machined to ±0.1mm. Free sticker sheet in every box.";
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

// Collection handles used across the store (explicit, not keyword-guessed)
export const COLLECTIONS = [
  { handle: "starter-kits", title: "Completes & Setups", short: "Completes" },
  { handle: "decks", title: "Decks", short: "Decks" },
  { handle: "concave-molds", title: "Fingerboard Molds", short: "Molds" },
  { handle: "accessories", title: "Hardware & Tools", short: "Hardware" },
  { handle: "ramps-parks", title: "Ramps & Parks", short: "Ramps" },
] as const;

// Banner image per collection (staged in /public/brand)
export const COLLECTION_IMAGE: Record<string, string> = {
  "starter-kits": "/brand/collection-completes.jpg",
  decks: "/brand/collection-decks.jpg",
  "concave-molds": "/brand/collection-molds.jpg",
  accessories: "/brand/collection-hardware.jpg",
  "ramps-parks": "/brand/collection-ramps.jpg",
};

// Cornerstone guides (drives the /guides hub, nav, sitemap, and internal
// links). Derived from the real guide content (lib/all-guides.ts) so this
// list can never drift out of sync with what's actually published.
export const GUIDES = allGuides.map((g) => ({ slug: g.slug, title: g.title }));

export type GuideMeta = (typeof GUIDES)[number];
