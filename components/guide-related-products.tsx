import Image from "next/image";
import Link from "next/link";
import type { Product } from "lib/shopify/types";

function fmt(amount: string, code: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
  }).format(parseFloat(amount)) + (code === "USD" ? " USD" : "");
}

/**
 * Compact single-product bar for the very top of a guide, directly under the
 * definitive-answer summary.
 *
 * Why this exists (added 2026-09-15): guides carry ~60% of the site's search
 * impressions and rank on page one, but convert clicks at under 1%. The only
 * commercial prompts on the page were a card grid after the first section and
 * another at the very end — and 82% of sessions never scroll to a page
 * bottom. Roughly a fifth of all traffic now arrives from AI assistants,
 * which means a reader who lands on the answer box, gets their answer, and
 * leaves without ever seeing a product.
 *
 * This is deliberately one product and one line rather than a second card
 * grid: it sits inches below the answer, where a grid would read as an ad
 * break and push the article itself below the fold.
 */
export function GuideInlineBuy({
  product,
  label = "The one most people buy",
}: {
  product: Product;
  label?: string;
}) {
  const price = product.priceRange.minVariantPrice;
  const img = product.featuredImage?.url;

  return (
    <Link
      href={`/product/${product.handle}`}
      prefetch
      className="group mt-5 flex items-center gap-4 rounded-2xl border border-[#c5f23c]/25 bg-[#15171c] p-3.5 transition duration-300 hover:border-[#c5f23c]/60 sm:gap-5 sm:p-4"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white sm:h-20 sm:w-20">
        {img ? (
          <Image
            src={img}
            alt={product.featuredImage?.altText || product.title}
            fill
            sizes="80px"
            className="object-contain p-[8%] transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c5f23c]">
          {label}
        </span>
        <p className="mt-1 line-clamp-2 text-[14px] font-medium leading-snug text-[#f3f1ea]">
          {product.title}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <span className="block text-[15px] font-semibold text-[#f3f1ea]">
          {fmt(price.amount, price.currencyCode)}
        </span>
        <span className="mt-0.5 block text-[12px] font-semibold text-[#c5f23c]">
          View →
        </span>
      </div>
    </Link>
  );
}

/**
 * Horizontal strip of 2-4 product cards surfaced inside guide articles.
 * Matches the site's dark-panel / lime-accent design language.
 */
export function GuideRelatedProducts({
  products,
  heading = "Related Products",
}: {
  products: Product[];
  heading?: string;
}) {
  if (!products.length) return null;

  return (
    <aside className="my-12 rounded-3xl border border-white/10 bg-[#15171c] p-6 md:p-8">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-6 bg-[#c5f23c]" />
        <h2 className="text-base font-semibold uppercase tracking-[0.16em] text-[#c5f23c]">
          {heading}
        </h2>
      </div>
      <div
        className={`grid gap-4 ${
          products.length === 2
            ? "grid-cols-2"
            : products.length === 3
              ? "grid-cols-2 sm:grid-cols-3"
              : "grid-cols-2 sm:grid-cols-4"
        }`}
      >
        {products.map((product) => {
          const price = product.priceRange.minVariantPrice;
          const img = product.featuredImage?.url;
          return (
            <Link
              key={product.handle}
              href={`/product/${product.handle}`}
              prefetch
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e12] transition duration-300 hover:-translate-y-1 hover:border-[#c5f23c]/40"
            >
              <div className="relative aspect-square overflow-hidden bg-white">
                {img ? (
                  <Image
                    src={img}
                    alt={product.featuredImage?.altText || product.title}
                    fill
                    sizes="(min-width:640px) 25vw, 44vw"
                    className="object-contain p-[8%] transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-neutral-400">
                    No image
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-3">
                <p className="line-clamp-2 text-[13px] font-medium leading-snug text-[#f3f1ea]">
                  {product.title}
                </p>
                <span className="mt-auto pt-2 text-sm font-semibold text-[#c5f23c]">
                  {fmt(price.amount, price.currencyCode)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-5 text-right">
        <Link
          href="/search"
          className="text-sm font-semibold text-neutral-400 transition hover:text-[#c5f23c]"
        >
          Browse all products →
        </Link>
      </div>
    </aside>
  );
}
