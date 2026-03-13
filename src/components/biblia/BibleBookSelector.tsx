"use client";

import { startTransition, type ChangeEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getBibleBooksByTestament,
  type BibleBook,
} from "@/data/biblia-livros";
import { createBiblePath } from "@/lib/bible-navigation";

type BibleBookSelectorProps = {
  selectedBook: BibleBook;
  selectedChapter: number;
};

export default function BibleBookSelector({
  selectedBook,
  selectedChapter,
}: BibleBookSelectorProps) {
  const router = useRouter();
  const [selectedTestament, setSelectedTestament] = useState<BibleBook["testamento"]>(
    selectedBook.testamento
  );
  const oldTestamentBooks = getBibleBooksByTestament("Antigo Testamento");
  const newTestamentBooks = getBibleBooksByTestament("Novo Testamento");
  const filteredBooks = useMemo(
    () =>
      selectedTestament === "Antigo Testamento"
        ? oldTestamentBooks
        : newTestamentBooks,
    [newTestamentBooks, oldTestamentBooks, selectedTestament]
  );

  const handleTestamentChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextTestament = event.target.value as BibleBook["testamento"];
    const nextBooks =
      nextTestament === "Antigo Testamento"
        ? oldTestamentBooks
        : newTestamentBooks;
    const nextBook = nextBooks[0];

    setSelectedTestament(nextTestament);

    if (!nextBook) {
      return;
    }

    startTransition(() => {
      router.push(
        createBiblePath(nextBook.slug, Math.min(selectedChapter, nextBook.capitulos))
      );
    });
  };

  const handleBookChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextBook =
      filteredBooks.find((book) => book.slug === event.target.value) ?? selectedBook;

    startTransition(() => {
      router.push(
        createBiblePath(nextBook.slug, Math.min(selectedChapter, nextBook.capitulos))
      );
    });
  };

  return (
    <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
      <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
        Navegação bíblica
      </p>
      <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-4">
        Livro e testamento
      </h2>
      <p className="text-sm text-[#555] leading-relaxed mb-6">
        Escolha o testamento e o livro para navegar pela leitura com o mesmo
        fluxo compacto usado na seleção de capítulos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-3 text-[#777] text-xs font-bold tracking-widest uppercase">
            Testamento
          </label>
          <select
            value={selectedTestament}
            onChange={handleTestamentChange}
            aria-label="Selecionar testamento da Bíblia"
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-[#212121] shadow-sm outline-none transition-colors focus:border-[#ffa726]"
          >
            <option value="Antigo Testamento">Antigo Testamento</option>
            <option value="Novo Testamento">Novo Testamento</option>
          </select>
        </div>

        <div>
          <label className="block mb-3 text-[#777] text-xs font-bold tracking-widest uppercase">
            Livro
          </label>
          <select
            value={selectedBook.slug}
            onChange={handleBookChange}
            aria-label="Selecionar livro da Bíblia"
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-[#212121] shadow-sm outline-none transition-colors focus:border-[#ffa726]"
          >
            {filteredBooks.map((book) => (
              <option key={book.id} value={book.slug}>
                {book.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
