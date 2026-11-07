"use client";

import { useState } from "react";
import { WELCOME_DISCOUNT_CODE } from "lib/brand";

type Props = {
  email: string;
  setEmail: (v: string) => void;
  getItems: () => { title: string; quantity: number; unitAmount: number }[];
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Optional email field in the cart. It does two jobs: saves the cart and sends
 * the first-order code, and gives checkout an address to prefill so a shopper
 * who leaves Stripe's page can still be reminded.
 */
export function CartEmailCapture({ email, setEmail, getItems }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  async function save() {
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setState("error");
      return;
    }
    setState("sending");
    try {
      window.localStorage.setItem("fbl_cart_email", value);
    } catch {}
    try {
      const res = await fetch("/api/cart-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: value, items: getItems() }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      {state === "done" ? (
        <p className="text-xs text-neutral-300">
          Saved. Check your inbox for your 10% code ({WELCOME_DISCOUNT_CODE}).
        </p>
      ) : (
        <>
          <label
            htmlFor="cart-email"
            className="mb-1.5 block text-xs font-medium text-neutral-300"
          >
            Email me this cart and a 10% code
          </label>
          <div className="flex gap-2">
            <input
              id="cart-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") setState("idle");
              }}
              placeholder="you@example.com"
              aria-invalid={state === "error"}
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-[#0b0c0e] px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-[#c5f23c] focus:outline-none"
            />
            <button
              type="button"
              onClick={save}
              disabled={state === "sending"}
              className="shrink-0 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#c5f23c] hover:text-[#c5f23c] disabled:opacity-60"
            >
              {state === "sending" ? "Saving" : "Save"}
            </button>
          </div>
          {state === "error" ? (
            <p className="mt-1.5 text-xs text-[#ff8a8a]">
              Enter a valid email address.
            </p>
          ) : (
            <p className="mt-1.5 text-[11px] text-neutral-500 [@media(max-height:720px)]:hidden">
              Optional. We only email about this cart. Reply &quot;stop&quot; any
              time.
            </p>
          )}
        </>
      )}
    </div>
  );
}
