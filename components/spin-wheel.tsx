"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { GIFT_COOKIE, GIFT_POOL, GIFT_THRESHOLD } from "lib/brand";

/**
 * Spin-to-win free gift.
 *
 * Every spin wins one of the pool gifts (tiny, cheap catalog items, see
 * lib/brand.ts GIFT_POOL). The prize is stored in a cookie that the checkout
 * API validates against the pool; it is added as a $0 line on orders over the
 * gift threshold. One spin per visitor (localStorage + cookie). No fake odds:
 * the wheel really is equal-probability across the pool.
 */

const SLICES = GIFT_POOL.length;
const SLICE_DEG = 360 / SLICES;
const COLORS = ["#c5f23c", "#1f2937", "#c5f23c", "#1f2937", "#a3d12a"];
const SPUN_KEY = "fl_spun_v1";
const AUTO_OPEN_KEY = "fl_spin_seen_v1";

function readSpun(): number | null {
  try {
    const v = localStorage.getItem(SPUN_KEY);
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
}

function setGiftCookie(handle: string) {
  document.cookie = `${GIFT_COOKIE}=${encodeURIComponent(handle)}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
}

function slicePath(i: number) {
  const [x1, y1] = polar(100, 100, 96, i * SLICE_DEG);
  const [x2, y2] = polar(100, 100, 96, (i + 1) * SLICE_DEG);
  return `M100,100 L${x1.toFixed(2)},${y1.toFixed(2)} A96,96 0 0 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`;
}

export function SpinWheel() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [won, setWon] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    const spun = readSpun();
    if (spun !== null && spun >= 0 && spun < SLICES) setWon(spun);
    // Open once, ~25s into a first visit, if they haven't spun or been shown it.
    let seen = false;
    try {
      seen = localStorage.getItem(AUTO_OPEN_KEY) === "1";
    } catch {}
    if (spun === null && !seen) {
      timer.current = setTimeout(() => {
        setOpen(true);
        try {
          localStorage.setItem(AUTO_OPEN_KEY, "1");
        } catch {}
      }, 25000);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // Never show over checkout/order pages or the admin.
  if (!mounted) return null;
  if (/^\/(order|track|admin|api)/.test(pathname || "")) return null;

  const spin = () => {
    if (spinning || won !== null) return;
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    const idx = buf[0]! % SLICES; // equal odds
    const target = 360 * 6 + (360 - (idx * SLICE_DEG + SLICE_DEG / 2));
    setSpinning(true);
    setRotation(target);
    window.setTimeout(() => {
      setSpinning(false);
      setWon(idx);
      try {
        localStorage.setItem(SPUN_KEY, String(idx));
      } catch {}
      setGiftCookie(GIFT_POOL[idx]!.handle);
    }, 4200);
  };

  const prize = won !== null ? GIFT_POOL[won]! : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full bg-[#c5f23c] px-4 py-2.5 text-sm font-semibold text-black shadow-lg shadow-black/40 transition hover:scale-105"
        aria-label="Spin to win a free gift"
      >
        <span aria-hidden>🎁</span>
        {prize ? "Your free gift" : "Spin to win"}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Spin to win a free gift"
          onClick={() => !spinning && setOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-neutral-950 p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => !spinning && setOpen(false)}
              className="absolute right-4 top-3 text-2xl text-neutral-400 hover:text-white"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold text-[#f3f1ea]">
              {prize ? "You won a free gift!" : "Spin for a free gift"}
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              {prize
                ? `${prize.name} is added automatically to any order over $${GIFT_THRESHOLD}.`
                : `Every spin wins one. It's added free to any order over $${GIFT_THRESHOLD}.`}
            </p>

            <div className="relative mx-auto mt-5 h-60 w-60">
              <div
                className="absolute -top-1 left-1/2 z-10 h-0 w-0 -translate-x-1/2"
                style={{
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTop: "20px solid #f3f1ea",
                }}
                aria-hidden
              />
              <svg
                viewBox="0 0 200 200"
                className="h-full w-full"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning
                    ? "transform 4.2s cubic-bezier(0.12, 0.7, 0.1, 1)"
                    : "none",
                }}
                aria-hidden
              >
                {GIFT_POOL.map((g, i) => {
                  const [tx, ty] = polar(100, 100, 62, i * SLICE_DEG + SLICE_DEG / 2);
                  const dark = COLORS[i % COLORS.length] === "#1f2937";
                  return (
                    <g key={g.handle}>
                      <path d={slicePath(i)} fill={COLORS[i % COLORS.length]} stroke="#0a0a0a" strokeWidth="2" />
                      <text
                        x={tx}
                        y={ty}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="10"
                        fontWeight="700"
                        fill={dark ? "#f3f1ea" : "#0a0a0a"}
                        transform={`rotate(${i * SLICE_DEG + SLICE_DEG / 2}, ${tx}, ${ty})`}
                      >
                        {g.short}
                      </text>
                    </g>
                  );
                })}
                <circle cx="100" cy="100" r="12" fill="#0a0a0a" stroke="#f3f1ea" strokeWidth="2" />
              </svg>
            </div>

            {prize ? (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-6 w-full rounded-full bg-[#c5f23c] py-3 text-sm font-semibold text-black"
              >
                Keep shopping
              </button>
            ) : (
              <button
                type="button"
                onClick={spin}
                disabled={spinning}
                className="mt-6 w-full rounded-full bg-[#c5f23c] py-3 text-sm font-semibold text-black disabled:opacity-60"
              >
                {spinning ? "Spinning..." : "SPIN"}
              </button>
            )}
            <p className="mt-3 text-[11px] text-neutral-500">
              One spin per visitor. Gift is a small accessory, ships with your order.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
