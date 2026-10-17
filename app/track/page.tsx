import type { Metadata } from "next";
import Footer from "components/layout/footer";
import { SITE_NAME } from "lib/brand";
import { TrackForm } from "components/track/track-form";

export const metadata: Metadata = {
  title: `Track your order — ${SITE_NAME}`,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

// 2026-10-17 privacy fix: this page used to take ?email=…&code=… from the
// query string, putting the customer's email into the URL (browser history,
// Referer, PostHog $current_url — 15 views in 10 days, one customer's email
// captured 12 times). The lookup now runs through a server action (POST), so
// the URL stays clean. Only the order code is accepted here, and only to
// prefill the form. Any ?email=… in a legacy URL is simply ignored — and the
// PostHog before_send hook in app/layout.tsx scrubs it from analytics.
export default async function TrackOrderPage(props: {
  searchParams: Promise<{ email?: string; code?: string }>;
}) {
  const { code } = await props.searchParams;

  return (
    <>
      <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-[#f3f1ea] md:text-4xl">
            Track your order
          </h1>
          <p className="mt-3 text-neutral-400">
            Enter the email you ordered with. Both are needed: enter the order code from your confirmation email so only you can see your order.
          </p>
        </div>

        <TrackForm initialCode={code?.trim() || undefined} />
      </div>
      <Footer />
    </>
  );
}
