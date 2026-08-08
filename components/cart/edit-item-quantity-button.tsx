"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { CartItem } from "lib/shopify/types";

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: CartItem;
  type: "plus" | "minus";
  optimisticUpdate: (
    merchandiseId: string,
    updateType: "plus" | "minus",
  ) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => optimisticUpdate(item.merchandise.id, type)}
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      className={clsx(
        // 44x44 min per WCAG 2.5.5 (was 36x36 — mis-tap risk on mobile).
        "ease flex h-11 min-w-11 flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:opacity-80",
        { "ml-auto": type === "minus" },
      )}
    >
      {type === "plus" ? (
        <PlusIcon className="h-4 w-4 text-neutral-300" />
      ) : (
        <MinusIcon className="h-4 w-4 text-neutral-300" />
      )}
    </button>
  );
}
