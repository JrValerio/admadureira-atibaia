import Link from "next/link";
import {
  getBibleBooksByTestament,
  type BibleBook,
} from "@/data/biblia-livros";
import { createBiblePath } from "@/lib/bible-navigation";

type BibleBookSelectorProps = {
  selectedBook: BibleBook;
  selectedChapter: number;
};

function BookPill({
  book,
  selectedBook,
  selectedChapter,
}: {
  book: BibleBook;
  selectedBook: BibleBook;
  selectedChapter: number;
}) {
  const isActive = book.slug === selectedBook.slug;

  return (
    <Link
      href={createBiblePath(book.slug, Math.min(selectedChapter, book.capitulos))}
      className={`inline-flex rounded-full border px-4 py-2 text-sm transition-colors ${
        isActive
          ? "border-[#ffa726] bg-[#ffa726] text-[#212121]"
          : "border-black/10 bg-white text-[#555] hover:border-[#ffa726]/25 hover:bg-[#fff8ee]"
      }`}
    >
      {book.nome}
    </Link>
  );
}

export default function BibleBookSelector({
  selectedBook,
  selectedChapter,
}: BibleBookSelectorProps) {
  const oldTestamentBooks = getBibleBooksByTestament("Antigo Testamento");
  const newTestamentBooks = getBibleBooksByTestament("Novo Testamento");

  return (
    <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
      <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
        Livros da Bíblia
      </p>
      <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-6">
        Escolha um livro
      </h2>

      <div className="space-y-6">
        <div>
          <p className="text-[#777] text-xs font-bold tracking-widest uppercase mb-3">
            Antigo Testamento
          </p>
          <div className="flex flex-wrap gap-2">
            {oldTestamentBooks.map((book) => (
              <BookPill
                key={book.id}
                book={book}
                selectedBook={selectedBook}
                selectedChapter={selectedChapter}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-[#777] text-xs font-bold tracking-widest uppercase mb-3">
            Novo Testamento
          </p>
          <div className="flex flex-wrap gap-2">
            {newTestamentBooks.map((book) => (
              <BookPill
                key={book.id}
                book={book}
                selectedBook={selectedBook}
                selectedChapter={selectedChapter}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
