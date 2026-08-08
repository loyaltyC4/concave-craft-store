"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import type { CartItem } from "lib/shopify/types";

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem;
  optimisticUpdate: (merchandiseId: string, updateType: "delete") => void;
}) {
  const merchandiseId = item.merchandise.id;

  return (
    <button
      type="button"
      onClick={() => optimisticUpdate(merchandiseId, "delete")}
      aria-label="Remove cart item"
      // Visible dot is 24px but the tap target is 44x44 (WCAG 2.5.5)
      // via a full-bleed pseudo-hit-area. Prevents mis-taps on mobile
      // where a stray delete can wipe a whole line item.
      className="relative flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500 transition hover:bg-red-500 before:absolute before:inset-[-10px] before:content-['']"
    >
      <XMarkIcon className="mx-[1px] h-4 w-4 text-white" />
    </button>
  );
}
