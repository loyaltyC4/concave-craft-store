import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { PageShell, Section } from "components/page-shell";
import { getCollectionProducts } from "lib/shopify";
import {
  COUNTRY_PAGES,
  countriesInRegion,
  getCountryPage,
} from "lib/country-pages-data";
import {
  DELIVERY_MAX_DAYS,
  DELIVERY_MIN_DAYS,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE_USD,
  RETURN_WINDOW_DAYS,
} from "lib/brand";
import { baseUrl } from "lib/utils";
import { CountryMap } from "components/country-map";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

/** Prerender every listed country; unknown slugs get a real 404. */
export function generateStaticParams() {
  return COUNTRY_PAGES.map((c) => ({ country: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await props.params;
  const page = getCountryPage(country);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/shipping/${page.slug}` },
  };
}

export default async function CountryShippingPage(props: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await props.params;
  const page = getCountryPage(country);
  if (!page) return notFound();

  const collectionsWithProducts = await Promise.all(
    page.featuredCollections.map(async (fc) => ({
      ...fc,
      products: await getCollectionProducts({ collection: fc.handle }),
    })),
  );

  const neighbours = countriesInRegion(page.region).filter(
    (c) => c.slug !== page.slug,
  );

  const taxCopy = page.eu
    ? `${page.name} is in the EU, so your carrier or customs may charge import VAT (and sometimes a handling fee) when the parcel arrives.`
    : `Your carrier or customs in ${page.name} may charge import duty, VAT or GST when the parcel arrives, depending on local rules and the order value.`;

  const faqs = [
    {
      q: `Do you ship fingerboards to ${page.name}?`,
      a: `Yes. Every product in the shop ships to ${page.name} — pick your country at checkout and the same flat rate applies.`,
    },
    {
      q: `How much is shipping to ${page.name}?`,
      a: `$${SHIPPING_FEE_USD.toFixed(2)} USD flat, and free on orders over $${FREE_SHIPPING_THRESHOLD} USD. There is no extra regional charge.`,
    },
    {
      q: `How long does delivery to ${page.name} take?`,
      a: `Usually ${DELIVERY_MIN_DAYS}–${DELIVERY_MAX_DAYS} business days from your order, with a tracking link emailed once it ships.`,
    },
    {
      q: `Will I pay import tax or duties in ${page.name}?`,
      a: `${taxCopy} We don't collect these at checkout and can't predict the amount.`,
    },
    {
      q: `What currency do I pay in?`,
      a: `Prices are in US dollars. Your bank converts to ${page.currency.name} (${page.currency.code}) at its own rate when you pay by card.`,
    },
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shipping",
        item: `${baseUrl}/shipping`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.name.replace(/^the /, ""),
        item: `${baseUrl}/shipping/${page.slug}`,
      },
    ],
  };

  return (
    <PageShell
      eyebrow="Shipping"
      title={`Fingerboard Lab ships to ${page.name}.`}
      intro={`Everything in the catalog ships to ${page.name} the same way it ships everywhere else — one flat rate, one honest delivery window, no regional markup.`}
      wide
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="mb-10 flex items-center gap-5">
        <CountryMap code={page.code} name={page.name} size={140} />
        <p className="max-w-md text-sm text-neutral-400">
          {page.name.replace(/^the /, "")} · ships in {DELIVERY_MIN_DAYS}–{DELIVERY_MAX_DAYS} business days · prices in USD
        </p>
      </div>

      <Section heading={`Delivery to ${page.name}`}>
        <ul className="list-disc space-y-1 pl-6 text-neutral-300">
          <li>
            Flat shipping: <strong className="text-[#f3f1ea]">${SHIPPING_FEE_USD.toFixed(2)} USD</strong>,
            free on orders over <strong className="text-[#f3f1ea]">${FREE_SHIPPING_THRESHOLD} USD</strong> — the
            same rate and threshold for every destination we ship to, {page.name} included.
          </li>
          <li>
            Delivery takes <strong className="text-[#f3f1ea]">{DELIVERY_MIN_DAYS}–{DELIVERY_MAX_DAYS} business days</strong>,
            with a tracking link emailed once your order ships.
          </li>
          <li>
            All prices are in USD, charged via Stripe. Your card or bank
            handles the conversion to {page.currency.name} ({page.currency.code}) at checkout.
          </li>
          <li>
            {taxCopy} Import charges aren&apos;t collected at checkout — we
            don&apos;t pretend otherwise.
          </li>
          <li>
            {RETURN_WINDOW_DAYS}-day returns apply the same way they do for
            every order — see the{" "}
            <Link href="/returns" className="text-[#c5f23c] hover:underline">
              return policy
            </Link>
            .
          </li>
        </ul>
      </Section>

      <Section heading={`Where orders actually ship from`}>
        <p>
          Fingerboard Lab is run from Melbourne, Australia, but we don&apos;t
          hold stock there. Orders for {page.demonym} ship directly from our
          supplier network (mostly workshops in China) — the same source
          every order ships from, worldwide. That&apos;s why delivery is
          measured in business days of international transit rather than
          next-day local shipping.
        </p>
      </Section>

      <Section heading={`Shipping to ${page.name}: common questions`}>
        <dl className="space-y-5">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold text-[#f3f1ea]">{f.q}</dt>
              <dd className="mt-1 text-neutral-300">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <div className="mt-16 space-y-14">
        {collectionsWithProducts.map((c) => (
          <div key={c.handle}>
            <div className="mb-5 flex items-end justify-between gap-6">
              <h2 className="text-2xl font-semibold">{c.label}</h2>
              <Link
                href={`/search/${c.handle}`}
                className="text-sm text-[#c5f23c] hover:underline"
              >
                View all →
              </Link>
            </div>
            <Grid className="grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
              <ProductGridItems products={c.products.slice(0, 6)} />
            </Grid>
          </div>
        ))}
      </div>

      <Section heading={`Also shipping to nearby countries`}>
        <p className="flex flex-wrap gap-x-4 gap-y-2">
          {neighbours.map((n) => (
            <Link
              key={n.slug}
              href={`/shipping/${n.slug}`}
              className="text-[#c5f23c] hover:underline"
            >
              {n.name.replace(/^the /, "")}
            </Link>
          ))}
          <Link href="/shipping" className="text-[#c5f23c] hover:underline">
            All countries →
          </Link>
        </p>
      </Section>
    </PageShell>
  );
}
