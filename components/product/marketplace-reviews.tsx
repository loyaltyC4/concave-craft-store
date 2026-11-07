import { StarRating } from "components/star-rating";
import type { MarketplaceReviewSet } from "lib/marketplace-reviews";
import { ReviewPhotoWall } from "./review-photo-wall";
import { Reveal } from "./reveal";

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
 * Always labelled as such: it is supplier-listing feedback, not feedback
 * from customers of this store, and it is excluded from the store rating
 * and the Product JSON-LD.
 *
 * Design: dark theme + single lime accent to match the store. Double-bezel
 * container, sticky summary column beside a photo bento and a two-column
 * review flow.
 */
export function MarketplaceReviews({ set }: { set: MarketplaceReviewSet }) {
  const photos = set.reviews.flatMap((r) => r.photos);
  const hist = set.histogram;
  const max = Math.max(...(hist ?? [0]), 1);
  const withText = set.reviews.filter((r) => r.text);

  return (
    <section
      aria-labelledby="marketplace-reviews-heading"
      className="mt-16 md:mt-24"
    >
      {/* Double bezel: outer tray + inner plate, concentric radii */}
      <div className="rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/10">
        <div className="rounded-[calc(2rem-0.375rem)] bg-[#0c0e11] px-5 py-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] md:px-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Summary, sticky on desktop */}
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <span className="inline-flex rounded-full bg-white/[0.06] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-300 ring-1 ring-white/10">
                  Buyer feedback
                </span>
                <h2
                  id="marketplace-reviews-heading"
                  className="mt-5 text-3xl font-semibold leading-[1.05] tracking-tighter text-white md:text-4xl"
                >
                  What buyers say about this exact item
                </h2>

                {set.average != null && hist ? (
                  <>
                    <div className="mt-8 flex items-end gap-4">
                      <span className="text-7xl font-semibold leading-none tracking-tighter text-white md:text-8xl">
                        {set.average.toFixed(1)}
                      </span>
                      <div className="pb-2">
                        <StarRating value={set.average} size="lg" />
                        <p className="mt-1.5 text-xs text-neutral-400">
                          {set.total} review{set.total === 1 ? "" : "s"} from other buyers
                        </p>
                      </div>
                    </div>

                    <ul className="mt-8 space-y-2.5 text-xs text-neutral-400">
                      {[5, 4, 3, 2, 1].map((n) => {
                        const count = hist[n - 1] ?? 0;
                        return (
                          <li key={n} className="flex items-center gap-3">
                            <span className="w-9 tabular-nums">{n} star</span>
                            <span className="flex-1">
                              <span
                                className="block h-1 rounded-full bg-[#c5f23c]"
                                style={{
                                  width: `${Math.max((count / max) * 100, count ? 3 : 0)}%`,
                                }}
                              />
                            </span>
                            <span className="w-7 text-right tabular-nums text-neutral-300">
                              {count}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <div className="mt-8">
                    <span className="text-7xl font-semibold leading-none tracking-tighter text-white md:text-8xl">
                      {set.positivePct ?? 0}%
                    </span>
                    <p className="mt-3 text-xs text-neutral-400">
                      positive across {set.total} rating{set.total === 1 ? "" : "s"} from other buyers
                    </p>
                  </div>
                )}

                <p className="mt-8 max-w-sm text-xs leading-relaxed text-neutral-500">
                  Feedback from other buyers of this same item, collected from
                  the manufacturer&rsquo;s own sales listing. These are not
                  reviews of orders placed with Fingerboard Lab and are not
                  counted in our rating. Updated {monthYear(set.importedAt)}.
                </p>
              </div>
            </Reveal>

            {/* Photos then reviews */}
            <div className="space-y-10 lg:col-span-8">
              {photos.length > 0 ? (
                <Reveal delay={80}>
                  <h3 className="mb-4 text-sm font-medium text-neutral-300">
                    Photos from buyers
                  </h3>
                  <ReviewPhotoWall photos={photos} />
                </Reveal>
              ) : null}

              <ul className="columns-1 gap-4 md:columns-2 [&>li]:mb-4 [&>li]:break-inside-avoid">
                {withText.map((r, i) => (
                  <li key={i}>
                    <Reveal delay={Math.min(i, 5) * 60}>
                      <article className="rounded-[1.5rem] bg-white/[0.025] p-1 ring-1 ring-white/10">
                        <div className="rounded-[calc(1.5rem-0.25rem)] bg-[#12151a] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                          <StarRating value={r.rating} size="sm" />
                          <p className="mt-3 text-[15px] leading-relaxed text-neutral-100">
                            &ldquo;{r.text}&rdquo;
                          </p>
                          {r.photos.length > 0 ? (
                            <ul className="mt-4 flex gap-2">
                              {r.photos.slice(0, 3).map((src) => (
                                <li key={src} className="h-14 w-14 flex-none">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={src}
                                    alt="Buyer photo"
                                    loading="lazy"
                                    width={56}
                                    height={56}
                                    className="h-full w-full rounded-xl object-cover ring-1 ring-white/10"
                                  />
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          <p className="mt-4 text-xs text-neutral-500">
                            {countryName(r.country)}, {monthYear(r.date)}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
