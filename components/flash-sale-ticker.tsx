"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FLASH_SALE, getFlashSaleEndMs } from "lib/flash-sale";

function formatRemaining(ms: number): string {
  if (ms <= 0) return "";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

/**
 * Live countdown to a fixed, real end timestamp (lib/flash-sale.ts).
 *
 * Deliberately does NOT reset per session/reload — the target time is a
 * constant, so refreshing the page just shows the same true remaining time.
 * Renders nothing once the sale has actually ended (server-checked on next
 * render; this component just stops counting client-side in the meantime).
 */
export function FlashSaleTicker() {
  const endMs = getFlashSaleEndMs();
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(endMs - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endMs]);

  if (remaining === null || remaining <= 0) return null;

  return (
    <Link
      href="/search/sale"
      className="flex items-center gap-8 text-[#c5f23c] hover:underline"
    >
      {FLASH_SALE.name} — {FLASH_SALE.discountPct * 100}% off, ends in{" "}
      {formatRemaining(remaining)}
      <span className="text-[#f3f1ea]/30">◆</span>
    </Link>
  );
}
