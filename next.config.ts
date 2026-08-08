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
