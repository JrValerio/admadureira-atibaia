import { bibleBooks } from "@/data/biblia-livros";
import { createBibleHref } from "@/lib/bible-navigation";

export type ParsedBibleReference = {
  matchedText: string;
  bookSlug: string;
  bookName: string;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
  href: string;
  index: number;
};

type BookAlias = {
  slug: string;
  name: string;
};

function stripAccents(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeReferenceText(value: string) {
  return stripAccents(value)
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildRomanAlias(name: string) {
  return name
    .replace(/^1\s+/, "I ")
    .replace(/^2\s+/, "II ")
    .replace(/^3\s+/, "III ");
}

function createBookAliasMap() {
  const aliasMap = new Map<string, BookAlias>();
  const aliasOptions = new Set<string>();

  const register = (
    alias: string,
    book: BookAlias,
    options: { allowShort?: boolean } = {}
  ) => {
    const normalizedAlias = normalizeReferenceText(alias);

    if (
      !normalizedAlias ||
      (normalizedAlias.length < 3 && !options.allowShort)
    ) {
      return;
    }

    aliasMap.set(normalizedAlias, book);
    aliasOptions.add(alias.trim());
  };

  for (const book of bibleBooks) {
    const alias = {
      slug: book.slug,
      name: book.nome,
    };

    register(book.nome, alias);
    register(stripAccents(book.nome), alias);

    if (book.slug === "juizes") {
      register("Jz", alias, { allowShort: true });
    }

    const slugAlias = book.slug.replace(/-/g, " ");
    if (slugAlias.length >= 4) {
      register(slugAlias, alias);
    }

    if (/^[123]\s+/.test(book.nome)) {
      const romanAlias = buildRomanAlias(book.nome);
      register(romanAlias, alias);
      register(stripAccents(romanAlias), alias);
    }
  }

  return {
    aliasMap,
    aliasOptions: [...aliasOptions],
  };
}

const { aliasMap: bibleBookAliasMap, aliasOptions: bibleBookAliases } =
  createBookAliasMap();
const bibleBookPattern = bibleBookAliases
  .sort((left, right) => right.length - left.length)
  .map(escapeRegex)
  .join("|");

const BIBLE_REFERENCE_REGEX = new RegExp(
  `(?<![\\p{L}\\p{N}])(${bibleBookPattern})\\s+(\\d+)(?:[:.]?(\\d+(?:[-,]\\d+)*))?`,
  "giu"
);
const BIBLE_SHORTHAND_REFERENCE_REGEX = /(;+\s*)(\d+)(?:[:.](\d+(?:[-,]\d+)*))?/giu;

function parseVerseStart(verses?: string) {
  if (!verses) {
    return undefined;
  }

  const firstVerse = Number(verses.split(/[-,]/, 1)[0]);

  return Number.isFinite(firstVerse) ? firstVerse : undefined;
}

function parseVerseEnd(verses?: string) {
  if (!verses?.includes("-")) {
    return undefined;
  }

  const lastVerse = Number(verses.split("-").at(-1));

  return Number.isFinite(lastVerse) ? lastVerse : undefined;
}

export function normalizeBibleReferenceNotation(text: string) {
  return text.replace(/(?<=\d)\.(?=\d)/g, ":");
}

export function extractBibleReferences(text: string): ParsedBibleReference[] {
  if (!text.trim()) {
    return [];
  }

  const fullMatches = [...text.matchAll(BIBLE_REFERENCE_REGEX)];
  const matches: ParsedBibleReference[] = [];

  for (const [matchIndex, match] of fullMatches.entries()) {
    const [matchedText, rawBook, rawChapter, rawVerses] = match;
    const normalizedBook = normalizeReferenceText(rawBook);
    const book = bibleBookAliasMap.get(normalizedBook);
    const chapter = Number(rawChapter);

    if (!book || !Number.isFinite(chapter)) {
      continue;
    }

    const verseStart = parseVerseStart(rawVerses);
    const verseEnd = parseVerseEnd(rawVerses);
    const href = createBibleHref(book.slug, chapter, {
      verse: verseStart,
      verseEnd,
    });

    matches.push({
      matchedText,
      bookSlug: book.slug,
      bookName: book.name,
      chapter,
      verseStart,
      verseEnd,
      href,
      index: match.index ?? 0,
    });

    const currentMatchIndex = match.index ?? 0;
    const currentMatchEnd = currentMatchIndex + matchedText.length;
    const nextMatchIndex = fullMatches[matchIndex + 1]?.index ?? text.length;
    const shorthandSegment = text.slice(currentMatchEnd, nextMatchIndex);

    for (const shorthandMatch of shorthandSegment.matchAll(
      BIBLE_SHORTHAND_REFERENCE_REGEX
    )) {
      const [shorthandText, separator, rawShorthandChapter, rawShorthandVerses] =
        shorthandMatch;
      const shorthandChapter = Number(rawShorthandChapter);

      if (!Number.isFinite(shorthandChapter)) {
        continue;
      }

      const verseStart = parseVerseStart(rawShorthandVerses);
      const verseEnd = parseVerseEnd(rawShorthandVerses);
      const shorthandIndex =
        currentMatchEnd + (shorthandMatch.index ?? 0) + separator.length;
      const shorthandMatchedText = shorthandText.slice(separator.length);
      const shorthandHref = createBibleHref(book.slug, shorthandChapter, {
        verse: verseStart,
        verseEnd,
      });

      matches.push({
        matchedText: shorthandMatchedText,
        bookSlug: book.slug,
        bookName: book.name,
        chapter: shorthandChapter,
        verseStart,
        verseEnd,
        href: shorthandHref,
        index: shorthandIndex,
      });
    }
  }

  return matches.sort((left, right) => left.index - right.index);
}

export function buildBibleReferenceHref(reference: string) {
  return extractBibleReferences(reference)[0]?.href ?? null;
}
