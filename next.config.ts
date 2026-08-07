export default {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
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
