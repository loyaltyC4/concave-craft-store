/**
 * Cookie-based cart — fully self-contained, no Shopify, no database.
 * Persists a minimal { variantId, quantity }[] list in an httpOnly cookie and
 * hydrates it into the same `Cart` shape the UI already expects, using the
 * static product catalogue for titles, prices, and images.
 */
import { cookies } from "next/headers";
import { staticGetVariant } from "lib/shopify/static-data";
import type { Cart, CartItem } from "lib/shopify/types";

const CART_COOKIE = "fbl_cart_v1";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

type StoredItem = { variantId: string; quantity: number };
type StoredCart = { items: StoredItem[] };

function parse(value: string | undefined): StoredCart {
  if (!value) return { items: [] };
  try {
    const parsed = JSON.parse(value);
    if (parsed && Array.isArray(parsed.items)) {
      return {
        items: parsed.items
          .filter(
            (i: any) =>
              i && typeof i.variantId === "string" && Number(i.quantity) > 0,
          )
          .map((i: any) => ({
            variantId: i.variantId,
            quantity: Math.max(1, Math.floor(Number(i.quantity))),
          })),
      };
    }
  } catch {
    // ignore malformed cookie
  }
  return { items: [] };
}

function build(stored: StoredCart): Cart {
  const lines: CartItem[] = [];
  let totalQuantity = 0;
  let subtotal = 0;
  let currency = "USD";

  for (const item of stored.items) {
    const found = staticGetVariant(item.variantId);
    if (!found) continue;
    const { product, variant } = found;
    const unit = parseFloat(variant.price.amount) || 0;
    const lineTotal = unit * item.quantity;
    subtotal += lineTotal;
    totalQuantity += item.quantity;
    currency = variant.price.currencyCode || currency;

    lines.push({
      id: variant.id,
      quantity: item.quantity,
      cost: {
        totalAmount: {
          amount: lineTotal.toFixed(2),
          currencyCode: currency,
        },
      },
      merchandise: {
        id: variant.id,
        title: variant.title,
        selectedOptions: variant.selectedOptions,
        product: {
          id: product.id,
          handle: product.handle,
          title: product.title,
          featuredImage: product.featuredImage,
        },
      },
    });
  }

  return {
    id: "local-cart",
    checkoutUrl: "/api/checkout",
    totalQuantity,
    lines,
    cost: {
      subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: currency },
      totalAmount: { amount: subtotal.toFixed(2), currencyCode: currency },
      totalTaxAmount: { amount: "0.00", currencyCode: currency },
    },
  };
}

async function read(): Promise<StoredCart> {
  const store = await cookies();
  return parse(store.get(CART_COOKIE)?.value);
}

async function persist(stored: StoredCart): Promise<void> {
  const store = await cookies();
  store.set(CART_COOKIE, JSON.stringify(stored), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getCart(): Promise<Cart | undefined> {
  return build(await read());
}

export async function createCart(): Promise<Cart> {
  return build({ items: [] });
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const stored = await read();
  for (const line of lines) {
    if (!line?.merchandiseId) continue;
    const qty = Math.max(1, Math.floor(line.quantity || 1));
    const existing = stored.items.find((i) => i.variantId === line.merchandiseId);
    if (existing) existing.quantity += qty;
    else stored.items.push({ variantId: line.merchandiseId, quantity: qty });
  }
  await persist(stored);
  return build(stored);
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  const stored = await read();
  stored.items = stored.items.filter((i) => !lineIds.includes(i.variantId));
  await persist(stored);
  return build(stored);
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const stored = await read();
  for (const line of lines) {
    const idx = stored.items.findIndex((i) => i.variantId === line.merchandiseId);
    if (line.quantity <= 0) {
      if (idx >= 0) stored.items.splice(idx, 1);
      continue;
    }
    const existing = idx >= 0 ? stored.items[idx] : undefined;
    if (existing) existing.quantity = Math.floor(line.quantity);
    else
      stored.items.push({
        variantId: line.merchandiseId,
        quantity: Math.floor(line.quantity),
      });
  }
  await persist(stored);
  return build(stored);
}

export async function clearCart(): Promise<void> {
  const store = await cookies();
  store.delete(CART_COOKIE);
}
