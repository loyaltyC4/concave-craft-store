import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/20/solid";
import { CheckIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import type { Product } from "lib/shopify/types";
import { getMarketplaceReviews } from "lib/marketplace-reviews";
import {
  DELIVERY_MAX_DAYS,
  DELIVERY_MIN_DAYS,
  FREE_SHIPPING_THRESHOLD,
  RETURN_WINDOW_DAYS,
} from "lib/brand";

/**
 * Home hero, variant "showcase" of the exp_home_hero A/B test.
 *
 * Adapted from the 21st.dev "Featured Product Showcase" (ziegfiroyt/ecommerce5):
 * split layout, product photo, price with real saving, rating, short feature
 * list and one primary CTA. Rebuilt without shadcn/lucide so it needs no new
 * dependencies, and wired to live catalogue data so price and sale state can
 * never drift from the product page.
 *
 * The hypothesis: a first-time visitor converts better when the first screen
 * shows one proven item with a price than when it asks them to pick a lane.
 */
export function FeaturedShowcase({
  product,
  features,
  eyebrow,
}: {
  product: Product;
  features: string[];
  eyebrow: string;
}) {
  const variant = product.variants[0];
  const price = parseFloat(
    variant?.price.amount ?? product.priceRange.minVariantPrice.amount,
  );
  const compareAt = variant?.compareAtPrice
    ? parseFloat(variant.compareAtPrice.amount)
    : 0;
  const saving =
    compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : 0;
  const reviewSet = getMarketplaceReviews(product.handle);
  // Some sources (Taobao) carry no star score; show the rating only when real.
  const reviews =
    reviewSet && reviewSet.average != null
      ? { average: reviewSet.average, total: reviewSet.total }
      : null;
  const image = product.featuredImage ?? product.images[0];
  const href = `/product/${product.handle}`;
  const money = (n: number) => `$${n.toFixed(2)}`;

  return (
    <section className="exp-hero-showcase relative overflow-hidden border-b border-white/10">
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* Copy column */}
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center rounded-full border border-[#c5f23c]/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c5f23c]">
            {eyebrow}
          </span>

          <h2 className="mt-4 max-w-[16ch] text-[34px] font-semibold leading-[1.04] md:text-[52px]">
            {product.title}
          </h2>

          {reviews ? (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="flex" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon
                    key={i}
                    className={
                      i < Math.round(reviews.average)
                        ? "h-4 w-4 text-amber-400"
                        : "h-4 w-4 text-neutral-600"
                    }
                  />
                ))}
              </span>
              <span className="font-semibold text-[#f3f1ea]">
                {reviews.average.toFixed(1)}
              </span>
              <span className="text-neutral-400">
                from {reviews.total} buyers of this item
              </span>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-semibold text-[#f3f1ea]">
              {money(price)}
              <span className="ml-1 text-sm font-medium text-neutral-500">
                USD
              </span>
            </span>
            {saving > 0 ? (
              <>
                <span className="text-lg text-neutral-500 line-through">
                  {money(compareAt)}
                </span>
                <span className="rounded-full bg-[#c5f23c] px-2.5 py-0.5 text-xs font-bold text-black">
                  Save {saving}%
                </span>
              </>
            ) : null}
          </div>

          <ul className="mt-6 space-y-2.5">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 text-[15px] text-neutral-300"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-[#c5f23c]" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={href}
              prefetch={true}
              data-exp-cta="showcase-primary"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#c5f23c] px-7 text-[15px] font-semibold text-black transition hover:brightness-95"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              Shop the {product.title.replace(/^Fingerboard /, "")}
            </Link>
            <Link
              href="/search/ramps-obstacles"
              data-exp-cta="showcase-secondary"
              className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 text-[15px] font-semibold text-[#f3f1ea] transition hover:border-[#c5f23c]/60"
            >
              Browse all obstacles
            </Link>
          </div>

          <p className="mt-6 text-[13px] text-neutral-500">
            Free shipping over ${FREE_SHIPPING_THRESHOLD} · arrives in{" "}
            {DELIVERY_MIN_DAYS}-{DELIVERY_MAX_DAYS} business days ·{" "}
            {RETURN_WINDOW_DAYS}-day returns
          </p>
        </div>

        {/* Image column */}
        <Link
          href={href}
          data-exp-cta="showcase-image"
          className="group relative order-1 block aspect-square overflow-hidden rounded-3xl bg-white lg:order-2"
        >
          {image ? (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              priority
              sizes="(min-width:1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
          {saving > 0 ? (
            <span className="absolute right-4 top-4 rounded-full bg-[#111316] px-3 py-1 text-sm font-semibold text-white">
              -{saving}%
            </span>
          ) : null}
        </Link>
      </div>
    </section>
  );
}
