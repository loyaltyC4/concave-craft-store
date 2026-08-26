import type { Metadata } from "next";
import Link from "next/link";
import Footer from "components/layout/footer";
import { SITE_NAME, SUPPORT_EMAIL } from "lib/brand";
import { baseUrl } from "lib/utils";

export const metadata: Metadata = {
  title: "Personalized Fingerboard Gifts | Custom Decks for Every Occasion",
  description:
    "Give a one-of-a-kind fingerboard gift. Upload any photo, logo, or artwork and we hand-build a real wooden deck just for them — birthdays, holidays, and graduations.",
  alternates: { canonical: "/custom/gifts" },
  openGraph: {
    type: "website",
    title: "Personalized Fingerboard Gifts | Fingerboard Lab",
    description:
      "Give a one-of-a-kind fingerboard gift. Upload any photo, logo, or artwork and we hand-build a real wooden deck just for them.",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Personalized Fingerboard Gift",
  description:
    "Custom-printed fingerboard decks made to order — perfect birthday, graduation, and holiday gifts for fingerboarders and skaters.",
  provider: { "@type": "Organization", name: SITE_NAME, url: baseUrl },
  areaServed: "Worldwide",
  url: `${baseUrl}/custom/gifts`,
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
      name: "Gifts",
      item: `${baseUrl}/custom/gifts`,
    },
  ],
};

const occasions = [
  {
    icon: "🎂",
    label: "Birthdays",
    copy: "Beats another gift card. A deck with their name, favourite photo, or inside joke — something no one else has.",
  },
  {
    icon: "🎓",
    label: "Graduations",
    copy: "A keepsake they can skate or display. Engrave the year, their initials, or a photo from the big day.",
  },
  {
    icon: "🎄",
    label: "Holidays",
    copy: "Ships in time for the holidays. Order a few — multi-board discounts apply automatically at checkout.",
  },
  {
    icon: "🏆",
    label: "For the Skater Who Has Everything",
    copy: "If they already own every complete on the market, a deck with their own graphic is the one thing they can't buy off the shelf.",
  },
];

const steps = [
  { n: "01", heading: "Upload your design", body: "PNG, JPG, SVG, PDF, AI or EPS. We accept any file you can export from Photoshop, Illustrator, Canva, or your phone." },
  { n: "02", heading: "Choose size and finish", body: "32 mm, 34 mm, or 36 mm. Standard maple or premium hardwood. Gloss or matte clear coat." },
  { n: "03", heading: "Add a gift note", body: "Use the Notes field at checkout to add a message — we'll include it on a printed card inside the package. No extra charge." },
  { n: "04", heading: "We build it by hand", body: "Every deck is cut, shaped, and printed in-house. Turnaround is 5–7 business days before shipping." },
];

export default function GiftsPage() {
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
          <span className="text-neutral-300">Gifts</span>
        </nav>

        {/* Hero */}
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-7 bg-[#c5f23c]" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c5f23c]">
            Personalized Fingerboard Gifts
          </span>
        </div>
        <h1 className="text-4xl font-semibold md:text-5xl">
          The gift they&apos;ll actually use.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-neutral-400">
          A custom fingerboard deck with their photo, logo, or artwork — hand-built on real maple, ready to shred or display. There is nothing else like it on a shelf.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/custom"
            className="rounded-full bg-[#c5f23c] px-7 py-3 text-sm font-semibold text-black transition hover:brightness-110"
          >
            Start your custom build
          </Link>
          <Link
            href="/custom/branded"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold transition hover:border-[#c5f23c] hover:text-[#c5f23c]"
          >
            Ordering for a business?
          </Link>
        </div>

        {/* Occasions grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {occasions.map((o) => (
            <div
              key={o.label}
              className="rounded-2xl border border-white/10 bg-[#15171c] p-6"
            >
              <div className="text-2xl">{o.icon}</div>
              <h2 className="mt-3 text-lg font-semibold">{o.label}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-400">
                {o.copy}
              </p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-6 space-y-5">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-5">
                <div className="shrink-0 text-xs font-semibold tabular-nums text-[#c5f23c]">
                  {s.n}
                </div>
                <div>
                  <div className="font-medium text-[#f3f1ea]">{s.heading}</div>
                  <p className="mt-1 text-[15px] leading-relaxed text-neutral-400">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gift-note callout */}
        <div className="mt-12 rounded-2xl border border-[#c5f23c]/30 bg-[#15171c] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#c5f23c]">
            Gift note included — free
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-300">
            Add a personal message in the <strong className="text-[#f3f1ea]">Notes</strong> field on the order form. We&apos;ll print it on a card and slip it in the box. No extra fee, no sign-up required.
          </p>
        </div>

        {/* Pricing reminder */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#15171c] p-6">
          <h2 className="text-lg font-semibold">Pricing at a glance</h2>
          <ul className="mt-3 space-y-2 text-[15px] text-neutral-300">
            <li>Single custom deck — <span className="text-[#f3f1ea] font-medium">from $89</span></li>
            <li>2 boards — <span className="text-[#c5f23c] font-medium">10% off each</span></li>
            <li>3 or more boards — <span className="text-[#c5f23c] font-medium">15% off each</span></li>
            <li className="text-neutral-500">Premium hardwood and rush options available at checkout</li>
          </ul>
        </div>

        {/* Design guide link */}
        <div className="mt-10 text-[15px] text-neutral-400">
          Not sure what file to upload?{" "}
          <Link
            href="/guides/custom-fingerboard-design-guide"
            className="text-[#c5f23c] hover:underline"
          >
            Read the design guide
          </Link>{" "}
          for format tips and sizing recommendations.
        </div>

        {/* CTA repeat */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-br from-[#15171c] to-[#0b0c0e] p-8 text-center">
          <h2 className="text-2xl font-semibold">Ready to make something personal?</h2>
          <p className="mt-2 text-neutral-400">
            Upload your artwork, choose a size, and we&apos;ll handle the rest.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/custom"
              className="rounded-full bg-[#c5f23c] px-7 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            >
              Build yours now
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
