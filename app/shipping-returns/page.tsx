import { PageShell, Section } from "components/page-shell";
import { SUPPORT_EMAIL } from "lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Fingerboard Lab shipping times, worldwide delivery, and our 30-day returns policy — return shipping paid by the customer.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Shipping & returns."
      intro="Fast dispatch, worldwide delivery, and a no-drama 30-day return window. Return shipping is paid by the customer."
    >
      <Section heading="Dispatch & delivery">
        <p>
          Orders are packed and dispatched within 1–2 business days. Standard
          shipping typically arrives in 3–8 business days; express in 1–3. Exact
          transit time depends on your destination and is shown at checkout.
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
          Not feeling your setup? Return unused items in their original
          condition within 30 days of delivery for a refund or exchange. Email{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-[#c5f23c] hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          with your order number and we&apos;ll send return instructions.
        </p>
        <p>
          <strong className="text-[#f3f1ea]">
            Return shipping is paid by the customer.
          </strong>{" "}
          Please use a tracked service and keep the tracking number — we
          can&apos;t refund a return we never receive. Once the parcel lands
          back with us and passes a condition check, your refund goes out to the
          original payment method within 3 business days.
        </p>
        <p>
          If your item arrives damaged, defective, or is the wrong item, we
          cover return shipping — send a photo to{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-[#c5f23c] hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          within 14 days of delivery and we&apos;ll sort a prepaid label or a
          replacement, whichever you prefer.
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
