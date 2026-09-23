import Image from "next/image";
import Link from "next/link";
import { CardImageCycler } from "components/product/card-image-cycler";
import type { Product } from "lib/shopify/types";

function fmt(amount: string, code: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
  }).format(parseFloat(amount)) + (code === "USD" ? " USD" : "");
}

// External images (supplier CDN like alicdn.com) cannot be optimised through
// Next.js image optimisation on Vercel's Hobby plan — that endpoint returns
// 402 Payment Required for remote URLs once the account's monthly image
// quota is used, which showed up here as most product cards going blank.
// components/product/gallery.tsx already carries this exact guard for the
// product-page gallery; ProductCard (used on every grid/category/homepage
// listing — i.e. most of the storefront) was missing it. Skipping
// optimisation for external URLs serves them directly from the supplier CDN
// instead, which always works. Local /products/ files are still optimised
// as normal.
function isExternal(src: string) {
  return src.startsWith("https://");
}

export function ProductCard({
  product,
  badge,
  cycleImages,
  sizes = "(min-width:1040px) 25vw, (min-width:680px) 44vw, 80vw",
  priority = false,
}: {
  product: Product;
  badge?: string;
  /** When provided, the tile slowly crossfades through these images instead
   *  of showing a single static photo. */
  cycleImages?: { src: string; altText: string }[];
  sizes?: string;
  priority?: boolean;
}) {
  const price = product.priceRange.minVariantPrice;
  const img = product.featuredImage?.url;
  const cycle = cycleImages && cycleImages.length > 1;

  // Sale: show a was/now on the tile ONLY for the variant whose price equals
  // the displayed (entry) price — otherwise a cheap single variant would borrow
  // a bulk pack's compare-at and show an absurd "was" anchor (e.g. $199 -> $19).
  const entryVariant = product.variants.find(
    (v) => v.price.amount === price.amount,
  );
  const sale =
    entryVariant &&
    entryVariant.compareAtPrice &&
    parseFloat(entryVariant.compareAtPrice.amount) >
      parseFloat(entryVariant.price.amount)
      ? { was: entryVariant.compareAtPrice, now: entryVariant.price }
      : null;
  const salePct = sale
    ? Math.round(
        ((parseFloat(sale.was.amount) - parseFloat(sale.now.amount)) /
          parseFloat(sale.was.amount)) *
          100,
      )
    : 0;

  return (
    <Link
      href={`/product/${product.handle}`}
      prefetch
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#15171c] transition duration-300 hover:-translate-y-1.5 hover:border-white/25"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        {cycle ? (
          <CardImageCycler
            images={cycleImages!}
            sizes={sizes}
            priority={priority}
          />
        ) : img ? (
          <Image
            src={img}
            alt={product.featuredImage?.altText || product.title}
            fill
            sizes={sizes}
            priority={priority}
            unoptimized={isExternal(img)}
            className="object-contain p-[9%] transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-neutral-400">
            No image
          </div>
        )}
        {sale ? (
          <span className="absolute left-3 top-3 z-10 rounded-md bg-[#c5f23c] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
            Save {salePct}%
          </span>
        ) : badge ? (
          <span className="absolute left-3 top-3 z-10 rounded-md bg-[#c5f23c] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[15px] font-medium leading-snug text-[#f3f1ea]">
          {product.title}
        </h3>
        <div className="mt-auto flex items-baseline justify-between gap-3 pt-3">
          <span className="text-[13px] text-neutral-500">In stock</span>
          <span className="flex shrink-0 items-baseline gap-2">
            {sale ? (
              <span className="text-[12px] text-neutral-500 line-through">
                {fmt(sale.was.amount, sale.was.currencyCode)}
              </span>
            ) : null}
            <span className="font-semibold text-[#c5f23c]">
              {fmt(price.amount, price.currencyCode)}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
