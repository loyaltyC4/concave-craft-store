import Link from "next/link";

export type CollectionSeo = {
  h1: string;
  seo_title: string;
  meta_description: string;
  intro: string;
  buying_guide: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const seoData: Record<string, CollectionSeo> = require("../data/collection-seo.json");

export function getCollectionSeo(handle: string): CollectionSeo | undefined {
  return seoData[handle];
}

/**
 * Buying guide + FAQ block for a category page.
 *
 * This is deliberately server-rendered outside the searchParams-dependent
 * subtree. Previously the whole category body sat below an `await searchParams`,
 * which under PPR pushed every word of it out of the initial HTML — a crawl
 * found no H1 at all and 215 words on pages targeting keywords with thousands
 * of monthly searches.
 */
export function CollectionSeoContent({ seo }: { seo: CollectionSeo }) {
  return (
    <section className="mt-16 border-t border-white/10 pt-12">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold md:text-3xl">
            {seo.h1}: a buying guide
          </h2>
          <div className="mt-6 space-y-7">
            {seo.buying_guide.map((s) => (
              <div key={s.heading}>
                <h3 className="text-base font-semibold text-[#f3f1ea]">
                  {s.heading}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold md:text-3xl">
            Common questions
          </h2>
          <dl className="mt-6 space-y-6">
            {seo.faqs.map((f) => (
              <div key={f.q}>
                <dt className="text-base font-semibold text-[#f3f1ea]">
                  {f.q}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-neutral-400">
            Still deciding?{" "}
            <Link
              href="/guides"
              className="font-semibold text-[#c5f23c] hover:underline"
            >
              Read the build guides
            </Link>{" "}
            or{" "}
            <Link
              href="/glossary"
              className="font-semibold text-[#c5f23c] hover:underline"
            >
              look up a term
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
