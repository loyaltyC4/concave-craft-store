import {
  getCollectionUrls,
  getGuideUrls,
  getProductUrls,
  getStaticUrls,
  type SiteUrl,
} from "lib/site-urls";
import { MetadataRoute } from "next";

/**
 * Split into one sitemap per content type.
 *
 * Next emits /sitemap.xml as a sitemap index pointing at /sitemap/<id>.xml.
 * Splitting is not about the 50k URL cap — it is so Search Console reports
 * indexation per section, which makes "products are indexing but guides are
 * not" visible instead of averaged away in one aggregate number.
 */
export async function generateSitemaps() {
  return [
    { id: "pages" },
    { id: "collections" },
    { id: "products" },
    { id: "guides" },
  ];
}

const LOADERS: Record<string, () => Promise<SiteUrl[]>> = {
  pages: getStaticUrls,
  collections: getCollectionUrls,
  products: getProductUrls,
  guides: getGuideUrls,
};

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const load = LOADERS[id] ?? getStaticUrls;
  const entries = await load();

  return entries.map((e) => ({
    url: e.url,
    lastModified: new Date(e.lastModified),
    changeFrequency: e.changeFrequency,
    priority: e.priority,
    // Image entries help product photography surface in Google Images, which
    // is a real discovery channel for a visual product like this.
    ...(e.images?.length ? { images: e.images.map((i) => i.url) } : {}),
  }));
}
