import LegalShell from "components/legal-shell";

export const metadata = {
  title: "Returns & Refunds",
  description:
    "Fingerboard Lab returns and refunds policy — how to return an item and how refunds work.",
};

export default function ReturnsPage() {
  return (
    <LegalShell title="Returns &amp; Refunds" updated="July 2026">
      <p>
        We want you stoked on your gear. If something isn’t right, here’s how
        returns work.
      </p>

      <h2>30-day returns</h2>
      <p>
        You may return unused items in their original condition and packaging
        within 30 days of delivery for a refund of the item price. Custom-built
        (build-a-board) completes are made to order and can only be returned if
        faulty.
      </p>

      <h2>How to start a return</h2>
      <p>
        Email [YOUR EMAIL] with your order number and the item(s) you’d like to
        return. We’ll reply with return instructions. Return shipping is the
        buyer’s responsibility unless the item arrived damaged or incorrect.
      </p>

      <h2>Refunds</h2>
      <p>
        Once we receive and inspect your return, we’ll process your refund to
        the original payment method within [5–10] business days. Original
        shipping charges are non-refundable.
      </p>

      <h2>Damaged or incorrect items</h2>
      <p>
        If your order arrives damaged or you received the wrong item, email us
        within 7 days of delivery with a photo and we’ll make it right at no
        cost to you.
      </p>

      <h2>Contact</h2>
      <p>Questions about a return? Email [YOUR EMAIL].</p>
    </LegalShell>
  );
}
