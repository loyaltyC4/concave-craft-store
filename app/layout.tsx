import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/cart";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const SITE_NAME = process.env.SITE_NAME || "Fingerboard Lab";
const DESCRIPTION =
  "Precision-machined fingerboard trucks, hand-pressed decks, concave molds, wheels, ramps, and technical hardware for serious players. Free sticker sheet in every box. Worldwide shipping.";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_NAME} — Precision Fingerboard Hardware`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "fingerboard",
    "fingerboards",
    "fingerboard trucks",
    "fingerboard decks",
    "concave molds",
    "fingerboard ramps",
    "fingerboard wheels",
    "pro fingerboard",
    "fingerboard shop",
    "fingerboard store",
    "mini skateboard",
    "tech deck",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Precision Fingerboard Hardware`,
    description: DESCRIPTION,
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Precision Fingerboard Hardware`,
    description: DESCRIPTION,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: SITE_NAME,
        url: baseUrl,
        description: DESCRIPTION,
        slogan: "Built for real fingerboarding.",
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: SITE_NAME,
        publisher: { "@id": `${baseUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
