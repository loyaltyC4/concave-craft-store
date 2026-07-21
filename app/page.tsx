import { getCollectionProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import Footer from "components/layout/footer";
import { ProductCard } from "components/product-card";
import { COLLECTIONS, COLLECTION_IMAGE, GUIDES, VOLT } from "lib/brand";

export const metadata = {
  title: "Fingerboard Lab — Precision Fingerboard Hardware for Real Skating",
  description:
    "Pro fingerboard completes, hand-pressed maple decks, CNC concave molds, trucks, wheels, bearings, and wooden ramps — machined to ±0.1mm. Free sticker sheet in every box. Worldwide shipping, 30-day returns.",
  alternates: { canonical: "/" },
};

function priceNum(p: Product) {
  return parseFloat(p.priceRange.minVariantPrice.amount);
}

export default async function HomePage() {
  const [completes, decks, molds, hardware, ramps] = await Promise.all([
    getCollectionProducts({ collection: "starter-kits" }),
    getCollectionProducts({ collection: "decks" }),
    getCollectionProducts({ collection: "concave-molds" }),
    getCollectionProducts({ collection: "accessories" }),
    getCollectionProducts({ collection: "ramps-parks" }),
  ]);

  const counts: Record<string, number> = {
    "starter-kits": completes.length,
    decks: decks.length,
    "concave-molds": molds.length,
    accessories: hardware.length,
    "ramps-parks": ramps.length,
  };
  const totalProducts =
    completes.length +
    decks.length +
    molds.length +
    hardware.length +
    ramps.length;

  const featuredCompletes = [...completes]
    .sort((a, b) => priceNum(b) - priceNum(a))
    .slice(0, 8);
  const featuredMolds = molds.slice(0, 6);

  const specs = [
    "±0.1mm tolerance",
    "5-ply maple decks",
    "CNC concave molds",
    "500+ presses",
    "Free sticker sheet",
    "Worldwide shipping",
  ];

  function completeBadge(p: Product, i: number): string | undefined {
    if (i === 0) return "Staff pick";
    const price = priceNum(p);
    if (price >= 55) return "Pro";
    if (price <= 35) return "Great value";
    return undefined;
  }

  return (
    <div className="bg-[#0b0c0e] text-[#f3f1ea]">
      {/* HERO */}
      <section className="relative flex min-h-[86vh] items-center overflow-hidden">
        <Image
          src="/brand/hero.jpg"
          alt="Precision fingerboard mid-trick over a concrete ledge"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg,#0b0c0e 0%,rgba(11,12,14,.9) 34%,rgba(11,12,14,.45) 62%,rgba(11,12,14,.15) 100%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-12">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-7" style={{ background: VOLT }} />
              <span
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: VOLT }}
              >
                Engineered for real fingerboarding
              </span>
            </div>
            <h1 className="text-5xl font-semibold leading-[1.02] md:text-7xl">
              Precision <span style={{ color: VOLT }}>fingerboard</span>
              <br />
              hardware.
            </h1>
            <p className="mt-6 max-w-lg text-base text-neutral-300 md:text-lg">
              Pro completes, hand-pressed maple decks, CNC concave molds, and
              tuned hardware — machined to ±0.1mm for real skating, not the toy
              aisle.{" "}
              <span className="text-[#f3f1ea]">
                {totalProducts} products, dialed and ride-ready.
              </span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href="/search/starter-kits"
                className="rounded-full px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
                style={{ background: VOLT }}
              >
                Shop completes
              </Link>
              <Link
                href="/search"
                className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-[#f3f1ea] transition hover:border-[#c5f23c] hover:text-[#c5f23c]"
              >
                Explore the catalog →
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {[
                "±0.1mm tolerance",
                "Free sticker sheet",
                "30-day returns",
                "Worldwide shipping",
              ].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-2 text-[13px] text-neutral-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div
        className="overflow-hidden border-y border-white/10"
        style={{ background: VOLT }}
      >
        <div className="cc-marquee flex w-max gap-10 whitespace-nowrap py-3.5">
          {[...specs, ...specs].map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-10 text-[15px] font-semibold text-black"
            >
              {s} <span className="text-black/40">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* VALUE PROPS */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            [
              "Machined precision",
              "±0.1mm trucks & molds, tested for real feel",
            ],
            ["Real wood decks", "5-ply maple, pressed on true concave molds"],
            ["Ships ride-ready", "Assembled, tuned, dispatched in 1–2 days"],
            ["30-day returns", "Not feeling it? Send it back, no drama"],
          ].map(([t, d]) => (
            <div key={t}>
              <div className="mb-2 h-px w-8" style={{ background: VOLT }} />
              <h3 className="text-base font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-neutral-400">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPLETES RAIL */}
      <section className="mx-auto max-w-7xl px-6 pb-8 md:px-12">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: VOLT }}
            >
              Start here
            </span>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              Complete setups, dialed in.
            </h2>
            <p className="mt-3 max-w-md text-neutral-400">
              Assembled, tuned, and ride-ready out of the box — the fastest way
              onto a real board.
            </p>
          </div>
          <Link
            href="/search/starter-kits"
            className="hidden shrink-0 text-sm font-semibold text-neutral-300 hover:text-[#c5f23c] md:block"
          >
            View all →
          </Link>
        </div>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none]">
          {featuredCompletes.map((p, i) => (
            <div
              key={p.id}
              className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[28%]"
            >
              <ProductCard product={p} badge={completeBadge(p, i)} />
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="mb-10">
          <span
            className="text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: VOLT }}
          >
            Shop by category
          </span>
          <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
            Everything for the build.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((c, i) => (
            <Link
              key={c.handle}
              href={`/search/${c.handle}`}
              className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-3xl border border-white/10"
            >
              <Image
                src={COLLECTION_IMAGE[c.handle] ?? "/brand/hero.jpg"}
                alt={c.title}
                fill
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold">{c.title}</h3>
                <span
                  className="mt-1 inline-block text-[13px] font-semibold"
                  style={{ color: VOLT }}
                >
                  {counts[c.handle]} products →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BUILD-A-BOARD */}
      <section className="border-y border-white/10 bg-gradient-to-b from-[#0b0c0e] to-[#101216]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: VOLT }}
            >
              Build-a-board
            </span>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              Build your dream setup.
            </h2>
            <p className="mt-4 max-w-md text-neutral-400">
              Pick every part, or start from a complete and upgrade. Not sure
              where to begin? Our build guides walk you through it.
            </p>
            <ul className="mt-7 divide-y divide-white/10 border-y border-white/10">
              {[
                ["01", "Choose your deck", "32–36mm"],
                ["02", "Pick your trucks", "single / double"],
                ["03", "Dial in wheels", "CNC / urethane"],
                ["04", "Grip + tape", "foam / cut"],
                ["05", "Tune the bushings", "soft / hard"],
              ].map(([n, t, x]) => (
                <li key={n} className="flex items-center gap-4 py-3.5">
                  <span className="w-7 font-semibold" style={{ color: VOLT }}>
                    {n}
                  </span>
                  <span className="text-lg font-medium">{t}</span>
                  <span className="ml-auto text-sm text-neutral-500">{x}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/search/decks"
                className="rounded-full px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
                style={{ background: VOLT }}
              >
                Start with a deck
              </Link>
              <Link
                href="/guides/best-beginner-fingerboard-setup"
                className="text-sm font-semibold text-neutral-300 hover:text-[#c5f23c]"
              >
                Read the beginner guide →
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
            <Image
              src="/brand/collection-hardware.jpg"
              alt="Fingerboard hardware — trucks, wheels, bushings and tools"
              fill
              sizes="(min-width:768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* MOLDS / PRECISION SPOTLIGHT */}
      {featuredMolds.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
            <div>
              <span
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: VOLT }}
              >
                For the builders
              </span>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Press your own. Precision molds.
              </h2>
              <p className="mt-4 text-neutral-400">
                Every profile in the lineup — from shallow to deep concave,
                entry to full CNC metal. Consistent concave, every press. The
                serious builder&apos;s edge.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/search/concave-molds"
                  className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold transition hover:border-[#c5f23c] hover:text-[#c5f23c]"
                >
                  Explore molds →
                </Link>
                <Link
                  href="/guides/how-to-press-a-fingerboard-deck"
                  className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold transition hover:border-[#c5f23c] hover:text-[#c5f23c]"
                >
                  How to press a deck →
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {featuredMolds.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  sizes="(min-width:768px) 22vw, 44vw"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RAMPS BAND */}
      <section className="relative flex min-h-[56vh] items-end border-t border-white/10">
        <Image
          src="/brand/collection-ramps.jpg"
          alt="Wooden fingerboard ramp and rail obstacles"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg,rgba(8,9,11,.94),rgba(8,9,11,.4) 70%,transparent)",
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <div className="max-w-lg">
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: VOLT }}
            >
              Build the park
            </span>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              Set the scene.
            </h2>
            <p className="mt-4 text-neutral-300">
              Wooden ramps, rails, ledges, and full park sets — built for real
              skating, not display. Set them up on any flat surface and go.
            </p>
            <Link
              href="/search/ramps-parks"
              className="mt-7 inline-block rounded-full px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
              style={{ background: VOLT }}
            >
              Shop ramps & parks
            </Link>
          </div>
        </div>
      </section>

      {/* GUIDES TEASER */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: VOLT }}
            >
              Learn the craft
            </span>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              Guides from the Lab.
            </h2>
          </div>
          <Link
            href="/guides"
            className="hidden shrink-0 text-sm font-semibold text-neutral-300 hover:text-[#c5f23c] md:block"
          >
            All guides →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {GUIDES.slice(0, 3).map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group flex flex-col rounded-2xl border border-white/10 bg-[#15171c] p-6 transition hover:-translate-y-1 hover:border-[#c5f23c]/40"
            >
              <span
                className="text-xs font-semibold uppercase tracking-[0.16em]"
                style={{ color: VOLT }}
              >
                Guide
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-snug">
                {g.title}
              </h3>
              <span className="mt-auto pt-4 text-sm text-neutral-400 group-hover:text-[#c5f23c]">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* GUARANTEE BAND */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/10 md:grid-cols-4">
          {[
            ["±0.1mm", "machining tolerance"],
            ["30 days", "easy returns"],
            ["Worldwide", "fast dispatch"],
            ["Stripe", "encrypted checkout"],
          ].map(([big, lbl]) => (
            <div
              key={lbl}
              className="border border-white/10 bg-[#0b0c0e] p-8 text-center"
            >
              <div
                className="text-2xl font-semibold md:text-3xl"
                style={{ color: VOLT }}
              >
                {big}
              </div>
              <div className="mt-2 text-sm text-neutral-400">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
