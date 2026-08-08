import { baseUrl } from "lib/utils";

/**
 * Root sitemap INDEX.
 *
 * Next.js 15 emits per-id sub-sitemaps at `/sitemap/<id>.xml` when
 * `generateSitemaps()` is used in `app/sitemap.ts`, but the root
 * `/sitemap.xml` index page is not auto-served on this version — hence
 * this small hand-rolled route. Search Console and Bing Webmaster Tools
 * both want a single index URL to subscribe to, so we point them here.
 *
 * The four sub-sitemaps (`pages`, `collections`, `products`, `guides`)
 * are defined in `app/sitemap.ts::generateSitemaps`. Keep this list in
 * sync when a new section is added.
 */
const SUB_SITEMAPS = ["pages", "collections", "products", "guides"] as const;

export function GET(): Response {
  const now = new Date().toISOString();
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    SUB_SITEMAPS.map(
      (id) =>
        `  <sitemap>\n` +
        `    <loc>${baseUrl}/sitemap/${id}.xml</loc>\n` +
        `    <lastmod>${now}</lastmod>\n` +
        `  </sitemap>`,
    ).join("\n") +
    `\n</sitemapindex>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Refresh the index once per hour — cheap, and keeps the "new
      // product added" case from lagging the sitemap for days.
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
