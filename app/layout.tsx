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
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID, META_PIXEL_ID } from "lib/gtag";
import { POSTHOG_KEY, POSTHOG_API_HOST } from "lib/posthog";
import { ProductClickTracker } from "components/analytics/product-click-tracker";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SITE_LEGAL_NAME,
  SOCIALS,
  SUPPORT_EMAIL,
  BUSINESS,
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
    email: SUPPORT_EMAIL,
    ...(BUSINESS.phone ? { telephone: BUSINESS.phone } : {}),
    ...(BUSINESS.abn ? { taxID: `ABN ${BUSINESS.abn}` } : {}),
    foundingDate: String(BUSINESS.founded),
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.countryCode,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: SUPPORT_EMAIL,
      areaServed: "Worldwide",
      availableLanguage: "English",
    },
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
        {/* Supplier CDN (alicdn.com) hotlink-blocks requests that carry a
         * Referer header, returning 403 and leaving gallery/variant photos
         * blank. Stripping the referrer on outbound requests fixes the images
         * site-wide. No analytics impact (first-party GA is unaffected). */}
        <meta name="referrer" content="no-referrer" />
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
        {META_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
            }}
          />
        )}
        {GA_MEASUREMENT_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');gtag('config','${GOOGLE_ADS_ID}');`,
            }}
          />
        )}
        {/*
         * PostHog (added 2026-10-08; THREE regressions fixed same day —
         * read all notes before touching this).
         *
         * Pattern: ONE self-contained inline script. It injects a
         * <script src=INGESTION_HOST/static/array.js> tag and calls
         * posthog.init(key, config) in that tag's onload. Verified working
         * live in a real browser: events land ($pageview, $web_vitals,
         * custom captures) once init runs with the token.
         *
         * REGRESSION NOTE 1 — loader URL host: the APP host does not serve
         * the JS bundle:
         *   WRONG: https://us.posthog.com/array/<key>/posthog.js  → 404
         *   RIGHT: https://us.i.posthog.com/static/array.js       → 200
         *
         * REGRESSION NOTE 2 — the modern array.js does NOT drain the legacy
         * `posthog._q` pre-queue bootstrap (the !function(t,e){...}
         * pattern from old PostHog docs). A pre-queued init is silently
         * ignored: config.token stays empty and every capture goes
         * nowhere. init MUST be called on the real SDK instance after the
         * script loads. Diagnosis trick: after page load,
         * window.posthog.config.token must be non-empty — empty token =
         * silent no-op analytics.
         *
         * REGRESSION NOTE 3 — next/script's onLoad prop is a CLIENT-only
         * feature; passing it from this server component fails the build
         * (lint_or_type_error, "pnpm build" exited 1). That is why this is
         * a raw inline script that wires its own onload, not a <Script
         * onLoad={...}>.
         *
         * Events fired before init (mirrored ecommerce events from
         * lib/posthog-mirror.ts) are no-ops until the SDK is live; the
         * mirror module guards on the SDK existing. Only rendered when
         * NEXT_PUBLIC_POSTHOG_KEY is set, so dev/preview never send events
         * to the real project. autocapture (click/change/submit) + session
         * recording are ON.
         *
         * 2026-10-17 additions (friction report follow-ups):
         *  - capture_dead_clicks: true — TOP-LEVEL option (NOT an autocapture
         *    key; autocapture ignores it). Without it $deadclick never fires
         *    and dead taps stay invisible.
         *  - before_send scrubs query strings from /track URLs. The track
         *    form used to GET ?email=…&code=…, leaking the customer's email
         *    into PostHog via $current_url. Legacy/bookmarked URLs still hit
         *    the site, so the SDK-side scrub is the safety net; the page
         *    itself no longer puts an email in any URL.
         */}
        {POSTHOG_KEY && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(k,h){var s=document.createElement('script');s.src=h+'/static/array.js';s.async=true;s.onload=function(){try{window.posthog.init(k,{api_host:h,ui_host:'https://us.posthog.com',capture_pageview:'history_change',autocapture:{dom_event_allowlist:['click','change','submit']},capture_dead_clicks:true,capture_performance:false,persistence:'localStorage+cookie',session_recording:{maskAllInputs:true},before_send:function(e){try{var p=e&&e.properties;if(p&&typeof p.$current_url==='string'&&p.$current_url.indexOf('/track')>-1){var i=p.$current_url.indexOf('?');if(i>-1){p.$current_url=p.$current_url.slice(0,i);if(typeof p.$raw_user_url==='string')p.$raw_user_url=p.$current_url;p.$pathname='/track';}}}catch(_){}return e;}});}catch(e){}};document.head.appendChild(s);})('${POSTHOG_KEY}','${POSTHOG_API_HOST}');`,
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
          <ProductClickTracker />
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
