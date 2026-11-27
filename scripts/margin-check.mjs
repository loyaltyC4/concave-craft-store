#!/usr/bin/env node
/**
 * MARGIN GUARD. Fails the build (exit 1) if any ACTIVE variant would lose money
 * in a worst-case order, at regular price or at its sale price.
 *
 * Model (ESTIMATES, see data/cost-basis.json):
 *   cost   = item x 1.25 (cost-overrun stress) + freight
 *   fees   = 6% + $0.30 (Stripe, cross-border)
 *   ship   = customer pays SHIPPING_FEE_USD when the subtotal is under the
 *            free-shipping threshold; we keep it (x0.94 after fees).
 *   regular price: the 10% welcome code may apply (it is switched off while a
 *            sale is running, see app/api/checkout/route.ts).
 *   sale price: no code, discount from lib/flash-sale.ts tiers.
 *   gift:   about $1.20 when the subtotal exceeds the gift threshold.
 *
 * A variant needs net >= MIN_NET dollars. Run:  node scripts/margin-check.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const MIN_NET = Number(process.env.MIN_NET ?? 0);
const COST_STRESS = 1.25;
const FEE_PCT = 0.06;
const FEE_FIXED = 0.3;
const CODE_PCT = 0.1;
const GIFT_COST = 1.2;

const brand = read("lib/brand.ts");
const num = (re) => Number(brand.match(re)[1]);
const SHIP_FEE = num(/SHIPPING_FEE_USD\s*=\s*([0-9.]+)/);
const FREE_OVER = num(/FREE_SHIPPING_THRESHOLD\s*=\s*([0-9.]+)/);
const GIFT_OVER = num(/GIFT_THRESHOLD\s*=\s*([0-9.]+)/);

const products = JSON.parse(read("data/products.json")).products;
const basis = JSON.parse(read("data/cost-basis.json")).costs;

// Sale tiers: parse the handle -> pct map out of lib/flash-sale.ts
const sale = read("lib/flash-sale.ts");
const tierBlock = sale.match(/SALE_TIERS[^=]*=\s*\{([\s\S]*?)\n\};/);
const tiers = {};
if (tierBlock) {
  for (const m of tierBlock[1].matchAll(/"([a-z0-9-]+)"\s*:\s*([0-9.]+)/g)) {
    tiers[m[1]] = Number(m[2]);
  }
}
const FLASH_CAP = Number(sale.match(/FLASH_SALE_PCT\s*=\s*([0-9.]+)/)?.[1] ?? 0.15);

function net(price, cost, { code }) {
  const rev = price * (code ? 1 - CODE_PCT : 1);
  const fee = rev * FEE_PCT + FEE_FIXED;
  const shipIn = rev > FREE_OVER ? 0 : SHIP_FEE * (1 - FEE_PCT);
  const gift = rev > GIFT_OVER ? GIFT_COST : 0;
  return rev - fee + shipIn - cost - gift;
}

let checked = 0;
const bad = [];
let missing = 0;
for (const p of products) {
  if (p.status !== "active") continue;
  const b = basis[p.handle];
  for (const v of p.variants) {
    const c = b?.[String(v.id)];
    if (!c) {
      missing++;
      continue;
    }
    checked++;
    const price = Number(v.price);
    const cost = c.item * COST_STRESS + c.ship;
    const regular = net(price, cost, { code: true });
    if (regular < MIN_NET)
      bad.push([p.handle, v.title, "regular", price, regular.toFixed(2)]);
    const pct = Math.min(tiers[p.handle] ?? 0, FLASH_CAP);
    if (pct > 0) {
      const sp = Math.round(price * (1 - pct) * 100) / 100;
      const s = net(sp, cost, { code: false });
      if (s < MIN_NET)
        bad.push([p.handle, v.title, `sale -${pct * 100}%`, sp, s.toFixed(2)]);
    }
  }
}

console.log(`[margin] sale tiers loaded: ${Object.keys(tiers).length} handles`);
console.log(
  `[margin] checked ${checked} variants (${missing} without a cost basis, skipped); fee $${SHIP_FEE} under $${FREE_OVER}; min net $${MIN_NET}`,
);
if (bad.length) {
  console.error(`[margin] ${bad.length} variant(s) lose money in the worst case:`);
  for (const r of bad.slice(0, 40)) console.error("  ", r.join(" | "));
  process.exit(1);
}
console.log("[margin] OK: no variant loses money at regular or sale prices.");
