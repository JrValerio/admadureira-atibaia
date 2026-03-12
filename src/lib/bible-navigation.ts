import type { BibleBook } from "@/data/biblia-livros";

export function createBiblePath(bookSlug: string, chapter: number) {
  return `/espiritualidade/biblia/${bookSlug}/${chapter}`;
}

export function clampBibleChapter(book: BibleBook, chapter: number) {
  if (!Number.isFinite(chapter)) {
    return 1;
  }

  const normalized = Math.floor(chapter);

  if (normalized < 1) {
    return 1;
  }

  if (normalized > book.capitulos) {
    return book.capitulos;
  }

  return normalized;
}
