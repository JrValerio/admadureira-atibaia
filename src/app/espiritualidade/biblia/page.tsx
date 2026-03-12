import { redirect } from "next/navigation";
import {
  bibleBooks,
  getBibleBookById,
  getBibleBookBySlug,
} from "@/data/biblia-livros";
import { clampBibleChapter, createBiblePath } from "@/lib/bible-navigation";

type PageProps = {
  searchParams: Promise<{
    livro?: string;
    capitulo?: string;
  }>;
};

function parseChapter(value?: string) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 3;
  }

  return parsed;
}

export default async function BibliaRedirectPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const fallbackBook = getBibleBookBySlug("joao") ?? bibleBooks[0];
  const selectedBook =
    (typeof params.livro === "string" &&
      (getBibleBookBySlug(params.livro) || getBibleBookById(params.livro))) ||
    fallbackBook;
  const selectedChapter = clampBibleChapter(
    selectedBook,
    parseChapter(typeof params.capitulo === "string" ? params.capitulo : "3")
  );

  redirect(createBiblePath(selectedBook.slug, selectedChapter));
}
