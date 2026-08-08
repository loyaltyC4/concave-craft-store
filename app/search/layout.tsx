import Footer from "components/layout/footer";
import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import { sorting } from "lib/constants";

/**
 * Search / collection layout.
 *
 * The previous version wrapped {children} in <Suspense fallback={null}>
 * around a client-only ChildrenWrapper that read useSearchParams(). That
 * pushed the entire category page below the fold into the flight payload
 * and left the prerendered HTML with no H1, no buying-guide copy, no
 * FAQ JSON-LD — a soft-404 shell as far as Googlebot was concerned.
 *
 * Category and search pages now server-render their own SEO content
 * directly, and stream the product grid via a Suspense boundary the
 * page controls. This layout stays a pure server component.
 */
export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          {children}
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
      <Footer />
    </>
  );
}
