"use client";

import { useEffect, useState } from "react";
import { activeSale } from "lib/flash-sale";
import { hasWelcomeCookie, setWelcomeCookie } from "lib/welcome";

type Props = {
  email: string;
  setEmail: (v: string) => void;
  getItems: () => { title: string; quantity: number; unitAmount: number }[];
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Opt-in 10% first-order offer. Collapsed to one line so it never sits between
 * the shopper and the checkout button. Claiming it sets a cookie and the
 * checkout applies the discount automatically: no code to copy or type.
 */
export function CartEmailCapture({ email, setEmail, getItems }: Props) {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [saleOn, setSaleOn] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");

  useEffect(() => {
    setApplied(hasWelcomeCookie());
    setSaleOn(activeSale() !== null);
  }, []);

  if (saleOn) return null;

  if (applied) {
    return (
      <p className="mb-3 text-center text-xs font-medium text-[#c5f23c]">
        ✓ 10% off your first order is applied at checkout
      </p>
    );
  }

  async function claim() {
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setState("error");
      return;
    }
    setState("sending");
    try {
      window.localStorage.setItem("fbl_cart_email", value);
    } catch {}
    // The discount is granted right away; the email is a bonus (saved cart).
    setWelcomeCookie();
    setApplied(true);
    fetch("/api/cart-lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: value, items: getItems() }),
    }).catch(() => {});
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-3 w-full text-center text-xs font-medium text-neutral-400 underline-offset-2 hover:text-[#c5f23c] hover:underline"
      >
        Get 10% off your first order
      </button>
    );
  }

  return (
    <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex gap-2">
        <input
          id="cart-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="you@example.com"
          aria-label="Email address"
          aria-invalid={state === "error"}
          className="min-w-0 flex-1 rounded-full border border-white/15 bg-[#0b0c0e] px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-[#c5f23c] focus:outline-none"
        />
        <button
          type="button"
          onClick={claim}
          disabled={state === "sending"}
          className="shrink-0 rounded-full bg-[#c5f23c] px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
        >
          Apply 10%
        </button>
      </div>
      {state === "error" ? (
        <p className="mt-1.5 text-xs text-[#ff8a8a]">Enter a valid email address.</p>
      ) : null}
    </div>
  );
}
