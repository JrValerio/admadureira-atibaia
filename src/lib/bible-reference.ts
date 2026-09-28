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
  chapters: number;
};

// Abreviações usadas nas revistas; não são regras de correção de OCR.
const BOOK_ABBREVIATIONS: Record<string, string> = {
  GEN: "Gn", EXO: "Êx", LEV: "Lv", NUM: "Nm", DEU: "Dt", JOS: "Js",
  JDG: "Jz", RUT: "Rt", "1SA": "1 Sm", "2SA": "2 Sm", "1KI": "1 Rs", "2KI": "2 Rs",
  "1CH": "1 Cr", "2CH": "2 Cr", EZR: "Ed", NEH: "Ne", EST: "Et", PSA: "Sl",
  PRO: "Pv", ECC: "Ec", SNG: "Ct", ISA: "Is", JER: "Jr", LAM: "Lm", EZK: "Ez",
  DAN: "Dn", HOS: "Os", JOL: "Jl", AMO: "Am", OBA: "Ob", JON: "Jn", MIC: "Mq",
  NAM: "Na", HAB: "Hc", ZEP: "Sf", HAG: "Ag", ZEC: "Zc", MAL: "Ml", MAT: "Mt",
  MRK: "Mc", LUK: "Lc", JHN: "Jo", ACT: "At", ROM: "Rm", "1CO": "1 Co", "2CO": "2 Co",
  GAL: "Gl", EPH: "Ef", PHP: "Fp", COL: "Cl", "1TH": "1 Ts", "2TH": "2 Ts",
  "1TI": "1 Tm", "2TI": "2 Tm", TIT: "Tt", PHM: "Fm", HEB: "Hb", JAS: "Tg",
  "1PE": "1 Pe", "2PE": "2 Pe", "1JN": "1 Jo", "2JN": "2 Jo", "3JN": "3 Jo",
  JUD: "Jd", REV: "Ap",
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
      chapters: book.capitulos,
    };

    register(book.nome, alias, { allowShort: true });
    register(stripAccents(book.nome), alias);

    const abbreviation = BOOK_ABBREVIATIONS[book.id];
    if (abbreviation) {
      register(abbreviation, alias, { allowShort: true });
      register(stripAccents(abbreviation), alias, { allowShort: true });
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
  // Um link abre o primeiro trecho. Não converter uma lista descontínua
  // (1-4,7-9) num intervalo contínuo (1-9).
  const firstRange = verses?.split(",")[0];
  if (!firstRange?.includes("-")) {
    return undefined;
  }

  const lastVerse = Number(firstRange.split("-").at(-1));

  return Number.isFinite(lastVerse) ? lastVerse : undefined;
}

export function normalizeBibleReferenceNotation(text: string) {
  return text.replace(/(?<=\d)\.(?=\d)/g, ":");
}

function isValidVerseNotation(verses?: string) {
  if (!verses) return true;
  if (!/^\d+(?:-\d+)?(?:,\d+(?:-\d+)?)*$/.test(verses)) return false;
  return verses.split(",").every((part) => {
    const [start, end = start] = part.split("-").map(Number);
    return start > 0 && end >= start;
  });
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
    // Preservar Jó (livro) versus Jo (abreviação de João).
    const canonicalBook = bibleBooks.find(
      (item) => item.nome.toLocaleLowerCase("pt-BR") === rawBook.toLocaleLowerCase("pt-BR")
    );
    const book = canonicalBook
      ? { slug: canonicalBook.slug, name: canonicalBook.nome, chapters: canonicalBook.capitulos }
      : bibleBookAliasMap.get(normalizedBook);
    const chapter = Number(rawChapter);

    if (!book || !Number.isFinite(chapter) || chapter < 1 || chapter > book.chapters || !isValidVerseNotation(rawVerses)) {
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

      if (!Number.isFinite(shorthandChapter) || shorthandChapter < 1 || shorthandChapter > book.chapters || !isValidVerseNotation(rawShorthandVerses)) {
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
