"use client";

import clsx from "clsx";

/**
 * Fingerboard Lab animated mark — the static mark.png replaced (navbar + hero
 * contexts) with a live SVG whose deck outline and registration tick DRAW
 * THEMSELVES on mount, the same stroke-dashoffset trick bidcheck.co.za uses
 * on its hero (is-draw keyframes, 2.2s cubic-bezier, staggered delay).
 *
 * Design: the deck side-profile path (kicked nose + tail) draws left-to-right
 * like a board being pressed, then the registration tick snaps in and the
 * whole mark settles. Runs once per mount (forwards), then sits static —
 * looping a navbar logo reads as jitter, not life.
 *
 * Draw lengths (stroke-dasharray) are tuned to each path's real length:
 *   deck profile ~118 units, tick ~28 units.
 * prefers-reduced-motion: animation disabled, fully-drawn mark shown.
 */
export function AnimatedMark({
  className,
  size = 34,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 48"
      fill="none"
      width={size}
      height={(size * 48) / 128}
      aria-label="Fingerboard Lab logo"
      className={clsx("text-current", className)}
    >
      <style>{`
        @keyframes fbl-draw { to { stroke-dashoffset: 0; } }
        @keyframes fbl-pop { 0% { opacity: 0; transform: scale(.4); } 70% { opacity: 1; transform: scale(1.15); } 100% { opacity: 1; transform: scale(1); } }
        .fbl-deck {
          stroke-dasharray: 118;
          stroke-dashoffset: 118;
          animation: fbl-draw 1.1s cubic-bezier(.32,.72,0,1) .1s forwards;
        }
        .fbl-tick {
          stroke-dasharray: 28;
          stroke-dashoffset: 28;
          animation: fbl-draw .5s cubic-bezier(.32,.72,0,1) 1.05s forwards;
        }
        .fbl-dot {
          opacity: 0;
          transform-origin: 64px 18px;
          animation: fbl-pop .35s cubic-bezier(.32,.72,0,1) 1.4s forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .fbl-deck, .fbl-tick { stroke-dashoffset: 0; animation: none; }
          .fbl-dot { opacity: 1; animation: none; }
        }
      `}</style>
      {/* deck side profile — draws like a board being pressed */}
      <path
        className="fbl-deck"
        d="M10 20 C 22 20 24 32 36 32 L 92 32 C 104 32 106 20 118 20"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* registration tick — snaps in after the deck */}
      <path
        className="fbl-tick"
        d="M64 12 V 24 M 58 18 H 70"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.9}
      />
      <circle className="fbl-dot" cx="64" cy="18" r="2.4" fill="currentColor" />
    </svg>
  );
}

export default AnimatedMark;
