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
      // 44x44 real hit area (WCAG 2.5.5) so a stray tap cannot miss or
      // accidentally delete a neighbouring line item.
      className="group flex h-11 w-11 items-center justify-center rounded-full"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-500 transition group-hover:bg-red-500">
        <XMarkIcon className="h-4 w-4 text-white" />
      </span>
    </button>
  );
}
