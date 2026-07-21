import Image from "next/image";
import Link from "next/link";
import type { Product } from "lib/shopify/types";

function fmt(amount: string, code: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
  }).format(parseFloat(amount));
}

export function ProductCard({
  product,
  badge,
  sizes = "(min-width:1040px) 25vw, (min-width:680px) 44vw, 80vw",
  priority = false,
}: {
  product: Product;
  badge?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const price = product.priceRange.minVariantPrice;
  const img = product.featuredImage?.url;

  return (
    <Link
      href={`/product/${product.handle}`}
      prefetch
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#15171c] transition duration-300 hover:-translate-y-1.5 hover:border-white/25"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        {img ? (
          <Image
            src={img}
            alt={product.featuredImage?.altText || product.title}
            fill
            sizes={sizes}
            priority={priority}
            className="object-contain p-[9%] transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-neutral-400">
            No image
          </div>
        )}
        {badge ? (
          <span className="absolute left-3 top-3 rounded-md bg-[#c5f23c] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
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
          <span className="shrink-0 font-semibold text-[#c5f23c]">
            {fmt(price.amount, price.currencyCode)}
          </span>
        </div>
      </div>
    </Link>
  );
}
