import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import BibleReferenceText from "@/components/biblia/BibleReferenceText";
import EbdTeacherSubsidy from "@/components/ebd/EbdTeacherSubsidy";
import {
  formatEbdDate,
  getClasseEbdInfo,
  getClassesEbd,
  getLicaoAnterior,
  getLicao,
  getTrimestre,
  getTrimestresPorClasse,
  isLicaoPublished,
  isClasseEbd,
} from "@/lib/ebd-utils";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{
    classe: string;
    edicao: string;
    licao: string;
  }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  return getClassesEbd().flatMap((classe) =>
    getTrimestresPorClasse(classe.slug).flatMap((trimestre) =>
      trimestre.licoes.map((licao) => ({
        classe: classe.slug,
        edicao: trimestre.slug,
        licao: licao.slug,
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { classe, edicao, licao } = await params;

  if (!isClasseEbd(classe)) {
    return {
      title: "Lição não encontrada | EBD",
    };
  }

  const lessonContext = getLicao(classe, edicao, licao);

  if (!lessonContext) {
    return {
      title: "Lição não encontrada | EBD",
    };
  }

  const pageImage = lessonContext.licao.imagem ?? lessonContext.trimestre.imagem;
  const isDraft = !isLicaoPublished(lessonContext.licao);

  const metadata = buildPageMetadata({
    title: `Lição ${lessonContext.licao.numero} | ${lessonContext.licao.titulo}`,
    description: lessonContext.licao.resumo,
    path: `/ebd/${classe}/${edicao}/${licao}`,
    image: pageImage,
  });

  return isDraft
    ? {
        ...metadata,
        robots: {
          index: false,
          follow: true,
        },
      }
    : metadata;
}

function Breadcrumb({
  classe,
  classeLabel,
  edicao,
  edicaoLabel,
  licaoLabel,
}: {
  classe: string;
  classeLabel: string;
  edicao: string;
  edicaoLabel: string;
  licaoLabel: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#777]"
    >
      <Link href="/" className="transition-colors hover:text-[#212121]">
        Início
      </Link>
      <span>›</span>
      <Link href="/ebd" className="transition-colors hover:text-[#212121]">
        EBD
      </Link>
      <span>›</span>
      <Link
        href={`/ebd/${classe}`}
        className="transition-colors hover:text-[#212121]"
      >
        {classeLabel}
      </Link>
      <span>›</span>
      <Link
        href={`/ebd/${classe}/${edicao}`}
        className="transition-colors hover:text-[#212121]"
      >
        {edicaoLabel}
      </Link>
      <span>›</span>
      <span className="font-medium text-[#212121]">{licaoLabel}</span>
    </nav>
  );
}

export default async function EbdLessonPage({ params }: PageProps) {
  const { classe, edicao, licao } = await params;

  if (!isClasseEbd(classe)) {
    notFound();
  }

  const lessonContext = getLicao(classe, edicao, licao);
  const trimestre = getTrimestre(classe, edicao);

  if (!lessonContext || !trimestre) {
    notFound();
  }

  const classeInfo = getClasseEbdInfo(classe);
  const lessonImage = lessonContext.licao.imagem ?? null;
  const pageImage = lessonContext.licao.imagem ?? trimestre.imagem;
  const isDraft = !isLicaoPublished(lessonContext.licao);
  const lessonTopId = "topo-da-licao";
  const currentIndex = trimestre.licoes.findIndex((item) => item.slug === licao);
  const licaoAnterior = getLicaoAnterior(classe, edicao, licao);
  const proximaLicao =
    currentIndex >= 0 && currentIndex < trimestre.licoes.length - 1
      ? trimestre.licoes[currentIndex + 1]
      : null;
  const canonicalUrl = resolveSiteUrl(`/ebd/${classe}/${trimestre.slug}/${licao}`);
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
        name: "EBD",
        item: resolveSiteUrl("/ebd"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: classeInfo.label,
        item: resolveSiteUrl(`/ebd/${classe}`),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: trimestre.rotulo,
        item: resolveSiteUrl(`/ebd/${classe}/${trimestre.slug}`),
      },
      {
        "@type": "ListItem",
        position: 5,
        name: `Lição ${lessonContext.licao.numero}`,
        item: canonicalUrl,
      },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Lição ${lessonContext.licao.numero} | ${lessonContext.licao.titulo}`,
    description: lessonContext.licao.resumo,
    url: canonicalUrl,
    image: resolveSiteUrl(pageImage),
    datePublished: lessonContext.licao.data,
    inLanguage: "pt-BR",
    articleSection: `EBD ${classeInfo.label}`,
    isPartOf: {
      "@type": "CollectionPage",
      name: `${trimestre.titulo} | EBD ${classeInfo.label}`,
      url: resolveSiteUrl(`/ebd/${classe}/${trimestre.slug}`),
    },
    author: trimestre.comentarista
      ? {
          "@type": "Person",
          name: trimestre.comentarista,
        }
      : {
          "@type": "Organization",
          name: SITE_NAME,
        },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: resolveSiteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: resolveSiteUrl("/logo.jpg"),
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-[#f5f5f5]">
        <HeroPage
          variant="full"
          label={`EBD ${classeInfo.label} · ${trimestre.rotulo}`}
          title={`Lição ${lessonContext.licao.numero} · ${lessonContext.licao.titulo}`}
          description={lessonContext.licao.resumo}
          image={trimestre.imagem}
          imageAlt={lessonContext.licao.titulo}
        />

      <section className="py-16 md:py-20">
        <div id={lessonTopId} className="mx-auto max-w-6xl px-4 scroll-mt-28">
          <Breadcrumb
            classe={classe}
            classeLabel={classeInfo.label}
            edicao={edicao}
            edicaoLabel={trimestre.rotulo}
            licaoLabel={`Lição ${lessonContext.licao.numero}`}
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
            <article className="space-y-6">
              {isDraft ? (
                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
                  <div className="mb-6 inline-flex rounded-full border border-black/10 bg-[#fafafa] px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase text-[#666]">
                    Conteúdo em preparação
                  </div>
                  <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4">
                      <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                        Data
                      </p>
                      <p className="text-sm text-[#212121]">
                        {formatEbdDate(lessonContext.licao.data)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4">
                      <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                        Classe
                      </p>
                      <p className="text-sm text-[#212121]">{classeInfo.label}</p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 md:p-8">
                    <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                      Publicação gradual
                    </p>
                    <p className="leading-relaxed text-[#555]">
                      Esta lição já está mapeada na edição para orientar a navegação
                      anual da EBD, mas o conteúdo completo ainda está em
                      preparação. Quando a curadoria editorial for concluída,
                      esta página receberá resumo, leitura bíblica, apoio ao
                      professor e revisão final.
                    </p>
                  </div>

                  {lessonContext.licao.leituraBiblica.length ? (
                    <div className="mt-8">
                      <p className="mb-4 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                        {classeInfo.leituraPrincipalLabel}
                      </p>
                      <ul className="space-y-3 text-[#555] leading-relaxed">
                        {lessonContext.licao.leituraBiblica.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                            <span>
                              <BibleReferenceText text={item} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : (
                <>
                  {lessonImage ? (
                    <div className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm md:p-5">
                      <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-[#fafafa]">
                        <Image
                          src={lessonImage}
                          alt={`Arte da lição ${lessonContext.licao.numero} — ${lessonContext.licao.titulo}`}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 420px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4">
                        <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                          Data
                        </p>
                        <p className="text-sm text-[#212121]">
                          {formatEbdDate(lessonContext.licao.data)}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4">
                        <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                          {classeInfo.textoBaseLabel}
                        </p>
                        <p className="text-sm text-[#212121]">
                          <BibleReferenceText
                            text={lessonContext.licao.textoChave ?? "A confirmar"}
                            linkClassName="font-medium text-[#212121] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
                          />
                        </p>
                      </div>
                    </div>

                    {lessonContext.licao.verdadePratica ? (
                      <div className="mb-8 rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 md:p-8">
                        <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                          {classeInfo.resumoDestaqueLabel}
                        </p>
                        <p className="leading-relaxed text-[#555]">
                          <BibleReferenceText text={lessonContext.licao.verdadePratica} />
                        </p>
                      </div>
                    ) : null}

                    <div className="mb-8">
                      <p className="mb-4 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                        {classeInfo.leituraPrincipalLabel}
                      </p>
                      <ul className="space-y-3 text-[#555] leading-relaxed">
                        {lessonContext.licao.leituraBiblica.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                            <span>
                              <BibleReferenceText text={item} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <p className="mb-4 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                        Objetivos da lição
                      </p>
                      <ul className="space-y-3 text-[#555] leading-relaxed">
                        {lessonContext.licao.objetivos.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                            <span>
                              <BibleReferenceText text={item} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      {lessonContext.licao.topicos.map((topico) => (
                        <section
                          key={topico.titulo}
                          className="rounded-3xl border border-black/5 bg-[#fafafa] p-5"
                        >
                          <h2 className="mb-3 font-acme text-2xl tracking-wide text-[#212121]">
                            {topico.titulo}
                          </h2>
                          <ul className="space-y-3 text-[#555] leading-relaxed">
                            {topico.conteudo.map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ffa726]" />
                                <span>
                                  <BibleReferenceText text={item} />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm md:p-8">
                    <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                      Aplicação prática
                    </p>
                    <p className="leading-relaxed text-[#555]">
                      <BibleReferenceText text={lessonContext.licao.aplicacao} />
                    </p>
                  </div>

                  <EbdTeacherSubsidy
                    classe={classe}
                    licao={lessonContext.licao}
                  />
                </>
              )}
            </article>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Contexto da edição
                </p>
                <h2 className="mb-3 font-acme text-3xl tracking-wide text-[#212121]">
                  {trimestre.titulo}
                </h2>
                <div className="space-y-3 text-sm leading-relaxed text-[#555]">
                  <p>{trimestre.rotulo}</p>
                  <p>{classeInfo.horarioLabel}</p>
                  <p>
                    <BibleReferenceText
                      text={trimestre.versiculoBase ?? "Versículo-base a confirmar"}
                      linkClassName="font-medium text-[#555] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
                    />
                  </p>
                </div>
                <Link
                  href={`/ebd/${classe}/${trimestre.slug}`}
                  className="ui-btn-secondary mt-6"
                >
                  Voltar ao trimestre
                </Link>
              </div>

              {lessonContext.licao.apoioProfessor?.length ? (
                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                    Apoio ao professor
                  </p>
                  <ul className="space-y-3 text-sm leading-relaxed text-[#555]">
                    {lessonContext.licao.apoioProfessor.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                        <span>
                          <BibleReferenceText text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {lessonContext.licao.apoioAluno?.length ? (
                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                    Apoio ao aluno
                  </p>
                  <ul className="space-y-3 text-sm leading-relaxed text-[#555]">
                    {lessonContext.licao.apoioAluno.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                        <span>
                          <BibleReferenceText text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {lessonContext.licao.esboco?.length ? (
                <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm">
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                    Esboço da aula
                  </p>
                  <div className="space-y-4">
                    {lessonContext.licao.esboco.map((item) => (
                      <div
                        key={`${item.titulo ?? "esboco"}-${item.conteudo}`}
                        className="rounded-2xl border border-white/70 bg-white/85 p-4"
                      >
                        {item.titulo ? (
                          <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                            {item.titulo}
                          </p>
                        ) : null}
                        <p className="text-sm leading-relaxed text-[#555]">
                          <BibleReferenceText text={item.conteudo} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="rounded-3xl bg-[#212121] p-6 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Continue estudando
                </p>
                <div className="space-y-3 text-sm leading-relaxed text-white/80">
                  {licaoAnterior ? (
                    <Link
                      href={`/ebd/${classe}/${trimestre.slug}/${licaoAnterior.slug}`}
                      className="block transition-colors hover:text-white"
                    >
                      ← Lição anterior
                    </Link>
                  ) : null}
                  {proximaLicao ? (
                    <Link
                      href={`/ebd/${classe}/${trimestre.slug}/${proximaLicao.slug}`}
                      className="block transition-colors hover:text-white"
                    >
                      Próxima lição →
                    </Link>
                  ) : null}
                  <Link
                    href="/programacao"
                    className="block transition-colors hover:text-white"
                  >
                    Ver EBD na programação da igreja
                  </Link>
                  <Link
                    href="/contato"
                    className="block transition-colors hover:text-white"
                  >
                    Falar com a igreja
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-10 border-t border-black/5 pt-6">
            <nav
              aria-label="Navegação da lição"
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-semibold tracking-[0.04em] text-[#212121] md:justify-start"
            >
              {licaoAnterior ? (
                <Link
                  href={`/ebd/${classe}/${trimestre.slug}/${licaoAnterior.slug}`}
                  className="transition-colors hover:text-[#8b1e1e]"
                >
                  ← Lição anterior
                </Link>
              ) : null}
              {proximaLicao ? (
                <Link
                  href={`/ebd/${classe}/${trimestre.slug}/${proximaLicao.slug}`}
                  className="transition-colors hover:text-[#8b1e1e]"
                >
                  Próxima lição →
                </Link>
              ) : null}
              <Link
                href={`/ebd/${classe}/${trimestre.slug}`}
                className="transition-colors hover:text-[#8b1e1e]"
              >
                Voltar ao trimestre
              </Link>
              <Link
                href="/programacao"
                className="transition-colors hover:text-[#8b1e1e]"
              >
                Ver EBD na programação
              </Link>
              <Link
                href={`#${lessonTopId}`}
                className="transition-colors hover:text-[#8b1e1e]"
              >
                Voltar ao topo
              </Link>
            </nav>
          </div>
        </div>
        </section>
      </main>
    </>
  );
}
