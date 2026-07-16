import Footer from "components/layout/footer";
import { getStripe } from "lib/stripe";
import Link from "next/link";
import ClearCartOnLoad from "./clear-cart";

export const metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

function money(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export default async function CheckoutSuccessPage(props: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await props.searchParams;

  let email: string | null = null;
  let total: string | null = null;

  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      email = session.customer_details?.email ?? null;
      if (session.amount_total != null) {
        total = money(
          session.amount_total / 100,
          (session.currency ?? "usd").toUpperCase(),
        );
      }
    } catch {
      // ignore — still show a generic confirmation
    }
  }

  return (
    <>
      <ClearCartOnLoad />
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c5f23c] text-3xl font-bold text-black">
          ✓
        </div>
        <h1 className="mt-8 text-4xl font-semibold md:text-5xl">
          Order confirmed
        </h1>
        <p className="mt-4 max-w-md text-neutral-400">
          Thanks for your order
          {email ? `, we've emailed a confirmation to ${email}` : ""}. We&apos;re
          packing it up{total ? ` — total ${total}` : ""}, and a free sticker
          sheet is going in the box.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/search"
            className="rounded-full bg-[#c5f23c] px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
          >
            Keep shopping
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-[#f3f1ea] transition hover:border-[#c5f23c] hover:text-[#c5f23c]"
          >
            Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
