import { PageShell, Section } from "components/page-shell";
import Link from "next/link";
import type { Metadata } from "next";
import {
  BUSINESS,
  DELIVERY_MAX_DAYS,
  DELIVERY_MIN_DAYS,
  FREE_SHIPPING_THRESHOLD,
  RETURN_WINDOW_DAYS,
  SHIPPING_FEE_USD,
  SUPPORT_EMAIL,
} from "lib/brand";

export const metadata: Metadata = {
  title: "About Fingerboard Lab — who we are and how we work",
  description:
    "Fingerboard Lab is a small online fingerboard shop run from Melbourne, Australia. How we source products, where orders ship from, delivery times and how to reach us.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Who we are and how we work."
      intro="Fingerboard Lab is a small online shop for fingerboarders, run from Melbourne, Australia. Here is exactly how the business works, so you know what you're buying and who you're buying from."
    >
      <Section heading="The business">
        <ul className="list-disc space-y-1 pl-6 text-neutral-300">
          <li>
            Business name: <strong>{BUSINESS.legalName}</strong>
            {BUSINESS.abn ? <> (ABN {BUSINESS.abn})</> : null}
          </li>
          <li>
            Based in: {BUSINESS.locality} {BUSINESS.region}{" "}
            {BUSINESS.postalCode}, {BUSINESS.country} (online only, no
            walk-in store)
          </li>
          <li>
            Contact:{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-[#c5f23c] hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
            {BUSINESS.phone ? <> · {BUSINESS.phone}</> : null}
          </li>
          <li>Trading online since {BUSINESS.founded}</li>
        </ul>
      </Section>

      <Section heading="Where our products come from">
        <p>{BUSINESS.supplyModel}</p>
        <p>
          We choose what goes in the catalogue, write every product page and
          build guide ourselves, and handle all customer service and returns
          directly. We don&apos;t claim to make anything we don&apos;t make,
          and where a product is a collaboration or a named brand, the product
          page says so.
        </p>
      </Section>

      <Section heading="What to expect when you order">
        <ul className="list-disc space-y-1 pl-6 text-neutral-300">
          <li>All prices are in US dollars (USD), charged by Stripe.</li>
          <li>
            Shipping is ${SHIPPING_FEE_USD.toFixed(2)} USD flat, free on orders
            over ${FREE_SHIPPING_THRESHOLD} USD.
          </li>
          <li>
            Delivery takes {DELIVERY_MIN_DAYS}–{DELIVERY_MAX_DAYS} business
            days, with a tracking link emailed when your order ships.
          </li>
          <li>
            {RETURN_WINDOW_DAYS}-day returns — see the{" "}
            <Link href="/returns" className="text-[#c5f23c] hover:underline">
              return policy
            </Link>{" "}
            for the full terms.
          </li>
        </ul>
      </Section>

      <Section heading="Learn before you buy">
        <p>
          Our free guides cover sizing, concave, trucks, bushings and deck
          pressing in plain language.{" "}
          <Link href="/guides" className="text-[#c5f23c] hover:underline">
            Read the build guides →
          </Link>
        </p>
      </Section>
    </PageShell>
  );
}
