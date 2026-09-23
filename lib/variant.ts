import type { ProductOption, ProductVariant } from "lib/shopify/types";

/**
 * The variant a shopper gets when they land on a product page without having
 * picked options (e.g. from a Google Shopping or search click). First
 * in-stock variant, else the first variant. Pre-selecting it means Add to Cart
 * is never a disabled "Select an option" dead end on arrival.
 */
export function defaultVariant(
  variants: ProductVariant[],
): ProductVariant | undefined {
  return variants.find((v) => v.availableForSale) ?? variants[0];
}

/**
 * Resolve the selected variant from URL params, falling back per-option to the
 * default variant's value for any option the shopper hasn't touched yet.
 */
export function resolveVariant(
  variants: ProductVariant[],
  get: (key: string) => string | null,
): ProductVariant | undefined {
  const fallback = defaultVariant(variants);
  if (!fallback) return undefined;
  const wanted = (name: string) =>
    get(name.toLowerCase()) ??
    fallback.selectedOptions.find((o) => o.name === name)?.value ??
    null;
  return (
    variants.find((v) =>
      v.selectedOptions.every((o) => o.value === wanted(o.name)),
    ) ?? fallback
  );
}

export function optionValueIsActive(
  option: ProductOption,
  value: string,
  variants: ProductVariant[],
  get: (key: string) => string | null,
): boolean {
  const chosen = get(option.name.toLowerCase());
  if (chosen) return chosen === value;
  return (
    defaultVariant(variants)?.selectedOptions.find(
      (o) => o.name === option.name,
    )?.value === value
  );
}
