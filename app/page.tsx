import { getCollections, getProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Concave Craft — Precision Fingerboard Hardware",
  description:
    "Precision-machined fingerboard trucks, hand-pressed decks, concave molds, wheels, ramps, and technical hardware for serious players. Free sticker sheet in every box.",
};

const LIME = "#c5f23c";

function fmt(amount: string, code: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: code }).format(
    parseFloat(amount),
  );
}

// Keyword categorisation mapped to the store's real collection handles
function catOf(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("mold") || t.includes("veneer")) return "concave-molds";
  if (/ramp|rail|obstacle| park|pipe|kicker|ledge|stairs|course|tabletop|dining table|brick wall|marble wall|skatepark/.test(t))
    return "ramps-parks";
  if (t.includes("complete") || t.includes(" set") || t.endsWith("set") || t.includes("diy kit"))
    return "starter-kits";
  if (t.includes("deck")) return "decks";
  return "accessories";
}

function ProductCard({ product, badge }: { product: Product; badge?: string }) {
  const price = product.priceRange.minVariantPrice;
  const img = product.featuredImage?.url;
  return (
    <Link
      href={`/product/${product.handle}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#15171c] transition duration-300 hover:-translate-y-1.5 hover:border-white/25"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        {img ? (
          <Image
            src={img}
            alt={product.featuredImage?.altText || product.title}
            fill
            sizes="(min-width:1040px) 28vw, (min-width:680px) 44vw, 80vw"
            className="object-contain p-[9%] transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-neutral-400">
            No image
          </div>
        )}
        {badge ? (
          <span
            className="absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black"
            style={{ background: LIME }}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="line-clamp-2 text-[15px] font-medium leading-snug text-[#f3f1ea]">
            {product.title}
          </h3>
          <span className="shrink-0 font-semibold" style={{ color: LIME }}>
            {fmt(price.amount, price.currencyCode)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const [products, collections] = await Promise.all([getProducts({}), getCollections()]);

  const byCat = (h: string) => products.filter((p) => catOf(p.title) === h);
  const completes = byCat("starter-kits")
    .sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount))
    .slice(0, 8);
  const molds = byCat("concave-molds")
    .sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount))
    .slice(0, 3);

  const catMeta = [
    { handle: "starter-kits", title: "Completes & Setups" },
    { handle: "decks", title: "Decks" },
    { handle: "concave-molds", title: "Fingerboard Molds" },
    { handle: "accessories", title: "Hardware & Tools" },
    { handle: "ramps-parks", title: "Ramps & Parks" },
  ].map((c) => {
    const items = byCat(c.handle);
    const known = collections.find((x) => x.handle === c.handle);
    return {
      ...c,
      title: known?.title || c.title,
      count: items.length,
      img: items[0]?.featuredImage?.url,
    };
  });

  const specs = ["±0.1mm tolerance", "45# steel construction", "6 concave profiles", "500+ presses", "global dispatch", "free sticker sheet"];

  return (
    <div className="bg-[#0b0c0e] text-[#f3f1ea]">
      {/* HERO */}
      <section
        className="relative flex min-h-[88vh] items-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(90deg,#0b0c0e 0%,rgba(11,12,14,.86) 36%,rgba(11,12,14,.35) 64%,rgba(11,12,14,.12) 100%), url('/cc-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-7" style={{ background: LIME }} />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: LIME }}>
                Built for real fingerboarding
              </span>
            </div>
            <h1 className="text-5xl font-semibold leading-[1.02] md:text-7xl">
              Precision
              <br />
              <span style={{ color: LIME }}>fingerboard</span> hardware.
            </h1>
            <p className="mt-6 max-w-lg text-base text-neutral-400 md:text-lg">
              Precision-machined trucks, hand-pressed decks, concave molds, and technical hardware for serious players.{" "}
              <span className="text-[#f3f1ea]">{products.length} products, dialed for real skating.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href="/search/starter-kits"
                className="rounded-full px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
                style={{ background: LIME }}
              >
                Shop completes
              </Link>
              <Link
                href="/search"
                className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-[#f3f1ea] transition hover:border-[#c5f23c] hover:text-[#c5f23c]"
              >
                Shop all gear →
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {["±0.1mm tolerance", "45# steel trucks", "6 concave profiles", "global dispatch"].map((c) => (
                <span key={c} className="rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-2 text-[13px] text-neutral-300">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
        <img
          src="/cc-mascot.jpg"
          alt=""
          aria-hidden
          className="cc-float pointer-events-none absolute bottom-[8%] right-[6vw] hidden w-[clamp(110px,13vw,170px)] rounded-2xl drop-shadow-2xl lg:block"
        />
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-white/10" style={{ background: LIME }}>
        <div className="cc-marquee flex w-max gap-10 whitespace-nowrap py-3.5">
          {[...specs, ...specs].map((s, i) => (
            <span key={i} className="flex items-center gap-10 text-[15px] font-semibold text-black">
              {s} <span className="text-black/40">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* COMPLETES RAIL */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: LIME }}>
              Ready to rip
            </span>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Complete setups, dialed in.</h2>
            <p className="mt-3 max-w-md text-neutral-400">
              Assembled, tuned, and ride-ready out of the box. The fastest way onto a real board.
            </p>
          </div>
          <Link href="/search/starter-kits" className="hidden shrink-0 text-sm font-semibold text-neutral-300 hover:text-[#c5f23c] md:block">
            View all →
          </Link>
        </div>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none]">
          {completes.map((p, i) => (
            <div key={p.id} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[28%]">
              <ProductCard product={p} badge={i === 0 ? "Top rated" : parseFloat(p.priceRange.minVariantPrice.amount) >= 50 ? "Pro" : undefined} />
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-12 md:pb-28">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: LIME }}>
            Shop the catalog
          </span>
          <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Everything for the build.</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {catMeta.map((c) => (
            <Link
              key={c.handle}
              href={`/search/${c.handle}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#15171c] transition duration-300 hover:-translate-y-1.5 hover:border-[#c5f23c]"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-100">
                {c.img ? (
                  <Image src={c.img} alt={c.title} fill sizes="20vw" className="object-contain p-[14%] transition-transform duration-500 group-hover:scale-105" />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-[15px] font-semibold text-[#f3f1ea]">{c.title}</h3>
                <span className="mt-auto pt-3 text-[13px] font-semibold" style={{ color: LIME }}>
                  {c.count} products →
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
            <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: LIME }}>
              Build-a-board
            </span>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Build your dream setup.</h2>
            <p className="mt-4 max-w-md text-neutral-400">
              Pick every part. We assemble, tune, and ship it ride-ready, mixed and matched until it is unmistakably yours.
            </p>
            <ul className="mt-7 divide-y divide-white/10 border-y border-white/10">
              {[
                ["01", "Choose your deck", "32-36mm"],
                ["02", "Pick your trucks", "V3 / A2"],
                ["03", "Dial in wheels", "CNC / urethane"],
                ["04", "Grip + tape", "foam / cut"],
                ["05", "Sticker it up", "free sheet"],
              ].map(([n, t, x]) => (
                <li key={n} className="flex items-center gap-4 py-3.5">
                  <span className="w-7 font-semibold" style={{ color: LIME }}>{n}</span>
                  <span className="text-lg font-medium">{t}</span>
                  <span className="ml-auto text-sm text-neutral-500">{x}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link href="/search" className="rounded-full px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110" style={{ background: LIME }}>
                Start building
              </Link>
              <span className="rounded-full border px-4 py-2 text-sm font-semibold" style={{ borderColor: "rgba(197,242,60,.35)", color: LIME }}>
                Save 15% on custom completes
              </span>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(120%_80%_at_60%_30%,#1c2128,#0b0c0e)]">
            {completes[1]?.featuredImage?.url || molds[0]?.featuredImage?.url ? (
              <Image
                src={(completes[1]?.featuredImage?.url || molds[0]?.featuredImage?.url)!}
                alt="Build your setup"
                fill
                sizes="(min-width:768px) 40vw, 90vw"
                className="object-contain p-12 drop-shadow-2xl"
              />
            ) : null}
          </div>
        </div>
      </section>

      {/* MOLDS SPOTLIGHT */}
      {molds.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: LIME }}>
                For the builders
              </span>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Press your own. Precision molds.</h2>
              <p className="mt-4 text-neutral-400">
                Every profile in the lineup, from entry ABS to full CNC metal. Consistent concave, every press. The serious builder&apos;s edge.
              </p>
              <Link href="/search/concave-molds" className="mt-6 inline-block rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold transition hover:border-[#c5f23c] hover:text-[#c5f23c]">
                Explore molds →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {molds.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RAMPS BAND */}
      <section
        className="relative flex min-h-[58vh] items-end border-t border-white/10"
        style={{
          backgroundImage:
            "linear-gradient(90deg,rgba(8,9,11,.92),rgba(8,9,11,.3) 70%,transparent), url('/cc-ramp.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <div className="max-w-lg">
            <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: LIME }}>
              Build the park
            </span>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Set the scene.</h2>
            <p className="mt-4 text-neutral-300">
              Wooden ramps, rails, ledges, and full park sets. Built for real skating, not display. Set them up on any flat surface and go.
            </p>
            <Link href="/search/ramps-parks" className="mt-7 inline-block rounded-full px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110" style={{ background: LIME }}>
              Shop ramps & parks
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 md:grid-cols-4">
          {[
            [`${products.length}`, "products in stock"],
            ["±0.1mm", "machining tolerance"],
            ["6", "concave profiles"],
            ["Worldwide", "dispatch, sticker in every box"],
          ].map(([big, lbl], i) => (
            <div key={i} className="border border-white/10 bg-[#0b0c0e] p-8 text-center">
              <div className="text-3xl font-semibold md:text-4xl" style={{ color: LIME }}>{big}</div>
              <div className="mt-2 text-sm text-neutral-400">{lbl}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
