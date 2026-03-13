import Link from "next/link";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import BibleBookSelector from "@/components/biblia/BibleBookSelector";
import BibleChapterSelector from "@/components/biblia/BibleChapterSelector";
import BibleLastReadingTracker from "@/components/biblia/BibleLastReadingTracker";
import BibleReadingModeToggle from "@/components/biblia/BibleReadingModeToggle";
import BibleShareButton from "@/components/biblia/BibleShareButton";
import BibleShareVerseButton from "@/components/biblia/BibleShareVerseButton";
import BibleVerseAnchorHandler from "@/components/biblia/BibleVerseAnchorHandler";
import { getBibleBookBySlug } from "@/data/biblia-livros";
import { getBibleChapter } from "@/lib/bible-api";
import { getBibleChapterSeo } from "@/lib/bible-chapter-seo";
import { clampBibleChapter, createBiblePath } from "@/lib/bible-navigation";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

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
  const chapterSeo = getBibleChapterSeo(selectedBook, normalizedChapter);

  return buildPageMetadata({
    title: `${chapterSeo.chapterLabel} | Bíblia Online`,
    description: chapterSeo.metadataDescription,
    path: createBiblePath(selectedBook.slug, normalizedChapter),
    image: "/pulpito-da-igreja.jpg",
    keywords: chapterSeo.keywords,
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
  const chapterSeo = getBibleChapterSeo(selectedBook, selectedChapter);

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
  const canonicalPath = createBiblePath(selectedBook.slug, selectedChapter);
  const canonicalUrl = resolveSiteUrl(canonicalPath);
  const chapterReference = `${selectedBook.nome} ${selectedChapter}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: resolveSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Espiritualidade",
        item: resolveSiteUrl("/espiritualidade"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Bíblia Online",
        item: resolveSiteUrl("/espiritualidade/biblia"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: chapterSeo.chapterLabel,
        item: canonicalUrl,
      },
    ],
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${chapterSeo.chapterLabel} | Bíblia Online`,
    headline: chapterSeo.introTitle,
    description: chapterSeo.metadataDescription,
    url: canonicalUrl,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: resolveSiteUrl("/"),
    },
    about: {
      "@type": "Book",
      name: selectedBook.nome,
      inLanguage: "pt-BR",
    },
    breadcrumb: {
      "@id": `${canonicalUrl}#breadcrumb`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
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
          <BibleLastReadingTracker
            book={selectedBook.slug}
            chapter={selectedChapter}
          />
          <BibleVerseAnchorHandler />
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
              verseCount={chapterData?.versiculos.length ?? 0}
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
                    {chapterSeo.groupLabel}
                  </p>
                  <h1 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-3">
                    {chapterSeo.introTitle}
                  </h1>
                  <p className="text-sm text-[#555] leading-relaxed mb-3">
                    {chapterSeo.introText}
                  </p>
                  <p className="text-sm text-[#777] leading-relaxed">
                    Tradução utilizada: {chapterData?.traducao}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold tracking-widest uppercase text-[#777]">
                    <span className="rounded-full border border-black/10 bg-[#f9f9f9] px-3 py-2">
                      Idioma: Português
                    </span>
                    <span className="rounded-full border border-black/10 bg-[#f9f9f9] px-3 py-2">
                      Versão: Almeida
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <BibleReadingModeToggle targetId="bible-reading-container" />
                  <BibleShareButton
                    reference={chapterReference}
                    url={canonicalUrl}
                  />
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

              <div
                id="bible-reading-container"
                className="mx-auto max-w-[65ch] space-y-5 text-[1.05rem] leading-[1.85] text-[#4f4f4f] transition-all duration-200 data-[reading-mode=true]:max-w-[60ch] data-[reading-mode=true]:text-[1.12rem] data-[reading-mode=true]:leading-[1.95]"
              >
                {chapterData?.versiculos.map((verse) => (
                  <div
                    key={verse.numero}
                    id={`v${verse.numero}`}
                    className="group -mx-3 flex items-start gap-3 rounded-2xl px-3 py-2 scroll-mt-28 transition-colors duration-300 data-[verse-target=true]:bg-[#fff8ee] data-[verse-target=true]:ring-1 data-[verse-target=true]:ring-[#ffa726]/20"
                  >
                    <span className="mt-1 min-w-[28px] text-xs font-semibold text-[#ef5350]">
                      {verse.numero}
                    </span>
                    <p className="flex-1">
                      {verse.texto}
                    </p>
                    <BibleShareVerseButton
                      reference={`${selectedBook.nome} ${selectedChapter}:${verse.numero}`}
                      text={verse.texto}
                      url={`${canonicalUrl}#v${verse.numero}`}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-black/5 pt-6">
                <BibleShareButton
                  reference={chapterReference}
                  url={canonicalUrl}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
