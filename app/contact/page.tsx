import { PageShell, Section } from "components/page-shell";
import { BUSINESS, SUPPORT_EMAIL, SOCIALS } from "lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Fingerboard Lab — product questions, order help, and wholesale enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Say hello"
      title="Contact the Lab."
      intro="Questions about a setup, an order, or a bulk build? We're happy to help — most emails get a reply within one business day."
    >
      <Section heading="Email">
        <p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-[#c5f23c] hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </Section>
      <Section heading="Business details">
        <ul className="list-disc space-y-1 pl-6 text-neutral-300">
          <li>
            {BUSINESS.legalName}
            {BUSINESS.abn ? <> · ABN {BUSINESS.abn}</> : null}
          </li>
          <li>
            {BUSINESS.locality} {BUSINESS.region} {BUSINESS.postalCode},{" "}
            {BUSINESS.country} — online only, no walk-in store
          </li>
          {BUSINESS.phone ? <li>Phone: {BUSINESS.phone}</li> : null}
          <li>
            Orders ship directly from our supplier workshops (mostly in
            China). Returns are sent to the address we give you in your return
            authorization email.
          </li>
        </ul>
      </Section>
      <Section heading="Order help">
        <p>
          Include your order number and the email you used at checkout, and
          we&apos;ll sort it fast — shipping updates, returns, or swaps.
        </p>
      </Section>
      <Section heading="Follow along">
        <p className="flex flex-wrap gap-4">
          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c5f23c] hover:underline"
          >
            Instagram
          </a>
          <a
            href={SOCIALS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c5f23c] hover:underline"
          >
            YouTube
          </a>
          <a
            href={SOCIALS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c5f23c] hover:underline"
          >
            TikTok
          </a>
        </p>
      </Section>
    </PageShell>
  );
}
