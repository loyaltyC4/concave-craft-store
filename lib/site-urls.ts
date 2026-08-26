import { getCollections, getProducts } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { allGuides } from "lib/all-guides";

export type SiteUrl = {
  url: string;
  lastModified: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
  /** Product imagery, emitted as <image:image> entries in the sitemap. */
  images?: { url: string; title?: string }[];
};

/**
 * Static pages, with priorities that reflect commercial value rather than a
 * flat default. Legal pages are deliberately low but still indexable.
 */
const STATIC_PAGES: { path: string; priority: number; freq: SiteUrl["changeFrequency"] }[] =
  [
    { path: "", priority: 1.0, freq: "daily" },
    { path: "/search", priority: 0.9, freq: "daily" },
    { path: "/custom", priority: 0.95, freq: "weekly" },
    { path: "/custom/gifts", priority: 0.85, freq: "monthly" },
    { path: "/custom/branded", priority: 0.85, freq: "monthly" },
    { path: "/guides", priority: 0.8, freq: "weekly" },
    { path: "/glossary", priority: 0.6, freq: "monthly" },
    { path: "/about", priority: 0.5, freq: "monthly" },
    { path: "/contact", priority: 0.4, freq: "yearly" },
    { path: "/faq", priority: 0.5, freq: "monthly" },
    { path: "/shipping-returns", priority: 0.4, freq: "monthly" },
    { path: "/returns", priority: 0.5, freq: "monthly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
  ];

function abs(url: string): string {
  return url.startsWith("http") ? url : `${baseUrl}${url}`;
}

/** Static pages. */
export async function getStaticUrls(): Promise<SiteUrl[]> {
  const now = new Date().toISOString();
  return STATIC_PAGES.map((p) => ({
    url: `${baseUrl}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}

/** Category pages — the highest-intent commercial URLs on the site. */
export async function getCollectionUrls(): Promise<SiteUrl[]> {
  const collections = await getCollections();
  return collections
    .filter((c) => c.handle)
    .map((c) => ({
      url: `${baseUrl}${c.path}`,
      lastModified: c.updatedAt ?? new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
}

/**
 * Product pages, each carrying its own real lastModified and its imagery.
 *
 * A sitemap that stamps every URL with "now" on each build teaches crawlers to
 * ignore the field, so lastModified comes from the product record itself.
 */
export async function getProductUrls(): Promise<SiteUrl[]> {
  const products = await getProducts({});
  return products.map((p) => ({
    url: `${baseUrl}/product/${p.handle}`,
    lastModified: p.updatedAt ?? new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: p.images.slice(0, 5).map((i) => ({
      url: abs(i.url),
      title: i.altText || p.title,
    })),
  }));
}

/**
 * Editorial guides — the topical-authority layer.
 *
 * The Guide type field is `updated` (an ISO date string), not `updatedAt`.
 * The previous cast to `{ updatedAt?: string }` never resolved, so every
 * guide got stamped with build time and the "don't teach crawlers to ignore
 * lastModified" comment on getProductUrls quietly no longer applied here.
 */
export async function getGuideUrls(): Promise<SiteUrl[]> {
  return allGuides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: g.updated ?? new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}

/** Everything indexable, in one list. Shared by the sitemap and IndexNow so
 *  the two can never drift apart. */
export async function getAllSiteUrlEntries(): Promise<SiteUrl[]> {
  const [s, c, p, g] = await Promise.all([
    getStaticUrls(),
    getCollectionUrls(),
    getProductUrls(),
    getGuideUrls(),
  ]);
  return [...s, ...c, ...p, ...g];
}

/** Plain URL strings (IndexNow payloads, internal checks). */
export async function getAllSiteUrls(): Promise<string[]> {
  return (await getAllSiteUrlEntries()).map((e) => e.url);
}
