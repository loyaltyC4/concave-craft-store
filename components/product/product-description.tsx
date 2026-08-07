"use client";

import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  const searchParams = useSearchParams();

  // Resolve the variant the shopper has actually chosen, mirroring the logic in
  // AddToCart so the price on screen always matches the price they will pay.
  const selected: ProductVariant | undefined =
    product.variants.find((variant) =>
      variant.selectedOptions.every(
        (option) =>
          option.value === searchParams.get(option.name.toLowerCase()),
      ),
    ) ?? (product.variants.length === 1 ? product.variants[0] : undefined);

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
      <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
        {product.title}
      </h1>

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

        {product.availableForSale ? (
          <span className="text-sm text-neutral-400">
            In stock · ships 1–2 days
          </span>
        ) : (
          <span className="text-sm text-red-400">Currently out of stock</span>
        )}
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

      <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-neutral-400 sm:grid-cols-2">
        {[
          "Hand-picked and quality-checked",
          "Free sticker sheet in every box",
          "Encrypted checkout with Stripe",
          "30-day easy returns",
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
