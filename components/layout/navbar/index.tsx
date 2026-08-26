import CartModal from "components/cart/modal";
import { BrandLogo } from "components/brand-logo";
import { getCollections } from "lib/shopify";
import { COLLECTIONS } from "lib/brand";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

const ANNOUNCEMENTS = [
  "Free sticker sheet in every box",
  "Curated, not mass-listed",
  "Worldwide shipping",
  "30-day returns",
];

// handle -> short label, e.g. "Tuning & Hardware" -> "Hardware". The full
// titles ("Deck Building & Molds", "Ramps & Obstacles", ...) are correct for
// page <h1>s and breadcrumbs but 11 of them side by side in one nav row
// overflowed the viewport at anything under ~1700px — the header pushed the
// search bar and cart off-screen and forced horizontal scroll on the whole
// page. Short labels are purpose-built for exactly this in lib/brand.ts.
const SHORT_LABEL: Record<string, string> = Object.fromEntries(
  COLLECTIONS.map((c) => [c.handle, c.short]),
);

export async function Navbar() {
  const collections = await getCollections();
  const links = [
    // Custom Builds is a premium/high-margin service — placed first for
    // maximum visibility, before the standard catalog collections.
    { title: "Custom Builds", path: "/custom" },
    ...collections
      .filter((c) => c.handle)
      .map((c) => ({
        title: SHORT_LABEL[c.handle] ?? c.title,
        path: c.path,
      })),
    { title: "Guides", path: "/guides" },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="hidden bg-[#c5f23c] text-black sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-1.5 text-[12px] font-semibold tracking-wide">
          {ANNOUNCEMENTS.map((a) => (
            <span key={a} className="flex items-center gap-8">
              {a}
              <span className="text-black/30">◆</span>
            </span>
          ))}
        </div>
      </div>

      <nav className="flex items-center gap-4 border-b border-white/10 bg-[#0b0c0e]/85 px-4 py-3 backdrop-blur-md lg:px-6">
        <div className="flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={links} />
          </Suspense>
        </div>

        <BrandLogo />

        {/*
         * min-w-0 is load-bearing: without it a flex-1 child's min-width
         * defaults to its max-content size, so this <ul> could never shrink
         * below "every link at full width" and the browser widened the whole
         * nav (and page) to fit instead of wrapping or clipping.
         */}
        <ul className="hidden min-w-0 flex-1 items-center gap-5 pl-4 md:flex">
          {links.map((item) => (
            <li key={item.title} className="shrink-0">
              <Link
                href={item.path}
                prefetch={true}
                className={`whitespace-nowrap text-sm font-medium underline-offset-4 transition-colors hover:text-[#c5f23c] ${
                  item.path === "/custom"
                    ? "font-semibold text-[#c5f23c]"
                    : "text-neutral-300"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex flex-none items-center gap-3">
          <div className="hidden w-52 xl:block">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <CartModal />
        </div>
      </nav>
    </header>
  );
}
