import {
  getCollection,
  getCollectionProducts,
  getCollections,
} from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { FilterBar } from "components/layout/search/filter-bar";
import { defaultSort, sorting } from "lib/constants";
import { COLLECTION_IMAGE, SITE_NAME } from "lib/brand";
import { baseUrl, pageTitle } from "lib/utils";
import {
  applyFilters,
  availableFacets,
  parseFiltersFromSearchParams,
} from "lib/filters";
import {
  CollectionSeoContent,
  getCollectionSeo,
} from "components/collection-seo";

/** Prerender all 10 categories; unknown handles get a real 404, not a soft one. */
export async function generateStaticParams() {
  const collections = await getCollections();
  return collections
    .filter((c) => c.handle)
    .map((c) => ({ collection: c.handle }));
}

export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);
  if (!collection) return notFound();
  const seo = getCollectionSeo(params.collection);

  return {
    // Hand-written, keyword-front-loaded and kept under 60 characters.
    title: pageTitle(seo?.seo_title ?? `${collection.title} — Fingerboards & Parts`),
    description:
      seo?.meta_description ||
      collection.seo?.description ||
      collection.description ||
      `Shop ${collection.title} at ${SITE_NAME}.`,
    alternates: { canonical: `/search/${params.collection}` },
    openGraph: {
      type: "website",
      title: seo?.seo_title ?? collection.title,
      description: seo?.meta_description ?? collection.description,
      url: `${baseUrl}/search/${params.collection}`,
    },
  };
}

/**
 * The only part of the page that depends on searchParams.
 *
 * Isolating it behind Suspense is what lets everything above — H1, intro,
 * buying guide, FAQ — prerender into the initial HTML. Reading searchParams in
 * the page component itself would postpone the entire body again.
 */
async function FilteredGrid({
  collection,
  searchParams,
}: {
  collection: string;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = (await searchParams) ?? {};
  const { sort } = sp as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const unfiltered = await getCollectionProducts({
    collection,
    sortKey,
    reverse,
  });
  const facets = availableFacets(unfiltered);
  const products = applyFilters(unfiltered, parseFiltersFromSearchParams(sp));

  return (
    <>
      <FilterBar facets={facets} />
      {products.length === 0 ? (
        <p className="py-3 text-lg text-neutral-400">
          {unfiltered.length === 0
            ? "No products found in this collection."
            : "No products match these filters. Try clearing one."}
        </p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </>
  );
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const collection = await getCollection(params.collection);
  if (!collection) return notFound();

  const seo = getCollectionSeo(params.collection);
  const banner = COLLECTION_IMAGE[params.collection];
  // Unfiltered list: safe to read here because it does not touch searchParams,
  // so the product links and ItemList still make it into the static HTML.
  const all = await getCollectionProducts({ collection: params.collection });

  const heading = seo?.h1 ?? collection.title;
  const intro = seo?.intro ?? collection.description;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: heading,
    description: seo?.meta_description ?? collection.description,
    url: `${baseUrl}/search/${params.collection}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: baseUrl },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: all.length,
      itemListElement: all.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${baseUrl}/product/${p.handle}`,
        name: p.title,
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: collection.title,
        item: `${baseUrl}/search/${params.collection}`,
      },
    ],
  };

  const faqJsonLd = seo?.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: seo.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex items-center gap-2 text-xs text-neutral-500"
      >
        <Link href="/" className="hover:text-[#c5f23c]">
          Home
        </Link>
        <span>/</span>
        <span className="text-neutral-300">{collection.title}</span>
      </nav>

      <div className="relative mb-8 overflow-hidden rounded-3xl border border-white/10">
        {banner ? (
          <>
            <div className="relative h-40 w-full md:h-52">
              <Image
                src={banner}
                alt={`${collection.title} — ${SITE_NAME}`}
                fill
                unoptimized
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <h1 className="text-2xl font-semibold text-white md:text-4xl">
                {heading}
              </h1>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#c5f23c]">
                {all.length} products
              </p>
            </div>
          </>
        ) : (
          <div className="p-6 md:p-8">
            <h1 className="text-2xl font-semibold md:text-4xl">{heading}</h1>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#c5f23c]">
              {all.length} products
            </p>
          </div>
        )}
      </div>

      {intro ? (
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-neutral-300">
          {intro}
        </p>
      ) : null}

      <Suspense
        fallback={
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={all} />
          </Grid>
        }
      >
        <FilteredGrid
          collection={params.collection}
          searchParams={props.searchParams}
        />
      </Suspense>

      {seo ? <CollectionSeoContent seo={seo} /> : null}
    </section>
  );
}
