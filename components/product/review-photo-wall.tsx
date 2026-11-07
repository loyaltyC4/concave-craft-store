"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Bento wall of buyer photos with a lightweight lightbox.
 * Uses the native <dialog>, so focus trapping and Escape come for free.
 */
export function ReviewPhotoWall({ photos }: { photos: string[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setActive(null);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active !== null && !d.open) d.showModal();
  }, [active]);

  const shown = photos.slice(0, 7);
  const extra = photos.length - shown.length;

  return (
    <>
      <ul className="grid auto-rows-[7.5rem] grid-cols-3 gap-2 md:auto-rows-[9rem] md:grid-cols-4">
        {shown.map((src, i) => {
          const feature = i === 0;
          return (
            <li
              key={src}
              className={
                feature ? "col-span-2 row-span-2 md:col-span-2" : "col-span-1"
              }
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Open buyer photo ${i + 1} of ${photos.length}`}
                className="group relative block h-full w-full overflow-hidden rounded-[1.1rem] ring-1 ring-white/10 transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-[#c5f23c]/50 active:scale-[0.985]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Photo from a buyer of this item"
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                />
                {i === shown.length - 1 && extra > 0 ? (
                  <span className="absolute inset-0 grid place-items-center bg-black/60 text-lg font-semibold text-white">
                    +{extra}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto max-h-[90dvh] max-w-[min(92vw,56rem)] overflow-visible rounded-[1.75rem] border-0 bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {active !== null ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[active]}
              alt="Photo from a buyer of this item, enlarged"
              className="max-h-[85dvh] w-auto max-w-full rounded-[1.5rem] object-contain"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close photo"
              className="absolute -top-3 -right-3 grid h-10 w-10 place-items-center rounded-full bg-[#14171c] text-white ring-1 ring-white/20 transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#c5f23c] hover:text-black active:scale-95"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
