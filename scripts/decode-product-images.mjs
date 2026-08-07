/**
 * Decodes committed product photography into public/products/ before the build.
 *
 * Why this exists: the primary image for every sourced product is committed to the
 * repo (base64, in data/product-images/) rather than hotlinked from the supplier
 * CDN. Those CDNs are flaky — one host returned connection failures on three
 * images during an audit and only recovered on retry — and a storefront whose
 * product cards silently go blank is worse than a slightly larger repo.
 *
 * Gallery images beyond the first are still served from the supplier CDN through
 * Next's image optimiser, so a CDN outage degrades the gallery but never leaves a
 * card, collection tile, OG image or structured-data entry without a picture.
 *
 * Runs automatically via the `prebuild` npm script.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "data", "product-images");
const outDir = join(root, "public", "products");

if (!existsSync(srcDir)) {
  console.log("[images] no data/product-images directory — nothing to decode");
  process.exit(0);
}

mkdirSync(outDir, { recursive: true });

let written = 0;
let bytes = 0;
let skipped = 0;

for (const file of readdirSync(srcDir).filter((f) => f.endsWith(".json"))) {
  const map = JSON.parse(readFileSync(join(srcDir, file), "utf8"));
  for (const [name, b64] of Object.entries(map)) {
    // guard against a path escaping the output directory
    if (name.includes("/") || name.includes("..")) {
      console.warn(`[images] skipping suspicious filename: ${name}`);
      skipped++;
      continue;
    }
    const buf = Buffer.from(b64, "base64");
    if (buf.length < 1000) {
      console.warn(`[images] skipping ${name} — decoded to only ${buf.length} bytes`);
      skipped++;
      continue;
    }
    writeFileSync(join(outDir, name), buf);
    written++;
    bytes += buf.length;
  }
}

console.log(
  `[images] decoded ${written} product images (${(bytes / 1e6).toFixed(1)} MB)` +
    (skipped ? ` — ${skipped} skipped` : ""),
);

if (written === 0) {
  console.error("[images] decoded nothing — product cards would render blank");
  process.exit(1);
}
