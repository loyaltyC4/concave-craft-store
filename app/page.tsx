import { getCollections, getProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Concave Craft — Precision Fingerboard Hardware',
  description: 'Professional fingerboard trucks, decks, completes and hardware. Engineered for real play.',
};

function ProductCard({ product }: { product: Product }) {
  const price = product.priceRange.minVariantPrice;
  const hasImage = product.featuredImage?.url;

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group block bg-[#0f0f0f] border border-[#1c1c1c] hover:border-[#c8922a] transition-colors duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-[#141414]">
        {hasImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#2a2a2a] text-xs font-mono uppercase tracking-widest">No image</span>
          </div>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="bg-[#c8922a] text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
            View
          </span>
        </div>
      </div>
      <div className="p-3 border-t border-[#1c1c1c]">
        <p className="text-[11px] font-mono text-[#666] uppercase tracking-widest mb-1 truncate">
          {product.tags?.[0] || 'Hardware'}
        </p>
        <h3 className="text-[13px] font-semibold text-[#e8e4dc] leading-tight line-clamp-2 mb-2">
          {product.title}
        </h3>
        <p className="text-[#c8922a] font-mono text-sm font-bold">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: price.currencyCode,
          }).format(parseFloat(price.amount))}
        </p>
      </div>
    </Link>
  );
}


export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getProducts({}),
    getCollections(),
  ]);

  const visibleCollections = collections.filter(
    (c) => c.handle !== '' && c.handle !== 'home-page'
  );
  const featured = products.slice(0, 3);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#f0ede8]">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative border-b border-[#1a1a1a] overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#f0ede8 1px, transparent 1px), linear-gradient(90deg, #f0ede8 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative px-6 md:px-12 pt-20 pb-16 max-w-[1600px] mx-auto">
          {/* Tag line */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#c8922a]" />
            <span className="font-mono text-[10px] text-[#c8922a] uppercase tracking-[0.3em]">
              Precision Fingerboard Hardware
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="font-black uppercase leading-[0.9] mb-10 text-[#f0ede8]"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '-0.02em' }}
          >
            BUILT FOR
            <br />
            <span className="text-[#c8922a]">REAL</span>
            <br />
            FINGERBOARDING
          </h1>

          {/* Sub + CTA */}
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
            <p className="text-[#888] text-sm max-w-xs leading-relaxed font-light">
              Precision-machined trucks, hand-pressed decks, and technical hardware
              for serious fingerboard players.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-3 bg-[#c8922a] text-black px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#e0a830] transition-colors duration-200 self-start"
            >
              Shop All Products
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Specs ticker */}
        <div className="border-t border-[#1a1a1a] py-3 bg-[#0d0d0d] overflow-hidden">
          <div
            className="flex gap-12 whitespace-nowrap text-[10px] font-mono text-[#555] uppercase tracking-widest px-6"
          >
            {['45# Steel Construction', '±0.1mm Tolerance', '6 Concave Profiles',
              '500+ Presses', 'Global Dispatch', '105 Products In Stock',
              'Precision Engineered', 'Pro-Grade Quality',
            ].flatMap((t, i) => [
              <span key={`t${i}`}>{t}</span>,
              <span key={`d${i}`} className="text-[#c8922a]">—</span>,
            ])}
          </div>
        </div>
      </section>


      {/* ── FEATURED 3-GRID ───────────────────────────────────────────── */}
      {featured.length >= 3 && (
        <section className="border-b border-[#1a1a1a]">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1a1a1a]">
            {featured.map((product, i) => (
              <Link
                key={product.id}
                href={`/product/${product.handle}`}
                className="group relative aspect-[4/3] overflow-hidden bg-[#111] block"
              >
                {product.featuredImage?.url && (
                  <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    fill
                    sizes="33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    priority={i === 0}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-mono text-[10px] text-[#c8922a] uppercase tracking-widest mb-1">
                    Featured
                  </p>
                  <h3 className="text-white font-bold text-base leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-[#c8922a] font-mono text-sm mt-1">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: product.priceRange.minVariantPrice.currencyCode,
                    }).format(parseFloat(product.priceRange.minVariantPrice.amount))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── COLLECTION LINKS ─────────────────────────────────────────── */}
      <section className="border-b border-[#1a1a1a] px-6 md:px-12 py-6">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-none">
          <Link
            href="/search"
            className="shrink-0 border border-[#c8922a] text-[#c8922a] px-5 py-2 text-[11px] font-mono uppercase tracking-widest hover:bg-[#c8922a] hover:text-black transition-colors duration-200"
          >
            All
          </Link>
          {visibleCollections.map((c) => (
            <Link
              key={c.handle}
              href={`/search/${c.handle}`}
              className="shrink-0 border border-[#2a2a2a] text-[#888] px-5 py-2 text-[11px] font-mono uppercase tracking-widest hover:border-[#c8922a] hover:text-[#c8922a] transition-colors duration-200"
            >
              {c.title}
            </Link>
          ))}
        </div>
      </section>


      {/* ── FULL PRODUCT GRID ────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-12 max-w-[1600px] mx-auto">
        <div className="flex items-baseline justify-between mb-8 border-b border-[#1a1a1a] pb-6">
          <div>
            <p className="font-mono text-[10px] text-[#555] uppercase tracking-widest mb-1">
              Full Catalog
            </p>
            <h2
              className="font-black uppercase text-[#f0ede8]"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
            >
              All Products
            </h2>
          </div>
          <span className="font-mono text-[#555] text-xs">
            {products.length} items
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-[#1a1a1a]">
          {products.map((product) => (
            <div key={product.id} className="bg-[#0a0a0a]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST / BRAND FOOTER BAND ────────────────────────────────── */}
      <section className="border-t border-[#1a1a1a] bg-[#0d0d0d]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Fast Dispatch', sub: 'Orders ship in 1–2 business days' },
            { label: 'Quality Guaranteed', sub: 'Every mold tested before shipping' },
            { label: 'Global Shipping', sub: 'Worldwide tracked delivery available' },
            { label: 'Real Community', sub: 'Built by players, for players' },
          ].map(({ label, sub }) => (
            <div key={label} className="border-l-2 border-[#c8922a] pl-4">
              <p className="font-bold text-sm text-[#f0ede8] mb-1">{label}</p>
              <p className="text-[#555] text-xs leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
