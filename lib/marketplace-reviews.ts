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
  average: number;
  /** Counts for 1..5 stars, as reported by the marketplace listing. */
  histogram: number[];
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
  return set && set.reviews.length > 0 ? set : null;
}
