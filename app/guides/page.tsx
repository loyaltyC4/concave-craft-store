import Footer from "components/layout/footer";
import { allGuides } from "lib/all-guides";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fingerboard Guides — Sizing, Building & Tuning",
  description:
    "Expert fingerboard guides from the Lab: deck sizing (32 vs 34 vs 36mm), concave, choosing trucks, tuning bushings, pressing decks, and beginner setups.",
  alternates: { canonical: "/guides" },
};

export default function GuidesHub() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-7 bg-[#c5f23c]" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c5f23c]">
            Learn the craft
          </span>
        </div>
        <h1 className="max-w-3xl text-4xl font-semibold md:text-5xl">
          Fingerboard guides from the Lab.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-400">
          Straight answers on sizing, concave, trucks, bushings, and pressing
          your own decks — written by people who actually skate them.
        </p>

        <Link
          href="/glossary"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-neutral-300 transition hover:border-[#c5f23c]/50 hover:text-[#c5f23c]"
        >
          Not sure what a term means? Check the glossary →
        </Link>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {allGuides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group flex flex-col rounded-3xl border border-white/10 bg-[#15171c] p-7 transition hover:-translate-y-1 hover:border-[#c5f23c]/40"
            >
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#c5f23c]">
                <span>{g.category}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-500">
                  {g.readMinutes} min read
                </span>
              </div>
              <h2 className="mt-3 text-xl font-semibold leading-snug">
                {g.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
                {g.metaDescription}
              </p>
              <span className="mt-auto pt-5 text-sm font-semibold text-neutral-300 group-hover:text-[#c5f23c]">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
