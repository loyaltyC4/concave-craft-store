import { PageShell, Section } from "components/page-shell";
import { SUPPORT_EMAIL } from "lib/brand";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy",
  description:
    "Fingerboard Lab return policy: 30-day photo-based refunds, no return postage on most orders, and a fraud guard on high-value items over $100.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Return policy."
      intro="Not feeling your setup? Here is exactly how a refund works, in plain language — designed to be honest, cheap for you, and hard for anyone to game."
    >
      <Section heading="30-day photo-based refunds">
        <p>
          You have 30 days from delivery to request a refund on any standard
          item. Email{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-[#c5f23c] hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          with your order number and a photo of the item. In most cases we
          refund without asking for the item back — international return
          postage on a small parcel usually costs more than the item itself.
        </p>
        <p>
          <strong className="text-[#f3f1ea]">
            No return postage required for most refunds.
          </strong>{" "}
          Refunds go to your original payment method within 3 business days
          of us receiving your email.
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
          within 14 days of delivery. We ship a replacement at no cost. No
          return required.
        </p>
      </Section>

      <Section heading="Higher-value items ($100+)">
        <p>
          For change-of-mind refunds on items over $100 — mostly deck-pressing
          molds and pro park sets — we may ask you to return the item before
          completing the refund. This is a small guard against a rare kind of
          fraud that would otherwise cost the whole item value. Genuine
          faults still get free replacements with no return required.
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
            Attach a photo of the item (grip side and underside if possible).
          </li>
          <li>
            Say briefly whether the item is faulty or just not what you
            wanted — this decides which flow applies.
          </li>
          <li>
            We reply within one business day with next steps.
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
