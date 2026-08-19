import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { ProductDescription } from "components/product/product-description";
import Prose from "components/prose";
import { ProductCard } from "components/product-card";
import { ReviewsSection } from "components/product/reviews-section";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProductReviews } from "lib/reviews";
import {
  getProduct,
  getProductCollection,
  getRelatedProducts,
} from "lib/shopify";
import type { Image } from "lib/shopify/types";
import { baseUrl, pageTitle } from "lib/utils";
import { COLLECTIONS, SITE_NAME } from "lib/brand";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "lib/shopify";
import { Suspense } from "react";

/**
 * Prerender every product and refuse unknown handles.
 *
 * Without this, an unknown /product/<anything> served the cached PPR shell with
 * HTTP 200 and the not-found body — a soft 404. Search engines treat those as
 * thin duplicates instead of dropping them. Listing every handle also makes all
 * 154 product pages fully static, so crawlers get server-rendered HTML.
 */
export async function generateStaticParams() {
  const products = await getProducts({});
  return products.map((p) => ({ handle: p.handle }));
}

export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: pageTitle(product.seo.title || product.title),
    description: product.seo.description || product.description,
    alternates: { canonical: `/product/${product.handle}` },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: { index: indexable, follow: indexable },
    },
    openGraph: url ? { images: [{ url, width, height, alt }] } : null,
  };
}

type GuideLink = { label: string; href: string };

/**
 * Up to 3 guides per collection, product pages -> guides.
 *
 * Originally one guide per collection (the 14 launch guides). Expanded to
 * surface the 27 guides added across the SEO content batches (P0/P1/P2),
 * since a brand-new guide with zero internal links rarely gets crawled --
 * this is the mechanism that gets Google to actually visit them. First
 * entry per collection keeps the original hand-picked link; the rest pull
 * from the newer batches, prioritised by what a shopper on that category
 * actually wants to know next.
 */
const GUIDES_FOR_COLLECTION: Record<string, GuideLink[]> = {
  completes: [
    { label: "New to it? Read the beginner buying guide", href: "/guides/best-beginner-fingerboard-setup" },
    { label: "Upgrading a Tech Deck instead? Read this first", href: "/guides/how-to-upgrade-your-tech-deck" },
    { label: "Which deck shape should you ride?", href: "/guides/fingerboard-deck-shapes-compared" },
  ],
  decks: [
    { label: "Not sure on width? Read the sizing guide", href: "/guides/fingerboard-sizing-guide" },
    { label: "5-ply vs 7-ply decks compared", href: "/guides/5-ply-vs-7-ply-fingerboard-decks" },
    { label: "Buying a blank deck to paint or press yourself?", href: "/guides/blank-fingerboard-decks-choosing-and-painting" },
  ],
  trucks: [
    { label: "How to choose the right trucks", href: "/guides/how-to-choose-fingerboard-trucks" },
    { label: "Base angles and kingpins explained", href: "/guides/fingerboard-truck-base-angles-and-kingpins" },
    { label: "Trucks keep falling off? Fix it here", href: "/guides/fingerboard-trucks-falling-off-fix" },
  ],
  wheels: [
    { label: "Keep them rolling: clean your bearings and wheels", href: "/guides/how-to-clean-fingerboard-bearings-and-wheels" },
    { label: "Which bearings should you buy?", href: "/guides/which-fingerboard-bearings-to-buy" },
    { label: "Wheel durometer explained: soft vs hard", href: "/guides/fingerboard-wheel-durometer-explained" },
  ],
  "grip-tape": [
    { label: "Which grip tape should you use?", href: "/guides/fingerboard-grip-tape-guide" },
    { label: "Foam tape vs standard grip tape", href: "/guides/fingerboard-foam-tape-guide" },
  ],
  "tuning-hardware": [
    { label: "Dial in your setup: the bushings guide", href: "/guides/fingerboard-bushings-guide" },
    { label: "How to tune your trucks step by step", href: "/guides/how-to-tune-fingerboard-trucks" },
    { label: "Do you actually need riser pads?", href: "/guides/fingerboard-riser-pads-explained" },
  ],
  "deck-building": [
    { label: "Learn how to press a deck with a mold", href: "/guides/how-to-press-a-fingerboard-deck" },
    { label: "Which fingerboard mold should you buy?", href: "/guides/which-fingerboard-mold-to-buy" },
    { label: "Assembling a fingerboard from parts", href: "/guides/how-to-assemble-a-fingerboard" },
  ],
  "ramps-obstacles": [
    { label: "Build your own park: the DIY ramp guide", href: "/guides/wooden-fingerboard-ramps-diy-park-guide" },
    { label: "Best fingerboard obstacles compared", href: "/guides/best-fingerboard-obstacles-compared" },
    { label: "Setting up a grind rail (and waxing it right)", href: "/guides/fingerboard-grind-rail-setup-and-wax" },
  ],
  "park-kits": [
    { label: "Best fingerboard obstacles compared", href: "/guides/best-fingerboard-obstacles-compared" },
    { label: "How to build a fingerboard bowl", href: "/guides/how-to-build-a-fingerboard-bowl" },
    { label: "Starting a local fingerboard meetup", href: "/guides/how-to-start-a-fingerboard-club" },
  ],
  "storage-display": [
    { label: "Explore all build guides", href: "/guides" },
    { label: "Filming your tricks for social", href: "/guides/how-to-film-fingerboard-tricks" },
  ],
};

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const collectionHandle = await getProductCollection(product.handle);
  const collectionMeta = COLLECTIONS.find((c) => c.handle === collectionHandle);
  const related = await getRelatedProducts(product.handle);
  const guideLinks = collectionHandle
    ? (GUIDES_FOR_COLLECTION[collectionHandle] ?? [])
    : [];
  const { reviews, average, count } = await getProductReviews(product.handle);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    // JSON-LD image URLs must be absolute. A relative path yields an
    // unresolvable primary-image field that Google Merchant Center rejects
    // and that Rich Results Test flags as invalid. Supplier-hosted URLs
    // (already absolute) pass through unchanged.
    image: product.images.map((i) =>
      i.url.startsWith("http") ? i.url : new URL(i.url, baseUrl).toString(),
    ),
    sku: product.variants[0]?.sku || product.handle,
    brand: { "@type": "Brand", name: SITE_NAME },
    // Only present when real reviews exist — never fabricated.
    ...(count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: average.toFixed(1),
            reviewCount: count,
          },
        }
      : {}),
    // Single-variant products emit Offer; multi-variant emit AggregateOffer.
    // Merchant Center rejects AggregateOffer with offerCount:1 as invalid,
    // which blocks the product from the Shopping feed entirely.
    offers:
      product.variants.length > 1
        ? {
            "@type": "AggregateOffer",
            availability: product.availableForSale
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            priceCurrency: product.priceRange.minVariantPrice.currencyCode,
            lowPrice: product.priceRange.minVariantPrice.amount,
            highPrice: product.priceRange.maxVariantPrice.amount,
            offerCount: product.variants.length,
            url: `${baseUrl}/product/${product.handle}`,
            seller: { "@type": "Organization", name: SITE_NAME },
          }
        : {
            "@type": "Offer",
            availability: product.availableForSale
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            priceCurrency: product.priceRange.minVariantPrice.currencyCode,
            price: product.priceRange.minVariantPrice.amount,
            url: `${baseUrl}/product/${product.handle}`,
            seller: { "@type": "Organization", name: SITE_NAME },
          },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      ...(collectionMeta
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: collectionMeta.title,
              item: `${baseUrl}/search/${collectionMeta.handle}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: collectionMeta ? 3 : 2,
        name: product.title,
        item: `${baseUrl}/product/${product.handle}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-[#c5f23c]">
            Home
          </Link>
          <span>/</span>
          {collectionMeta ? (
            <>
              <Link
                href={`/search/${collectionMeta.handle}`}
                className="hover:text-[#c5f23c]"
              >
                {collectionMeta.title}
              </Link>
              <span>/</span>
            </>
          ) : null}
          <span className="text-neutral-300">{product.title}</span>
        </nav>

        <div className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-[#111317] p-6 md:p-10 lg:flex-row lg:gap-12">
          <div className="h-full w-full basis-full lg:basis-3/5">
            <div className="rounded-2xl bg-white p-4">
              <Suspense
                fallback={
                  <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
                }
              >
                <Gallery
                  images={product.images.slice(0, 6).map((image: Image) => ({
                    src: image.url,
                    altText: image.altText,
                  }))}
                />
              </Suspense>
            </div>
          </div>
          <div className="basis-full lg:basis-2/5">
            {/*
             * H1 rendered here on the server so it lands in the initial
             * static HTML — the ProductDescription below is a client
             * component (useSearchParams for variant pricing) sitting
             * inside a Suspense boundary, which would keep the H1 out of
             * the crawled markup if it lived inside the client component.
             */}
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
              {product.title}
            </h1>
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
            {guideLinks.length > 0 ? (
              <div className="mt-6 space-y-2">
                {guideLinks.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-neutral-300 transition hover:border-[#c5f23c]/40 hover:text-[#c5f23c]"
                  >
                    {g.label}
                    <span aria-hidden>→</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* DETAILS + SPECS */}
        {(product.descriptionHtml || product.tags.length > 0) && (
          <div className="mt-10 grid gap-10 rounded-3xl border border-white/10 bg-[#0f1114] p-6 md:p-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Details</h2>
              {product.descriptionHtml ? (
                <Prose
                  className="mx-0 max-w-none text-sm leading-relaxed text-neutral-300 dark:text-neutral-300"
                  html={product.descriptionHtml}
                />
              ) : (
                <p className="text-sm text-neutral-400">
                  {product.description}
                </p>
              )}
            </div>
            {product.tags.length > 0 && (
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  Specs &amp; tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.slice(0, 12).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <dl className="mt-6 space-y-2 text-sm">
                  {collectionMeta ? (
                    <div className="flex justify-between border-b border-white/10 py-2">
                      <dt className="text-neutral-500">Category</dt>
                      <dd className="text-neutral-200">
                        {collectionMeta.title}
                      </dd>
                    </div>
                  ) : null}
                  <div className="flex justify-between border-b border-white/10 py-2">
                    <dt className="text-neutral-500">Ships in</dt>
                    <dd className="text-neutral-200">7–14 business days</dd>
                  </div>
                  <div className="flex justify-between border-b border-white/10 py-2">
                    <dt className="text-neutral-500">Returns</dt>
                    <dd className="text-neutral-200">30 days</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        )}

        <ReviewsSection
          productHandle={product.handle}
          initialReviews={reviews}
          initialAverage={average}
          initialCount={count}
        />

        {/* RELATED */}
        {related.length > 0 && (
          <div className="py-14">
            <h2 className="mb-6 text-2xl font-semibold">
              {collectionMeta
                ? `More ${collectionMeta.title.toLowerCase()}`
                : "You might also like"}
            </h2>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
              {related.map((p) => (
                <div
                  key={p.id}
                  className="w-[64%] shrink-0 snap-start sm:w-[38%] lg:w-[22%]"
                >
                  <ProductCard
                    product={p}
                    sizes="(min-width:1024px) 22vw, 60vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
