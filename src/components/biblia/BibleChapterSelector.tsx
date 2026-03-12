import Link from "next/link";
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
        {selectedBook.capitulos > 1 ? "s" : ""} disponíveis.
      </p>

      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-6 gap-2">
        {Array.from({ length: selectedBook.capitulos }, (_, index) => {
          const chapter = index + 1;
          const isActive = chapter === selectedChapter;

          return (
            <Link
              key={chapter}
              href={createBiblePath(selectedBook.slug, chapter)}
              className={`inline-flex items-center justify-center rounded-xl border px-3 py-3 text-sm transition-colors ${
                isActive
                  ? "border-[#ffa726] bg-[#ffa726] text-[#212121]"
                  : "border-black/10 bg-white text-[#555] hover:border-[#ffa726]/25 hover:bg-white"
              }`}
            >
              {chapter}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
