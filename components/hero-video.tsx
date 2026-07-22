"use client";

import { useEffect, useState } from "react";

/**
 * Homepage hero background video. Renders only when the user has not requested
 * reduced motion; otherwise the underlying poster image is shown. Muted, looped,
 * inline — safe for autoplay on mobile.
 */
export function HeroVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const ok = window.matchMedia?.(
      "(prefers-reduced-motion: no-preference)",
    ).matches;
    if (ok) setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
