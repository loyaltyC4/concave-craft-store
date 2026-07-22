import { guides as guidesBatch1, type Guide } from "./guides-data";
import { guidesBatch2 } from "./guides-data-2";

export type { Guide, GuideSection, GuideTable, GuideFaq } from "./guides-data";

/** Every published guide, across all content batches. */
export const allGuides: Guide[] = [...guidesBatch1, ...guidesBatch2];

export function getGuide(slug: string): Guide | undefined {
  return allGuides.find((g) => g.slug === slug);
}
