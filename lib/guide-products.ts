/**
 * Guide → product mapping.
 *
 * Each guide slug maps to an ordered list of 2-4 product handles that are
 * topically relevant to the guide's content. Resolved at render time via the
 * static data layer — no network requests, no API tokens.
 *
 * To update: edit data/guide-product-links.json and redeploy.
 */

import { staticGetProduct } from "lib/shopify/static-data";
import type { Product } from "lib/shopify/types";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const guideProductLinks: Record<string, string[]> = require("../data/guide-product-links.json");

/**
 * Returns resolved Product objects for a given guide slug.
 * Skips handles that don't resolve (deleted/draft products) without throwing.
 */
export function getGuideProducts(slug: string): Product[] {
  const handles = guideProductLinks[slug] ?? [];
  return handles
    .map((h) => staticGetProduct(h))
    .filter((p): p is Product => Boolean(p));
}
