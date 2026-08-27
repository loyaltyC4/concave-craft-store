import { NextResponse } from "next/server";
import { getSupabase } from "lib/supabase";
import { getProduct } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { SITE_NAME } from "lib/brand";

/**
 * Self-hosted Google Product Reviews feed
 * (https://support.google.com/merchants/answer/7050923 — schema v2.3).
 *
 * Register this URL in Merchant Center: Growth -> Reviews -> Product
 * reviews -> Add reviews feed -> https://fingerboardlab.com/feeds/product-reviews.xml
 * (that registration step is UI-only; there's no Content API v2.1 endpoint
 * for it on this account type).
 *
 * Pulls only real, published reviews from Supabase (fbl_reviews) — never
 * fabricated, matching the rest of this codebase's reviews handling
 * (see lib/reviews.ts). Returns a syntactically valid empty feed when there
 * are no reviews yet or Supabase isn't configured, rather than erroring.
 *
 * Schema fields are reconstructed from Google's public documentation, not
 * copy-pasted from a validated sample — after registering, check Merchant
 * Center's feed diagnostics for any field-level warnings and adjust here if
 * so. Invalid individual reviews are dropped by Google, not fatal to the feed.
 */
export const dynamic = "force-dynamic";

type ReviewRow = {
  id: string;
  product_handle: string;
  rating: number;
  title: string | null;
  body: string;
  author_name: string;
  verified_purchase: boolean;
  created_at: string;
};

type ProductInfo = { title: string; sku: string | null; url: string };

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildFeedXml(
  entries: { row: ReviewRow; product: ProductInfo }[],
): string {
  const reviewsXml = entries
    .map(({ row, product }) => {
      const rating = Math.min(5, Math.max(1, Math.round(row.rating)));
      const timestamp = new Date(row.created_at).toISOString();
      const skuBlock = product.sku
        ? `<product_ids><skus><sku>${escapeXml(product.sku)}</sku></skus></product_ids>`
        : "";
      const titleBlock = row.title
        ? `<title>${escapeXml(row.title)}</title>`
        : "";

      return `
    <review>
      <review_id>${escapeXml(row.id)}</review_id>
      <reviewer>
        <name>${escapeXml(row.author_name)}</name>
        <is_anonymous>false</is_anonymous>
      </reviewer>
      <content>
        ${titleBlock}
        <review_body>${escapeXml(row.body)}</review_body>
        <review_language>en</review_language>
      </content>
      <ratings>
        <overall min="1" max="5">${rating}</overall>
      </ratings>
      <review_timestamp>${timestamp}</review_timestamp>
      <is_verified>${row.verified_purchase ? "true" : "false"}</is_verified>
      <products>
        <product>
          ${skuBlock}
          <product_name>${escapeXml(product.title)}</product_name>
          <product_url>${escapeXml(product.url)}</product_url>
        </product>
      </products>
    </review>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.google.com/shopping/reviews/schema/product/2.3/product_reviews.xsd">
  <version>2.3</version>
  <publisher>
    <name>${escapeXml(SITE_NAME)}</name>
    <favicon>${baseUrl}/icon.png</favicon>
  </publisher>
  <reviews>${reviewsXml}
  </reviews>
</feed>
`;
}

export async function GET() {
  const xmlHeaders = { "Content-Type": "application/xml; charset=utf-8" };
  const supabase = getSupabase();

  if (!supabase) {
    return new NextResponse(buildFeedXml([]), { headers: xmlHeaders });
  }

  const { data, error } = await supabase
    .from("fbl_reviews")
    .select(
      "id,product_handle,rating,title,body,author_name,verified_purchase,created_at",
    )
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error || !data) {
    return new NextResponse(buildFeedXml([]), { headers: xmlHeaders });
  }

  const rows = data as ReviewRow[];

  // Resolve product name/SKU/URL once per distinct handle rather than once
  // per review — cheap regardless since the catalog lookup is a static,
  // in-memory bundle (see lib/shopify/static-data.ts), but no reason to
  // repeat it per row.
  const handles = Array.from(new Set(rows.map((r) => r.product_handle)));
  const productByHandle = new Map<string, ProductInfo>();
  for (const handle of handles) {
    const product = await getProduct(handle);
    if (!product) continue;
    productByHandle.set(handle, {
      title: product.title,
      sku: product.variants[0]?.sku || null,
      url: `${baseUrl}/product/${product.handle}`,
    });
  }

  const entries = rows
    .map((row) => {
      const product = productByHandle.get(row.product_handle);
      // Skip reviews for a handle that no longer exists in the catalog
      // (e.g. a discontinued product) rather than emit a broken entry.
      return product ? { row, product } : null;
    })
    .filter((e): e is { row: ReviewRow; product: ProductInfo } => e !== null);

  return new NextResponse(buildFeedXml(entries), { headers: xmlHeaders });
}
