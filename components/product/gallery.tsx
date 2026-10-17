"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GridTileImage } from "components/grid/tile";
import clsx from "clsx";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type GalleryImage = { src: string; altText: string };

export function Gallery({
  images,
  variants = [],
}: {
  images: GalleryImage[];
  /** Product variants, used to swap the main photo to the selected variant's
   *  own image (width/pack/type) instead of one shared gallery. */
  variants?: {
    id: string;
    selectedOptions: { name: string; value: string }[];
    image?: { src: string; altText: string };
  }[];
}) {
  const searchParams = useSearchParams();
  const [zoomOpen, setZoomOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const swipedRef = useRef(false);
  // Local index wins between navigations. 2026-10-17: every gallery tap used
  // to do a Next.js router.replace('?image=N'), so a rapid thumb-swipe fired
  // a server round-trip per tap — the #1 mobile rage-click source in the
  // PostHog friction report (8 of 12 rages on product pages). Taps now only
  // flip local state; the URL is kept in sync via history.replaceState so
  // ?image=N deep links (shared/bookmarked) still work, but with zero
  // navigation and zero re-render churn.

  // Resolve the currently-selected variant from the option query params, the
  // same way ProductDescription and AddToCart do, so all three stay in sync.
  const selectedVariant = variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const variantSrc = selectedVariant?.image?.src;

  // The gallery is the full image set plus, when the selected variant's photo
  // is not already in the shared list, that photo prepended so it can show.
  const allImages: GalleryImage[] =
    variantSrc && !images.some((i) => i.src === variantSrc)
      ? [
          { src: variantSrc, altText: selectedVariant!.image!.altText },
          ...images,
        ]
      : images;

  // When a variant with its own photo is selected, that photo leads. Otherwise
  // fall back to the manual ?image= index for arrow/thumbnail browsing.
  const variantIndex = variantSrc
    ? allImages.findIndex((i) => i.src === variantSrc)
    : -1;
  const paramIndex = searchParams.has("image")
    ? parseInt(searchParams.get("image")!)
    : 0;
  const [localIndex, setLocalIndex] = useState<number | null>(null);

  // A real navigation (variant swatch, back/forward) supersedes the local
  // override — useSearchParams only changes identity on router navigations,
  // not on our own history.replaceState, so this doesn't fight tap updates.
  useEffect(() => {
    setLocalIndex(null);
  }, [searchParams]);

  const imageIndex =
    variantIndex >= 0
      ? variantIndex
      : Math.min(
          Math.max(localIndex ?? paramIndex, 0),
          allImages.length - 1,
        );

  const updateImage = (index: number) => {
    const bounded = Math.min(Math.max(index, 0), allImages.length - 1);
    setLocalIndex(bounded);
    // Silent URL sync for deep links — no navigation, no server round-trip.
    if (typeof window === "undefined") return;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("image", String(bounded));
      window.history.replaceState(window.history.state, "", url.toString());
    } catch {
      // URL sync is best-effort; the visible image already changed.
    }
  };

  const nextImageIndex =
    imageIndex + 1 < allImages.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? allImages.length - 1 : imageIndex - 1;

  const buttonClassName =
    "h-full min-h-[44px] min-w-[44px] px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  const activeImage = allImages[imageIndex];
  const activeImageSrc = activeImage?.src as string;

  // External images (supplier CDN like alicdn.com) cannot be optimised through
  // Next.js image optimisation on Vercel's Hobby plan — that endpoint returns
  // 402 Payment Required for remote URLs, causing broken-image placeholders.
  // Skipping optimisation for external URLs serves them directly from the CDN,
  // which returns the image correctly. Local /products/ files are still
  // optimised as normal.
  const isExternal = (src: string) => src.startsWith("https://");

  // Drop empty/placeholder slots so broken thumbnails never render.
  const thumbnails = allImages.filter((i) => Boolean(i.src));

  // Close the lightbox on Escape.
  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomOpen]);

  return (
    <form>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {activeImage && (
          <button
            type="button"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0]?.clientX ?? null;
              swipedRef.current = false;
            }}
            onTouchEnd={(e) => {
              const start = touchStartX.current;
              const end = e.changedTouches[0]?.clientX;
              touchStartX.current = null;
              if (start == null || end == null || allImages.length < 2) return;
              const dx = end - start;
              if (Math.abs(dx) > 40) {
                swipedRef.current = true;
                updateImage(dx < 0 ? nextImageIndex : previousImageIndex);
              }
            }}
            onClick={() => {
              if (swipedRef.current) {
                swipedRef.current = false;
                return;
              }
              setZoomOpen(true);
            }}
            aria-label="Zoom product image"
            className="block h-full w-full cursor-zoom-in"
          >
            <Image
              className="h-full w-full object-contain"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              alt={activeImage.altText as string}
              src={activeImageSrc}
              unoptimized={isExternal(activeImageSrc)}
              priority={true}
            />
          </button>
        )}

        {allImages.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm dark:border-black dark:bg-neutral-900/80">
              <button
                formAction={() => updateImage(previousImageIndex)}
                aria-label="Previous product image"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <button
                formAction={() => updateImage(nextImageIndex)}
                aria-label="Next product image"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {thumbnails.length > 1 ? (
        <ul className="my-12 flex items-center flex-wrap justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {thumbnails.map((image) => {
            const fullIndex = allImages.indexOf(image);
            const isActive = fullIndex === imageIndex;

            return (
              <li key={image.src} className="h-20 w-20">
                <button
                  formAction={() => updateImage(fullIndex)}
                  aria-label="Select product image"
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                    unoptimized={isExternal(image.src)}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {zoomOpen && activeImage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed product image"
          onClick={() => setZoomOpen(false)}
          className="fixed inset-0 z-[70] flex cursor-zoom-out items-center justify-center bg-black/90 p-4"
        >
          <div className="relative h-full max-h-[90vh] w-full max-w-5xl">
            <Image
              className="h-full w-full object-contain"
              fill
              sizes="100vw"
              alt={activeImage.altText as string}
              src={activeImageSrc}
              unoptimized
            />
          </div>
          <span
            className={clsx(
              "absolute right-5 top-5 rounded-full border border-white/20",
              "bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white",
            )}
          >
            Close
          </span>
        </div>
      ) : null}
    </form>
  );
}
