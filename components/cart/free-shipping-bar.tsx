import {
  FREE_SHIPPING_THRESHOLD,
  GIFT_THRESHOLD,
  amountToFreeShipping,
  isFreeShipping,
  qualifiesForGift,
} from "lib/brand";

export function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const remaining = amountToFreeShipping(subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const unlocked = isFreeShipping(subtotal);
  const giftUnlocked = qualifiesForGift(subtotal);
  const giftRemaining = Math.max(0.01, GIFT_THRESHOLD + 0.01 - subtotal);

  return (
    <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
      <p className="text-center text-xs font-medium text-neutral-300">
        {unlocked ? (
          <span className="text-[#c5f23c]">
            🎉 You&apos;ve unlocked free shipping!
          </span>
        ) : (
          <>
            Add{" "}
            <span className="font-semibold text-[#f3f1ea]">
              ${remaining.toFixed(2)}
            </span>{" "}
            more for free shipping
          </>
        )}
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#c5f23c] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-center text-xs font-medium text-neutral-300">
        {giftUnlocked ? (
          <span className="text-[#c5f23c]">
            🎁 Free gift added to your order
          </span>
        ) : unlocked ? (
          <>
            Add{" "}
            <span className="font-semibold text-[#f3f1ea]">
              ${giftRemaining.toFixed(2)}
            </span>{" "}
            more for a free gift
          </>
        ) : null}
      </p>
    </div>
  );
}
