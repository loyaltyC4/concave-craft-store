import { getCollectionProducts, getPicks } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import Footer from "components/layout/footer";
import { ProductCard } from "components/product-card";
import { HeroVideo } from "components/hero-video";
import { NewsletterForm } from "components/newsletter-form";
import { COLLECTIONS, COLLECTION_IMAGE, GUIDES, VOLT } from "lib/brand";

export const metadata = {
  title: "Fingerboard Lab — Completes, Decks, Molds, Ramps & Parts",
  description:
    "Pro fingerboard completes, decks, trucks, wheels, park kits and the deck-pressing molds almost nobody stocks. Hand-picked, free build guides, 30-day returns.",
  alternates: { canonical: "/" },
};

function priceNum(p: Product) {
  return parseFloat(p.priceRange.minVariantPrice.amount);
}

export default async function HomePage() {
  // Real counts for every collection, so the category tiles never lie.
  const collectionProducts = await Promise.all(
    COLLECTIONS.map((c) => getCollectionProducts({ collection: c.handle })),
  );
  const counts: Record<string, number> = {};
  COLLECTIONS.forEach((c, i) => {
    counts[c.handle] = collectionProducts[i]!.length;
  });
  const totalProducts = collectionProducts.reduce((n, p) => n + p.length, 0);

  // Hand-curated editorial slots (data/homepage.json) rather than
  // "cheapest few in a collection", which is what used to run here.
  const [topPicks, featuredMolds, proCompletes, parkPicks] = await Promise.all([
    getPicks("top_picks"),
    getPicks("molds"),
    getPicks("pro_completes"),
    getPicks("parks"),
  ]);

  const entry = (list: Product[]) =>
    list.length
      ? `$${Math.min(...list.map(priceNum)).toFixed(2).replace(/\.00$/, "")}`
      : "";

  const specs = [
    `${totalProducts} products in stock`,
    `Completes from ${entry(collectionProducts[0] ?? [])}`,
    "Deck molds & pressing supplies",
    "Free build guides",
    "Free sticker sheet",
    "30-day returns",
  ];

  function pickBadge(p: Product, i: number): string | undefined {
    if (i === 0) return "Editor's pick";
    const t = p.title.toLowerCase();
    if (t.includes("mold") || t.includes("scribe")) return "Build your own";
    if (t.includes("collab")) return "Limited";
    if (t.includes("park")) return "Best seller";
    const price = priceNum(p);
    if (price >= 60) return "Pro";
    if (price <= 30) return "Great value";
    return undefined;
  }

  return (
    <div className="bg-[#0b0c0e] text-[#f3f1ea]">
      {/* HERO */}
      <section className="relative flex min-h-[86vh] items-center overflow-hidden">
        <Image
          src="/brand/hero.jpg"
          alt="A hand riding a precision fingerboard on a wooden desk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <HeroVideo
          src="/brand/hero-loop.mp4"
          className="absolute inset-0 h-full w-full object-cover object-right"
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
                Build a park you can actually skate
              </span>
            </div>
            <h1 className="text-5xl font-semibold leading-[1.02] md:text-7xl">
              Fingerboard <span style={{ color: VOLT }}>parks</span>,
              <br />
              ramps &amp; gear.
            </h1>
            <p className="mt-6 max-w-lg text-base text-neutral-300 md:text-lg">
              Completes, decks, molds, park sets and parts — hand-picked,
              honestly priced, and backed by free build guides.{" "}
              <span className="text-[#f3f1ea]">
                {totalProducts} products, nothing filler.
              </span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href="/search/park-kits"
                className="rounded-full px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
                style={{ background: VOLT }}
              >
                Shop park kits
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
                "Kits from $34.99",
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
            ["Curated, not cluttered", "25 products we'd actually skate — no filler"],
            ["Honest about what it is", "Real specs, no invented engineering claims"],
            ["Free build guides", "13 guides + a full glossary, free to read"],
            ["30-day returns", "Not feeling it? Send it back, no drama"],
          ].map(([t, d]) => (
            <div key={t}>
              <div className="mb-2 h-px w-8" style={{ background: VOLT }} />
              <h2 className="text-base font-semibold">{t}</h2>
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
              New in
            </span>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              This week&apos;s picks.
            </h2>
            <p className="mt-3 max-w-md text-neutral-400">
              Hand-picked from what just landed — press molds, collab completes,
              race-grade wheels and park sets. One of each, low to high.
            </p>
          </div>
          <Link
            href="/search"
            className="hidden shrink-0 text-sm font-semibold text-neutral-300 hover:text-[#c5f23c] md:block"
          >
            View all →
          </Link>
        </div>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none]">
          {topPicks.map((p, i) => (
            <div
              key={p.id}
              className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[28%]"
            >
              <ProductCard product={p} badge={pickBadge(p, i)} />
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
                Press your own decks: shallow through deep concave, three- and
                four-piece sets, alignment pins and marking jigs, plus maple
                veneer to press. Almost nobody stocks this — we stock the range.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/search/deck-building"
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
            <div className="grid grid-cols-2 gap-4">
              {featuredMolds.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  sizes="(min-width:768px) 28vw, 44vw"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRO COMPLETES — aspirational anchor. Collab and limited-run boards set
          the top of the range, which makes the mid-range read as sensible. */}
      {proCompletes.length > 0 && (
        <section className="border-y border-white/10 bg-[#0e1013]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ color: VOLT }}
                >
                  Collabs &amp; limited runs
                </span>
                <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                  The boards worth keeping.
                </h2>
                <p className="mt-3 max-w-lg text-neutral-400">
                  Pro maple, real bearing wheels, and graphics that came from a
                  collaboration rather than a catalogue. Built to be skated, and
                  worth putting on a shelf when you are not.
                </p>
              </div>
              <Link
                href="/search/completes"
                className="hidden shrink-0 text-sm font-semibold text-neutral-300 hover:text-[#c5f23c] md:block"
              >
                All completes →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {proCompletes.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  sizes="(min-width:1024px) 22vw, 44vw"
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
              Modular ramps, rails, ledges and full park sets in wood and alloy —
              built for real skating, not display. Rearrange them into new lines
              and add a piece at a time.
            </p>
            <Link
              href="/search/park-kits"
              className="mt-7 inline-block rounded-full px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
              style={{ background: VOLT }}
            >
              Shop park kits
            </Link>
          </div>

          {parkPicks.length > 0 && (
            <div className="mt-12 grid grid-cols-3 gap-4 md:max-w-2xl">
              {parkPicks.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  sizes="(min-width:768px) 20vw, 30vw"
                />
              ))}
            </div>
          )}
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

      {/* WELCOME OFFER */}
      <section className="mx-auto max-w-7xl px-6 pb-4 md:px-12">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-[#c5f23c]/25 bg-gradient-to-br from-[#15171c] to-[#0b0c0e] p-8 text-center md:flex-row md:justify-between md:p-10 md:text-left">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: VOLT }}
            >
              Join the drop list
            </span>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              Get 10% off your first order.
            </h2>
            <p className="mt-2 max-w-md text-sm text-neutral-400">
              Restocks, new molds, and build tips — no spam, unsubscribe
              anytime.
            </p>
          </div>
          <NewsletterForm source="homepage" />
        </div>
      </section>

      {/* GUARANTEE BAND */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/10 md:grid-cols-4">
          {[
            ["25", "hand-picked products"],
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
