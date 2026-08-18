import { PageShell } from "components/page-shell";
import { FaqList, type Faq } from "components/faq-list";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fingerboard FAQ",
  description:
    "Answers to common fingerboard questions — sizing, completes vs parts, shipping, returns, payments, and pressing your own decks.",
  alternates: { canonical: "/faq" },
};

const FAQS: Faq[] = [
  {
    q: "What is a fingerboard?",
    a: "A fingerboard is a working miniature skateboard, usually about 96–100mm long and 29–36mm wide, that you ride with two fingers. Pro fingerboards use real wooden decks, metal trucks, and urethane wheels on bearings — so they actually roll, pop, and grind like a real board.",
  },
  {
    q: "What's the difference between a fingerboard and a Tech Deck?",
    a: "Tech Decks are mass-produced plastic toys sold in multipacks. The wooden completes we stock use real maple decks, metal trucks with tunable bushings, and urethane wheels on bearings — they roll, pop and grind far better. See our Fingerboard vs Tech Deck guide for a full comparison.",
  },
  {
    q: "What size fingerboard should I get?",
    a: "34mm is the most popular and versatile width and the best all-round starting point. 32mm is more nimble and technical; 36mm is wider and more stable. Our Fingerboard Sizing Guide breaks down each width and who it suits.",
  },
  {
    q: "What comes in a complete?",
    a: "A complete is a ready-to-ride fingerboard: a deck, a set of trucks (with bushings and lock nuts), wheels with bearings, and grip tape — assembled and tuned. Add it to cart and skate it out of the box.",
  },
  {
    q: "Can I build or press my own deck?",
    a: "Yes. We sell bare decks, hardware, and CNC concave molds so you can press and build your own setup. Our How to Press a Fingerboard Deck guide walks through the whole process.",
  },
  {
    q: "Do you ship worldwide?",
    a: "Yes, we ship worldwide. Most orders arrive within 12–25 business days depending on destination; express delivery, where available, takes 5–10. Your order goes to our maker within 1–2 business days of purchase — most of the total time is the parcel in transit to you.",
  },
  {
    q: "What's your return policy?",
    a: "Return within 30 days by emailing us with your order number and a photo of the item — we refund most orders without asking for the item back. Custom-pressed decks and clearance items are final sale unless faulty.",
  },
  {
    q: "How do payments work?",
    a: "Checkout is handled securely by Stripe. We accept major cards and wallets like Apple Pay. Your full card details are never stored on our servers.",
  },
  {
    q: "Is there a sticker in every order?",
    a: "Always. Every box ships with a free Fingerboard Lab sticker sheet.",
  },
];

export default function FaqPage() {
  return (
    <PageShell
      eyebrow="Support"
      title="Frequently asked questions."
      intro="Everything you need to know before you buy. Still stuck? Reach us any time."
    >
      <h2 className="mb-6 text-xl font-semibold text-[#f3f1ea]">
        Fingerboard questions, answered
      </h2>
      <FaqList items={FAQS} />
      <p className="mt-8 text-sm text-neutral-400">
        Looking for more detail? Explore the{" "}
        <Link href="/guides" className="text-[#c5f23c] hover:underline">
          build guides
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="text-[#c5f23c] hover:underline">
          contact the Lab
        </Link>
        .
      </p>
    </PageShell>
  );
}
