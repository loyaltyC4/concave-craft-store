import { PageShell, Section } from "components/page-shell";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Fingerboard Lab",
  description:
    "Fingerboard Lab builds precision-engineered fingerboard hardware for real skating — machined to ±0.1mm, pressed on true concave molds, and tuned to ride.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="The Lab"
      title="Built for real fingerboarding."
      intro="Fingerboard Lab exists for one reason: fingerboards that actually skate. Not the toy-aisle kind — real wood, real concave, real hardware, engineered to tolerances you can feel under two fingers."
    >
      <Section heading="Precision is the point">
        <p>
          Everything we make or curate is held to a ±0.1mm standard. Our decks
          are pressed from 5-ply maple on true concave molds. Our trucks are
          machined and tuned, not stamped. When a millimeter changes how a board
          pops, precision isn&apos;t a marketing word — it&apos;s the product.
        </p>
      </Section>
      <Section heading="For builders and skaters">
        <p>
          Some riders want a complete that&apos;s dialed out of the box. Others
          want to press their own decks, tune their own bushings, and build a
          setup that&apos;s unmistakably theirs. We stock for both — completes,
          bare decks, molds, hardware, and the tools to put it all together.
        </p>
        <p>
          And because most fingerboarding happens on a desk, a table, or the
          edge of a bench, we build our ramps and obstacles to work anywhere you
          set them down.
        </p>
      </Section>
      <Section heading="What every order includes">
        <p>
          Fast dispatch (1–2 business days), worldwide shipping, a free sticker
          sheet in every box, and a 30-day return window if it&apos;s not right.
          Questions before you buy? Our guides walk through sizing, concave,
          trucks, and tuning in plain language.
        </p>
        <p>
          <Link href="/guides" className="text-[#c5f23c] hover:underline">
            Read the build guides →
          </Link>
        </p>
      </Section>
    </PageShell>
  );
}
