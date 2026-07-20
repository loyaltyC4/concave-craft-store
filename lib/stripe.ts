/**
 * Stripe Checkout integration.
 * Builds a hosted Checkout Session from the local cart, with regional shipping
 * tiers. Requires STRIPE_SECRET_KEY (set as an environment variable in Vercel).
 *
 * The client is created lazily so the app builds/runs even when no key is set
 * (e.g. preview builds); checkout simply errors clearly until the key exists.
 */
import Stripe from "stripe";
import type { Cart } from "lib/shopify/types";
import { staticGetVariant } from "lib/shopify/static-data";
import { baseUrl } from "lib/utils";

export const isStripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!_stripe) {
    // apiVersion omitted → uses the version pinned by the installed SDK.
    _stripe = new Stripe(key);
  }
  return _stripe;
}

// Countries we currently ship to (drives Stripe's address collection).
const ALLOWED_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  [
    "US", "CA", "GB", "IE", "AU", "NZ", "DE", "FR", "ES", "IT", "NL", "BE",
    "SE", "NO", "DK", "FI", "PT", "AT", "CH", "PL", "CZ", "JP", "SG", "ZA",
  ];

// Regional shipping tiers (buyer selects the one matching their region).
function shippingOptions(): Stripe.Checkout.SessionCreateParams.ShippingOption[] {
  const tier = (
    display_name: string,
    cents: number,
    minDays: number,
    maxDays: number,
  ): Stripe.Checkout.SessionCreateParams.ShippingOption => ({
    shipping_rate_data: {
      type: "fixed_amount",
      display_name,
      fixed_amount: { amount: cents, currency: "usd" },
      delivery_estimate: {
        minimum: { unit: "business_day", value: minDays },
        maximum: { unit: "business_day", value: maxDays },
      },
    },
  });

  return [
    tier("United States — Standard", 500, 3, 7),
    tier("Europe & UK — Tracked", 1200, 7, 14),
    tier("Canada & Australia — Tracked", 1500, 10, 18),
    tier("Rest of World — Tracked", 1800, 10, 21),
  ];
}

export async function createCheckoutSession(cart: Cart): Promise<string> {
  const stripe = getStripe();

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
    cart.lines.map((line) => {
      const found = staticGetVariant(line.merchandise.id);
      const unit = found
        ? parseFloat(found.variant.price.amount)
        : parseFloat(line.cost.totalAmount.amount) / line.quantity;
      const image = line.merchandise.product.featuredImage?.url;
      const variantTitle =
        line.merchandise.title && line.merchandise.title !== "Default Title"
          ? ` — ${line.merchandise.title}`
          : "";

      return {
        quantity: line.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(unit * 100),
          product_data: {
            name: `${line.merchandise.product.title}${variantTitle}`,
            ...(image && image.startsWith("http") ? { images: [image] } : {}),
            metadata: {
              variantId: line.merchandise.id,
              handle: line.merchandise.product.handle,
            },
          },
        },
      };
    });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/?checkout=cancelled`,
    billing_address_collection: "auto",
    shipping_address_collection: { allowed_countries: ALLOWED_COUNTRIES },
    shipping_options: shippingOptions(),
    phone_number_collection: { enabled: true },
    automatic_tax: { enabled: false },
    allow_promotion_codes: true,
  });

  if (!session.url) {
    throw new Error("Stripe Checkout session did not return a URL");
  }
  return session.url;
}
