import { NextRequest, NextResponse } from "next/server";
import { getProduct, getProducts } from "lib/shopify";

export const dynamic = "force-dynamic";

// Real, small-ticket "build essentials" that pair with almost any order —
// hand-picked from the actual catalog, not guessed at runtime.
const ESSENTIAL_HANDLES = [
  "fingerboard-foam-grip-tape-110-38mm-uncut-deck-griptape-stickers",
  "metal-fingerboard-tool-professional-made-for-finger-skateboard-screws-and-nuts",
  "gold-silver-black-self-lock-anti-loose-fingerboard-locknuts-with-nylon-inside",
  "fingerboard-truck-pivot-cup",
];

// Carts under the free-shipping line were the main checkout leak (Oct 2026: 5 of 6 abandoned
// checkouts were $15.95-$47.95 and met the $12.95 fee at Stripe). With ?gap=<dollars to $50>, the
// cheapest in-stock products that close the gap come first, within $20 of it; essentials fill the rest.
const GAP_RANGE = 20;

export async function GET(req: NextRequest) {
  const excludeParam = req.nextUrl.searchParams.get("exclude") || "";
  const exclude = new Set(excludeParam.split(",").filter(Boolean));
  const gap = parseFloat(req.nextUrl.searchParams.get("gap") || "0");

  const price = (p: { priceRange: { minVariantPrice: { amount: string } } }) =>
    parseFloat(p.priceRange.minVariantPrice.amount);

  const closers =
    gap > 0
      ? (await getProducts({}))
          .filter(
            (p) =>
              p.availableForSale &&
              !exclude.has(p.handle) &&
              price(p) >= gap &&
              price(p) <= gap + GAP_RANGE,
          )
          .sort((a, b) => price(a) - price(b))
          .slice(0, 3)
      : [];

  const essentials = await Promise.all(
    ESSENTIAL_HANDLES.filter(
      (h) => !exclude.has(h) && !closers.some((c) => c.handle === h),
    ).map((h) => getProduct(h)),
  );

  const results = [...closers, ...essentials]
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3)
    .map((p) => ({
      handle: p.handle,
      title: p.title,
      image: p.featuredImage?.url || null,
      variantId: p.variants[0]?.id,
      variantTitle: p.variants[0]?.title,
      price: p.priceRange.minVariantPrice.amount,
      currencyCode: p.priceRange.minVariantPrice.currencyCode,
      selectedOptions: p.variants[0]?.selectedOptions || [],
    }));

  return NextResponse.json({ results });
}
