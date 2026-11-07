import data from "../data/marketplace-reviews.json";

export type MarketplaceReview = {
  rating: number;
  date: string;
  country: string;
  text: string | null;
  photos: string[];
};

export type MarketplaceReviewSet = {
  source: string;
  itemId: string;
  sourceUrl: string;
  total: number;
  /** Null when the source has no star scale (positive share is used instead). */
  average: number | null;
  positivePct?: number;
  /** Counts for 1..5 stars, as reported by the marketplace listing. */
  histogram: number[] | null;
  importedAt: string;
  reviews: MarketplaceReview[];
};

/**
 * Buyer reviews of the same item on the original marketplace listing
 * (AliExpress). These are NOT reviews of this store: they are kept apart from
 * lib/reviews.ts, labelled on the page, and never counted in the store's own
 * rating or in the Product JSON-LD.
 */
export function getMarketplaceReviews(
  handle: string,
): MarketplaceReviewSet | null {
  const set = (data as Record<string, MarketplaceReviewSet>)[handle];
  if (!set || set.reviews.length === 0) return null;
  const photos = set.reviews.some((r) => r.photos.length > 0);
  // A single text-only review is too thin to show.
  return set.reviews.length >= 2 || photos ? set : null;
}
