"use client";

import { useState } from "react";
import { toast } from "sonner";
import { WELCOME_DISCOUNT_CODE } from "lib/brand";

export function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (res.status === 503) {
        toast.error("Sign-ups aren't open yet", {
          description: "Check back soon — we're setting this up.",
        });
      } else if (!res.ok) {
        toast.error("Couldn't sign you up", {
          description: "Please check your email and try again.",
        });
      } else {
        toast.success("You're on the list!", {
          description: `Use code ${data.code || WELCOME_DISCOUNT_CODE} for 10% off your first order.`,
        });
        setEmail("");
      }
    } catch {
      toast.error("Network error", { description: "Please try again." });
    }
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center gap-2"
    >
      {/*
       * min-h-11 (44px) meets WCAG 2.5.5 minimum tap target on mobile.
       * Previous py-2.5 gave ~40px which is technically under the floor.
       */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        className="min-h-11 w-full rounded-full border border-white/15 bg-white/[0.03] px-4 text-sm text-[#f3f1ea] placeholder:text-neutral-500 focus:border-[#c5f23c]/60"
      />
      <button
        type="submit"
        disabled={submitting}
        className="min-h-11 shrink-0 rounded-full bg-[#c5f23c] px-5 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
      >
        {submitting ? "…" : "Join"}
      </button>
    </form>
  );
}
