import CartModal from "components/cart/modal";
import { getMenu } from "lib/shopify";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  // Drop non-category entries (Home page, the synthetic "All", bare root)
  const links = menu.filter((item: Menu) => {
    const t = (item.title || "").toLowerCase();
    return t !== "home page" && t !== "home" && t !== "all" && item.path !== "/" && item.path !== "/search";
  });

  return (
    <nav className="sticky top-0 z-50 flex items-center gap-4 border-b border-white/10 bg-[#0b0c0e]/85 px-4 py-3 backdrop-blur-md lg:px-6">
      <div className="flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={links} />
        </Suspense>
      </div>

      <Link href="/" prefetch={true} className="flex flex-none items-center gap-2.5">
        <img src="/cc-mascot.jpg" alt="Concave Craft" className="h-9 w-9 rounded-lg object-cover" />
        <span className="hidden text-base font-semibold tracking-tight text-[#f3f1ea] sm:block">
          Concave<span className="text-[#c5f23c]">.</span>Craft
        </span>
      </Link>

      {links.length ? (
        <ul className="hidden flex-1 items-center gap-6 pl-4 md:flex">
          {links.map((item: Menu) => (
            <li key={item.title}>
              <Link
                href={item.path}
                prefetch={true}
                className="whitespace-nowrap text-sm font-medium text-neutral-300 underline-offset-4 transition-colors hover:text-[#c5f23c]"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1" />
      )}

      <div className="ml-auto flex flex-none items-center gap-3">
        <div className="hidden w-52 xl:w-64 lg:block">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <CartModal />
      </div>
    </nav>
  );
}
