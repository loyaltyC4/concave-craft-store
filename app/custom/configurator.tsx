"use client";

import { useCallback, useRef, useState } from "react";

// ─── Pricing (mirrors server-side logic in /api/custom-orders/create) ────────
const BASE_PRICE = 89;
const WOOD_UPGRADE_PRICE = 15;
const RUSH_PRICE = 25;

function unitPrice(woodUpgrade: boolean, rushProduction: boolean): number {
  return BASE_PRICE + (woodUpgrade ? WOOD_UPGRADE_PRICE : 0) + (rushProduction ? RUSH_PRICE : 0);
}

function totalPrice(
  qty: number,
  woodUpgrade: boolean,
  rushProduction: boolean,
): number {
  const up = unitPrice(woodUpgrade, rushProduction);
  if (qty <= 1) return up;
  // 2nd board -10%, 3rd+ boards -15%
  return up + (qty >= 2 ? up * 0.9 : 0) + Math.max(0, qty - 2) * up * 0.85;
}

// ─── Accepted file types ──────────────────────────────────────────────────────
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
  "image/svg+xml",
  // .ai and .eps don't have universally agreed MIME types — accept by extension
];
const ACCEPTED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".heif",
  ".pdf",
  ".svg",
  ".ai",
  ".eps",
];
const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15 MB
const MAX_FILES = 10;

function isAccepted(file: File): boolean {
  if (ACCEPTED_TYPES.includes(file.type)) return true;
  const name = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface FileEntry {
  file: File;
  preview: string | null; // object URL for images, null for vector/pdf
  error: string | null;
}

type SubmitState = "idle" | "uploading" | "creating" | "error";

// ─── VOLT constant (matches lib/brand.ts) ────────────────────────────────────
const VOLT = "#c5f23c";

export function CustomBuildConfigurator() {
  // Form state
  const [size, setSize] = useState<"32mm" | "34mm" | "36mm">("34mm");
  const [woodUpgrade, setWoodUpgrade] = useState(false);
  const [rushProduction, setRushProduction] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [designHelpRequested, setDesignHelpRequested] = useState(false);
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [dragOver, setDragOver] = useState(false);

  // Submit state
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Price calc ──────────────────────────────────────────────────────────────
  const up = unitPrice(woodUpgrade, rushProduction);
  const total = totalPrice(quantity, woodUpgrade, rushProduction);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  // ── File handling ───────────────────────────────────────────────────────────
  const addFiles = useCallback(
    (incoming: File[]) => {
      setFiles((prev) => {
        const remaining = MAX_FILES - prev.length;
        if (remaining <= 0) return prev;
        const toAdd = incoming.slice(0, remaining).map((file): FileEntry => {
          if (!isAccepted(file)) {
            return { file, preview: null, error: "Unsupported file type." };
          }
          if (file.size > MAX_FILE_BYTES) {
            return { file, preview: null, error: "File exceeds 15 MB limit." };
          }
          const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
          return { file, preview, error: null };
        });
        return [...prev, ...toAdd];
      });
    },
    [],
  );

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const entry = prev[index];
      if (entry?.preview) URL.revokeObjectURL(entry.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
    // Reset input so same file can be re-added after removal
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  // ── Validation ──────────────────────────────────────────────────────────────
  const validFiles = files.filter((f) => !f.error);
  const hasValidUpload = validFiles.length > 0;
  const canSubmit =
    email.trim() &&
    /^[^@]+@[^@]+\.[^@]+$/.test(email) &&
    (hasValidUpload || designHelpRequested);

  // ── Submit flow: upload → create → redirect ─────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitState("uploading");
    setSubmitError(null);

    let filePaths: string[] = [];

    try {
      // Step 1: upload files (if any)
      if (validFiles.length > 0) {
        const formData = new FormData();
        for (const entry of validFiles) {
          formData.append("files", entry.file);
        }
        const uploadRes = await fetch("/api/custom-orders/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) {
          const err = await uploadRes.json().catch(() => ({}));
          throw new Error(
            (err as { message?: string }).message ?? "Upload failed. Please try again.",
          );
        }
        const uploadData = (await uploadRes.json()) as {
          orderAttemptId: string;
          paths: string[];
        };
        filePaths = uploadData.paths;
      }

      // Step 2: create order and get Stripe URL
      setSubmitState("creating");
      const createRes = await fetch("/api/custom-orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: email.trim(),
          size,
          woodUpgrade,
          rushProduction,
          quantity,
          notes: notes.trim() || undefined,
          filePaths: filePaths.length > 0 ? filePaths : undefined,
          designHelpRequested: designHelpRequested || undefined,
        }),
      });
      if (!createRes.ok) {
        const err = await createRes.json().catch(() => ({}));
        throw new Error(
          (err as { message?: string }).message ?? "Order creation failed. Please try again.",
        );
      }
      const { url } = (await createRes.json()) as { url: string };

      // Step 3: redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      setSubmitState("error");
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  const isSubmitting = submitState === "uploading" || submitState === "creating";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* SIZE */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-[#f3f1ea]">
          Deck width
        </label>
        <div className="flex gap-3">
          {(["32mm", "34mm", "36mm"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className="flex-1 rounded-xl border py-3 text-sm font-semibold transition"
              style={{
                background: size === s ? VOLT : "transparent",
                borderColor: size === s ? VOLT : "rgba(255,255,255,0.15)",
                color: size === s ? "#0b0c0e" : "#f3f1ea",
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          34mm is the most common pro width. 32mm suits smaller hands or a
          tighter feel; 36mm is for wide-stance riders.
        </p>
      </div>

      {/* UPGRADES */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-[#f3f1ea]">
          Upgrades
        </label>
        {[
          {
            id: "wood",
            checked: woodUpgrade,
            toggle: () => setWoodUpgrade((v) => !v),
            label: "Select Hardwood Upgrade",
            price: "+$15",
            desc: "Hand-selected premium maple veneer with tighter grain — worth it for gifts or display boards.",
          },
          {
            id: "rush",
            checked: rushProduction,
            toggle: () => setRushProduction((v) => !v),
            label: "Rush Production",
            price: "+$25",
            desc: "24–48 hour production turnaround instead of the standard 2–3 business days.",
          },
        ].map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={opt.toggle}
            className="flex w-full items-start gap-4 rounded-xl border p-4 text-left transition"
            style={{
              borderColor: opt.checked ? VOLT : "rgba(255,255,255,0.1)",
              background: opt.checked ? "rgba(197,242,60,0.06)" : "rgba(255,255,255,0.02)",
            }}
          >
            <div
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border"
              style={{
                borderColor: opt.checked ? VOLT : "rgba(255,255,255,0.2)",
                background: opt.checked ? VOLT : "transparent",
              }}
            >
              {opt.checked && (
                <svg viewBox="0 0 12 10" fill="none" className="h-3 w-3">
                  <path
                    d="M1 5l3.5 3.5L11 1"
                    stroke="#0b0c0e"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#f3f1ea]">
                  {opt.label}
                </span>
                <span className="text-sm font-semibold" style={{ color: VOLT }}>
                  {opt.price}
                </span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* QUANTITY */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-[#f3f1ea]">
          Quantity{" "}
          {quantity >= 2 && (
            <span className="ml-2 text-xs font-normal" style={{ color: VOLT }}>
              {quantity === 2 ? "2nd board −10%" : `2nd −10%, boards 3+ −15%`}
            </span>
          )}
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-lg text-[#f3f1ea] transition hover:border-[#c5f23c] disabled:opacity-40"
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="w-8 text-center text-lg font-semibold">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-lg text-[#f3f1ea] transition hover:border-[#c5f23c] disabled:opacity-40"
            disabled={quantity >= 10}
          >
            +
          </button>
          <span className="text-sm text-neutral-500">max 10 per order</span>
        </div>
      </div>

      {/* FILE UPLOAD */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-[#f3f1ea]">
          Artwork upload{" "}
          <span className="ml-1 text-xs font-normal text-neutral-500">
            ({files.length}/{MAX_FILES} files)
          </span>
        </label>

        {!designHelpRequested && (
          <>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition"
              style={{
                borderColor: dragOver ? VOLT : "rgba(255,255,255,0.12)",
                background: dragOver
                  ? "rgba(197,242,60,0.04)"
                  : "rgba(255,255,255,0.015)",
              }}
            >
              <svg
                className="mb-3 h-8 w-8 text-neutral-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <p className="text-sm font-medium text-neutral-300">
                Drag files here or click to browse
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                JPG, PNG, SVG, PDF, AI, EPS, WebP, HEIC — up to 15 MB each
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ACCEPTED_EXTENSIONS.join(",")}
                className="hidden"
                onChange={handleFileInputChange}
              />
            </div>

            {/* File list */}
            {files.length > 0 && (
              <ul className="mt-4 space-y-2">
                {files.map((entry, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-xl border px-4 py-3"
                    style={{
                      borderColor: entry.error
                        ? "rgba(255,80,80,0.4)"
                        : "rgba(255,255,255,0.1)",
                      background: entry.error
                        ? "rgba(255,80,80,0.04)"
                        : "rgba(255,255,255,0.02)",
                    }}
                  >
                    {entry.preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={entry.preview}
                        alt=""
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-xs font-semibold uppercase text-neutral-500">
                        {entry.file.name.split(".").pop() ?? "file"}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm text-[#f3f1ea]">
                        {entry.file.name}
                      </p>
                      {entry.error ? (
                        <p className="text-xs text-red-400">{entry.error}</p>
                      ) : (
                        <p className="text-xs text-neutral-600">
                          {(entry.file.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 text-xs text-neutral-500 transition hover:border-red-400/40 hover:text-red-400"
                      aria-label="Remove file"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Design help toggle */}
        <button
          type="button"
          onClick={() => {
            setDesignHelpRequested((v) => !v);
            if (!designHelpRequested) setFiles([]);
          }}
          className="mt-4 flex w-full items-start gap-4 rounded-xl border p-4 text-left transition"
          style={{
            borderColor: designHelpRequested ? VOLT : "rgba(255,255,255,0.1)",
            background: designHelpRequested
              ? "rgba(197,242,60,0.06)"
              : "rgba(255,255,255,0.02)",
          }}
        >
          <div
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border"
            style={{
              borderColor: designHelpRequested ? VOLT : "rgba(255,255,255,0.2)",
              background: designHelpRequested ? VOLT : "transparent",
            }}
          >
            {designHelpRequested && (
              <svg viewBox="0 0 12 10" fill="none" className="h-3 w-3">
                <path
                  d="M1 5l3.5 3.5L11 1"
                  stroke="#0b0c0e"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <div>
            <span className="text-sm font-semibold text-[#f3f1ea]">
              I&apos;d like your team&apos;s help designing this
            </span>
            <p className="mt-1 text-xs text-neutral-500">
              No file ready? Tell us what you&apos;re going for in the notes
              field below and we&apos;ll reach out to discuss before we start.
            </p>
          </div>
        </button>
      </div>

      {/* NOTES */}
      <div>
        <label
          htmlFor="notes"
          className="mb-2 block text-sm font-semibold text-[#f3f1ea]"
        >
          Notes &amp; instructions{" "}
          <span className="font-normal text-neutral-500">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Colour preferences, placement of your graphic, any special instructions…"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#f3f1ea] placeholder-neutral-600 outline-none transition focus:border-[#c5f23c]/60 focus:ring-0"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-[#f3f1ea]"
        >
          Your email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#f3f1ea] placeholder-neutral-600 outline-none transition focus:border-[#c5f23c]/60"
        />
        <p className="mt-1.5 text-xs text-neutral-600">
          We&apos;ll send your order confirmation here and reach out if your artwork needs clarifying.
        </p>
      </div>

      {/* PRICE SUMMARY */}
      <div className="rounded-2xl border border-white/10 bg-[#15171c] p-5">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-400">
          Price breakdown
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-400">
              Base ({size})
            </dt>
            <dd className="text-[#f3f1ea]">{fmt(BASE_PRICE)}</dd>
          </div>
          {woodUpgrade && (
            <div className="flex justify-between">
              <dt className="text-neutral-400">Select Hardwood Upgrade</dt>
              <dd className="text-[#f3f1ea]">+{fmt(WOOD_UPGRADE_PRICE)}</dd>
            </div>
          )}
          {rushProduction && (
            <div className="flex justify-between">
              <dt className="text-neutral-400">Rush Production</dt>
              <dd className="text-[#f3f1ea]">+{fmt(RUSH_PRICE)}</dd>
            </div>
          )}
          {quantity === 1 && (
            <div className="flex justify-between">
              <dt className="text-neutral-400">Quantity</dt>
              <dd className="text-[#f3f1ea]">1 board</dd>
            </div>
          )}
          {quantity >= 2 && (
            <>
              <div className="flex justify-between">
                <dt className="text-neutral-400">Board 1</dt>
                <dd className="text-[#f3f1ea]">{fmt(up)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-400">Board 2 (−10%)</dt>
                <dd className="text-[#f3f1ea]">{fmt(up * 0.9)}</dd>
              </div>
              {quantity > 2 && (
                <div className="flex justify-between">
                  <dt className="text-neutral-400">
                    Boards 3–{quantity} (−15% each)
                  </dt>
                  <dd className="text-[#f3f1ea]">
                    {fmt((quantity - 2) * up * 0.85)}
                  </dd>
                </div>
              )}
            </>
          )}
          <div
            className="flex justify-between border-t pt-3 text-base font-semibold"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <dt style={{ color: VOLT }}>Total</dt>
            <dd style={{ color: VOLT }}>{fmt(total)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-neutral-600">
          Shipping calculated at checkout. Prices in USD.
        </p>
      </div>

      {/* ERROR */}
      {submitState === "error" && submitError && (
        <div className="rounded-xl border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-300">
          {submitError}
        </div>
      )}

      {/* SUBMIT */}
      <div>
        {!canSubmit && !isSubmitting && (
          <p className="mb-3 text-xs text-neutral-600">
            {!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)
              ? "Add your email address to continue."
              : !hasValidUpload && !designHelpRequested
                ? "Upload at least one artwork file, or check the design help option."
                : ""}
          </p>
        )}
        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="w-full rounded-full py-4 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ background: VOLT }}
        >
          {submitState === "uploading"
            ? "Uploading artwork…"
            : submitState === "creating"
              ? "Creating order…"
              : "Continue to checkout →"}
        </button>
        <p className="mt-3 text-center text-xs text-neutral-600">
          You&apos;ll be taken to Stripe to complete payment. We don&apos;t
          start pressing until payment is confirmed.
        </p>
      </div>
    </form>
  );
}
