/**
 * Decodes committed category (collection) photography into public/brand/collections/ before the build.
 *
 * Why this exists: the ten homepage "Shop by category" tiles have hand-directed
 * editorial photography, one per collection handle. They are shipped as base64
 * JSON in data/category-images/ instead of hotlinked from a CDN, for the same
 * reason product photography is (see decode-product-images.mjs) — silent blanks
 * on a category tile are the fastest way to make a storefront look broken.
 *
 * Runs automatically via the `prebuild` npm script alongside decode-product-images.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "data", "category-images");
const outDir = join(root, "public", "brand", "collections");

if (!existsSync(srcDir)) {
  console.log("[category-images] no data/category-images directory — nothing to decode");
  process.exit(0);
}

mkdirSync(outDir, { recursive: true });

let written = 0;
let bytes = 0;
let skipped = 0;

for (const file of readdirSync(srcDir).filter((f) => f.endsWith(".json"))) {
  const map = JSON.parse(readFileSync(join(srcDir, file), "utf8"));
  for (const [name, b64] of Object.entries(map)) {
    if (name.includes("/") || name.includes("..")) {
      console.warn(`[category-images] skipping suspicious filename: ${name}`);
      skipped++;
      continue;
    }
    const buf = Buffer.from(b64, "base64");
    if (buf.length < 1000) {
      console.warn(`[category-images] skipping ${name} — decoded to only ${buf.length} bytes`);
      skipped++;
      continue;
    }
    writeFileSync(join(outDir, name), buf);
    written++;
    bytes += buf.length;
  }
}

console.log(
  `[category-images] decoded ${written} category images (${(bytes / 1e6).toFixed(1)} MB)` +
    (skipped ? ` — ${skipped} skipped` : ""),
);

if (written === 0) {
  console.error("[category-images] decoded nothing — category tiles would render blank");
  process.exit(1);
}
