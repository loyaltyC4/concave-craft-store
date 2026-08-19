import Footer from "components/layout/footer";
import { ClearCartOnMount } from "components/cart/clear-cart-on-mount";
import { getStripe } from "lib/stripe";
import { SITE_NAME } from "lib/brand";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function money(amount: number | null, currency = "USD") {
  if (amount == null) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount / 100);
}

export default async function OrderSuccessPage(props: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await props.searchParams;
  const stripe = getStripe();

  let email: string | null = null;
  let total: number | null = null;
  let currency = "usd";
  let items: { name: string; quantity: number; amount: number }[] = [];
  let paid = false;
  let deliveryCountry: string | null = null;
  let estimatedDeliveryDate: string | null = null;

  if (stripe && session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items"],
      });
      paid = session.payment_status === "paid" || session.status === "complete";
      email = session.customer_details?.email ?? null;
      total = session.amount_total ?? null;
      currency = session.currency ?? "usd";
      items =
        session.line_items?.data.map((li) => ({
          name: li.description ?? "Item",
          quantity: li.quantity ?? 1,
          amount: li.amount_total ?? 0,
        })) ?? [];

      // Google Customer Reviews opt-in needs the delivery country and an
      // estimated delivery date. Country comes from wherever Stripe actually
      // collected an address for this order — shipping first, billing as a
      // fallback for the rare edge case Stripe returns one but not the other.
      deliveryCountry =
        session.shipping_details?.address?.country ??
        session.customer_details?.address?.country ??
        null;

      // Estimated delivery = order date + midpoint of our published 7–14
      // business day transit window (10 calendar days). This is a heuristic,
      // not a tracked promise — Google only uses it to time the review
      // request email, not to hold us to an exact date.
      if (session.created) {
        const estimate = new Date(session.created * 1000);
        estimate.setDate(estimate.getDate() + 10);
        estimatedDeliveryDate = estimate.toISOString().slice(0, 10);
      }
    } catch {
      /* invalid/expired session id — show generic confirmation */
    }
  }

  // Only render the opt-in for a genuinely completed order with enough data
  // for Google to act on — a half-populated snippet is worse than none.
  const showReviewsOptIn =
    paid && !!session_id && !!email && !!deliveryCountry && !!estimatedDeliveryDate;

  return (
    <>
      <ClearCartOnMount />
      <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <div className="rounded-3xl border border-white/10 bg-[#15171c] p-8 md:p-12">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#c5f23c] text-black">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5 13 4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold md:text-4xl">
            {paid
              ? "Order confirmed. Grip it and rip it."
              : "Thanks for your order."}
          </h1>
          <p className="mt-3 text-neutral-400">
            {paid
              ? `We're on it. A confirmation${email ? ` is on its way to ${email}` : ""}. Your ${SITE_NAME} gear ships within 1–2 business days — free sticker sheet in every box.`
              : "If your payment went through, you'll receive an email confirmation shortly."}
          </p>

          {items.length > 0 && (
            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {items.map((it, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="text-neutral-200">
                    {it.name}{" "}
                    <span className="text-neutral-500">× {it.quantity}</span>
                  </span>
                  <span className="text-neutral-300">
                    {money(it.amount, currency)}
                  </span>
                </div>
              ))}
              {total != null && (
                <div className="flex items-center justify-between py-3 text-base font-semibold">
                  <span>Total</span>
                  <span style={{ color: "#c5f23c" }}>
                    {money(total, currency)}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/search"
              className="rounded-full bg-[#c5f23c] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            >
              Keep shopping
            </Link>
            <Link
              href="/guides"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-[#c5f23c] hover:text-[#c5f23c]"
            >
              Read the build guides →
            </Link>
          </div>
        </div>
      </div>
      <Footer />

      {/*
       * Google Customer Reviews opt-in. Renders only on a genuinely
       * completed order — Google's own terms require this to appear
       * post-purchase, not speculatively. `products` is intentionally
       * omitted: we don't hold real GTINs for this catalogue yet (see the
       * Merchant Center product-feed notes), and Google treats the field as
       * optional — sending fabricated GTINs would be worse than omitting it.
       */}
      {showReviewsOptIn && (
        <>
          <script
            src="https://apis.google.com/js/platform.js?onload=renderOptIn"
            async
            defer
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.renderOptIn = function() {
                  window.gapi.load('surveyoptin', function() {
                    window.gapi.surveyoptin.render({
                      "merchant_id": 5841358463,
                      "order_id": ${JSON.stringify(session_id)},
                      "email": ${JSON.stringify(email)},
                      "delivery_country": ${JSON.stringify(deliveryCountry)},
                      "estimated_delivery_date": ${JSON.stringify(estimatedDeliveryDate)}
                    });
                  });
                };
              `,
            }}
          />
        </>
      )}
    </>
  );
}
