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
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Product photography lives on the original supplier CDNs and is fetched
    // server-side by Next's image optimiser, then cached on the Vercel edge —
    // the browser never requests these hosts directly.
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
