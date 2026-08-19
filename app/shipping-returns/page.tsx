import { PageShell, Section } from "components/page-shell";
import { SUPPORT_EMAIL } from "lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Fingerboard Lab shipping times, worldwide delivery, and our photo-based 30-day returns policy — no return postage on most orders.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Shipping & returns."
      intro="Worldwide delivery, honest transit windows, and a no-drama 30-day return window."
    >
      <Section heading="Dispatch & delivery">
        <p>
          Most orders arrive in <strong className="text-[#f3f1ea]">7–14 business
          days</strong> depending on your destination. Your specific estimate
          is shown at checkout.
        </p>
        <p>
          Your order goes to our maker within 1–2 business days of purchase.
          Because we work with a small maker network rather than warehousing
          every board ourselves, most of the total time is the parcel in
          transit to you rather than sitting on our shelf.
        </p>
        <p>
          Shipping is a flat{" "}
          <strong className="text-[#f3f1ea]">$12.95</strong> worldwide, and{" "}
          <strong className="text-[#f3f1ea]">free on orders over $150</strong>.
          One rate to everywhere we ship — no surprise regional charges at
          checkout.
        </p>
        <p>
          We ship worldwide. Any import duties or taxes for international orders
          are the responsibility of the recipient and are not collected at
          checkout.
        </p>
      </Section>
      <Section heading="Tracking">
        <p>
          You&apos;ll receive an order confirmation by email at checkout, and a
          tracking link once your order ships. A free sticker sheet is included
          in every box.
        </p>
      </Section>
      <Section heading="30-day returns">
        <p>
          Not feeling your setup? Email{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-[#c5f23c] hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          within 30 days of delivery with your order number and a photo of
          the item. In most cases we refund without asking for the item back —
          international return postage on small items usually costs more than
          the item itself, and we'd rather you get on with skating something
          you actually want.
        </p>
        <p>
          <strong className="text-[#f3f1ea]">
            No return postage required for most refunds.
          </strong>{" "}
          Refunds go to the original payment method within 3 business days of
          the photo landing in our inbox.
        </p>
        <p>
          For genuine faults — damage in transit, missing parts, wrong item —
          send a photo to{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-[#c5f23c] hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          within 14 days of delivery and we&apos;ll ship a replacement at no
          cost.
        </p>
        <p>
          For higher-value items over $100 — mostly deck-pressing molds and
          pro park sets — we may ask you to return the item before completing
          a change-of-mind refund. Faulty items still ship replacements at no
          cost, no return required. This is a small guard against a rare kind
          of fraud that would otherwise cost us the entire item value.
        </p>
        <p>
          Custom-pressed decks and clearance items are final sale unless they
          arrive faulty.
        </p>
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
          — replies within one business day.
        </p>
      </Section>
    </PageShell>
  );
}
