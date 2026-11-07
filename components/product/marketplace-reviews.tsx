import { StarRating } from "components/star-rating";
import type { MarketplaceReviewSet } from "lib/marketplace-reviews";

const COUNTRY_NAMES = new Intl.DisplayNames(["en"], { type: "region" });

function countryName(code: string): string {
  try {
    return COUNTRY_NAMES.of(code) || code;
  } catch {
    return code;
  }
}

function monthYear(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

/**
 * Buyer feedback on the original marketplace listing for this exact item.
 * Clearly labelled as such: it is supplier-listing feedback, not feedback
 * from customers of this store, and it is excluded from the store rating.
 */
export function MarketplaceReviews({ set }: { set: MarketplaceReviewSet }) {
  const photos = set.reviews.flatMap((r) => r.photos);
  const max = Math.max(...set.histogram, 1);

  return (
    <section
      aria-labelledby="marketplace-reviews-heading"
      className="mt-10 rounded-3xl border border-white/10 bg-[#0f1114] p-6 md:p-10"
    >
      <h2 id="marketplace-reviews-heading" className="text-xl font-semibold">
        Buyer feedback on the original listing
      </h2>
      <p className="mt-1 max-w-2xl text-xs leading-relaxed text-neutral-500">
        This is the same item as sold by the manufacturer on {set.source}. These
        are {set.source} buyers&rsquo; reviews, not reviews of Fingerboard Lab,
        and they are not included in our own rating. Imported{" "}
        {monthYear(set.importedAt)}.{" "}
        <a
          href={set.sourceUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="underline hover:text-[#c5f23c]"
        >
          View the original listing
        </a>
        .
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4">
        <div className="flex items-center gap-3">
          <StarRating value={set.average} size="lg" />
          <span className="text-sm text-neutral-300">
            {set.average.toFixed(1)} out of 5 · {set.total} review
            {set.total === 1 ? "" : "s"} on {set.source}
          </span>
        </div>
        <ul className="w-full max-w-xs space-y-1 text-xs text-neutral-400">
          {[5, 4, 3, 2, 1].map((n) => (
            <li key={n} className="flex items-center gap-2">
              <span className="w-8">{n} star</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <span
                  className="block h-full rounded-full bg-[#c5f23c]"
                  style={{
                    width: `${((set.histogram[n - 1] ?? 0) / max) * 100}%`,
                  }}
                />
              </span>
              <span className="w-6 text-right">{set.histogram[n - 1] ?? 0}</span>
            </li>
          ))}
        </ul>
      </div>

      {photos.length > 0 ? (
        <div className="mt-6">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Photos from buyers
          </h3>
          <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {photos.map((src) => (
              <li key={src} className="h-24 w-24 flex-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Photo from a buyer of this item"
                  loading="lazy"
                  width={96}
                  height={96}
                  className="h-full w-full rounded-xl object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <ul className="mt-6 space-y-4">
        {set.reviews.map((r, i) => (
          <li
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <StarRating value={r.rating} size="sm" />
              <span className="text-xs text-neutral-500">
                {countryName(r.country)} · {monthYear(r.date)} · via{" "}
                {set.source}
              </span>
            </div>
            {r.text ? (
              <p className="mt-2 text-sm leading-relaxed text-neutral-200">
                {r.text}
              </p>
            ) : null}
            {r.photos.length > 0 ? (
              <ul className="mt-3 flex gap-2">
                {r.photos.map((src) => (
                  <li key={src} className="h-16 w-16 flex-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt="Buyer photo"
                      loading="lazy"
                      width={64}
                      height={64}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
