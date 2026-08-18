"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Cursor-parallax wrapper for the homepage hero, with click-through product
 * hotspots layered on top of whatever media is already in the hero.
 *
 * Wraps the existing <Image>/<HeroVideo> pair rather than replacing them, so
 * the current /brand/hero.jpg and /brand/hero-loop.mp4 keep playing exactly
 * as they do today — we just add depth and interactivity on top.
 *
 * The transform is applied to the wrapper element itself (not the section),
 * so `object-cover` on the child <Image> continues to work unchanged. The
 * effect is a subtle 3D tilt keyed to cursor position across the whole hero.
 *
 * Accessibility:
 *  - Respects prefers-reduced-motion (no transform, hotspots still visible).
 *  - Skips the mousemove listener on touch devices.
 *  - Hotspots are real <Link>s: keyboard focusable, screen-reader labeled.
 *  - Cleans up its RAF loop and listeners on unmount.
 */
export type HeroHotspot = {
  /** Horizontal position, 0–100, as % of the hero section width. */
  x: number;
  /** Vertical position, 0–100, as % of the hero section height. */
  y: number;
  /** Short product name. */
  title: string;
  /** Formatted price string, e.g. "$59.95". Optional. */
  price?: string;
  /** Product URL, absolute or `/product/...`. */
  href: string;
};

export function HeroInteractiveScene({
  hotspots = [],
  intensity = 6,
  children,
}: {
  /** Product pins overlaid on the scene. Empty array = tilt-only. */
  hotspots?: HeroHotspot[];
  /**
   * Peak tilt in degrees at the far corners. 6 is the tasteful default;
   * anything above ~10 looks like a gimmick. `rotateY` uses ~1.3× this
   * because horizontal cursor travel is usually larger than vertical.
   */
  intensity?: number;
  /**
   * The existing hero media. Pass the current <Image /> + <HeroVideo />
   * pair through here so nothing about how they render changes.
   */
  children: ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mm.matches);
    const onChange = () => setReduced(mm.matches);
    mm.addEventListener("change", onChange);
    return () => mm.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      return;
    }
    const wrapper = wrapperRef.current;
    const hero = wrapper?.parentElement as HTMLElement | null;
    if (!wrapper || !hero) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const tick = () => {
      curX += (targetX - curX) * 0.09;
      curY += (targetY - curY) * 0.09;
      wrapper.style.transform =
        `perspective(1600px) rotateX(${curX.toFixed(2)}deg) rotateY(${curY.toFixed(2)}deg)`;
      if (Math.abs(curX - targetX) > 0.01 || Math.abs(curY - targetY) > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      targetX = (py - 0.5) * -intensity;
      targetY = (px - 0.5) * intensity * 1.3;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      wrapper.style.transform = "";
    };
  }, [reduced, intensity]);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 [transform-style:preserve-3d] will-change-transform"
      style={{ transition: "transform .18s cubic-bezier(.2,.9,.3,1.2)" }}
      aria-hidden="false"
    >
      {/* Existing image + video: unchanged. */}
      {children}

      {/* Product hotspots. Desktop-only — on touch, extra pins clutter the
          hero without adding value, since there's no hover state. */}
      {hotspots.length > 0 && (
        <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
          {hotspots.map((h, i) => (
            <Link
              key={`${h.href}-${i}`}
              href={h.href}
              aria-label={`Shop ${h.title}${h.price ? ` — ${h.price}` : ""}`}
              className="group pointer-events-auto absolute"
              style={{
                left: `${h.x}%`,
                top: `${h.y}%`,
                transform: "translate3d(-50%,-50%,40px)",
              }}
            >
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#c5f23c] text-black shadow-[0_10px_22px_-6px_rgba(197,242,60,0.55)] transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-white/60">
                <span className="absolute inset-[-6px] animate-ping rounded-full bg-[#c5f23c] opacity-30" />
                <span className="text-base font-bold leading-none">+</span>
              </span>
              <span className="pointer-events-none absolute left-9 top-0 whitespace-nowrap rounded-lg border border-white/10 bg-[#0b0c0e]/95 px-3 py-2 font-mono text-[11px] leading-tight tracking-wide text-[#f3f1ea] opacity-0 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                <b className="mb-0.5 block font-semibold uppercase tracking-[0.06em] text-[#c5f23c]">
                  {h.title}
                </b>
                {h.price && <span className="text-neutral-300">{h.price}</span>}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
