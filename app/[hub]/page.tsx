import Footer from "components/layout/footer";
import { ProductCard } from "components/product-card";
import { getProducts } from "lib/shopify";
import { getGuide } from "lib/all-guides";
import {
  getHub,
  hubSlugs,
  seoHubs,
} from "lib/seo-hubs";
import homepageData from "data/homepage.json";
import { FREE_SHIPPING_THRESHOLD, SITE_NAME, VOLT } from "lib/brand";
import { baseUrl, pageTitle } from "lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * SEO hub pages at clean root URLs (/fingerboard-rails, /34mm-fingerboards...).
 * Definitions and the reasoning live in lib/seo-hubs.ts. Unknown slugs 404
 * (dynamicParams = false), so this segment cannot swallow other routes: real
 * routes such as /about or /guides are static and always win over [hub].
 */
export function generateStaticParams() {
  return hubSlugs().map((hub) => ({ hub }));
}

export const dynamicParams = false;

// Prices depend on the sale clock (lib/flash-sale.ts); keep them fresh.
export const revalidate = 300;

export async function generateMetadata(props: {
  params: Promise<{ hub: string }>;
}): Promise<Metadata> {
  const { hub: slug } = await props.params;
  const hub = getHub(slug);
  if (!hub) return {};
  return {
    title: pageTitle(hub.title),
    description: hub.metaDescription,
    alternates: { canonical: `/${hub.slug}` },
    openGraph: {
      type: "website",
      title: hub.title,
      description: hub.metaDescription,
      url: `${baseUrl}/${hub.slug}`,
    },
  };
}

export default async function HubPage(props: {
  params: Promise<{ hub: string }>;
}) {
  const { hub: slug } = await props.params;
  const all = await getProducts({});
  const live = seoHubs(all);
  const entry = live.find((h) => h.hub.slug === slug);
  if (!entry) return notFound();
  const { hub } = entry;
  // Best sellers (ranked by add-to-cart, see data/homepage.json) first.
  const rank = new Map<string, number>(
    (homepageData.best_sellers as string[]).map((h, i) => [h, i]),
  );
  const products = [...entry.products].sort(
    (a, b) => (rank.get(a.handle) ?? 999) - (rank.get(b.handle) ?? 999),
  );

  const guides = hub.guides.map((g) => getGuide(g)).filter(Boolean);
  const related = hub.related
    .map((r) => live.find((h) => h.hub.slug === r)?.hub)
    .filter((h): h is NonNullable<typeof h> => Boolean(h));

  const url = `${baseUrl}/${hub.slug}`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: hub.h1, item: url },
    ],
  };
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.h1,
    description: hub.metaDescription,
    url,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: baseUrl },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.slice(0, 24).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${baseUrl}/product/${p.handle}`,
        name: p.title,
      })),
    },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hub.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {[breadcrumbJsonLd, collectionJsonLd, faqJsonLd].map((j, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }}
        />
      ))}

      <div className="bg-[#0b0c0e] text-[#f3f1ea]">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
              <Link href="/" className="hover:text-[#c5f23c]">
                Home
              </Link>
              <span>/</span>
              <span className="text-neutral-300">{hub.h1}</span>
            </nav>
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: VOLT }}
            >
              {hub.eyebrow}
            </span>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              {hub.h1}
            </h1>
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-neutral-300 md:text-lg">
              {hub.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-6 text-sm text-neutral-400">
              Free shipping over ${FREE_SHIPPING_THRESHOLD} · tracked delivery
              worldwide · 30-day returns
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
          <h2 className="sr-only">{hub.h1}: products</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                priority={i < 4}
                sizes="(min-width:1040px) 22vw, 46vw"
              />
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0e1013]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:px-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">
                How to choose: {hub.h1.toLowerCase()}
              </h2>
              <div className="mt-6 space-y-7">
                {hub.tips.map((t) => (
                  <div key={t.heading}>
                    <h3 className="text-base font-semibold text-[#f3f1ea]">
                      {t.heading}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                      {t.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Common questions
              </h2>
              <dl className="mt-6 space-y-6">
                {hub.faqs.map((f) => (
                  <div key={f.q}>
                    <dt className="text-base font-semibold text-[#f3f1ea]">
                      {f.q}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-neutral-400">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {(guides.length > 0 || related.length > 0) && (
          <section className="mx-auto max-w-7xl px-6 py-14 md:px-12">
            <div className="grid gap-10 md:grid-cols-2">
              {guides.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold">Read next</h2>
                  <ul className="mt-4 space-y-2">
                    {guides.map((g) => (
                      <li key={g!.slug}>
                        <Link
                          href={`/guides/${g!.slug}`}
                          className="text-[15px] text-neutral-300 hover:text-[#c5f23c]"
                        >
                          {g!.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {related.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold">More to shop</h2>
                  <ul className="mt-4 space-y-2">
                    {related.map((h) => (
                      <li key={h.slug}>
                        <Link
                          href={`/${h.slug}`}
                          className="text-[15px] text-neutral-300 hover:text-[#c5f23c]"
                        >
                          {h.h1}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/search"
                        className="text-[15px] text-neutral-300 hover:text-[#c5f23c]"
                      >
                        All products
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
}
