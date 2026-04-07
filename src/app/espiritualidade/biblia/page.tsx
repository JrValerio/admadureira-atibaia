import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import BibleBookSelector from "@/components/biblia/BibleBookSelector";
import BibleChapterSelector from "@/components/biblia/BibleChapterSelector";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import { bibleBooks, getBibleBookById, getBibleBookBySlug } from "@/data/biblia-livros";
import { igrejaHeroMedia } from "@/data/igreja-media";
import {
  DEFAULT_BIBLE_LANGUAGE,
  DEFAULT_BIBLE_VERSION,
  getBibleLanguage,
  getBibleVersion,
} from "@/lib/bible-config";
import { clampBibleChapter, createBibleHref, createBiblePath } from "@/lib/bible-navigation";
import { buildPageMetadata } from "@/lib/site";

type PageProps = {
  searchParams: Promise<{
    livro?: string;
    capitulo?: string;
    lang?: string;
    version?: string;
  }>;
};

export const metadata: Metadata = buildPageMetadata({
  title: "Bíblia Online | AD Madureira Atibaia",
  description:
    "Leia a Bíblia por livro e capítulo, encontre referências conhecidas e continue sua leitura com clareza na área de espiritualidade da igreja.",
  path: "/espiritualidade/biblia",
  image: igrejaHeroMedia.biblia,
  keywords: [
    "bíblia online",
    "leitura bíblica",
    "bíblia por capítulo",
    "palavra de Deus",
  ],
});

const quickAccessBooks = [
  {
    label: "Começar por Gênesis",
    description: "Acompanhe o início da narrativa bíblica desde o primeiro capítulo.",
    href: createBiblePath("genesis", 1),
  },
  {
    label: "Ler Salmo 23",
    description: "Um texto conhecido para oração, consolo e confiança no Senhor.",
    href: createBiblePath("salmos", 23),
  },
  {
    label: "Ler João 3",
    description: "Uma porta de entrada importante para o Evangelho e a mensagem da salvação.",
    href: createBiblePath("joao", 3),
  },
  {
    label: "Ler Romanos 8",
    description: "Um capítulo marcante sobre vida no Espírito, esperança e segurança em Cristo.",
    href: createBiblePath("romanos", 8),
  },
];

export default async function BibliaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const defaultBook = getBibleBookBySlug("genesis") ?? bibleBooks[0];

  if (!defaultBook) {
    return null;
  }

  const queryBook =
    typeof params.livro === "string"
      ? getBibleBookBySlug(params.livro) ?? getBibleBookById(params.livro)
      : null;
  const hasDirectReference =
    typeof params.livro === "string" ||
    typeof params.capitulo === "string" ||
    typeof params.lang === "string" ||
    typeof params.version === "string";

  if (hasDirectReference) {
    const selectedBook = queryBook ?? defaultBook;
    const requestedChapter =
      typeof params.capitulo === "string"
        ? Number.parseInt(params.capitulo, 10)
        : 1;
    const selectedChapter = clampBibleChapter(selectedBook, requestedChapter);
    const selectedLanguage = getBibleLanguage(params.lang);
    const selectedVersion = getBibleVersion(selectedLanguage, params.version);

    redirect(
      createBibleHref(selectedBook.slug, selectedChapter, {
        language: selectedLanguage,
        version: selectedVersion,
      })
    );
  }

  return (
    <>
      <HeroPage
        variant="full"
        label="Palavra de Deus"
        title="Bíblia Online"
        description="Abra a Bíblia por livro e capítulo, encontre referências conhecidas e siga sua leitura com clareza na Palavra."
        image={igrejaHeroMedia.biblia}
        imageAlt="Púlpito da AD Madureira Atibaia"
        objectPosition="center 30%"
      />

      <section className="py-16 md:py-20">
        <div className="ui-page-container">
          <SpiritualBreadcrumb
            items={[
              { label: "Espiritualidade", href: "/espiritualidade" },
              { label: "Bíblia Online" },
            ]}
          />

          <div className="mb-8 grid grid-cols-1 gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Leitura organizada
              </p>
              <h2 className="mb-5 font-acme text-xl tracking-wide text-[#212121] md:text-4xl">
                Escolha um livro, abra um capítulo e siga com constância na Palavra
              </h2>
              <div className="space-y-4 leading-relaxed text-[#555]">
                <p>
                  Esta página reúne a entrada principal da Bíblia Online da AD Madureira
                  Atibaia, com acesso rápido aos livros, capítulos e referências mais
                  procuradas para leitura, meditação e estudo.
                </p>
                <p>
                  Você pode começar por um dos capítulos em destaque ou usar os
                  seletores abaixo para abrir a leitura desejada.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm md:p-8">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                Acesso rápido
              </p>
              <div className="space-y-3">
                {quickAccessBooks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-2xl border border-[#ffa726]/20 bg-white px-4 py-4 transition-colors hover:border-[#ffa726]/35"
                  >
                    <p className="font-semibold text-[#212121]">{item.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#666]">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <BibleBookSelector
              selectedBook={defaultBook}
              selectedChapter={1}
              selectedLanguage={DEFAULT_BIBLE_LANGUAGE}
              selectedVersion={DEFAULT_BIBLE_VERSION}
            />
            <BibleChapterSelector
              selectedBook={defaultBook}
              selectedChapter={1}
              verseCount={0}
              selectedLanguage={DEFAULT_BIBLE_LANGUAGE}
              selectedVersion={DEFAULT_BIBLE_VERSION}
            />
          </div>
        </div>
      </section>
    </>
  );
}
