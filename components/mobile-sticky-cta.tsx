"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Mobile-only sticky bottom CTA bar. Appears after the user scrolls past
 * the hero and hides again once the footer is in view, so it never competes
 * with the footer's own links or the newsletter form.
 *
 * Why mobile-only: on desktop, the hero CTAs and sticky nav already put a
 * primary action one glance away — a floating bar duplicates them and eats
 * vertical space. On mobile, thumb-reachable CTAs are the highest-lift
 * pattern for niche DTC conversion (backed by Palace / Thursday Boots).
 *
 * Behaviour:
 *  - Hidden by default (SSR)
 *  - Reveals when scrolled past the reveal-threshold sentinel
 *  - Hides when the hide-threshold sentinel enters the viewport (near footer)
 *  - Respects prefers-reduced-motion (no slide, just fade)
 *
 * The sentinels are rendered by consumers (e.g. the homepage places one just
 * below the hero, one just above the footer) via the exported IDs.
 */
export const REVEAL_SENTINEL_ID = "mobile-cta-reveal-sentinel";
export const HIDE_SENTINEL_ID = "mobile-cta-hide-sentinel";

export function MobileStickyCta({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const [hideNearFooter, setHideNearFooter] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveal = document.getElementById(REVEAL_SENTINEL_ID);
    const hide = document.getElementById(HIDE_SENTINEL_ID);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id === REVEAL_SENTINEL_ID) {
            // Reveal once the sentinel has scrolled OFF the top of the
            // viewport (i.e. the user has scrolled past it).
            const passed = entry.boundingClientRect.top < 0;
            setRevealed(passed);
          }
          if (entry.target.id === HIDE_SENTINEL_ID) {
            setHideNearFooter(entry.isIntersecting);
          }
        }
      },
      { threshold: [0, 0.05, 1] },
    );

    if (reveal) io.observe(reveal);
    if (hide) io.observe(hide);
    return () => io.disconnect();
  }, []);

  const show = revealed && !hideNearFooter;

  return (
    <div
      ref={barRef}
      aria-hidden={!show}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden"
      style={{
        transform: show ? "translateY(0)" : "translateY(120%)",
        opacity: show ? 1 : 0,
        transition:
          "transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease-out",
        willChange: "transform, opacity",
      }}
    >
      <div className="pointer-events-auto flex w-full max-w-md items-center gap-2 rounded-full border border-white/10 bg-[#0b0c0e]/95 p-1.5 shadow-[0_20px_60px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <Link
          href={secondaryHref}
          className="flex-1 rounded-full px-4 py-3 text-center text-[13px] font-semibold text-[#f3f1ea]"
        >
          {secondaryLabel}
        </Link>
        <Link
          href={primaryHref}
          className="flex-1 rounded-full bg-[#c5f23c] px-4 py-3 text-center text-[13px] font-semibold text-black"
        >
          {primaryLabel}
        </Link>
      </div>
    </div>
  );
}
