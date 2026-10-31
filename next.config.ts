export default {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
  },
  /**
   * Canonical-host consolidation.
   *
   * The Vercel project has three verified domains attached:
   *   - fingerboardlab.com          (canonical; NEXT_PUBLIC_SITE_URL points here)
   *   - www.fingerboardlab.com
   *   - concave-craft-store.vercel.app
   *
   * Left alone, Google would see three copies of every page and split ranking
   * signals across them. A 308 (permanent) redirect from the two non-canonical
   * hosts to the apex domain consolidates PageRank onto one host and mops up
   * any pre-domain backlinks that still hit the vercel.app URL. 308 preserves
   * method and is treated as permanent by search engines.
   */
  async redirects() {
    return [
      {
        source: "/product/5-ply-maple-fingerboard-complete-with-bearing-wheels",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/toy-finger-skateboards-hobbies-novelty-anti-stress-sensory-fingerboard-toys-mini-funny-gift-for-kids-boy-2025-new-toy",
        destination: "/product/mini-plastic-fingerboard-fidget",
        permanent: true,
      },
      {
        source: "/product/deep-concave-fingerboard-complete-double-kick-turtle-theme",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/hailey-34mm-fingerboard-complete-maple-grain-finish",
        destination: "/product/hailey-razor-maple-fingerboard-complete",
        permanent: true,
      },
      {
        source: "/product/puzzle-toy-professional-mini-finger-skateboard-fingerboard-hobbies-novelty-anti-stress-sensory-toy-funny-gift-for-boy-kids-adult",
        destination: "/product/novelty-graphics-fingerboard-complete",
        permanent: true,
      },
      {
        source: "/product/34mm-premium-fingerboard-set-with-eureka-3-0-trucks-new-street-shape-wheels",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/34mm-colorful-wood-fingerboard-complete-pro-maple-deck-tech-deck-trucks-for-adults-tricks-gifts-for-skater-teens-boys",
        destination: "/product/34mm-pro-maple-complete-5-colourways",
        permanent: true,
      },
      {
        source: "/product/new-34mm-fingerboard-set-professional-wooden-deck-upgraded-single-axle-truck-cnc-wheels-complete-mini-finger-skateboard",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/team-3-5-series-pro-complete-5-ply-maple-dual-concave",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/bm-x-team-collab-fingerboard-complete-pro-maple",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/32mm-colour-laminated-fingerboard-complete-maple-single-axle",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/ramp-venue-fingerboard-set-of-2",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/34mm-cnc-setup-complete-sol",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/maple-alloy-fingerboard-complete-bearing-trucks-2-pack",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/32mm-fingerboard-complete-deep-concave-alloy-trucks-bearings",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/34mm-cnc-setup-complete-beach",
        destination: "/product/34mm-cnc-setup-complete-beach-skeleton",
        permanent: true,
      },
      {
        source: "/product/34mm-cnc-setup-complete-girl",
        destination: "/product/34mm-cnc-setup-complete-statue-of-liberty",
        permanent: true,
      },
      {
        source: "/product/maple-fingerboard-complete-bearing-wheels-double-kick-2-pack",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/2025-new-toy-finger-skateboards-hobbies-novelty-anti-stress-sensory-fingerboard-toys-mini-funny-gift-for-kids-boy",
        destination: "/product/mini-plastic-fingerboard-fidget",
        permanent: true,
      },
      {
        source: "/product/anti-stress-fidget-fingerboard-11-graphics",
        destination: "/product/mini-plastic-fingerboard-fidget",
        permanent: true,
      },
      {
        // Deleted listings (2026-10-20): send old links to the completes collection, not a 404.
        source: "/product/wp-dyed-series-fingerboard-complete-handmade-maple",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/dtzero-1-4-series-pro-fingerboard-complete-maple",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.fingerboardlab.com" }],
        destination: "https://fingerboardlab.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "concave-craft-store.vercel.app" }],
        destination: "https://fingerboardlab.com/:path*",
        permanent: true,
      },

      // ── SKU consolidation: Colour-Laminated Deck family ──────────────────
      // Three separate single-variant products merged into one multi-variant
      // product at /product/colour-laminated-maple-deck.
      {
        source: "/product/32mm-colour-laminated-maple-deck-rounded-edges-pack-of-3",
        destination: "/product/colour-laminated-maple-deck",
        permanent: true,
      },
      {
        source: "/product/34mm-colour-laminated-maple-deck-rounded-edges-pack-of-2",
        destination: "/product/colour-laminated-maple-deck",
        permanent: true,
      },
      {
        source: "/product/32mm-34mm-colour-laminated-maple-deck-handmade-pack-of-2",
        destination: "/product/colour-laminated-maple-deck",
        permanent: true,
      },

      // ── SKU consolidation: Obstacle Wall family ──────────────────────────
      // Two separate single-variant products (Brick + Marble) merged into one
      // product at /product/fingerboard-obstacles-wall with a Finish selector.
      {
        source: "/product/fingerboard-obstacles-brick-wall",
        destination: "/product/fingerboard-obstacles-wall",
        permanent: true,
      },
      {
        source: "/product/fingerboard-obstacles-marble-wall",
        destination: "/product/fingerboard-obstacles-wall",
        permanent: true,
      },

      // ── SKU consolidation: BlackMarket Collab complete ───────────────────
      // Two duplicate listings for the same physical product consolidated into
      // the richer bm-x-team-collab handle (4 images vs 1). The short slug
      // (missing -x-team-) was never a real product and has no redirect yet.
      {
        source: "/product/blackmarket-x-team-collab-fingerboard-complete-pro-maple",
        destination: "/search/completes",
        permanent: true,
      },
      {
        source: "/product/blackmarket-collab-fingerboard-complete-pro-maple",
        destination: "/search/completes",
        permanent: true,
      },

      // ── Misleading combo/kit/set listings removed (#fix/remove-misleading) ─
      // Eight park-kit listings removed because the naming ("combo", "set",
      // "kit") implied multiple items when the product is a single obstacle,
      // or the description did not show what was included. 301 redirects
      // consolidate any indexed URLs to the parent category.
      {
        source: "/product/fingerboard-training-park-obstacles-and-accessories-combo",
        destination: "/search/park-kits",
        permanent: true,
      },
      {
        source: "/product/wide-deep-concave-fingerboard-park-set-with-stairs",
        destination: "/search/park-kits",
        permanent: true,
      },
      {
        source: "/product/wooden-professional-finger-skateboard-diy-toy-skateboard-park-technology-parts-deck-special-effects-metal-bracket-bearings-wheel",
        destination: "/search/park-kits",
        permanent: true,
      },
      {
        source: "/product/wooden-finger-skateparks-kits-fingerboards-display-rack-metal-alloy-bridge-plastic-finger-boarding-fingertip-toys-digital-deck",
        destination: "/search/park-kits",
        permanent: true,
      },
      {
        source: "/product/professional-fingerboard-skatepark-set-with-ramps-obstacles-portable-fingerboard-ramp-for-finger-skateboard-training",
        destination: "/search/park-kits",
        permanent: true,
      },
      {
        source: "/product/wooden-fingerboard-obstacle-course-mini-skate-park-set-with-ramps-rails-for-professional-practice",
        destination: "/search/park-kits",
        permanent: true,
      },
      {
        source: "/product/professional-wooden-fingerboard-ramp-portable-finger-skatepark-obstacle-with-storage-box-mini-skateboard-training-ramp-for-skate",
        destination: "/search/park-kits",
        permanent: true,
      },
      {
        source: "/product/tabletop-fingerboard-park-obstacle-set-miniature-wooden-skate-park-ramp-combo-for-tech-decks-desktop-toy-and-gift-for-teens",
        destination: "/search/park-kits",
        permanent: true,
      },
    ];
  },
  images: {
    /**
     * Disabled site-wide as of 2026-09-02.
     *
     * The Vercel Hobby plan's Image Optimization has a monthly cap on unique
     * source images processed. This project exceeded it — confirmed by
     * direct testing: any never-before-requested image URL (local OR
     * remote, any width) returns 402 Payment Required from the
     * /_next/image endpoint, while already-registered images keep working
     * at any width. That makes breakage effectively random: whichever
     * product photo, cart thumbnail, or category tile happens to be a
     * "new" request once the cap is hit goes blank — including inside the
     * cart drawer, which is directly in the checkout path.
     *
     * A previous partial fix (components/product/gallery.tsx) worked around
     * this only for externally-hosted supplier-CDN images by setting
     * `unoptimized` conditionally. That approach doesn't cover local
     * /products/ and /brand/ files, which hit the exact same account-wide
     * cap once quota ran out (verified: primary-10297129140579.jpg at
     * w=128 returned 402 while a different product's image at w=3840
     * succeeded — purely a function of which URLs had already been
     * registered before the cap was reached, not local vs. remote).
     *
     * Disabling optimization globally removes the dependency on this quota
     * entirely, for every current and future image on the site. The cost is
     * losing automatic AVIF/WebP conversion and responsive resizing — but
     * every local image already ships pre-compressed (see
     * scripts/decode-*-images.mjs; category tiles run 80-120KB, product
     * primaries are similarly sized), so the practical quality/performance
     * loss is small next to a checkout-adjacent image randomly going blank.
     *
     * If Vercel Image Optimization quota becomes available again (plan
     * upgrade, or next monthly reset) and per-image control is wanted back,
     * remove this flag and re-apply the `unoptimized={isExternal(url)}`
     * pattern already used in components/product/gallery.tsx,
     * components/product-card.tsx, components/cart/modal.tsx, and
     * components/cart/cart-cross-sell.tsx — but note that pattern alone is
     * NOT sufficient while the account-wide quota is exhausted, since local
     * images are equally exposed until the quota resets.
     */
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    // Product photography lives on the original supplier CDNs and is fetched
    // server-side by Next's image optimiser, then cached on the Vercel edge —
    // the browser never requests these hosts directly. Kept even with
    // optimization disabled above: remotePatterns still governs which hosts
    // next/image is allowed to render at all, unoptimized or not.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
      { protocol: "https", hostname: "img.alicdn.com" },
      { protocol: "https", hostname: "cbu01.alicdn.com" },
      { protocol: "https", hostname: "**.alicdn.com" },
      { protocol: "https", hostname: "**.ecombdimg.com" },
    ],
  },
};
