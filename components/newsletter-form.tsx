"use client";

import { useState } from "react";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email || !email.includes("@")) {
          toast.error("Enter a valid email");
          return;
        }
        toast.success("You're on the list", {
          description: "Early drops, restocks, and build tips — no spam.",
        });
        setEmail("");
      }}
      className="flex w-full max-w-sm items-center gap-2"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        className="w-full rounded-full border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-[#f3f1ea] placeholder:text-neutral-500 focus:border-[#c5f23c]/60"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-[#c5f23c] px-4 py-2.5 text-sm font-semibold text-black transition hover:brightness-110"
      >
        Join
      </button>
    </form>
  );
}
