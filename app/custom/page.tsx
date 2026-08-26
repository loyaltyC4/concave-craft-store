import type { Metadata } from "next";
import Footer from "components/layout/footer";
import { CustomBuildConfigurator } from "./configurator";
import { SITE_NAME, VOLT } from "lib/brand";
import { baseUrl } from "lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Custom Handmade Fingerboard — Personalized Graphic, Made to Order | Fingerboard Lab",
  description:
    "Design your own custom fingerboard with your artwork, logo, or photo. Hand-pressed maple deck, pro trucks, bearing wheels. Starting at $89. Custom fingerboard, personalized fingerboard, custom tech deck alternative.",
  alternates: { canonical: "/custom" },
  openGraph: {
    title: "Custom Handmade Fingerboard — Made to Order",
    description:
      "Upload your design, choose your specs, and we press it by hand. Your graphic, your size, shipped in days.",
    images: [{ url: `${baseUrl}/brand/hero.jpg`, width: 1200, height: 630 }],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Custom Handmade Fingerboard",
  description:
    "A made-to-order fingerboard deck pressed by hand from real maple veneer with your own graphic or artwork. Choose 32mm, 34mm, or 36mm width, optional select hardwood upgrade, and optional rush 24-48h production.",
  brand: { "@type": "Brand", name: SITE_NAME },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "89.00",
    priceValidUntil: "2027-12-31",
    availability: "https://schema.org/InStock",
    url: `${baseUrl}/custom`,
    seller: { "@type": "Organization", name: SITE_NAME },
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
      name: "Custom Fingerboard Build",
      item: `${baseUrl}/custom`,
    },
  ],
};

export default function CustomBuildPage() {
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

      <div className="bg-[#0b0c0e] text-[#f3f1ea]">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 70% 50%, #c5f23c22 0%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
            <div className="max-w-2xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-7" style={{ background: VOLT }} />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ color: VOLT }}
                >
                  Custom builds
                </span>
              </div>
              <h1 className="text-5xl font-semibold leading-[1.02] md:text-7xl">
                Your graphic.
                <br />
                Our hands.
                <br />
                <span style={{ color: VOLT }}>One board.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base text-neutral-300 md:text-lg">
                Every custom board is pressed by hand from real maple veneer, to
                your exact size and spec. Upload your artwork — a logo, a photo,
                a sketch — and we&apos;ll build something that doesn&apos;t
                exist anywhere else.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "From $89",
                  "32mm / 34mm / 36mm",
                  "2–3 day production",
                  "Up to 10 boards",
                ].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[13px] text-neutral-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <div className="mb-12">
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: VOLT }}
            >
              The process
            </span>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              How it works.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                n: "01",
                title: "Choose your specs",
                body: "Pick your deck width (32mm, 34mm, or 36mm), whether you want the select hardwood upgrade, and how many boards. Multi-board orders get a discount built in.",
              },
              {
                n: "02",
                title: "Upload your design",
                body: "Drop in your artwork — PNG, JPG, SVG, PDF, AI, or EPS — up to 10 files. Not ready with artwork? Check the box for design help instead and our team will reach out.",
              },
              {
                n: "03",
                title: "We build it by hand",
                body: "Our team reviews every upload before starting. Standard production is 2–3 business days. Rush orders (24–48 hours) are available for an additional $25.",
              },
              {
                n: "04",
                title: "Shipped to you",
                body: "Your board ships tracked worldwide. Standard production plus transit is typically 9–16 business days total depending on your location. Rush production cuts the production side to 1–2 days.",
              },
            ].map((step) => (
              <div key={step.n} className="flex flex-col">
                <div
                  className="mb-4 text-4xl font-semibold"
                  style={{ color: VOLT }}
                >
                  {step.n}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CONFIGURATOR */}
        <section
          id="configurator"
          className="border-y border-white/10 bg-[#0e1013]"
        >
          <div className="mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-20">
            <div className="mb-10">
              <span
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: VOLT }}
              >
                Build yours
              </span>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                Configure your build.
              </h2>
              <p className="mt-3 text-neutral-400">
                Fill in the form below, upload your artwork (or request design
                help), and we&apos;ll take it from there.
              </p>
            </div>
            <CustomBuildConfigurator />

            {/* Discovery links — gift and branded entry points */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-8 text-sm text-neutral-500">
              <span>Looking for something specific?</span>
              <Link
                href="/custom/gifts"
                className="text-[#c5f23c] hover:underline"
              >
                Buying as a gift →
              </Link>
              <Link
                href="/custom/branded"
                className="text-[#c5f23c] hover:underline"
              >
                Ordering for a brand or event →
              </Link>
            </div>
          </div>
        </section>

        {/* TRUST / REASSURANCE */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <div className="mb-10">
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: VOLT }}
            >
              Our promise
            </span>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Built with care, every time.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "We review every file",
                body: "Our team looks at every upload before we start pressing. If your artwork needs adjusting — resolution, bleed, colour mode — we'll reach out by email before cutting a single sheet.",
              },
              {
                title: "Hand-pressed maple construction",
                body: "Every board is pressed from real maple veneer using the same molds and technique as pro-spec blanks. No injection-moulded shortcuts. The result has real concave, real kick, and rides like it should.",
              },
              {
                title: "Custom orders policy",
                body: "Because each board is built to your specification, custom orders are final sale unless the item arrives faulty — consistent with our standard returns policy. We'll always reach out before starting if something looks off.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-[#15171c] p-6"
              >
                <div className="mb-3 h-px w-8" style={{ background: VOLT }} />
                <h3 className="mb-2 text-base font-semibold">{card.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/10 bg-[#0e1013]">
          <div className="mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-20">
            <div className="mb-10">
              <span
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: VOLT }}
              >
                Questions
              </span>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                Frequently asked.
              </h2>
            </div>
            <div className="space-y-6">
              {[
                {
                  q: "What file formats do you accept?",
                  a: "JPG, PNG, WebP, HEIC/HEIF, PDF, SVG, AI (Illustrator), and EPS. Maximum 15 MB per file, up to 10 files per order. For best print quality, submit vector files (SVG, AI, EPS) or raster files at 300 dpi or higher at final print size.",
                },
                {
                  q: "What if my design isn't print-ready?",
                  a: "Don't worry — our team reviews every file before pressing starts. If resolution is too low, or a colour mode needs adjusting, we'll email you with specifics before touching the veneer. You can also tick 'I'd like design help' on the form and describe what you're going for instead of uploading a file.",
                },
                {
                  q: "How long does it take?",
                  a: "Standard production is 2–3 business days from order confirmation. Rush production (add $25) is 24–48 hours. Worldwide shipping is tracked and typically adds 7–13 business days depending on your location. We'll send a tracking link as soon as your board ships.",
                },
                {
                  q: "What deck sizes are available?",
                  a: "32mm, 34mm, and 36mm width — the same widths as our standard catalog. All three sizes get the same quality of construction. If you're not sure which size to pick, the 34mm is the most common all-round width.",
                },
                {
                  q: "What is the Select Hardwood Upgrade?",
                  a: "The standard build uses our stock maple veneer (the same material as our catalog blanks). The Select Hardwood Upgrade uses premium, hand-selected veneer sheets with tighter grain and better consistency — it costs $15 more and is worth it if you're building something for display or as a gift.",
                },
                {
                  q: "Can I order multiple boards?",
                  a: "Yes, up to 10 per order. The second board is 10% off its own unit price, and the third and above are 15% off each. The live price calculator in the form shows the exact breakdown before you check out.",
                },
                {
                  q: "What is your returns policy on custom orders?",
                  a: "Because every custom board is pressed to your exact spec, custom orders are final sale unless the item arrives faulty or incorrect. If something arrives wrong, email hello@fingerboardlab.com with a photo within 14 days and we'll sort it — same as our standard fault process.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-white/10 bg-[#15171c] p-6"
                >
                  <h3 className="mb-2 font-semibold text-[#f3f1ea]">
                    {item.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
