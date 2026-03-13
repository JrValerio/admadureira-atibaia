"use client";

import {
  startTransition,
  type ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  getBibleBooksByTestament,
  type BibleBook,
} from "@/data/biblia-livros";
import {
  getBibleLanguageLabel,
  getBibleVersionsForLanguage,
  type BibleLanguage,
  type BibleVersion,
} from "@/lib/bible-config";
import { createBibleHref } from "@/lib/bible-navigation";

type BibleBookSelectorProps = {
  selectedBook: BibleBook;
  selectedChapter: number;
  selectedLanguage: BibleLanguage;
  selectedVersion: BibleVersion;
};

export default function BibleBookSelector({
  selectedBook,
  selectedChapter,
  selectedLanguage,
  selectedVersion,
}: BibleBookSelectorProps) {
  const router = useRouter();
  const [selectedTestament, setSelectedTestament] = useState<BibleBook["testamento"]>(
    selectedBook.testamento
  );
  const [language, setLanguage] = useState<BibleLanguage>(selectedLanguage);
  const oldTestamentBooks = getBibleBooksByTestament("Antigo Testamento");
  const newTestamentBooks = getBibleBooksByTestament("Novo Testamento");
  const versions = useMemo(
    () => getBibleVersionsForLanguage(language),
    [language]
  );
  const resolvedSelectedVersion =
    versions.find((version) => version.id === selectedVersion)?.id ??
    versions[0]?.id ??
    selectedVersion;

  useEffect(() => {
    setSelectedTestament(selectedBook.testamento);
  }, [selectedBook.testamento]);

  useEffect(() => {
    setLanguage(selectedLanguage);
  }, [selectedLanguage]);
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
        createBibleHref(
          nextBook.slug,
          Math.min(selectedChapter, nextBook.capitulos),
          {
            language,
            version: resolvedSelectedVersion,
          }
        )
      );
    });
  };

  const handleBookChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextBook =
      filteredBooks.find((book) => book.slug === event.target.value) ?? selectedBook;

    startTransition(() => {
      router.push(
        createBibleHref(
          nextBook.slug,
          Math.min(selectedChapter, nextBook.capitulos),
          {
            language,
            version: resolvedSelectedVersion,
          }
        )
      );
    });
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLanguage = event.target.value as BibleLanguage;
    const nextVersion = getBibleVersionsForLanguage(nextLanguage)[0]?.id;

    setLanguage(nextLanguage);

    if (!nextVersion) {
      return;
    }

    startTransition(() => {
      router.push(
        createBibleHref(selectedBook.slug, selectedChapter, {
          language: nextLanguage,
          version: nextVersion,
        })
      );
    });
  };

  const handleVersionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextVersion = event.target.value as BibleVersion;

    startTransition(() => {
      router.push(
        createBibleHref(selectedBook.slug, selectedChapter, {
          language,
          version: nextVersion,
        })
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

        <div>
          <label className="block mb-3 text-[#777] text-xs font-bold tracking-widest uppercase">
            Idioma
          </label>
          <select
            value={language}
            onChange={handleLanguageChange}
            aria-label="Selecionar idioma da Bíblia"
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-[#212121] shadow-sm outline-none transition-colors focus:border-[#ffa726]"
          >
            <option value="pt">{getBibleLanguageLabel("pt")}</option>
            <option value="en">{getBibleLanguageLabel("en")}</option>
          </select>
        </div>

        <div>
          <label className="block mb-3 text-[#777] text-xs font-bold tracking-widest uppercase">
            Versão
          </label>
          <select
            value={resolvedSelectedVersion}
            onChange={handleVersionChange}
            aria-label="Selecionar versão da Bíblia"
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-[#212121] shadow-sm outline-none transition-colors focus:border-[#ffa726]"
          >
            {versions.map((version) => (
              <option key={version.id} value={version.id}>
                {version.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
