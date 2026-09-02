"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * IntersectionObserver-driven reveal wrapper. Zero-dependency, SSR-safe, and
 * respects prefers-reduced-motion: when reduced-motion is on, the content
 * shows immediately with no transform or opacity animation, so nothing ever
 * flashes or "pops in" for users who opted out.
 *
 * Design choice: fires ONCE (does not re-hide on scroll out). This is the
 * conversion-friendly behaviour Aesop / Byredo / Oura all use — reversing
 * the animation on scroll-up makes the page feel busy and forces the eye
 * to re-track content the user has already seen. Once revealed, it stays.
 *
 * Directions correspond to concrete design roles:
 *  - "up":    default; use for stacked sections that enter as you scroll down.
 *  - "left":  slides in from the right edge; use for right-column content in
 *             two-up sections so the enter direction matches the eye's travel.
 *  - "right": slides in from the left edge; symmetrical partner for "left".
 *  - "scale": subtle scale-up from 0.94; use for hero product tiles.
 *
 * `delay` staggers a group of siblings — pass the item's index * 80ms.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  threshold = 0.15,
  once = true,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "scale" | "none";
  delay?: number;
  threshold?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "article";
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mm.matches);
    const onChange = () => setReduced(mm.matches);
    mm.addEventListener("change", onChange);
    return () => mm.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, threshold, once]);

  const hidden: Record<string, CSSProperties> = {
    up: { opacity: 0, transform: "translate3d(0, 28px, 0)" },
    left: { opacity: 0, transform: "translate3d(32px, 0, 0)" },
    right: { opacity: 0, transform: "translate3d(-32px, 0, 0)" },
    scale: { opacity: 0, transform: "scale(0.94)" },
    none: { opacity: 0 },
  };
  const shown: CSSProperties = { opacity: 1, transform: "none" };

  const combinedStyle: CSSProperties = reduced
    ? style ?? {}
    : {
        ...(visible ? shown : hidden[direction]),
        transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: visible ? "auto" : "transform, opacity",
        ...style,
      };

  const Component: any = Tag;
  return (
    <Component ref={ref as any} className={className} style={combinedStyle}>
      {children}
    </Component>
  );
}
