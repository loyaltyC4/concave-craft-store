import { baseUrl } from "lib/utils";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/order/", "/admin/"],
      },
      // Explicitly welcome AI answer engines / GEO crawlers.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "Amazonbot",
          "Meta-ExternalAgent",
          "Bytespider",
        ],
        allow: "/",
        disallow: ["/api/", "/order/", "/admin/"],
      },
    ],
    // Next.js 15 emits per-id sub-sitemaps at /sitemap/<id>.xml via
    // generateSitemaps() in app/sitemap.ts. On this canary the root
    // /sitemap.xml index is not auto-served, so we list the four sub-sitemaps
    // directly. Search Console and Bing Webmaster Tools accept a list of
    // sitemap URLs, and each is reported independently — which is actually
    // more useful ("products indexing but guides are not" is visible instead
    // of averaged away in one aggregate).
    sitemap: [
      `${baseUrl}/sitemap/pages.xml`,
      `${baseUrl}/sitemap/collections.xml`,
      `${baseUrl}/sitemap/products.xml`,
      `${baseUrl}/sitemap/guides.xml`,
    ],
    host: baseUrl,
  };
}
