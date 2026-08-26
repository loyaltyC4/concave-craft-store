import type { Metadata } from "next";
import Link from "next/link";
import Footer from "components/layout/footer";
import { SITE_NAME, SUPPORT_EMAIL } from "lib/brand";
import { baseUrl } from "lib/utils";

export const metadata: Metadata = {
  title: "Custom Branded Fingerboards for Brands & Events | Bulk Orders",
  description:
    "Put your logo on real handmade maple fingerboard decks. Perfect branded merch for skate brands, coffee shops, record labels, streetwear, and trade show giveaways. Bulk discounts from 2+ boards.",
  alternates: { canonical: "/custom/branded" },
  openGraph: {
    type: "website",
    title: "Custom Branded Fingerboards for Brands & Events | Fingerboard Lab",
    description:
      "Put your logo on real handmade maple fingerboard decks. Bulk discounts from 2+ boards. Ideal for brand merch, event swag, and corporate giveaways.",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Branded Fingerboards for Brands & Events",
  description:
    "Bulk custom-logo fingerboard decks hand-built on real maple. Tiered volume discounts. Ideal for skate brands, coffee shops, record labels, streetwear brands, agencies, and trade show swag.",
  provider: { "@type": "Organization", name: SITE_NAME, url: baseUrl },
  areaServed: "Worldwide",
  url: `${baseUrl}/custom/branded`,
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "Custom Build",
      item: `${baseUrl}/custom`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Branded",
      item: `${baseUrl}/custom/branded`,
    },
  ],
};

const useCases = [
  {
    label: "Skate & Streetwear Brands",
    copy: "Your graphic on a real fingerboard deck. Hand the shop team a piece of branded merch that people actually want to own and use.",
  },
  {
    label: "Coffee Shops & Lifestyle Brands",
    copy: "Fingerboards are the surprise-and-delight giveaway nobody expects. Drop them at your counter, include them in subscription boxes, or send them to influencers.",
  },
  {
    label: "Record Labels & Music Artists",
    copy: "Album art on a fingerboard deck is an instant collector's item. Limited-run merch that sells itself without a restock problem.",
  },
  {
    label: "Marketing Agencies",
    copy: "Trade show swag that ends up on desks, not in the bin. Custom fingerboards start conversations and last long after the event.",
  },
  {
    label: "Event Organisers",
    copy: "Competition winners, sponsor packages, or premium attendee gifts — custom decks add a tactile, handmade quality that branded pens and tote bags can't match.",
  },
  {
    label: "Corporate Gifting",
    copy: "Company logo, team photo, or an inside joke from the last off-site — custom fingerboards are the kind of gift people keep on their desk.",
  },
];

export default function BrandedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-[#c5f23c]">Home</Link>
          <span>/</span>
          <Link href="/custom" className="hover:text-[#c5f23c]">Custom Build</Link>
          <span>/</span>
          <span className="text-neutral-300">Branded</span>
        </nav>

        {/* Hero */}
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-7 bg-[#c5f23c]" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c5f23c]">
            Branded Merch & Bulk Orders
          </span>
        </div>
        <h1 className="text-4xl font-semibold md:text-5xl">
          Your logo. Real maple. Handmade.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-neutral-400">
          Custom-logo fingerboard decks for skate brands, coffee shops, record labels, streetwear brands, agencies, and anyone who wants branded swag that people actually keep. Upload your artwork, choose a quantity, and we build every deck by hand.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/custom"
            className="rounded-full bg-[#c5f23c] px-7 py-3 text-sm font-semibold text-black transition hover:brightness-110"
          >
            Start your order
          </Link>
          <Link
            href="/custom/gifts"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold transition hover:border-[#c5f23c] hover:text-[#c5f23c]"
          >
            Shopping for a gift instead?
          </Link>
        </div>

        {/* Bulk pricing */}
        <div className="mt-14 rounded-2xl border border-[#c5f23c]/30 bg-[#15171c] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#c5f23c]">
            Volume discounts — applied automatically
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-center">
              <div className="text-2xl font-bold text-[#f3f1ea]">1</div>
              <div className="mt-1 text-xs text-neutral-500">board</div>
              <div className="mt-2 text-sm font-medium text-neutral-300">Full price</div>
            </div>
            <div className="rounded-xl border border-[#c5f23c]/40 bg-black/20 p-4 text-center">
              <div className="text-2xl font-bold text-[#f3f1ea]">2</div>
              <div className="mt-1 text-xs text-neutral-500">boards</div>
              <div className="mt-2 text-sm font-semibold text-[#c5f23c]">10% off each</div>
            </div>
            <div className="rounded-xl border border-[#c5f23c]/60 bg-black/20 p-4 text-center">
              <div className="text-2xl font-bold text-[#f3f1ea]">3+</div>
              <div className="mt-1 text-xs text-neutral-500">boards</div>
              <div className="mt-2 text-sm font-semibold text-[#c5f23c]">15% off each</div>
            </div>
          </div>
          <p className="mt-4 text-[13px] text-neutral-500">
            Ordering 10 or more boards?{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Bulk%20fingerboard%20order%20enquiry`}
              className="text-[#c5f23c] hover:underline"
            >
              Email us directly
            </a>{" "}
            for a custom quote — large runs may qualify for further discounts and priority scheduling.
          </p>
        </div>

        {/* Use cases */}
        <div className="mt-14">
          <h2 className="text-2xl font-semibold">Who orders branded fingerboards</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {useCases.map((u) => (
              <div
                key={u.label}
                className="rounded-2xl border border-white/10 bg-[#15171c] p-6"
              >
                <h3 className="font-semibold text-[#f3f1ea]">{u.label}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-400">
                  {u.copy}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why handmade */}
        <div className="mt-14">
          <h2 className="text-2xl font-semibold">Why handmade matters for branded merch</h2>
          <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-neutral-300">
            <p>
              Mass-produced promotional items feel like promotional items. A fingerboard deck cut from real maple, shaped by hand, and printed with your artwork is a product — something the recipient wants to keep and show off, not something they leave in the conference room.
            </p>
            <p>
              Every deck we build is the same quality as our retail store. The only difference is the graphic on top is yours.
            </p>
          </div>
        </div>

        {/* File format note */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#15171c] p-6">
          <h2 className="text-lg font-semibold">Submitting your brand assets</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-400">
            We accept SVG, AI, EPS (vector), PNG, JPG, PDF, and HEIC. For logos and brand marks, a vector file (SVG or AI/EPS) gives the sharpest result. Not sure what format to export?{" "}
            <Link
              href="/guides/custom-fingerboard-design-guide"
              className="text-[#c5f23c] hover:underline"
            >
              See the design guide
            </Link>.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#15171c] p-6">
          <h2 className="text-lg font-semibold">Questions about a bulk order?</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-400">
            Email us at{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-[#c5f23c] hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" className="text-[#c5f23c] hover:underline">
              contact page
            </Link>. We reply within one business day.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-br from-[#15171c] to-[#0b0c0e] p-8 text-center">
          <h2 className="text-2xl font-semibold">Ready to put your brand on a real fingerboard?</h2>
          <p className="mt-2 text-neutral-400">
            Upload your logo or artwork and configure your order in minutes.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/custom"
              className="rounded-full bg-[#c5f23c] px-7 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            >
              Start your branded order
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold transition hover:border-[#c5f23c] hover:text-[#c5f23c]"
            >
              Talk to us first
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
