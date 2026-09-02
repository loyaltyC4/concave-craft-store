import { PageShell, Section } from "components/page-shell";
import { SUPPORT_EMAIL } from "lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Fingerboard Lab shipping times, worldwide delivery, and our 30-day return policy — item must be returned in original condition, buyer covers return shipping.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Shipping & returns."
      intro="Worldwide delivery, honest transit windows, and a clear, fair 30-day return policy."
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
          within 30 days of delivery with your order number to request a
          return authorization.
        </p>
        <p>
          <strong className="text-[#f3f1ea]">
            The item must be sent back to us in its original condition
          </strong>{" "}
          — unused, undamaged, with all original parts, hardware, and
          packaging included — within 14 days of receiving your return
          authorization. We inspect every return on arrival. Items that show
          signs of use, riding, assembly, or missing parts will not be
          refunded in full; we&apos;ll either return the item to you or issue
          a partial refund reflecting its condition, at our discretion.
        </p>
        <p>
          <strong className="text-[#f3f1ea]">
            Return shipping is paid by the buyer.
          </strong>{" "}
          Use a trackable shipping method — we can&apos;t issue a refund for a
          return that doesn&apos;t arrive, and we&apos;re not able to cover
          the cost of items lost in transit back to us.
        </p>
        <p>
          Once we&apos;ve received and inspected the item, refunds are issued
          to your original payment method within 3 business days.
        </p>
        <p>
          For genuine faults — damage in transit, missing parts, or the wrong
          item shipped — send a photo to{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-[#c5f23c] hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          within 14 days of delivery and we&apos;ll ship a replacement or
          refund at no cost to you — no return required.
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
