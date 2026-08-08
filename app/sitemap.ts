import { getAllSiteUrlEntries } from "lib/site-urls";
import { MetadataRoute } from "next";

/**
 * Single sitemap for all indexable URLs.
 *
 * We previously split into four sub-sitemaps via generateSitemaps() so
 * Search Console could report indexation per section. On this Next 15
 * canary the id-resolution path was broken — every sub-sitemap fell
 * through to the default loader and served the same static-pages list.
 *
 * The site currently has under 300 indexable URLs (10 static pages, 10
 * collections, 154 products, ~20 guides), well under Google's 50,000-
 * per-sitemap cap. A single sitemap is fine. If the catalogue grows
 * past a few thousand URLs, revisit generateSitemaps() when the canary
 * bug is either fixed upstream or worked around here.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getAllSiteUrlEntries();

  return entries.map((e) => ({
    url: e.url,
    lastModified: new Date(e.lastModified),
    changeFrequency: e.changeFrequency,
    priority: e.priority,
    // Image entries help product photography surface in Google Images,
    // a real discovery channel for a visual product like this.
    ...(e.images?.length ? { images: e.images.map((i) => i.url) } : {}),
  }));
}
