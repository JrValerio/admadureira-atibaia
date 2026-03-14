"use client";

import Link from "next/link";
import { startTransition, type ChangeEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { BibleBook } from "@/data/biblia-livros";
import type { BibleLanguage, BibleVersion } from "@/lib/bible-config";
import { createBibleHref } from "@/lib/bible-navigation";

type BibleChapterSelectorProps = {
  selectedBook: BibleBook;
  selectedChapter: number;
  verseCount: number;
  selectedLanguage: BibleLanguage;
  selectedVersion: BibleVersion;
};

const POPULAR_CHAPTERS: Partial<Record<string, number[]>> = {
  salmos: [23, 91, 121, 150],
};

export default function BibleChapterSelector({
  selectedBook,
  selectedChapter,
  verseCount,
  selectedLanguage,
  selectedVersion,
}: BibleChapterSelectorProps) {
  const router = useRouter();
  const popularChapters = POPULAR_CHAPTERS[selectedBook.slug] ?? [];
  const [selectedVerse, setSelectedVerse] = useState("");
  const verses = useMemo(
    () => Array.from({ length: verseCount }, (_, index) => index + 1),
    [verseCount]
  );

  useEffect(() => {
    const syncVerseFromHash = () => {
      const match = window.location.hash.match(/^#v(\d+)$/);
      setSelectedVerse(match ? match[1] : "");
    };

    syncVerseFromHash();
    window.addEventListener("hashchange", syncVerseFromHash);

    return () => {
      window.removeEventListener("hashchange", syncVerseFromHash);
    };
  }, []);

  const handleChapterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const chapter = Number(event.target.value);

    if (!Number.isFinite(chapter) || chapter === selectedChapter) {
      return;
    }

    startTransition(() => {
      router.push(
        createBibleHref(selectedBook.slug, chapter, {
          language: selectedLanguage,
          version: selectedVersion,
        })
      );
    });
  };

  const handleVerseChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const verse = Number(event.target.value);

    if (!Number.isFinite(verse) || verse < 1) {
      return;
    }

    setSelectedVerse(String(verse));
    window.location.hash = `v${verse}`;
  };

  return (
    <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
      <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
        Capítulos
      </p>
      <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-4">
        {selectedBook.nome}
      </h2>
      <p className="text-sm text-[#555] leading-relaxed mb-6">
        {selectedBook.capitulos} capítulo
        {selectedBook.capitulos > 1 ? "s" : ""} disponíveis. Escolha um capítulo
        pelo seletor abaixo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-3 text-[#777] text-xs font-bold tracking-widest uppercase">
            Capítulo atual
          </label>
          <select
            aria-label="Selecionar capítulo da Bíblia"
            value={selectedChapter}
            onChange={handleChapterChange}
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-[#212121] shadow-sm outline-none transition-colors focus:border-[#ffa726]"
          >
            {Array.from({ length: selectedBook.capitulos }, (_, index) => {
              const chapter = index + 1;

              return (
                <option key={chapter} value={chapter}>
                  Capítulo {chapter}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block mb-3 text-[#777] text-xs font-bold tracking-widest uppercase">
            Versículo
          </label>
          <select
            aria-label="Ir para versículo da Bíblia"
            value={selectedVerse}
            onChange={handleVerseChange}
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-[#212121] shadow-sm outline-none transition-colors focus:border-[#ffa726]"
          >
            <option value="">Versículo</option>
            {verses.map((verse) => (
              <option key={verse} value={verse}>
                {verse}
              </option>
            ))}
          </select>
        </div>
      </div>

      {popularChapters.length > 0 ? (
        <div className="mt-6">
          <p className="mb-3 text-[#777] text-xs font-bold tracking-widest uppercase">
            Capítulos populares
          </p>
          <div className="flex flex-wrap gap-2">
            {popularChapters.map((chapter) => {
              const isActive = chapter === selectedChapter;

              return (
                <Link
                  key={chapter}
                  href={createBibleHref(selectedBook.slug, chapter, {
                    language: selectedLanguage,
                    version: selectedVersion,
                  })}
                  aria-label={`Ir para ${selectedBook.nome} capítulo ${chapter}`}
                  className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "border-[#ffa726] bg-[#ffa726] text-[#212121]"
                      : "border-black/10 bg-white text-[#555] hover:border-[#ffa726]/60 hover:text-[#212121]"
                  }`}
                >
                  {chapter}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      <p className="mt-4 text-sm text-[#777] leading-relaxed">
        Use os seletores para abrir capítulos e versículos específicos ou avance
        pela leitura com os botões de capítulo anterior e próximo.
      </p>
    </div>
  );
}
