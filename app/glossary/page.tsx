import Footer from "components/layout/footer";
import { glossaryTerms } from "lib/glossary-data";
import { SITE_NAME } from "lib/brand";
import { baseUrl } from "lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fingerboard Glossary — Every Term Explained",
  description:
    "A plain-English glossary of fingerboard terms: baseplate, bushing, concave, durometer, kingpin, pivot cup, wheelbase, and more — defined in one place.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: `${SITE_NAME} Fingerboard Glossary`,
    description:
      "Definitions of core fingerboard terminology — decks, trucks, bushings, and tuning vocabulary.",
    url: `${baseUrl}/glossary`,
    hasDefinedTerm: glossaryTerms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      url: `${baseUrl}/glossary#${t.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(definedTermSetJsonLd),
        }}
      />

      <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-7 bg-[#c5f23c]" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c5f23c]">
            Reference
          </span>
        </div>
        <h1 className="text-4xl font-semibold md:text-5xl">
          The fingerboard glossary.
        </h1>
        <p className="mt-4 text-lg text-neutral-400">
          Every term you&apos;ll hit while shopping or building — defined
          plainly, in one place.
        </p>

        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {glossaryTerms.map((t) => (
            <div
              key={t.slug}
              id={t.slug}
              className="py-6 target:bg-white/[0.03]"
            >
              <h2 className="text-lg font-semibold text-[#f3f1ea]">{t.term}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-300">
                {t.definition}
              </p>
              {t.longDescription ? (
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {t.longDescription}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-br from-[#15171c] to-[#0b0c0e] p-8 text-center">
          <h2 className="text-2xl font-semibold">Ready to put it to use?</h2>
          <p className="mt-2 text-neutral-400">
            Read the build guides or go straight to the gear.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/guides"
              className="rounded-full bg-[#c5f23c] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            >
              Read the guides
            </Link>
            <Link
              href="/search"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-[#c5f23c] hover:text-[#c5f23c]"
            >
              Shop the catalog
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
