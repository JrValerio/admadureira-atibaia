import { getBibleBookBySlug } from "@/data/biblia-livros";
import { dailyVerses } from "@/data/versiculo-do-dia";

function getSaoPauloDate(date = new Date()) {
  return new Date(
    date.toLocaleString("en-US", {
      timeZone: "America/Sao_Paulo",
    })
  );
}

export function getDayOfYear(date = new Date()) {
  const today = getSaoPauloDate(date);
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();

  return Math.floor(diff / 86400000);
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
