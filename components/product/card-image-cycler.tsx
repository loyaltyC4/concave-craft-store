"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CyclerImage = { src: string; altText: string };

/**
 * Slowly crossfades through a product's variant photos. Used on category
 * tiles for multi-variant products (e.g. the ramp set) so a shopper scanning
 * the grid sees the range without opening the page.
 *
 * 2026-11-02 friction fix (PostHog, 30d): /search/* cards recorded 26
 * $dead_swipe and 5 $rageclick. The cycler animated on a timer but ignored
 * touch, so the one gesture a shopper naturally tries — swiping the photo —
 * did nothing at all. It now:
 *   - answers horizontal swipes (next / previous),
 *   - pauses the auto-cycle for 10s after any touch so it never fights the
 *     shopper mid-scroll,
 *   - shows position dots so the card is discoverably swipeable,
 *   - swallows the click that follows a swipe, because the whole card is a
 *     <Link> and a swipe must not navigate.
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
  const pauseUntil = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  useEffect(() => {
    if (count < 2) return;
    // Honor reduced-motion: don't animate for users who opt out.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return;
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [count, intervalMs]);

  const isExternal = (src: string) => src.startsWith("https://");

  // Single image: no wrapper, no dots, no touch handling — exactly as before.
  if (count < 2) {
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
            className="object-contain p-[9%]"
          />
        ))}
      </>
    );
  }

  return (
    <div
      className="absolute inset-0 touch-pan-y"
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (!t) return;
        touchStart.current = { x: t.clientX, y: t.clientY };
        swiped.current = false;
      }}
      onTouchEnd={(e) => {
        const start = touchStart.current;
        if (!start) return;
        const t = e.changedTouches[0];
        if (!t) return;
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        touchStart.current = null;
        if (Math.abs(dx) > 28 && Math.abs(dx) > Math.abs(dy) * 1.2) {
          pauseUntil.current = Date.now() + 10_000;
          swiped.current = true;
          setIndex((i) => (i + (dx < 0 ? 1 : -1) + count) % count);
        }
      }}
      onClickCapture={(e) => {
        // A swipe on a card that is entirely a <Link> must not open the product.
        if (swiped.current) {
          swiped.current = false;
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
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
      <div className="pointer-events-none absolute inset-x-0 bottom-1.5 flex justify-center gap-1">
        {images.map((image, i) => (
          <span
            key={image.src}
            aria-hidden
            className={`h-1 w-1 rounded-full transition-colors ${
              i === index ? "bg-neutral-900/70" : "bg-neutral-900/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
