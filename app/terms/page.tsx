import LegalShell from "components/legal-shell";

export const metadata = {
  title: "Terms of Service",
  description: "The terms that govern purchases from Fingerboard Lab.",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="July 2026">
      <p>
        By using this website and placing an order, you agree to these terms.
        Please read them carefully.
      </p>

      <h2>Products &amp; pricing</h2>
      <p>
        All prices are listed in US dollars (USD) and may change without notice.
        We do our best to display products and stock accurately, but errors may
        occur; we reserve the right to cancel and refund an order affected by a
        pricing or availability error.
      </p>

      <h2>Orders &amp; payment</h2>
      <p>
        Payment is processed securely by Stripe at checkout. Your order is
        confirmed once payment is authorised. We reserve the right to refuse or
        cancel any order.
      </p>

      <h2>Shipping &amp; returns</h2>
      <p>
        Shipping is governed by our <a href="/shipping">Shipping Policy</a> and
        returns by our <a href="/returns">Returns &amp; Refunds</a> policy.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this site — branding, images, and text — is owned by
        [YOUR BUSINESS NAME] and may not be reused without permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        Our products are intended for fingerboarding and recreational use. To
        the fullest extent permitted by law, we are not liable for indirect or
        incidental damages arising from the use of our products.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of [YOUR JURISDICTION].</p>

      <h2>Contact</h2>
      <p>[YOUR BUSINESS NAME] — [YOUR EMAIL].</p>
    </LegalShell>
  );
}
