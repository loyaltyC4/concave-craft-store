import Footer from "components/layout/footer";
import { FaqList } from "components/faq-list";
import { getGuide, allGuides } from "lib/all-guides";
import { SITE_NAME } from "lib/brand";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return allGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.metaTitle,
      description: guide.metaDescription,
      publishedTime: guide.updated,
      modifiedTime: guide.updated,
    },
  };
}

export default async function GuidePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) return notFound();

  const related = guide.related
    .map((s) => getGuide(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.updated,
    dateModified: guide.updated,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${baseUrl}/brand/mark.png` },
    },
    mainEntityOfPage: `${baseUrl}/guides/${guide.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${baseUrl}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `${baseUrl}/guides/${guide.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-[#c5f23c]">
            Home
          </Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#c5f23c]">
            Guides
          </Link>
          <span>/</span>
          <span className="text-neutral-300">{guide.category}</span>
        </nav>

        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#c5f23c]">
          <span>{guide.category}</span>
          <span className="text-neutral-600">·</span>
          <span className="text-neutral-500">{guide.readMinutes} min read</span>
        </div>
        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
          {guide.title}
        </h1>

        {/* AI-quotable definitive answer */}
        <div className="mt-8 rounded-2xl border border-white/10 border-l-4 border-l-[#c5f23c] bg-white/[0.03] p-6">
          <p className="text-[17px] leading-relaxed text-neutral-100">
            {guide.heroSummary}
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {guide.sections.map((s, i) => (
            <section key={i}>
              <h2 className="mb-3 text-2xl font-semibold">{s.heading}</h2>
              <div className="space-y-4 text-[16px] leading-relaxed text-neutral-300">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {guide.table ? (
          <div className="mt-10">
            {guide.table.title ? (
              <h2 className="mb-4 text-2xl font-semibold">
                {guide.table.title}
              </h2>
            ) : null}
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-white/[0.04]">
                    {guide.table.columns.map((c) => (
                      <th
                        key={c}
                        className="border-b border-white/10 px-4 py-3 text-left font-semibold text-[#f3f1ea]"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.table.rows.map((row, ri) => (
                    <tr key={ri} className="odd:bg-white/[0.015]">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="border-b border-white/5 px-4 py-3 text-neutral-300"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {/* FAQ */}
        {guide.faqs.length > 0 ? (
          <div className="mt-14">
            <h2 className="mb-5 text-2xl font-semibold">
              Frequently asked questions
            </h2>
            <FaqList items={guide.faqs} />
          </div>
        ) : null}

        {/* CTA */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-br from-[#15171c] to-[#0b0c0e] p-8 text-center">
          <h2 className="text-2xl font-semibold">Ready to build?</h2>
          <p className="mt-2 text-neutral-400">
            Shop precision completes, decks, molds, and hardware from the Lab.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/search/starter-kits"
              className="rounded-full bg-[#c5f23c] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            >
              Shop completes
            </Link>
            <Link
              href="/search"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-[#c5f23c] hover:text-[#c5f23c]"
            >
              Browse everything
            </Link>
          </div>
        </div>

        {related.length > 0 ? (
          <div className="mt-14">
            <h2 className="mb-5 text-xl font-semibold">Related guides</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="group rounded-2xl border border-white/10 bg-[#15171c] p-5 transition hover:border-[#c5f23c]/40"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c5f23c]">
                    {g.category}
                  </div>
                  <div className="mt-2 font-medium text-[#f3f1ea] group-hover:text-[#c5f23c]">
                    {g.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </article>
      <Footer />
    </>
  );
}
