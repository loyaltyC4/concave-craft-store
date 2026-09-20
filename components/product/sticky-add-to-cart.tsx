"use client";

import clsx from "clsx";
import Price from "components/price";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Sticky add-to-cart bar for small screens. On long product pages the main
 * CTA scrolls out of view; this keeps the selected variant's exact price and
 * a working add button pinned to the bottom of the viewport on mobile only.
 *
 * It reuses the same variant resolution as ProductDescription / AddToCart so
 * the price shown always matches what the buyer pays. Tapping "Add" scrolls
 * back to the primary AddToCart button and triggers it, so cart logic, toast
 * and analytics live in exactly one place.
 */
export function StickyAddToCart({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);

  const selected: ProductVariant | undefined =
    product.variants.find((variant) =>
      variant.selectedOptions.every(
        (option) =>
          option.value === searchParams.get(option.name.toLowerCase()),
      ),
    ) ?? (product.variants.length === 1 ? product.variants[0] : undefined);

  // Show the bar only after the buyer scrolls past the main CTA. Driven by the
  // primary button's position, not a hard-coded pixel offset, so it tracks any
  // layout change.
  useEffect(() => {
    const anchor = document.getElementById("product-add-to-cart");
    if (!anchor) return;
    const onScroll = () => {
      const rect = anchor.getBoundingClientRect();
      setVisible(rect.bottom < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!selected) return null;

  const handleAdd = () => {
    const anchor = document.getElementById("product-add-to-cart");
    anchor?.scrollIntoView({ behavior: "smooth", block: "center" });
    // Defer the click until after the scroll lands so the real button is hit.
    window.setTimeout(() => {
      (
        anchor?.querySelector("button:not([disabled])") as HTMLButtonElement | null
      )?.click();
    }, 350);
  };

  return (
    <div
      className={clsx(
        "fixed inset-x-0 bottom-0 z-[65] border-t border-white/10 bg-[#0b0c0e]/95 backdrop-blur-md transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      role="region"
      aria-label="Quick add to cart"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-xs text-neutral-400">{product.title}</p>
          <p className="text-sm font-semibold text-[#f3f1ea]">
            <Price
              amount={selected.price.amount}
              currencyCode={selected.price.currencyCode}
            />
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!selected.availableForSale}
          className={clsx(
            "flex-none rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition active:scale-[0.98]",
            selected.availableForSale
              ? "bg-[#c5f23c] text-black"
              : "cursor-not-allowed bg-white/10 text-neutral-400",
          )}
        >
          {selected.availableForSale ? "Add to cart" : "Out of stock"}
        </button>
      </div>
    </div>
  );
}
