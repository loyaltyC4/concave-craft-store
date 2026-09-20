import { ProductCard } from "components/product-card";
import { Product } from "lib/shopify/types";

/**
 * Handle of the product featured at the top of the Ramps & Obstacles grid,
 * shown with a "New" badge and a tile that slowly cycles its variant photos.
 */
const CYCLE_FEATURED_HANDLE = "wooden-fingerboard-ramp-obstacle-set-7-pieces";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  // Move the featured product to the top of the grid, if present.
  const featured = products.find((p) => p.handle === CYCLE_FEATURED_HANDLE);
  const rest = products.filter((p) => p.handle !== CYCLE_FEATURED_HANDLE);
  const ordered = featured ? [featured, ...rest] : products;

  return (
    <>
      {ordered.map((product) => {
        const isFeatured = product.handle === CYCLE_FEATURED_HANDLE;
        // Cycle through the featured product's per-variant photos.
        const cycleImages = isFeatured
          ? product.variants
              .map((v) => v.image)
              .filter(
                (i): i is NonNullable<typeof i> =>
                  Boolean(i && i.url),
              )
              .map((i) => ({ src: i.url, altText: i.altText }))
          : undefined;

        return (
          <li key={product.handle}>
            <ProductCard
              product={product}
              badge={isFeatured ? "New" : undefined}
              cycleImages={cycleImages}
              priority={isFeatured}
              sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
            />
          </li>
        );
      })}
    </>
  );
}
