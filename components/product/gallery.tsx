"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { GridTileImage } from "components/grid/tile";
import clsx from "clsx";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryImage = { src: string; altText: string };

// 2026-10-24 PostHog friction fix. Measured on mobile product pages:
//  - the arrows / thumbnails did nothing whenever a variant with its own photo
//    was selected (the variant index always won over the shopper's choice),
//  - tapping the photo did nothing on touch (an earlier fix suppressed the
//    zoom), so shoppers rage-tapped the one thing they naturally tap,
//  - the full-width strip that held the arrows sat on top of the lower part of
//    the photo and swallowed taps meant for the image.
// Now: any manual choice wins until the selected variant changes, a tap or
// click opens a real full-screen viewer (swipe, arrows, visible Close button),
// and only the arrow pill itself captures pointer events.
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
  const [manual, setManual] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const swipedAt = useRef(0);

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

  const variantIndex = variantSrc
    ? allImages.findIndex((i) => i.src === variantSrc)
    : -1;
  // Old shared links may carry ?image=N; it is still read, no longer written.
  const paramIndex = searchParams.has("image")
    ? parseInt(searchParams.get("image")!, 10)
    : 0;

  // Picking a different variant is the only thing that discards the shopper's
  // manual choice.
  useEffect(() => {
    setManual(null);
  }, [variantSrc]);

  const count = allImages.length;
  const raw = manual ?? (variantIndex >= 0 ? variantIndex : paramIndex);
  const imageIndex = Math.min(
    Math.max(Number.isFinite(raw) ? raw : 0, 0),
    Math.max(count - 1, 0),
  );

  const go = useCallback(
    (to: number) => {
      if (count < 2) return;
      setManual(((to % count) + count) % count);
    },
    [count],
  );
  const next = () => go(imageIndex + 1);
  const prev = () => go(imageIndex - 1);

  const activeImage = allImages[imageIndex];
  const activeImageSrc = activeImage?.src as string;

  // External images (supplier CDN like alicdn.com) cannot be optimised through
  // Next.js image optimisation on Vercel's Hobby plan — that endpoint returns
  // 402 Payment Required for remote URLs, causing broken-image placeholders.
  // Skipping optimisation for external URLs serves them directly from the CDN.
  const isExternal = (src: string) => src.startsWith("https://");

  // Drop empty/placeholder slots so broken thumbnails never render.
  const thumbnails = allImages.filter((i) => Boolean(i.src));

  // Viewer: Escape closes, arrow keys browse, the page behind stops scrolling.
  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
      if (e.key === "ArrowRight") go(imageIndex + 1);
      if (e.key === "ArrowLeft") go(imageIndex - 1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [zoomOpen, go, imageIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    const end = e.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (start == null || end == null || count < 2) return;
    const dx = end - start;
    if (Math.abs(dx) > 40) {
      swipedAt.current = Date.now();
      go(dx < 0 ? imageIndex + 1 : imageIndex - 1);
    }
  };
  // A swipe can still be followed by a synthetic click on some browsers.
  const justSwiped = () => Date.now() - swipedAt.current < 400;

  const pillButton =
    "flex h-11 min-w-[44px] items-center justify-center px-4 transition hover:text-black active:scale-95 dark:hover:text-white";

  return (
    <div>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {activeImage && (
          <div
            role="button"
            tabIndex={0}
            aria-label="Open full-size image"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={() => {
              if (!justSwiped()) setZoomOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setZoomOpen(true);
              }
            }}
            className="relative block h-full w-full cursor-zoom-in"
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
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-neutral-700 shadow-sm backdrop-blur-sm"
            >
              <MagnifyingGlassPlusIcon className="h-5 w-5" />
            </span>
          </div>
        )}

        {count > 1 ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-[6%] flex justify-center">
            <div className="pointer-events-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/85 text-neutral-600 shadow-sm backdrop-blur-sm dark:border-black dark:bg-neutral-900/80">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous product image"
                className={pillButton}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <span
                aria-live="polite"
                className="min-w-[3.25rem] text-center text-xs font-semibold tabular-nums"
              >
                {imageIndex + 1} / {count}
              </span>
              <button
                type="button"
                onClick={next}
                aria-label="Next product image"
                className={pillButton}
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
                  type="button"
                  onClick={() => go(fullIndex)}
                  aria-label={`Show product image ${fullIndex + 1}`}
                  aria-current={isActive}
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
          aria-label="Product images"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={() => {
            if (!justSwiped()) setZoomOpen(false);
          }}
          className="fixed inset-0 z-[70] flex flex-col bg-black/95"
        >
          <div
            className="flex items-center justify-between px-4 py-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm tabular-nums text-white/70">
              {imageIndex + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              aria-label="Close image viewer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="relative mx-auto min-h-0 w-full max-w-5xl flex-1 p-4">
            <Image
              className="h-full w-full object-contain"
              fill
              sizes="100vw"
              alt={activeImage.altText as string}
              src={activeImageSrc}
              unoptimized
            />
            {count > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous product image"
                  className={clsx(
                    "absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center",
                    "rounded-full bg-white/10 text-white transition hover:bg-white/25 active:scale-95",
                  )}
                >
                  <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next product image"
                  className={clsx(
                    "absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center",
                    "rounded-full bg-white/10 text-white transition hover:bg-white/25 active:scale-95",
                  )}
                >
                  <ArrowRightIcon className="h-6 w-6" />
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
