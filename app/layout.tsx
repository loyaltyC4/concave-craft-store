import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";
import { baseUrl } from "lib/utils";
import { GA_MEASUREMENT_ID } from "lib/gtag";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SITE_LEGAL_NAME,
  SOCIALS,
} from "lib/brand";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "fingerboard",
    "fingerboards",
    "fingerboard complete",
    "fingerboard decks",
    "fingerboard trucks",
    "fingerboard wheels",
    "fingerboard bushings",
    "fingerboard mold",
    "concave mold",
    "wooden fingerboard ramp",
    "34mm fingerboard",
    "pro fingerboard shop",
  ],
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  // Deliberately NOT setting a site-wide default canonical here: every real
  // page sets its own explicit alternates.canonical. A root-level default
  // would be silently (and wrongly) inherited by any page that forgets to
  // set one, telling Google that page is a duplicate of the homepage.
  category: "shopping",
  // Set these in Vercel once the custom domain is verified. Meta-tag
  // verification is the fallback when DNS TXT is inconvenient; both can
  // coexist safely.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? {
          other: {
            "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
          },
        }
      : {}),
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_LEGAL_NAME,
    url: baseUrl,
    logo: `${baseUrl}/brand/mark.png`,
    description: SITE_DESCRIPTION,
    sameAs: [SOCIALS.instagram, SOCIALS.youtube, SOCIALS.tiktok],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`dark ${GeistSans.variable}`}>
      <body className="bg-[#0b0c0e] text-[#f3f1ea] antialiased selection:bg-[#c5f23c] selection:text-black">
        {/* Direction C display + body fonts (Fontshare); React hoists these to <head> */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=general-sans@400,500,600&display=swap"
        />
        {/*
         * GA4 bootstrap — MUST stay a raw inline <script>, and MUST stay
         * ahead of anything that fires events.
         *
         * Why (regression found 2026-09-15): this snippet used to be a
         * next/script with strategy="afterInteractive", down in the body
         * next to the gtag.js tag. afterInteractive runs *after* React
         * hydration, so ViewItemTracker's mount effect pushed its event
         * before gtag('config') was ever queued:
         *
         *     0: event  | view_item        <- queued first
         *     1: js     | Date
         *     2: config | G-2NZWBCZY5E     <- configured only now
         *
         * gtag.js drains the queue in order, so an event that arrives
         * before the measurement ID is configured has no destination and is
         * discarded. That is why add_to_cart and begin_checkout worked
         * (they fire on user interaction, long after config) while
         * view_item never appeared in GA4 at all — verified against the
         * realtime API.
         *
         * As a raw inline script this executes during HTML parse, so
         * dataLayer, the gtag shim, `js` and `config` are all queued before
         * any React effect can run. The external gtag.js tag stays
         * afterInteractive; it drains whatever is already queued when it
         * loads, so nothing is lost by it arriving late.
         */}
        {GA_MEASUREMENT_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`,
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <CartProvider>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton richColors theme="dark" />
          </main>
        </CartProvider>
        {/* Vercel Analytics: pageviews + custom events. */}
        <Analytics />
        {/* Vercel Speed Insights: real-user Core Web Vitals (LCP, INP, CLS). */}
        <SpeedInsights />
        {/*
         * Google Analytics 4 (gtag.js). Only rendered when
         * NEXT_PUBLIC_GA_MEASUREMENT_ID is set (production), so local dev and
         * preview deploys don't send traffic into the real property.
         * Ecommerce events (view_item, add_to_cart, begin_checkout, purchase)
         * are fired from lib/gtag.ts call sites and queue onto dataLayer,
         * which this script drains in order once it loads.
         *
         * The dataLayer/gtag/config bootstrap deliberately does NOT live
         * here — it is a raw inline script higher up in this file so it
         * executes before React hydration. See the long note there; moving
         * it back down here silently breaks view_item.
         */}
        {GA_MEASUREMENT_ID && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
