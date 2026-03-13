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
  const hash =
    typeof options.verse === "number" && Number.isFinite(options.verse)
      ? `#v${Math.floor(options.verse)}`
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
