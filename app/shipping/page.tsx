import LegalShell from "components/legal-shell";

export const metadata = {
  title: "Shipping Policy",
  description:
    "How and where Fingerboard Lab ships — processing times, regional rates, and delivery estimates.",
};

export default function ShippingPage() {
  return (
    <LegalShell title="Shipping Policy" updated="July 2026">
      <p>
        We ship worldwide from [YOUR LOCATION]. Every order includes a free
        sticker sheet.
      </p>

      <h2>Processing time</h2>
      <p>
        Orders are packed and dispatched within [1–3] business days. Custom
        “build-a-board” completes may take an extra [1–2] business days while we
        assemble and tune them.
      </p>

      <h2>Shipping rates &amp; delivery estimates</h2>
      <p>Rates are calculated at checkout. Current tiers (USD):</p>
      <ul>
        <li>
          <strong>United States — Standard:</strong> $5.00 · 3–7 business days
        </li>
        <li>
          <strong>Europe &amp; UK — Tracked:</strong> $12.00 · 7–14 business days
        </li>
        <li>
          <strong>Canada &amp; Australia — Tracked:</strong> $15.00 · 10–18
          business days
        </li>
        <li>
          <strong>Rest of World — Tracked:</strong> $18.00 · 10–21 business days
        </li>
      </ul>
      <p>
        Please choose the option that matches your region at checkout. Delivery
        estimates are not guaranteed and may vary with customs and carrier
        delays.
      </p>

      <h2>Customs &amp; duties</h2>
      <p>
        International orders may be subject to import duties or taxes levied by
        your country. These charges are the buyer’s responsibility.
      </p>

      <h2>Tracking</h2>
      <p>
        You’ll receive a confirmation email when your order ships. Tracked
        options include a tracking number.
      </p>

      <h2>Questions?</h2>
      <p>
        Email us at [YOUR EMAIL] and we’ll help you out.
      </p>
    </LegalShell>
  );
}
