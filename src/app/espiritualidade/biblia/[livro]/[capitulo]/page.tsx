import Link from "next/link";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import BibleBookSelector from "@/components/biblia/BibleBookSelector";
import BibleChapterSelector from "@/components/biblia/BibleChapterSelector";
import { getBibleBookBySlug } from "@/data/biblia-livros";
import { getBibleChapter } from "@/lib/bible-api";
import { clampBibleChapter, createBiblePath } from "@/lib/bible-navigation";
import { buildPageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{
    livro: string;
    capitulo: string;
  }>;
};

export const revalidate = 86400;

function parseChapter(value: string) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}

export async function generateMetadata({ params }: PageProps) {
  const { livro, capitulo } = await params;
  const selectedBook = getBibleBookBySlug(livro);

  if (!selectedBook) {
    return buildPageMetadata({
      title: "Bíblia Online | AD Madureira Atibaia",
      description:
        "Leia capítulos completos da Bíblia Online em português na área de espiritualidade da AD Madureira Atibaia.",
      path: "/espiritualidade/biblia",
      image: "/pulpito-da-igreja.jpg",
    });
  }

  const chapterNumber = parseChapter(capitulo);
  const normalizedChapter =
    chapterNumber === null
      ? 1
      : clampBibleChapter(selectedBook, chapterNumber);

  return buildPageMetadata({
    title: `${selectedBook.nome} ${normalizedChapter} | Bíblia Online`,
    description: `Leia ${selectedBook.nome} ${normalizedChapter} na tradução João Ferreira de Almeida.`,
    path: createBiblePath(selectedBook.slug, normalizedChapter),
    image: "/pulpito-da-igreja.jpg",
    keywords: [
      "bíblia online",
      selectedBook.nome.toLowerCase(),
      `${selectedBook.nome.toLowerCase()} ${normalizedChapter}`,
      "joão ferreira de almeida",
    ],
  });
}

export default async function BibliaChapterPage({ params }: PageProps) {
  const { livro, capitulo } = await params;
  const selectedBook = getBibleBookBySlug(livro);

  if (!selectedBook) {
    notFound();
  }

  const parsedChapter = parseChapter(capitulo);

  if (parsedChapter === null) {
    notFound();
  }

  const selectedChapter = clampBibleChapter(selectedBook, parsedChapter);

  if (selectedChapter !== parsedChapter) {
    notFound();
  }

  let chapterData: Awaited<ReturnType<typeof getBibleChapter>> | null = null;
  let errorMessage = "";

  try {
    chapterData = await getBibleChapter(selectedBook.id, selectedChapter);
  } catch {
    errorMessage =
      "Não foi possível carregar este capítulo agora. Tente novamente em instantes ou escolha outra referência.";
  }

  const previousChapter =
    selectedChapter > 1
      ? createBiblePath(selectedBook.slug, selectedChapter - 1)
      : null;
  const nextChapter =
    selectedChapter < selectedBook.capitulos
      ? createBiblePath(selectedBook.slug, selectedChapter + 1)
      : null;

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
        <div className="max-w-6xl mx-auto px-4">
          <SpiritualBreadcrumb
            items={[
              { label: "Espiritualidade", href: "/espiritualidade" },
              { label: "Bíblia Online", href: "/espiritualidade/biblia" },
              { label: `${selectedBook.nome} ${selectedChapter}` },
            ]}
          />

          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8 mb-8">
            <BibleBookSelector
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
            />
            <BibleChapterSelector
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
            />
          </div>

          {errorMessage ? (
            <div className="rounded-3xl bg-white border border-red-200 p-6 md:p-8 text-[#6a3f3f] shadow-sm">
              {errorMessage}
            </div>
          ) : (
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start mb-8">
                <div>
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                    Capítulo carregado
                  </p>
                  <h1 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-3">
                    {chapterData?.livro} {chapterData?.capitulo}
                  </h1>
                  <p className="text-sm text-[#777] leading-relaxed">
                    Tradução utilizada: {chapterData?.traducao}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {previousChapter && (
                    <Link
                      href={previousChapter}
                      className="inline-flex items-center justify-center rounded-full border border-[#212121] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#212121] hover:text-white"
                    >
                      Capítulo anterior
                    </Link>
                  )}
                  {nextChapter && (
                    <Link
                      href={nextChapter}
                      className="inline-flex items-center justify-center rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
                    >
                      Próximo capítulo
                    </Link>
                  )}
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
