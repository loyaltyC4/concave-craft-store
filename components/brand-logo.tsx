import Link from "next/link";
import clsx from "clsx";
import { SITE_NAME } from "lib/brand";
import { AnimatedMark } from "components/animated-mark";

/**
 * Brand lockup — the animated SVG mark (deck outline draws itself on mount,
 * same stroke-draw motion as bidcheck.co.za's hero; see
 * components/animated-mark.tsx) + wordmark. The old static mark.png is kept
 * in /public for OG images and fallbacks; the navbar lockup is now live SVG
 * so the draw animation actually runs (an <Image> can't animate its paths).
 *
 * wordmark=false renders the mark alone (footer icon, favicon-adjacent uses).
 * The mark uses text-current so callers color it via className; the navbar
 * wrap colors it volt-green.
 */
export function BrandLogo({
  className,
  wordmark = true,
  size = 34,
}: {
  className?: string;
  wordmark?: boolean;
  size?: number;
}) {
  return (
    <Link
      href="/"
      prefetch
      aria-label={`${SITE_NAME} home`}
      className={clsx("flex flex-none items-center gap-2.5", className)}
    >
      <span className="flex flex-none text-[#c5f23c]">
        <AnimatedMark size={size * 1.75} />
      </span>
      {wordmark && (
        <span
          className="text-[17px] font-semibold leading-none tracking-tight text-[#f3f1ea]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Fingerboard<span className="text-[#c5f23c]"> Lab</span>
        </span>
      )}
    </Link>
  );
}
