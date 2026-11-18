import { PageShell, Section } from "components/page-shell";
import {
  COUNTRY_PAGES,
  REGIONS,
  countriesInRegion,
} from "lib/country-pages-data";
import {
  DELIVERY_MAX_DAYS,
  DELIVERY_MIN_DAYS,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE_USD,
} from "lib/brand";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Worldwide Fingerboard Shipping to ${COUNTRY_PAGES.length} Countries | Fingerboard Lab`,
  description: `Fingerboard Lab ships ramps, completes, decks and parts worldwide. Flat $${SHIPPING_FEE_USD} USD shipping, free over $${FREE_SHIPPING_THRESHOLD}, ${DELIVERY_MIN_DAYS}-${DELIVERY_MAX_DAYS} business days. See your country.`,
  alternates: { canonical: "/shipping" },
};

export default function ShippingHubPage() {
  return (
    <PageShell
      eyebrow="Shipping"
      title="We ship fingerboards worldwide."
      intro={`${COUNTRY_PAGES.length} countries, one flat $${SHIPPING_FEE_USD.toFixed(2)} USD rate, free over $${FREE_SHIPPING_THRESHOLD}, delivered in ${DELIVERY_MIN_DAYS}–${DELIVERY_MAX_DAYS} business days with tracking. Pick your country for the details.`}
      wide
    >
      {REGIONS.map((r) => (
        <Section key={r} heading={r}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
            {countriesInRegion(r).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shipping/${c.slug}`}
                  className="text-[#c5f23c] hover:underline"
                >
                  {c.name.replace(/^the /, "")}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ))}
      <Section heading="Don't see your country?">
        <p>
          Email{" "}
          <a
            href="mailto:hello@fingerboardlab.com"
            className="text-[#c5f23c] hover:underline"
          >
            hello@fingerboardlab.com
          </a>{" "}
          and we&apos;ll tell you whether we can reach you.
        </p>
      </Section>
    </PageShell>
  );
}
