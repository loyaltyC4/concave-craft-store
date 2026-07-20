import LegalShell from "components/legal-shell";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Fingerboard Lab collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="July 2026">
      <p>
        This policy explains what information Fingerboard Lab (“we”, “us”)
        collects and how we use it. For privacy questions, contact [YOUR EMAIL].
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Order &amp; contact details</strong> — name, email, shipping
          and billing address, and phone number you provide at checkout.
        </li>
        <li>
          <strong>Payment information</strong> — card payments are processed
          securely by <a href="https://stripe.com">Stripe</a>. We never see or
          store your full card number.
        </li>
        <li>
          <strong>Cookies</strong> — we use a small cookie to remember the items
          in your cart. [If you add analytics, disclose it here.]
        </li>
      </ul>

      <h2>How we use it</h2>
      <p>
        To process and ship your orders, send order confirmations and support
        replies, prevent fraud, and comply with legal obligations.
      </p>

      <h2>Who we share it with</h2>
      <p>
        Only the providers needed to run the store: Stripe (payments), our
        shipping carrier(s), and our hosting provider (Vercel). We do not sell
        your personal information.
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal
        data by emailing [YOUR EMAIL]. Depending on your location, additional
        rights (e.g. GDPR/CCPA) may apply.
      </p>

      <h2>Contact</h2>
      <p>[YOUR BUSINESS NAME], [YOUR ADDRESS] — [YOUR EMAIL].</p>
    </LegalShell>
  );
}
