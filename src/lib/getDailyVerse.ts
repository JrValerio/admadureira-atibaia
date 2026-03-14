import { getBibleBookBySlug } from "@/data/biblia-livros";
import { dailyVerses } from "@/data/versiculo-do-dia";
import { getSaoPauloDayOfYear } from "@/lib/date-utils";

export function getDayOfYear(date = new Date()) {
  return getSaoPauloDayOfYear(date);
}

export function getDailyVerse(date = new Date()) {
  const dayOfYear = getDayOfYear(date);
  const verse = dailyVerses[(dayOfYear - 1 + dailyVerses.length) % dailyVerses.length];
  const book = getBibleBookBySlug(verse.livroSlug);

  return {
    ...verse,
    bookName: book?.nome ?? verse.livroSlug,
  };
}
