import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { FilterBar } from "components/layout/search/filter-bar";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";
import { baseUrl, pageTitle } from "lib/utils";
import { SITE_NAME } from "lib/brand";
import { Suspense } from "react";
import {
  applyFilters,
  availableFacets,
  parseFiltersFromSearchParams,
} from "lib/filters";

export async function generateMetadata() {
  return {
    title: pageTitle("Shop All Fingerboards, Decks & Parts"),
    description:
      "Browse every fingerboard, deck, truck, wheel, mold, ramp and part in the Lab — 150+ hand-picked products with free build guides and 30-day returns.",
    // Every sort/filter/query combination collapses to one canonical URL —
    // otherwise each parameter combo is a thin near-duplicate page competing
    // with itself in the index.
    alternates: { canonical: "/search" },
  };
}

/** The only searchParams-dependent part, isolated so the rest prerenders. */
async function Results({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = (await searchParams) ?? {};
  const { sort, q: searchValue } = sp as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const unfiltered = await getProducts({ sortKey, reverse, query: searchValue });
  const facets = availableFacets(unfiltered);
  const products = applyFilters(unfiltered, parseFiltersFromSearchParams(sp));
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      {searchValue ? (
        <p className="mb-6 text-neutral-400">
          {products.length === 0
            ? "No products match "
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-semibold text-[#f3f1ea]">
            &quot;{searchValue}&quot;
          </span>
        </p>
      ) : null}
      <FilterBar facets={facets} />
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : (
        <p className="py-3 text-lg text-neutral-400">
          No products match these filters. Try clearing one.
        </p>
      )}
    </>
  );
}

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const all = await getProducts({});

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All fingerboards, decks and parts",
    url: `${baseUrl}/search`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: baseUrl },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: all.length,
      itemListElement: all.slice(0, 100).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${baseUrl}/product/${p.handle}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl">
          All fingerboards, decks and parts
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-400">
          Every complete, bare deck, truck, wheel, mold, ramp and spare part in
          the Lab — {all.length} products in total. Filter by width, type or
          price, or start from a category if you already know what you are
          building.
        </p>
      </div>

      <Suspense
        fallback={
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={all} />
          </Grid>
        }
      >
        <Results searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}
