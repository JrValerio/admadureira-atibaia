import type { Devotional } from "@/data/devocionais";
import {
  getReadingPlanBySlug,
  getReadingPlanDailySummary,
  getSuggestedReadingPlanDay,
  createReadingPlanDayPath,
  type ReadingPlan,
  type ReadingPlanDay,
} from "@/data/plano-de-leitura";
import { getDevotionalOfTheDay } from "@/data/devocionais";
import { createBiblePath } from "@/lib/bible-navigation";
import { getDailyVerse } from "@/lib/getDailyVerse";

type DailyVerseData = ReturnType<typeof getDailyVerse>;

export type SpiritualityHubData = {
  verse: DailyVerseData;
  devotional: Devotional;
  plan: ReadingPlan;
  readingDay: ReadingPlanDay;
  suggestedDay: number;
  readingSummary: string;
  verseChapterHref: string;
  devotionalHref: string;
  readingDayHref: string;
  planHref: string;
};

export function getSpiritualityHubData(
  date = new Date()
): SpiritualityHubData | null {
  const verse = getDailyVerse(date);
  const devotional = getDevotionalOfTheDay(date);
  const plan = getReadingPlanBySlug("biblia-em-1-ano");

  if (!devotional || !plan) {
    return null;
  }

  const suggestedDay = getSuggestedReadingPlanDay(plan, date);
  const readingDay = plan.dias[suggestedDay - 1];

  if (!readingDay) {
    return null;
  }

  return {
    verse,
    devotional,
    plan,
    readingDay,
    suggestedDay,
    readingSummary: getReadingPlanDailySummary(readingDay),
    verseChapterHref: createBiblePath(verse.livroSlug, verse.capitulo),
    devotionalHref: `/espiritualidade/devocional/${devotional.slug}`,
    readingDayHref: createReadingPlanDayPath(plan.slug, suggestedDay),
    planHref: `/espiritualidade/plano-de-leitura/${plan.slug}`,
  };
}
