"use client";

import { startTransition, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import type { BibleBook } from "@/data/biblia-livros";
import { createBiblePath } from "@/lib/bible-navigation";

type BibleChapterSelectorProps = {
  selectedBook: BibleBook;
  selectedChapter: number;
};

export default function BibleChapterSelector({
  selectedBook,
  selectedChapter,
}: BibleChapterSelectorProps) {
  const router = useRouter();

  const handleChapterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const chapter = Number(event.target.value);

    if (!Number.isFinite(chapter) || chapter === selectedChapter) {
      return;
    }

    startTransition(() => {
      router.push(createBiblePath(selectedBook.slug, chapter));
    });
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

      <label className="block mb-3 text-[#777] text-xs font-bold tracking-widest uppercase">
        Capítulo atual
      </label>
      <select
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

      <p className="mt-4 text-sm text-[#777] leading-relaxed">
        Use também os botões de capítulo anterior e próximo para avançar na leitura
        sem sair do fluxo.
      </p>
    </div>
  );
}
