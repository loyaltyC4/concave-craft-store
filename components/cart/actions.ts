"use server";

import {
  addToCart,
  clearCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "lib/cart";
import { createCheckoutSession } from "lib/stripe";
import { redirect } from "next/navigation";

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined,
) {
  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
  } catch (e) {
    console.error(e);
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    await removeFromCart([merchandiseId]);
  } catch (e) {
    console.error(e);
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  },
) {
  const { merchandiseId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart([merchandiseId]);
    } else {
      await updateCart([{ id: merchandiseId, merchandiseId, quantity }]);
    }
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}

export async function redirectToCheckout(): Promise<void> {
  const cart = await getCart();

  if (!cart || cart.lines.length === 0) {
    redirect("/?checkout=empty");
  }

  let url = "";
  try {
    url = await createCheckoutSession(cart);
  } catch (e) {
    console.error("[checkout]", e);
    redirect("/?checkout=error");
  }

  redirect(url);
}

export async function createCartAndSetCookie() {
  // Cart is cookie-based and created lazily on first add; nothing to do here.
  await createCart();
}

export async function clearCartAction() {
  await clearCart();
}
