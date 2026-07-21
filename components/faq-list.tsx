export type Faq = { q: string; a: string };

export function FaqList({
  items,
  withSchema = true,
}: {
  items: Faq[];
  withSchema?: boolean;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div>
      {withSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <div className="divide-y divide-white/10 border-y border-white/10">
        {items.map((f, i) => (
          <details key={i} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-[#f3f1ea]">
              {f.q}
              <span className="text-xl leading-none text-neutral-500 transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
