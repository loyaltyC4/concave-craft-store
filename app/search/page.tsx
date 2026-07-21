import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";

export const metadata = {
  title: "Search all fingerboard gear",
  description:
    "Search Fingerboard Lab — completes, decks, molds, trucks, wheels, bushings, tools, and ramps.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } =
    (searchParams as {
      [key: string]: string;
    }) || {};
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl">
          {searchValue ? "Search" : "All products"}
        </h1>
        {searchValue ? (
          <p className="mt-2 text-neutral-400">
            {products.length === 0
              ? "No products match "
              : `Showing ${products.length} ${resultsText} for `}
            <span className="font-semibold text-[#f3f1ea]">
              &quot;{searchValue}&quot;
            </span>
          </p>
        ) : (
          <p className="mt-2 text-neutral-400">
            Every deck, truck, wheel, mold, and ramp in the Lab.
          </p>
        )}
      </div>
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
