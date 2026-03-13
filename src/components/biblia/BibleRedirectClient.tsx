"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  bibleBooks,
  getBibleBookById,
  getBibleBookBySlug,
} from "@/data/biblia-livros";
import { useBibleLastReading } from "@/hooks/useBibleLastReading";
import { clampBibleChapter, createBiblePath } from "@/lib/bible-navigation";

type BibleRedirectClientProps = {
  livro?: string;
  capitulo?: string;
};

function parseChapter(value?: string | null) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 3;
  }

  return parsed;
}

export default function BibleRedirectClient({
  livro,
  capitulo,
}: BibleRedirectClientProps) {
  const router = useRouter();
  const { lastReading } = useBibleLastReading();

  useEffect(() => {
    const fallbackBook = getBibleBookBySlug("joao") ?? bibleBooks[0];
    const queryBook =
      (livro &&
        (getBibleBookBySlug(livro) ||
          getBibleBookById(livro))) ||
      null;

    const selectedBook =
      queryBook ||
      (lastReading ? getBibleBookBySlug(lastReading.book) : null) ||
      fallbackBook;

    const selectedChapter = clampBibleChapter(
      selectedBook,
      queryBook
        ? parseChapter(capitulo)
        : lastReading?.chapter ?? 3
    );

    const selectedVerse = queryBook ? undefined : lastReading?.verse;
    const path = createBiblePath(selectedBook.slug, selectedChapter);
    const href =
      typeof selectedVerse === "number" ? `${path}#v${selectedVerse}` : path;

    router.replace(href);
  }, [capitulo, lastReading, livro, router]);

  return (
    <section className="min-h-[40vh] bg-[#f5f5f5] px-4 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-black/5 bg-white p-8 text-center shadow-sm">
        <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
          Bíblia Online
        </p>
        <h1 className="font-acme text-3xl text-[#212121] tracking-wide mb-3">
          Abrindo sua leitura
        </h1>
        <p className="text-sm leading-7 text-[#555]">
          Estamos levando você para o último capítulo lido ou para a referência
          padrão da Bíblia Online.
        </p>
      </div>
    </section>
  );
}
