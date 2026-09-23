import {
  staticGetProductCollection,
  staticGetProducts,
} from "lib/shopify/static-data";
import { COLLECTIONS, SITE_NAME } from "lib/brand";
import { baseUrl } from "lib/utils";

/**
 * Google Merchant Center product feed, generated from the same catalog the
 * storefront renders — so feed price, availability, title and link can never
 * drift from the site (the previous one-off API upload had drifted: 54 of 146
 * products listed, 10 wrong prices, 6 dead links).
 *
 * Registered in Merchant Center as a scheduled daily fetch of
 * https://fingerboardlab.com/feeds/merchant.xml (feed label "US", USD prices,
 * target countries = LISTING_COUNTRIES in lib/shipping.ts; Google converts
 * currency for display in non-USD countries). Shipping is configured once at
 * account level in Merchant Center ($12.95 USD, free over $50 USD, 7–14
 * business days) rather than repeated on every item. One <item> per variant,
 * grouped by item_group_id.
 */
export const revalidate = 3600;

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const abs = (u: string) => (u.startsWith("http") ? u : `${baseUrl}${u}`);

const COLLECTION_TITLE: Record<string, string> = Object.fromEntries(
  COLLECTIONS.map((c) => [c.handle, c.title]),
);

export async function GET() {
  const products = staticGetProducts({});
  const items: string[] = [];

  for (const p of products) {
    const collection = staticGetProductCollection(p.handle);
    const productType = collection ? COLLECTION_TITLE[collection] : undefined;
    const description = (p.description || p.title).slice(0, 4900);
    const extraImages = p.images.slice(1, 11).map((i) => abs(i.url));
    const multi = p.variants.length > 1;

    for (const v of p.variants) {
      const price = parseFloat(v.price.amount);
      if (!price || price <= 0) continue;
      const numericId = v.id.split("/").pop();
      const params = new URLSearchParams();
      if (multi)
        v.selectedOptions.forEach((o) =>
          params.set(o.name.toLowerCase(), o.value),
        );
      const link = `${baseUrl}/product/${p.handle}${params.toString() ? `?${params.toString()}` : ""}`;
      const title = (
        multi && v.title && v.title !== "Default Title"
          ? `${p.title} — ${v.title}`
          : p.title
      ).slice(0, 150);
      const image = abs(v.image?.url || p.featuredImage.url);
      if (!image || image === baseUrl) continue;

      items.push(
        [
          "<item>",
          `<g:id>FL-${numericId}</g:id>`,
          multi ? `<g:item_group_id>FL-G-${p.handle.slice(0, 40)}</g:item_group_id>` : "",
          `<g:title>${esc(title)}</g:title>`,
          `<g:description>${esc(description)}</g:description>`,
          `<g:link>${esc(link)}</g:link>`,
          `<g:image_link>${esc(image)}</g:image_link>`,
          ...extraImages.map((u) => `<g:additional_image_link>${esc(u)}</g:additional_image_link>`),
          `<g:availability>${v.availableForSale ? "in_stock" : "out_of_stock"}</g:availability>`,
          `<g:price>${price.toFixed(2)} USD</g:price>`,
          `<g:condition>new</g:condition>`,
          `<g:identifier_exists>no</g:identifier_exists>`,
          `<g:mpn>${esc(v.sku || `FL-${numericId}`)}</g:mpn>`,
          productType ? `<g:product_type>${esc(productType)}</g:product_type>` : "",
          `<g:google_product_category>Toys &amp; Games &gt; Toys</g:google_product_category>`,
          ...v.selectedOptions
            .filter((o) => /colou?r/i.test(o.name))
            .map((o) => `<g:color>${esc(o.value.slice(0, 100))}</g:color>`),
          ...v.selectedOptions
            .filter((o) => /size|width/i.test(o.name))
            .map((o) => `<g:size>${esc(o.value.slice(0, 100))}</g:size>`),
          "</item>",
        ]
          .filter(Boolean)
          .join(""),
      );
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>${esc(SITE_NAME)}</title>
<link>${baseUrl}</link>
<description>${esc(SITE_NAME)} product feed</description>
${items.join("\n")}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
