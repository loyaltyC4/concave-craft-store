"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CyclerImage = { src: string; altText: string };

/**
 * Slowly crossfades through a product's variant photos. Used on category
 * tiles for multi-variant products (e.g. the ramp set) so a shopper scanning
 * the grid sees the range without opening the page.
 *
 * External (supplier-CDN) sources are served unoptimized, matching the
 * product-page gallery's guard against Vercel Hobby image-optimisation 402s.
 */
export function CardImageCycler({
  images,
  intervalMs = 2600,
  sizes,
  priority = false,
}: {
  images: CyclerImage[];
  intervalMs?: number;
  sizes: string;
  priority?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  useEffect(() => {
    if (count < 2) return;
    // Honor reduced-motion: don't animate for users who opt out.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % count),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [count, intervalMs]);

  const isExternal = (src: string) => src.startsWith("https://");

  return (
    <>
      {images.map((image, i) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.altText}
          fill
          sizes={sizes}
          priority={priority && i === 0}
          unoptimized={isExternal(image.src)}
          aria-hidden={i !== index}
          className={`object-contain p-[9%] transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
