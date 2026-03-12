import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import {
  bibleBooks,
  getBibleBookById,
  getBibleBooksByTestament,
} from "@/data/biblia-livros";
import { getBibleChapter } from "@/lib/bible-api";
import { buildPageMetadata } from "@/lib/site";

type PageProps = {
  searchParams: Promise<{
    livro?: string;
    capitulo?: string;
  }>;
};

export const revalidate = 86400;

export const metadata = buildPageMetadata({
  title: "Bíblia Online | AD Madureira Atibaia",
  description:
    "Leia capítulos completos da Bíblia Online em português, com seleção de livro e capítulo na área de espiritualidade da AD Madureira Atibaia.",
  path: "/espiritualidade/biblia",
  image: "/pulpito-da-igreja.jpg",
  keywords: ["bíblia online", "leitura bíblica", "joão ferreira de almeida"],
});

function normalizeChapter(value?: string) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 3;
  }

  return Math.min(Math.floor(parsed), 150);
}

function createBibleHref(bookId: string, chapter: number) {
  return `/espiritualidade/biblia?livro=${bookId}&capitulo=${chapter}`;
}

export default async function BibliaOnlinePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedBookId = typeof params.livro === "string" ? params.livro : "JHN";
  const selectedBook =
    getBibleBookById(selectedBookId) ?? getBibleBookById("JHN") ?? bibleBooks[0];
  const selectedChapter = normalizeChapter(
    typeof params.capitulo === "string" ? params.capitulo : "3"
  );

  let chapterData: Awaited<ReturnType<typeof getBibleChapter>> | null = null;
  let errorMessage = "";

  try {
    chapterData = await getBibleChapter(selectedBook.id, selectedChapter);
  } catch {
    errorMessage =
      "Não foi possível carregar este capítulo agora. Tente novamente em instantes ou escolha outra referência.";
  }

  const oldTestamentBooks = getBibleBooksByTestament("Antigo Testamento");
  const newTestamentBooks = getBibleBooksByTestament("Novo Testamento");

  return (
    <>
      <HeroPage
        variant="full"
        label="Palavra de Deus"
        title="Bíblia Online"
        description="Leia a Bíblia por livro e capítulo na tradução João Ferreira de Almeida e mantenha a Palavra sempre ao alcance."
        image="/pulpito-da-igreja.jpg"
        imageAlt="Púlpito da AD Madureira Atibaia"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <SpiritualBreadcrumb
            items={[
              { label: "Espiritualidade", href: "/espiritualidade" },
              { label: "Bíblia Online" },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 mb-10">
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Leitura bíblica
              </p>
              <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-5">
                Escolha um livro e continue sua leitura
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-[1fr_140px_auto] gap-4">
                <label className="space-y-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#777]">
                    Livro
                  </span>
                  <select
                    name="livro"
                    defaultValue={selectedBook.id}
                    className="w-full rounded-2xl border border-black/10 bg-[#f9f9f9] px-4 py-3 text-[#212121] outline-none focus:border-[#ffa726]"
                  >
                    <optgroup label="Antigo Testamento">
                      {oldTestamentBooks.map((book) => (
                        <option key={book.id} value={book.id}>
                          {book.nome}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Novo Testamento">
                      {newTestamentBooks.map((book) => (
                        <option key={book.id} value={book.id}>
                          {book.nome}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#777]">
                    Capítulo
                  </span>
                  <input
                    type="number"
                    name="capitulo"
                    min={1}
                    max={150}
                    defaultValue={selectedChapter}
                    className="w-full rounded-2xl border border-black/10 bg-[#f9f9f9] px-4 py-3 text-[#212121] outline-none focus:border-[#ffa726]"
                  />
                </label>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
                  >
                    Ler capítulo
                  </button>
                </div>
              </form>
            </div>

            <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 shadow-sm">
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                Referência atual
              </p>
              <p className="font-acme text-3xl text-[#212121] tracking-wide mb-3">
                {selectedBook.nome} {selectedChapter}
              </p>
              <p className="text-sm text-[#555] leading-relaxed">
                Tradução utilizada: João Ferreira de Almeida, disponível em
                domínio público.
              </p>
            </div>
          </div>

          {errorMessage ? (
            <div className="rounded-3xl bg-white border border-red-200 p-6 md:p-8 text-[#6a3f3f] shadow-sm">
              {errorMessage}
            </div>
          ) : (
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                    Capítulo carregado
                  </p>
                  <h1 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide">
                    {chapterData?.livro} {chapterData?.capitulo}
                  </h1>
                </div>
                <div className="flex flex-wrap gap-3">
                  {selectedChapter > 1 && (
                    <Link
                      href={createBibleHref(selectedBook.id, selectedChapter - 1)}
                      className="inline-flex items-center justify-center rounded-full border border-[#212121] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#212121] hover:text-white"
                    >
                      Capítulo anterior
                    </Link>
                  )}
                  <Link
                    href={createBibleHref(selectedBook.id, selectedChapter + 1)}
                    className="inline-flex items-center justify-center rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
                  >
                    Próximo capítulo
                  </Link>
                </div>
              </div>

              <div className="space-y-5">
                {chapterData?.versiculos.map((verse) => (
                  <p key={verse.numero} className="text-[#4f4f4f] leading-relaxed">
                    <span className="mr-3 font-semibold text-[#ef5350]">
                      {verse.numero}
                    </span>
                    {verse.texto}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
