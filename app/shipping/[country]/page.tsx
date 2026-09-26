import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { PageShell, Section } from "components/page-shell";
import { getCollectionProducts } from "lib/shopify";
import {
  COUNTRY_PAGES,
  getCountryPage,
} from "lib/country-pages-data";
import {
  DELIVERY_MAX_DAYS,
  DELIVERY_MIN_DAYS,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE_USD,
  RETURN_WINDOW_DAYS,
} from "lib/brand";
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

  return (
    <PageShell
      eyebrow="Shipping"
      title={`Fingerboard Lab ships to ${page.name}.`}
      intro={`Everything in the catalog ships to ${page.name} the same way it ships everywhere else — one flat rate, one honest delivery window, no regional markup.`}
      wide
    >
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
            handles the currency conversion at checkout.
          </li>
          <li>
            Any import duties or taxes are the responsibility of the
            recipient and aren&apos;t collected at checkout — we don&apos;t
            pretend otherwise.
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
    </PageShell>
  );
}
