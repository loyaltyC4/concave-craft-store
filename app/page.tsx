import { getCollectionProducts, getPicks } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import Footer from "components/layout/footer";
import { ProductCard } from "components/product-card";
import { NewsletterForm } from "components/newsletter-form";
import { Reveal } from "components/reveal";
import {
  MobileStickyCta,
  REVEAL_SENTINEL_ID,
  HIDE_SENTINEL_ID,
} from "components/mobile-sticky-cta";
import {
  COLLECTIONS,
  COLLECTION_IMAGE,
  FREE_SHIPPING_THRESHOLD,
  GUIDES,
  SHIPPING_FEE_USD,
  VOLT,
  WELCOME_DISCOUNT_CODE,
  WELCOME_DISCOUNT_LABEL,
} from "lib/brand";
import homepageData from "data/homepage.json";

export const metadata = {
  title: "Fingerboard Lab — Completes, Decks, Molds, Ramps & Parts",
  description:
    "Pro fingerboard completes, decks, trucks, wheels, park kits and the deck-pressing molds almost nobody stocks. Free build guides, prices in USD, 30-day returns.",
  alternates: { canonical: "/" },
};

function priceNum(p: Product) {
  return parseFloat(p.priceRange.minVariantPrice.amount);
}

// The three flagship categories that get the full editorial band treatment
// on desktop. Everything else drops into the compact scroll-strip below.
// Ordering: what a new visitor is most likely to buy, then the differentiator
// (custom-build stock we're one of few shops to carry).
const FEATURED_BAND_HANDLES = [
  "completes",
  "ramps-obstacles",
  "deck-building",
] as const;

const BAND_COPY: Record<
  (typeof FEATURED_BAND_HANDLES)[number],
  { eyebrow: string; body: string; ctaLabel: string }
> = {
  completes: {
    eyebrow: "Start riding today",
    body: "Ready-to-shred setups pressed on real maple with metal trucks, bearing wheels, and grip tape already dialed in. Skate it out of the box — or upgrade the parts one at a time.",
    ctaLabel: "Shop completes",
  },
  "ramps-obstacles": {
    eyebrow: "Set the scene",
    body: "Modular wooden ramps, rails and ledges built for real skating rather than display. Rearrange them into new lines, add a piece at a time, and film the results.",
    ctaLabel: "Shop obstacles",
  },
  "deck-building": {
    eyebrow: "For the builders",
    body: "Deck-pressing molds, maple veneer, alignment pins and scribes. Press your own decks from shallow to deep concave — almost nobody stocks the range, we stock it.",
    ctaLabel: "Explore molds",
  },
};

export default async function HomePage() {
  const collectionProducts = await Promise.all(
    COLLECTIONS.map((c) => getCollectionProducts({ collection: c.handle })),
  );
  const counts: Record<string, number> = {};
  COLLECTIONS.forEach((c, i) => {
    counts[c.handle] = collectionProducts[i]!.length;
  });
  const totalProducts = collectionProducts.reduce((n, p) => n + p.length, 0);

  const [topPicks, featuredMolds, proCompletes, parkPicks] = await Promise.all([
    getPicks("top_picks"),
    getPicks("molds"),
    getPicks("pro_completes"),
    getPicks("parks"),
  ]);

  const entry = (list: Product[]) =>
    list.length
      ? `$${Math.min(...list.map(priceNum))
          .toFixed(2)
          .replace(/\.00$/, "")}`
      : "";

  const specs = [
    `${totalProducts} products`,
    `Completes from ${entry(collectionProducts[0] ?? [])}`,
    "$12.95 USD flat shipping worldwide",
    `Free shipping over $${FREE_SHIPPING_THRESHOLD} USD`,
    "Deck molds & pressing supplies",
    "Free build guides",
    "Prices in USD",
    "30-day returns",
  ];

  /*
   * HERO LANES — the three states a visitor actually arrives in.
   *
   * Analytics context (Sept 2026): the homepage is only ~2% of the site's
   * search impressions but has its best click-through rate, i.e. the people
   * who land here are warm and just can't find their lane. 82% of sessions
   * never fire a 90%-scroll event, so anything the hero doesn't say is
   * effectively unsaid. Hence: self-identification above the fold rather
   * than a mood video, and real prices/counts rather than adjectives.
   *
   * Every number below is derived from the catalogue, never hardcoded. The
   * previous hero advertised "Kits from $34.99" while the cheapest park kit
   * was $47.95 — that drift is exactly what these helpers prevent.
   */
  const listOf = (handle: string) => {
    const i = COLLECTIONS.findIndex((c) => c.handle === handle);
    return i === -1 ? [] : (collectionProducts[i] ?? []);
  };
  const money = (n: number) => `$${n.toFixed(2).replace(/\.00$/, "")}`;
  const lowest = (...lists: Product[][]) => {
    const all = lists.flat();
    return all.length ? Math.min(...all.map(priceNum)) : 0;
  };
  const highest = (...lists: Product[][]) => {
    const all = lists.flat();
    return all.length ? Math.max(...all.map(priceNum)) : 0;
  };

  const HERO_LANES = [
    {
      href: "/search/completes",
      image: COLLECTION_IMAGE["completes"]!,
      alt: "Complete fingerboard setups on maple with alloy bearing trucks",
      eyebrow: "Start riding today",
      title: "Completes",
      body: "Pressed maple, metal trucks, bearing wheels and grip already dialled in. Skate it out of the box.",
      count: counts["completes"] ?? 0,
      from: lowest(listOf("completes")),
    },
    {
      href: "/search/ramps-obstacles",
      image: COLLECTION_IMAGE["ramps-obstacles"]!,
      alt: "Wooden fingerboard ramps, rails and ledges arranged as a park",
      eyebrow: "Build a park",
      title: "Ramps & kits",
      body: "Modular wooden ramps, rails and ledges built for real lines rather than the shelf. Add a piece at a time.",
      count: (counts["ramps-obstacles"] ?? 0) + (counts["park-kits"] ?? 0),
      from: lowest(listOf("ramps-obstacles"), listOf("park-kits")),
    },
    {
      href: "/search/deck-building",
      image: COLLECTION_IMAGE["deck-building"]!,
      alt: "Fingerboard press molds, maple veneer blanks and a marking scribe",
      eyebrow: "Press your own",
      title: "Molds & blanks",
      body: "Concave molds, maple veneer, alignment pins and scribes — shallow to deep. The range almost nobody else stocks.",
      count: counts["deck-building"] ?? 0,
      from: lowest(listOf("deck-building")),
    },
  ];

  const moldCeiling = highest(listOf("deck-building"));

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

  const customPromo = homepageData.custom_build_promo;

  // Secondary categories = everything not in the featured band list.
  const secondaryCategories = COLLECTIONS.filter(
    (c) => !FEATURED_BAND_HANDLES.includes(c.handle as any),
  );

  return (
    <div className="bg-[#0b0c0e] text-[#f3f1ea]">
      {/*
        HERO — self-identification, not browsing.
        ("Direction A", shipped 2026-09-15. Replaces a sticky 86vh
        background-video hero.)

        What changed and why:
        - The background video is gone. It was a dark, blurred macro loop of
          a thumb on a board: no product was visible, so a first-time
          visitor could not tell what this shop sells from the fold. An
          e-commerce hero has one job and that was not it.
        - Height roughly halved (content-height, ~60vh desktop, no 100vh
          sticky pin). 82% of sessions never reached the bottom of the page,
          so the old hero was a wall standing in front of 141 products.
        - One decision, three answers. Visitors arrive wanting to ride / to
          build a park / to press their own decks. Each lane is a real
          photo, a real entry price and a live product count.
        - Molds are surfaced for the first time. The site ranks for
          "fingerboard mold", "fingerboard press", "blank fingerboard decks"
          and "deep concave" — and stocks up to a ${moldCeiling} mold — yet
          the old hero never mentioned any of it.
        - The four trust claims used to appear three times on this page
          (announcement bar, hero chips, marquee). The hero's copy is now a
          single quiet line; the bar and marquee already carry the rest.

        Deliberately NOT sticky: .cc-hero-shell / .cc-hero-media / .cc-hero-lift
        in globals.css are still used elsewhere and are left untouched.
      */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 400px at 10% -12%, rgba(197,242,60,.10), transparent 70%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-12 md:px-12 md:py-16">
          <Reveal direction="up">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-7" style={{ background: VOLT }} />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em] md:text-xs"
                style={{ color: VOLT }}
              >
                {totalProducts} products · free build guides
                {moldCeiling ? ` · molds to ${money(moldCeiling)}` : ""}
              </span>
            </div>

            <h1 className="max-w-[18ch] text-[38px] font-semibold leading-[1.02] md:text-[60px]">
              Where are you in your <span style={{ color: VOLT }}>build?</span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-neutral-300 md:text-lg">
              Ride it out of the box, build a park you can actually skate, or
              press your own decks from raw maple. Pick the one that&apos;s you.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-4 md:mt-10 md:grid-cols-3">
            {HERO_LANES.map((lane, i) => (
              <Link
                key={lane.href}
                href={lane.href}
                prefetch={true}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#15171c] transition duration-300 hover:-translate-y-1 hover:border-[#c5f23c]/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0e1013]">
                  <Image
                    src={lane.image}
                    alt={lane.alt}
                    fill
                    priority={i === 0}
                    sizes="(min-width:768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.17em]"
                    style={{ color: VOLT }}
                  >
                    {lane.eyebrow}
                  </span>
                  <h2 className="mt-2 text-xl font-semibold">{lane.title}</h2>
                  <p className="mt-2 pb-4 text-[13px] leading-relaxed text-neutral-400">
                    {lane.body}
                  </p>
                  {/* mt-auto, not mt-4: the three lanes have different body
                      lengths (the molds copy runs to three lines at 1280px),
                      so a fixed top margin left the third card's price row
                      sitting ~20px below the other two. */}
                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3.5">
                    <span className="text-[13px] font-semibold text-[#f3f1ea]">
                      From {money(lane.from)}
                    </span>
                    <span className="text-[12px] font-semibold text-[#c5f23c]">
                      {lane.count} products →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-neutral-400">
            <span>
              <span className="font-semibold text-[#c5f23c]">
                ${SHIPPING_FEE_USD}
              </span>{" "}
              flat worldwide
            </span>
            <span>
              <span className="font-semibold text-[#c5f23c]">Free</span>{" "}
              shipping over ${FREE_SHIPPING_THRESHOLD}
            </span>
            <span>
              <span className="font-semibold text-[#c5f23c]">30-day</span>{" "}
              returns
            </span>
            <span>
              <span className="font-semibold text-[#c5f23c]">
                {WELCOME_DISCOUNT_LABEL}
              </span>{" "}
              with{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[12px] tracking-wide text-[#f3f1ea]">
                {WELCOME_DISCOUNT_CODE}
              </code>
            </span>
          </div>
        </div>
      </section>

      {/*
        Reveal sentinel — the mobile sticky CTA becomes visible once the
        user scrolls past this point (below the hero copy). See
        components/mobile-sticky-cta.tsx.
      */}
      <span id={REVEAL_SENTINEL_ID} aria-hidden="true" />

      {/* MARQUEE — kept from previous design; it's the store's "as seen in" moment.
          Was black text on the volt background — reported unreadable, so flipped
          to the site's dark ink with bold volt-green text (the same
          high-contrast pairing used for every other accent/label on the page)
          instead of black-on-lime. */}
      <div className="overflow-hidden border-y border-white/10 bg-[#0b0c0e]">
        <div className="cc-marquee flex w-max gap-10 whitespace-nowrap py-3.5">
          {[...specs, ...specs].map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-10 text-[15px] font-bold"
              style={{ color: VOLT }}
            >
              {s} <span style={{ color: "#f3f1ea", opacity: 0.35 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* THIS WEEK'S PICKS — near top so the first product moment
          lands before we ask the user to make a category choice. */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-8 md:px-12 md:pt-24">
        <Reveal
          direction="up"
          className="mb-10 flex items-end justify-between gap-6"
        >
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: VOLT }}
            >
              Just dropped
            </span>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              This week&apos;s picks.
            </h2>
            <p className="mt-3 max-w-md text-neutral-400">
              Recent additions — press molds, collab completes,
              race-grade wheels and park sets. One of each, low to high.
            </p>
          </div>
          <Link
            href="/search"
            className="hidden shrink-0 text-sm font-semibold text-neutral-300 hover:text-[#c5f23c] md:block"
          >
            View all →
          </Link>
        </Reveal>
        <div className="cc-hscroll flex gap-5 overflow-x-auto pb-4">
          {topPicks.map((p, i) => (
            <Reveal
              key={p.id}
              direction="up"
              delay={i * 60}
              className="cc-hscroll-item w-[78%] shrink-0 sm:w-[44%] lg:w-[28%]"
            >
              <ProductCard product={p} badge={pickBadge(p, i)} />
            </Reveal>
          ))}
        </div>
      </section>

      {/*
        EDITORIAL BANDS — three flagship categories, each with its own
        full-width moment. Alternates side on desktop for rhythmic pacing;
        stacks vertically on mobile.
      */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-12 md:py-20">
        <Reveal direction="up" className="mb-12 max-w-2xl md:mb-16">
          <span
            className="text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: VOLT }}
          >
            The range
          </span>
          <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
            Everything for the build.
          </h2>
          <p className="mt-3 text-neutral-400 md:text-base">
            Start with a complete, add a ramp, or press your own from raw maple.
            Three places to begin — pick where you are.
          </p>
        </Reveal>

        <div className="space-y-16 md:space-y-24">
          {FEATURED_BAND_HANDLES.map((handle, i) => {
            const c = COLLECTIONS.find((x) => x.handle === handle);
            if (!c) return null;
            const copy = BAND_COPY[handle];
            const flipRight = i % 2 === 1;
            return (
              <div
                key={handle}
                className="cc-band grid items-center gap-8 md:grid-cols-12 md:gap-14"
              >
                <Reveal
                  direction={flipRight ? "left" : "right"}
                  className={`md:col-span-7 ${flipRight ? "md:order-2" : ""}`}
                >
                  <Link
                    href={`/search/${handle}`}
                    className="group block"
                    aria-label={`Shop ${c.title}`}
                  >
                    <div className="cc-band-media">
                      <Image
                        src={COLLECTION_IMAGE[handle] ?? "/brand/hero.jpg"}
                        alt={c.title}
                        fill
                        unoptimized
                        sizes="(min-width:768px) 55vw, 90vw"
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  </Link>
                </Reveal>
                <Reveal
                  direction={flipRight ? "right" : "left"}
                  className={`md:col-span-5 ${flipRight ? "md:order-1" : ""}`}
                >
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{ color: VOLT }}
                  >
                    {copy.eyebrow}
                  </span>
                  <h3 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
                    {c.title}.
                  </h3>
                  <p className="mt-4 text-neutral-400 md:text-base">
                    {copy.body}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/search/${handle}`}
                      className="rounded-full px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110"
                      style={{ background: VOLT }}
                    >
                      {copy.ctaLabel}
                    </Link>
                    <span className="text-sm text-neutral-500">
                      {counts[handle] ?? 0} products
                    </span>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/*
        SECONDARY CATEGORY STRIP — the remaining 7 categories. Horizontal
        scroll on mobile (thumb-swipe), tidy grid on desktop. Cards get a
        staggered fade-in as the strip enters view.
      */}
      <section className="border-y border-white/10 bg-[#0e1013] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal
            direction="up"
            className="mb-10 flex items-end justify-between gap-6"
          >
            <div>
              <span
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: VOLT }}
              >
                Parts &amp; kits
              </span>
              <h2 className="mt-3 text-2xl font-semibold md:text-4xl">
                Shop by category.
              </h2>
            </div>
            <Link
              href="/search"
              className="hidden shrink-0 text-sm font-semibold text-neutral-300 hover:text-[#c5f23c] md:block"
            >
              All categories →
            </Link>
          </Reveal>

          {/* Desktop: 4-across grid. Mobile: 2-across grid. Removes horizontal
              scroll for this row — 7 items fit two-column comfortably at
              phone widths and free-scroll is reserved for the "picks" rail
              where the user is expected to swipe. */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {secondaryCategories.map((c, i) => (
              <Reveal key={c.handle} direction="up" delay={i * 50}>
                <Link
                  href={`/search/${c.handle}`}
                  className="group relative flex h-40 flex-col justify-end overflow-hidden rounded-2xl border border-white/10 md:h-56"
                >
                  <Image
                    src={COLLECTION_IMAGE[c.handle] ?? "/brand/hero.jpg"}
                    alt={c.title}
                    fill
                    unoptimized
                    sizes="(min-width:1024px) 22vw, (min-width:640px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative p-4 md:p-6">
                    <h3 className="text-base font-semibold md:text-lg">
                      {c.title}
                    </h3>
                    <span
                      className="mt-1 inline-block text-[12px] font-semibold md:text-[13px]"
                      style={{ color: VOLT }}
                    >
                      {counts[c.handle]} products →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM BUILD PROMO — a differentiator tier: not just parts, but
          your artwork on real maple. Placed after category clarity. */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
        <Reveal direction="up">
          <Link
            href={customPromo.cta_href}
            className="group relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl border border-[#c5f23c]/30 bg-gradient-to-br from-[#15171c] to-[#0b0c0e] p-8 transition hover:border-[#c5f23c]/60 md:flex-row md:items-center md:p-12"
          >
            <div
              className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full opacity-10 blur-3xl"
              style={{ background: VOLT }}
            />
            <div className="relative max-w-xl">
              <span
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: VOLT }}
              >
                {customPromo.subheading}
              </span>
              <h2 className="mt-3 text-2xl font-semibold md:text-4xl">
                {customPromo.heading}
              </h2>
              <p className="mt-3 text-neutral-400 md:text-base">
                {customPromo.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {customPromo.badges.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] font-medium text-neutral-300"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative shrink-0">
              <span
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-black transition group-hover:brightness-110"
                style={{ background: VOLT }}
              >
                {customPromo.cta_label}
                <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/*
        BUILD-A-BOARD — five-step lockup with progressive reveal. The list
        items enter one at a time so the eye reads the sequence rather than
        scanning it as a block.
      */}
      <section className="border-y border-white/10 bg-gradient-to-b from-[#0b0c0e] to-[#101216]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28">
          <Reveal direction="right">
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
              ].map(([n, t, x], i) => (
                <Reveal
                  key={n}
                  as="li"
                  direction="up"
                  delay={i * 90}
                  className="flex items-center gap-4 py-3.5"
                >
                  <span className="w-7 font-semibold" style={{ color: VOLT }}>
                    {n}
                  </span>
                  <span className="text-lg font-medium">{t}</span>
                  <span className="ml-auto text-sm text-neutral-500">{x}</span>
                </Reveal>
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
          </Reveal>
          <Reveal
            direction="left"
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10"
          >
            <Image
              src="/brand/collection-hardware.jpg"
              alt="Fingerboard hardware — trucks, wheels, bushings and tools"
              fill
              sizes="(min-width:768px) 45vw, 90vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* PRO COMPLETES — aspirational anchor. Collab and limited-run boards
          set the top of the range, which makes the mid-range read as sensible. */}
      {proCompletes.length > 0 && (
        <section className="bg-[#0e1013]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24">
            <Reveal
              direction="up"
              className="mb-10 flex items-end justify-between gap-6"
            >
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
            </Reveal>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {proCompletes.map((p, i) => (
                <Reveal key={p.id} direction="up" delay={i * 70}>
                  <ProductCard
                    product={p}
                    sizes="(min-width:1024px) 22vw, 44vw"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/*
        PARK BAND — cinematic full-width photo band. Keeps a moment of pure
        image after several product-dense sections so the eye rests before
        the guides teaser. Ships identically on mobile at a shorter height.
      */}
      <section className="relative flex min-h-[52vh] items-end border-t border-white/10 md:min-h-[62vh]">
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
          <Reveal direction="up" className="max-w-lg">
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
              Modular ramps, rails, ledges and full park sets in wood and alloy
              — built for real skating, not display. Rearrange them into new
              lines and add a piece at a time.
            </p>
            <Link
              href="/search/park-kits"
              className="mt-7 inline-block rounded-full px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
              style={{ background: VOLT }}
            >
              Shop park kits
            </Link>
          </Reveal>

          {parkPicks.length > 0 && (
            <div className="mt-12 grid grid-cols-3 gap-3 md:max-w-2xl md:gap-4">
              {parkPicks.map((p, i) => (
                <Reveal key={p.id} direction="up" delay={i * 60}>
                  <ProductCard
                    product={p}
                    sizes="(min-width:768px) 20vw, 30vw"
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GUIDES TEASER */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24">
        <Reveal
          direction="up"
          className="mb-10 flex items-end justify-between gap-6"
        >
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
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {GUIDES.slice(0, 3).map((g, i) => (
            <Reveal key={g.slug} direction="up" delay={i * 90}>
              <Link
                href={`/guides/${g.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#15171c] p-6 transition hover:-translate-y-1 hover:border-[#c5f23c]/40"
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
            </Reveal>
          ))}
        </div>
      </section>

      {/* WELCOME OFFER */}
      <section className="mx-auto max-w-7xl px-6 pb-4 md:px-12">
        <Reveal direction="up">
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
        </Reveal>
      </section>

      {/* GUARANTEE BAND */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <Reveal direction="up">
          <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/10 md:grid-cols-4">
            {[
              [String(totalProducts), "products"],
              ["30 days", "returns window"],
              ["7–14 days", "worldwide delivery"],
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
        </Reveal>
      </section>

      {/* Hide sentinel — the mobile sticky CTA disappears once this is in
          view, so it never overlaps the footer's newsletter/links. */}
      <span id={HIDE_SENTINEL_ID} aria-hidden="true" />

      <Footer />

      <MobileStickyCta
        primaryHref="/search/park-kits"
        primaryLabel="Shop park kits"
        secondaryHref="/custom"
        secondaryLabel="Custom build"
      />
    </div>
  );
}
