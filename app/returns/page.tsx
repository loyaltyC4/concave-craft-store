import { PageShell, Section } from "components/page-shell";
import { SUPPORT_EMAIL } from "lib/brand";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy",
  description:
    "Fingerboard Lab return policy: 30-day returns, item must arrive back in original unused condition, buyer covers return shipping.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Return policy."
      intro="Not feeling your setup? Here is exactly how a refund works, in plain language."
    >
      <Section heading="30-day returns — original condition required">
        <p>
          You have 30 days from delivery to request a return on any standard
          item. Email{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-[#c5f23c] hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          with your order number to request a return authorization.
        </p>
        <p>
          <strong className="text-[#f3f1ea]">
            The item must be shipped back to us in its original, unused
            condition
          </strong>{" "}
          — no signs of riding, assembly, or damage, and all original parts,
          hardware, and packaging included — within 14 days of receiving your
          return authorization. We inspect every item on arrival. If it
          doesn&apos;t meet this standard, we&apos;ll either send it back to
          you or issue a partial refund reflecting its condition, at our
          discretion. This protects genuine customers and keeps prices honest
          for everyone — it also means we can&apos;t accept a return that
          shows up used, damaged, or incomplete.
        </p>
        <p>
          <strong className="text-[#f3f1ea]">
            Return shipping is the buyer&apos;s responsibility.
          </strong>{" "}
          Use a trackable shipping method — we can&apos;t refund a return
          that never arrives, and we don&apos;t cover items lost in transit
          back to us.
        </p>
        <p>
          Refunds go to your original payment method within 3 business days
          of us receiving and inspecting the returned item.
        </p>
      </Section>

      <Section heading="Faulty or wrong items">
        <p>
          If your item arrives damaged, missing parts, or is the wrong item,
          send a photo to{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-[#c5f23c] hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          within 14 days of delivery. We ship a replacement or refund at no
          cost to you. No return required.
        </p>
      </Section>

      <Section heading="Final sale">
        <p>
          Custom-pressed decks (where you provided the design or specs) and
          clearance items are final sale unless they arrive faulty. This is
          because we cannot restock a custom-made item.
        </p>
      </Section>

      <Section heading="How to start a return">
        <ol className="list-decimal space-y-2 pl-6 text-neutral-300">
          <li>
            Email{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-[#c5f23c] hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            within 30 days of delivery with your order number.
          </li>
          <li>
            Say briefly whether the item is faulty/wrong or just not what you
            wanted — this decides which flow applies.
          </li>
          <li>
            For change-of-mind returns, we&apos;ll reply with a return
            authorization and address. Ship the item back in its original
            condition, in its original packaging where possible, using a
            trackable method, within 14 days.
          </li>
          <li>
            We inspect the item on arrival and process your refund within 3
            business days if it meets the original-condition standard above.
          </li>
        </ol>
      </Section>

      <Section heading="Questions">
        <p>
          For anything not covered above, email{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-[#c5f23c] hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          — replies within one business day. Full shipping details are on
          the{" "}
          <Link
            href="/shipping-returns"
            className="text-[#c5f23c] hover:underline"
          >
            Shipping &amp; Returns
          </Link>{" "}
          page.
        </p>
      </Section>
    </PageShell>
  );
}
