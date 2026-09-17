"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GridTileImage } from "components/grid/tile";
import clsx from "clsx";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [zoomOpen, setZoomOpen] = useState(false);

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
  const imageIndex =
    variantIndex >= 0
      ? variantIndex
      : Math.min(Math.max(paramIndex, 0), allImages.length - 1);

  const updateImage = (index: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const nextImageIndex =
    imageIndex + 1 < allImages.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? allImages.length - 1 : imageIndex - 1;

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

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
            onClick={() => setZoomOpen(true)}
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
                formAction={() => updateImage(previousImageIndex.toString())}
                aria-label="Previous product image"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <button
                formAction={() => updateImage(nextImageIndex.toString())}
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
                  formAction={() => updateImage(fullIndex.toString())}
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
