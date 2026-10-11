"use client";

/**
 * Global product-click tracker (PostHog).
 *
 * One delegated listener instead of per-card instrumentation: every
 * <a href="/product/<handle>"> on the site — homepage cards, collection grids,
 * guide product links, related products — is captured from here, so "which
 * products get clicked most" is answerable per surface without touching the
 * (mostly server) card components.
 *
 * The surface is derived from the current pathname:
 *   /                      -> home
 *   /search/<collection>   -> collection:<collection>
 *   /guides/<slug>         -> guide:<slug>
 *   /product/<handle>      -> product-page (cross-sell / related)
 */
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function surfaceFromPath(path: string): string {
  if (!path || path === "/") return "home";
  if (path.startsWith("/search/")) return `collection:${path.slice(8).split("/")[0]}`;
  if (path.startsWith("/guides/")) return `guide:${path.slice(8).split("/")[0]}`;
  if (path.startsWith("/product/")) return "product-page";
  return `other:${path.split("/")[1] || "root"}`;
}

export function ProductClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const handler = (ev: MouseEvent) => {
      // walk up from the click to the nearest product link (covers clicks on
      // the image, title, price — the whole card is one <a>)
      const target = ev.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;
      const link = target.closest('a[href*="/product/"]') as HTMLAnchorElement | null;
      if (!link) return;
      // let SPA navigation happen normally; only record
      try {
        const href = link.getAttribute("href") || "";
        const handle = href.split("/product/")[1]?.split(/[?#]/)[0];
        if (!handle) return;
        // variant links carry ?colourway= — strip for the handle key, keep flag
        const isVariant = href.includes("?");
        const surfaceEl = link.closest("[data-surface]") as HTMLElement | null;
        const surface = surfaceEl?.dataset.surface || surfaceFromPath(pathname || "");
        const posEl = link.closest("[data-pos]") as HTMLElement | null;
        window.posthog?.capture("product_click", {
          product_handle: handle,
          is_variant_link: isVariant,
          surface,
          position: posEl?.dataset.pos ? Number(posEl.dataset.pos) : undefined,
          page_path: pathname,
          site: "fingerboardlab",
        });
      } catch {
        // never break navigation over analytics
      }
    };
    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true } as EventListenerOptions);
  }, [pathname]);

  return null;
}
