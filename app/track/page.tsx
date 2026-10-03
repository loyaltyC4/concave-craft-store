import Link from "next/link";
import type { Metadata } from "next";
import Footer from "components/layout/footer";
import { SITE_NAME, SUPPORT_EMAIL } from "lib/brand";
import {
  findOrdersForTracking,
  trackingStatusCopy,
  type TrackedOrder,
} from "lib/orders";
import { isSupabaseConfigured } from "lib/supabase";

export const metadata: Metadata = {
  title: `Track your order — ${SITE_NAME}`,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function money(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

function formatAddress(address: TrackedOrder["shippingAddress"]) {
  if (!address) return null;
  const lines = [
    [address.line1, address.line2].filter(Boolean).join(", "),
    [address.city, address.state, address.postal_code]
      .filter(Boolean)
      .join(", "),
    address.country,
  ].filter(Boolean);
  return lines;
}

export default async function TrackOrderPage(props: {
  searchParams: Promise<{ email?: string; code?: string }>;
}) {
  const { email, code } = await props.searchParams;
  const hasQuery = Boolean(email && email.trim());

  let orders: TrackedOrder[] = [];
  let searched = false;

  if (hasQuery && isSupabaseConfigured()) {
    orders = await findOrdersForTracking(email as string, code);
    searched = true;
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-[#f3f1ea] md:text-4xl">
            Track your order
          </h1>
          <p className="mt-3 text-neutral-400">
            Enter the email you ordered with. If you have the order code from
            your confirmation email, add it to narrow the search.
          </p>
        </div>

        <form
          method="get"
          className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#15171c] p-6 md:flex-row md:items-end md:p-8"
        >
          <div className="flex-1">
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={email}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b0c0e] px-4 py-3 text-sm text-[#f3f1ea] outline-none focus:border-[#c5f23c]"
            />
          </div>
          <div className="w-full md:w-48">
            <label
              htmlFor="code"
              className="block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500"
            >
              Order code (optional)
            </label>
            <input
              id="code"
              name="code"
              type="text"
              defaultValue={code}
              placeholder="e.g. 4F2A9C1D"
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b0c0e] px-4 py-3 text-sm uppercase text-[#f3f1ea] outline-none focus:border-[#c5f23c]"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-full bg-[#c5f23c] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
          >
            Track order
          </button>
        </form>

        {!isSupabaseConfigured() && (
          <div className="mt-8 rounded-2xl border border-[#c5f23c]/30 bg-[#c5f23c]/5 p-4 text-sm text-neutral-300">
            Order tracking isn&apos;t configured yet.
          </div>
        )}

        {searched && orders.length === 0 && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#0f1114] p-6 text-sm text-neutral-300">
            We couldn&apos;t find an order matching those details. Double
            check the email you used at checkout, or{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-[#c5f23c] hover:underline"
            >
              email us
            </a>{" "}
            and we&apos;ll sort it out.
          </div>
        )}

        {orders.length > 0 && (
          <div className="mt-10 space-y-6">
            {orders.map((order) => {
              const status = trackingStatusCopy(order.status);
              const addressLines = formatAddress(order.shippingAddress);
              return (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-[#15171c]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-5 md:px-8">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                        Order {order.orderCode}
                      </p>
                      <p className="mt-1 text-sm text-neutral-400">
                        Placed{" "}
                        {new Date(order.createdAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                      </p>
                    </div>
                    <span className="font-semibold text-[#c5f23c]">
                      {money(order.amountTotal, order.currency)}
                    </span>
                  </div>

                  <div className="border-b border-white/10 bg-[#10140a] px-6 py-5 md:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c5f23c]">
                      {status.label}
                    </p>
                    <p className="mt-1 text-sm text-neutral-300">
                      {status.detail}
                    </p>
                  </div>

                  <div className="px-6 py-5 md:px-8">
                    <ul className="space-y-2">
                      {order.items.map((it, i) => (
                        <li
                          key={i}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-neutral-300">
                            {it.title} × {it.quantity}
                          </span>
                          <span className="text-neutral-400">
                            {money(it.unitAmount * it.quantity, order.currency)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {addressLines && addressLines.length > 0 && (
                      <div className="mt-5 border-t border-white/10 pt-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                          Shipping to
                        </p>
                        <p className="mt-2 text-sm text-neutral-300">
                          {order.customerName}
                          <br />
                          {addressLines.map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <p className="text-sm text-neutral-500">
              Questions about an order?{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[#c5f23c] hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>
        )}

        {!hasQuery && (
          <div className="mt-10">
            <Link
              href="/contact"
              className="text-sm text-neutral-500 hover:text-[#c5f23c]"
            >
              Can&apos;t find your order? Contact us →
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
