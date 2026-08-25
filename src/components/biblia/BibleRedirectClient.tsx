"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  bibleBooks,
  getBibleBookById,
  getBibleBookBySlug,
} from "@/data/biblia-livros";
import { useBibleLastReading } from "@/hooks/useBibleLastReading";
import {
  DEFAULT_BIBLE_LANGUAGE,
  DEFAULT_BIBLE_VERSION,
  getBibleLanguage,
  getBibleVersion,
} from "@/lib/bible-config";
import { clampBibleChapter, createBibleHref } from "@/lib/bible-navigation";

type BibleRedirectClientProps = {
  livro?: string;
  capitulo?: string;
  lang?: string;
  version?: string;
};

function parseChapter(value?: string | null) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 1;
  }

  return parsed;
}

export default function BibleRedirectClient({
  livro,
  capitulo,
  lang,
  version,
}: BibleRedirectClientProps) {
  const router = useRouter();
  const { lastReading } = useBibleLastReading();

  useEffect(() => {
    const fallbackBook = bibleBooks[0] ?? getBibleBookBySlug("genesis");
    const queryBook =
      (livro &&
        (getBibleBookBySlug(livro) ||
          getBibleBookById(livro))) ||
      null;

    const selectedBook =
      queryBook ||
      (lastReading ? getBibleBookBySlug(lastReading.book) : null) ||
      fallbackBook;
    const selectedLanguage = getBibleLanguage(
      lang || lastReading?.language || DEFAULT_BIBLE_LANGUAGE
    );
    const selectedVersion = getBibleVersion(
      selectedLanguage,
      version || lastReading?.version || DEFAULT_BIBLE_VERSION
    );

    const selectedChapter = clampBibleChapter(
      selectedBook,
      queryBook
        ? parseChapter(capitulo)
        : lastReading?.chapter ?? 1
    );

    const selectedVerse = queryBook ? undefined : lastReading?.verse;
    const href = createBibleHref(selectedBook.slug, selectedChapter, {
      language: selectedLanguage,
      version: selectedVersion,
      verse: selectedVerse,
    });

    router.replace(href);
  }, [capitulo, lang, lastReading, livro, router, version]);

  return (
    <section className="min-h-[40vh] bg-[#f5f5f5] px-4 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-black/5 bg-white p-8 text-center shadow-sm">
        <p className="ui-card-eyebrow mb-3">
          Bíblia Online
        </p>
        <h1 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-3">
          Abrindo sua leitura
        </h1>
        <p className="text-sm leading-7 text-[#555]">
          Estamos levando você para o último capítulo lido ou para a referência
          inicial da Bíblia Online.
        </p>
      </div>
    </section>
  );
}
