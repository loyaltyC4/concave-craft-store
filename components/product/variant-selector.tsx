"use client";

import clsx from "clsx";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  const updateOption = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return options.map((option) => (
    <div
      key={option.id}
      role="radiogroup"
      aria-label={option.name}
      className="mb-6"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
        {option.name}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {option.values.map((value) => {
          const optionNameLowerCase = option.name.toLowerCase();

          // Build the hypothetical params if this pill were selected,
          // then check whether any variant matching those params is in stock.
          const optionParams: Record<string, string> = {};
          searchParams.forEach((v, k) => (optionParams[k] = v));
          optionParams[optionNameLowerCase] = value;

          const filtered = Object.entries(optionParams).filter(([key, val]) =>
            options.find(
              (opt) =>
                opt.name.toLowerCase() === key && opt.values.includes(val),
            ),
          );

          const isAvailableForSale = combinations.find((combination) =>
            filtered.every(
              ([key, val]) =>
                combination[key] === val && combination.availableForSale,
            ),
          );

          const isActive = searchParams.get(optionNameLowerCase) === value;

          return (
            <button
              // type="button" prevents any ancestor <form> from treating
              // this as a submit trigger. This is the root fix for the
              // formaction="javascript:throw..." bug.
              type="button"
              key={value}
              aria-pressed={isActive}
              aria-disabled={!isAvailableForSale}
              disabled={!isAvailableForSale}
              title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
              onClick={() => {
                if (!isAvailableForSale) return;
                updateOption(optionNameLowerCase, value);
              }}
              className={clsx(
                "flex min-w-[48px] items-center justify-center rounded-full border px-3 py-1.5 text-sm transition",
                {
                  "border-[#c5f23c] bg-[#c5f23c] font-semibold text-black":
                    isActive,
                  "border-white/15 bg-white/[0.03] text-neutral-200 hover:border-[#c5f23c]/60 hover:text-[#c5f23c]":
                    !isActive && isAvailableForSale,
                  "relative z-10 cursor-not-allowed overflow-hidden border-white/10 bg-white/[0.02] text-neutral-600 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-700":
                    !isAvailableForSale,
                },
              )}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  ));
}
