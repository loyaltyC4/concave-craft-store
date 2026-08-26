import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "lib/supabase";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

// Per-file limit: 15 MB
const MAX_FILE_SIZE = 15 * 1024 * 1024;
// Total request limit: 60 MB
const MAX_TOTAL_SIZE = 60 * 1024 * 1024;
// Max number of files per upload attempt
const MAX_FILES = 10;

// Accepted MIME types
const ACCEPTED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
  "image/svg+xml",
  // AI / EPS / generic postscript
  "application/postscript",
  "application/illustrator",
  // Some clients send these for .eps/.ai
  "application/eps",
  "application/x-eps",
  "image/x-eps",
]);

// Extension-based fallback for files that arrive as application/octet-stream
const ACCEPTED_EXTENSIONS = new Set([
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
]);

function isAccepted(file: File): boolean {
  if (ACCEPTED_TYPES.has(file.type)) return true;
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  return ACCEPTED_EXTENSIONS.has(ext);
}

/**
 * POST /api/custom-orders/upload
 *
 * Multipart form with:
 *   - `orderAttemptId` (optional text field): client-supplied UUID for grouping
 *     retries under the same folder; server generates one if omitted.
 *   - `files` (1-10 file fields)
 *
 * Returns:
 *   { orderAttemptId: string; paths: string[] }
 *
 * Each path is the Supabase Storage object key, e.g.:
 *   custom-order-uploads/{orderAttemptId}/{filename}
 * Pass the returned `paths` array directly to POST /api/custom-orders/create.
 */
export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "storage_unconfigured", message: "File upload is not available yet." },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "invalid_form" }, { status: 400 });
  }

  const orderAttemptId =
    (formData.get("orderAttemptId") as string | null)?.trim() || randomUUID();

  // Collect all file entries
  const fileEntries: File[] = [];
  for (const value of formData.values()) {
    if (value instanceof File) {
      fileEntries.push(value);
    }
  }

  if (fileEntries.length === 0) {
    return NextResponse.json({ error: "no_files" }, { status: 400 });
  }
  if (fileEntries.length > MAX_FILES) {
    return NextResponse.json(
      { error: "too_many_files", message: `Maximum ${MAX_FILES} files per order.` },
      { status: 400 },
    );
  }

  // Validate each file
  let totalSize = 0;
  for (const file of fileEntries) {
    if (!isAccepted(file)) {
      return NextResponse.json(
        {
          error: "invalid_file_type",
          message: `"${file.name}" is not an accepted file type. Accepted: JPG, PNG, WEBP, HEIC, PDF, SVG, AI, EPS.`,
        },
        { status: 400 },
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "file_too_large",
          message: `"${file.name}" exceeds the 15 MB per-file limit.`,
        },
        { status: 400 },
      );
    }
    totalSize += file.size;
    if (totalSize > MAX_TOTAL_SIZE) {
      return NextResponse.json(
        { error: "total_size_exceeded", message: "Total upload size cannot exceed 60 MB." },
        { status: 400 },
      );
    }
  }

  // Upload each file to Supabase Storage
  const uploadedPaths: string[] = [];
  for (const file of fileEntries) {
    // Sanitise the filename: strip path components, collapse runs of unsafe chars
    const safeName = file.name
      .replace(/.*[\\/]/, "")
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .slice(0, 200);
    const storagePath = `${orderAttemptId}/${safeName}`;

    const arrayBuffer = await file.arrayBuffer();
    const { error } = await supabase.storage
      .from("custom-order-uploads")
      .upload(storagePath, new Uint8Array(arrayBuffer), {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (error) {
      console.error("Supabase storage upload error:", error);
      return NextResponse.json(
        { error: "upload_failed", message: `Failed to upload "${file.name}".` },
        { status: 500 },
      );
    }

    uploadedPaths.push(storagePath);
  }

  return NextResponse.json({ orderAttemptId, paths: uploadedPaths });
}
