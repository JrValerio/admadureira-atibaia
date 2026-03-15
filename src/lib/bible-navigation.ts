import type { BibleBook } from "@/data/biblia-livros";
import {
  DEFAULT_BIBLE_LANGUAGE,
  DEFAULT_BIBLE_VERSION,
  type BibleLanguage,
  type BibleVersion,
} from "@/lib/bible-config";

export function createBiblePath(bookSlug: string, chapter: number) {
  return `/espiritualidade/biblia/${bookSlug}/${chapter}`;
}

type BibleNavigationOptions = {
  language?: BibleLanguage;
  version?: BibleVersion;
  verse?: number;
  verseEnd?: number;
};

export function createBibleHref(
  bookSlug: string,
  chapter: number,
  options: BibleNavigationOptions = {}
) {
  const path = createBiblePath(bookSlug, chapter);
  const searchParams = new URLSearchParams();

  if (options.language && options.language !== DEFAULT_BIBLE_LANGUAGE) {
    searchParams.set("lang", options.language);
  }

  if (options.version && options.version !== DEFAULT_BIBLE_VERSION) {
    searchParams.set("version", options.version);
  }

  const search = searchParams.toString();
  const verseStart =
    typeof options.verse === "number" && Number.isFinite(options.verse)
      ? Math.floor(options.verse)
      : null;
  const verseEnd =
    typeof options.verseEnd === "number" && Number.isFinite(options.verseEnd)
      ? Math.floor(options.verseEnd)
      : null;
  const hash =
    verseStart !== null
      ? verseEnd !== null && verseEnd > verseStart
        ? `#v${verseStart}-${verseEnd}`
        : `#v${verseStart}`
      : "";

  return `${path}${search ? `?${search}` : ""}${hash}`;
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
