import Image from "next/image";
import Link from "next/link";
import type { Product } from "lib/shopify/types";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE_USD,
  VOLT,
} from "lib/brand";

/*
 * PRODUCT-LED HERO (2026-11-24)
 *
 * Why: PostHog, 30 days to 24 Nov. Only 14% of home-page landers ever reached
 * a product page, 43% bounced, and the old hero ("Where are you in your
 * build?") showed categories, not products or prices. Baymard's homepage
 * research says users judge a store's range from the products they see on the
 * homepage, and featured tiles should be real items with images.
 *
 * So the first screen now shows four real products, ranked by how often
 * visitors added them to cart (PostHog add_to_cart, last 60 days), each with
 * its price and one tap to the product page. The ranking labels are true
 * statements about our own store data; marketplace reviews are deliberately
 * NOT used here (see lib/marketplace-reviews.ts: they are not store reviews).
 */

function price(p: Product) {
  const a = parseFloat(p.priceRange.minVariantPrice.amount);
  return `$${a.toFixed(2)}`;
}

function isExternal(src: string) {
  return src.startsWith("https://");
}

const RANK_LABELS = [
  "Most added to cart",
  "Top park pick",
  "Customer favourite",
  "Street starter",
];

function Tile({
  product,
  rank,
  big = false,
}: {
  product: Product;
  rank: number;
  big?: boolean;
}) {
  const img = product.featuredImage?.url;
  return (
    <Link
      href={`/product/${product.handle}`}
      prefetch
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#15171c] transition duration-300 hover:-translate-y-1 hover:border-[#c5f23c]/50 ${
        big ? "md:row-span-2" : ""
      } ${rank === 2 ? "hidden md:flex" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-white ${
          big ? "aspect-[4/3] md:aspect-auto md:flex-1" : "aspect-[4/3]"
        }`}
      >
        {img ? (
          <Image
            src={img}
            alt={product.featuredImage?.altText || product.title}
            fill
            priority={rank < 2}
            unoptimized={isExternal(img)}
            sizes={big ? "(min-width:768px) 30vw, 100vw" : "(min-width:768px) 15vw, 50vw"}
            className="object-contain p-[7%] transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : null}
        <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-[#0b0c0e]/85 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#c5f23c] backdrop-blur">
          #{rank + 1}
          <span className="hidden md:inline"> · {RANK_LABELS[rank] ?? "Popular"}</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2 p-3 md:flex-none md:flex-row md:items-end md:gap-3 md:p-4">
        <h3
          className={`line-clamp-2 font-medium leading-snug text-[#f3f1ea] ${
            big ? "text-[15px] md:text-base" : "text-[13px]"
          }`}
        >
          {product.title}
        </h3>
        <span className="w-fit shrink-0 rounded-full bg-[#c5f23c] px-2.5 py-1 text-[12px] font-bold text-black">
          {price(product)}
        </span>
      </div>
    </Link>
  );
}

export function ProductHero({
  picks,
  completesFrom,
  totalProducts,
}: {
  picks: Product[];
  completesFrom: string;
  totalProducts: number;
}) {
  const [first, ...rest] = picks;
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 420px at 85% -10%, rgba(197,242,60,.12), transparent 70%), radial-gradient(600px 360px at -10% 110%, rgba(197,242,60,.06), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12 md:px-12 md:py-14">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-7" style={{ background: VOLT }} />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.18em] md:text-xs"
              style={{ color: VOLT }}
            >
              Fingerboard shop · ships to 42 countries
            </span>
          </div>
          <h1 className="max-w-[16ch] text-[36px] font-semibold leading-[1.03] md:text-[56px]">
            Skate-ready fingerboards,{" "}
            <span style={{ color: VOLT }}>from {completesFrom}.</span>
          </h1>
          <p className="mt-4 max-w-md text-base text-neutral-300 md:text-lg">
            Maple completes, wooden ramps and pro parts. These are what
            riders add to their carts most, start here.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#best-sellers"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
              style={{ background: VOLT }}
            >
              Shop best sellers <span aria-hidden>→</span>
            </a>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-[#f3f1ea] transition hover:border-[#c5f23c]/60"
            >
              All {totalProducts} products
            </Link>
          </div>
          <ul className="mt-7 grid max-w-md grid-cols-2 gap-x-5 gap-y-2.5 text-[13px] text-neutral-300">
            <li>
              <span className="font-semibold text-[#c5f23c]">Free shipping</span>{" "}
              over ${FREE_SHIPPING_THRESHOLD}
            </li>
            <li>
              <span className="font-semibold text-[#c5f23c]">
                ${SHIPPING_FEE_USD.toFixed(2)}
              </span>{" "}
              under ${FREE_SHIPPING_THRESHOLD}
            </li>
            <li>
              <span className="font-semibold text-[#c5f23c]">30-day</span>{" "}
              returns
            </li>
            <li>
              <span className="font-semibold text-[#c5f23c]">Tracked</span>{" "}
              7–14 day delivery
            </li>
          </ul>
        </div>

        {first ? (
          <div className="grid grid-cols-2 gap-3 md:grid-rows-2 md:gap-4">
            <Tile product={first} rank={0} big />
            {rest.slice(0, 2).map((p, i) => (
              <Tile key={p.id} product={p} rank={i + 1} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
