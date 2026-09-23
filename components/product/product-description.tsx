"use client";

import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { VariantSelector } from "./variant-selector";
import { resolveVariant } from "lib/variant";
import {
  DELIVERY_MAX_DAYS,
  DELIVERY_MIN_DAYS,
  FREE_SHIPPING_THRESHOLD,
  RETURN_WINDOW_DAYS,
  SHIPPING_FEE_USD,
} from "lib/brand";

export function ProductDescription({ product }: { product: Product }) {
  const searchParams = useSearchParams();

  // Resolve the variant the shopper has actually chosen, mirroring the logic in
  // AddToCart so the price on screen always matches the price they will pay.
  // Falls back to the default (first in-stock) variant, so a shopper arriving
  // from Google sees the exact price of what Add to Cart will add.
  const selected: ProductVariant | undefined = resolveVariant(
    product.variants,
    (k) => searchParams.get(k),
  );

  const min = product.priceRange.minVariantPrice;
  const max = product.priceRange.maxVariantPrice;
  const spansRange = min.amount !== max.amount;

  // Before a choice is made on a multi-price product, lead with the entry price
  // labelled "from", rather than a bare figure that appears to jump later.
  const shown = selected ? selected.price : min;
  const compareAt = selected?.compareAtPrice;
  const saving =
    compareAt && parseFloat(compareAt.amount) > parseFloat(shown.amount)
      ? Math.round(
          ((parseFloat(compareAt.amount) - parseFloat(shown.amount)) /
            parseFloat(compareAt.amount)) *
            100,
        )
      : 0;

  const summary = product.description
    ? product.description.split(". ").slice(0, 2).join(". ")
    : "";

  return (
    <div className="flex flex-col">
      {/*
       * The H1 is rendered by the server page (app/product/[handle]/page.tsx)
       * *outside* the Suspense boundary that wraps this client component.
       * Reason: this component reads useSearchParams() to compute the
       * currently-selected variant's price, which turns the whole subtree
       * dynamic and pushes it into the flight payload. Left here, the H1
       * would be missing from the initial HTML — a fatal on-page SEO gap
       * on 154 product pages. Keep this component free of the H1.
       */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="flex items-baseline gap-1.5 rounded-full bg-[#c5f23c] px-4 py-1.5 text-lg font-semibold text-black">
          {!selected && spansRange ? (
            <span className="text-sm font-medium">from</span>
          ) : null}
          <Price amount={shown.amount} currencyCode={shown.currencyCode} />
        </span>

        {saving > 0 && compareAt ? (
          <>
            <span className="text-sm text-neutral-500 line-through">
              <Price
                amount={compareAt.amount}
                currencyCode={compareAt.currencyCode}
              />
            </span>
            <span className="rounded-full border border-[#c5f23c]/40 bg-[#c5f23c]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#c5f23c]">
              Save {saving}%
            </span>
          </>
        ) : null}

        {/*
         * Per-variant stock: once a full variant is chosen, reflect THAT
         * variant's availability and count rather than the product-level flag,
         * so a buyer is never told "In stock" for a size that's actually out.
         * Counts only render when the catalog carries a real number — no
         * fabricated scarcity.
         */}
        {(() => {
          const stockVariant = selected ?? (product.variants.length === 1 ? product.variants[0] : undefined);
          const available = stockVariant
            ? stockVariant.availableForSale
            : product.availableForSale;
          if (!available) {
            return (
              <span className="text-sm text-red-400">Currently out of stock</span>
            );
          }
          return <span className="text-sm text-neutral-400">In stock</span>;
        })()}
      </div>

      {summary ? (
        <p className="mt-5 text-sm leading-relaxed text-neutral-300">
          {summary}
          {summary.endsWith(".") ? "" : "."}
        </p>
      ) : null}

      <div className="mt-6">
        <VariantSelector
          options={product.options}
          variants={product.variants}
        />
      </div>

      <div className="mt-2">
        <AddToCart product={product} />
      </div>

      {/* Shipping cost and delivery time at the point of decision — no
          surprises at Stripe checkout. Values come from lib/brand.ts, the
          same source the checkout route and merchant feed use. */}
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-neutral-300">
        <p>
          <strong className="text-[#f3f1ea]">
            {parseFloat(shown.amount) >= FREE_SHIPPING_THRESHOLD
              ? "Free shipping"
              : `$${SHIPPING_FEE_USD.toFixed(2)} USD shipping`}
          </strong>
          {parseFloat(shown.amount) >= FREE_SHIPPING_THRESHOLD
            ? " on this item"
            : ` · free on orders over $${FREE_SHIPPING_THRESHOLD} USD`}
        </p>
        <p className="mt-1 text-neutral-400">
          Arrives in {DELIVERY_MIN_DAYS}–{DELIVERY_MAX_DAYS} business days ·
          ships from our supplier workshop · tracking emailed on dispatch
        </p>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-neutral-400 sm:grid-cols-2">
        {[
          "All prices in USD",
          "Secure checkout with Stripe",
          `${RETURN_WINDOW_DAYS}-day returns`,
          "Support from Melbourne, AU",
        ].map((t) => (
          <li key={t} className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 flex-none text-[#c5f23c]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5 13 4 4L19 7"
              />
            </svg>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
