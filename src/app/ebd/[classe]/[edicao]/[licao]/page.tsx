import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import BibleReferenceText from "@/components/biblia/BibleReferenceText";
import EbdLessonAuxiliarySections from "@/components/ebd/EbdLessonAuxiliarySections";
import EbdLessonOverviewBlocks from "@/components/ebd/EbdLessonOverviewBlocks";
import { EbdSupportList } from "@/components/ebd/EbdLessonSupportUi";
import EbdTeacherSubsidy from "@/components/ebd/EbdTeacherSubsidy";
import {
  formatEbdDate,
  getEstadoProgressaoLicao,
  getClasseEbdInfo,
  getClassesEbd,
  getLicaoAdjacenteNoTrimestre,
  getLicaoAnterior,
  getLicaoDaSemana,
  getLicao,
  getMetaEstadoProgressaoLicao,
  getPosicaoDaLicaoNoTrimestre,
  getLicaoProximaNoTrimestre,
  getTrimestre,
  getTrimestresPorClasse,
  isLicaoPublished,
  isLicaoPubliclyAvailable,
  isClasseEbd,
} from "@/lib/ebd-utils";
import { getLessonStructure } from "@/lib/ebd-lesson-structure";
import { getEbdPrintRoute } from "@/lib/ebd-print";
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
  const isPubliclyAvailable = isLicaoPubliclyAvailable(
    lessonContext.trimestre,
    lessonContext.licao
  );

  const metadata = buildPageMetadata({
    title: `Lição ${lessonContext.licao.numero} | ${lessonContext.licao.titulo}`,
    description: lessonContext.licao.resumo,
    path: `/ebd/${classe}/${edicao}/${licao}`,
    image: pageImage,
  });

  return !isPubliclyAvailable
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
  const isPubliclyAvailable = isLicaoPubliclyAvailable(
    lessonContext.trimestre,
    lessonContext.licao
  );
  const lessonTopId = "topo-da-licao";
  const summaryPrintHref = getEbdPrintRoute(classe, trimestre.slug, licao, "pdf-resumo");
  const fullPrintHref = getEbdPrintRoute(classe, trimestre.slug, licao, "pdf-completo");
  const licaoAnterior = getLicaoAnterior(classe, edicao, licao);
  const proximaLicao = getLicaoProximaNoTrimestre(classe, edicao, licao);
  const licaoAnteriorNaTrilha = getLicaoAdjacenteNoTrimestre(
    classe,
    edicao,
    licao,
    "previous"
  );
  const proximaLicaoNaTrilha = getLicaoAdjacenteNoTrimestre(
    classe,
    edicao,
    licao,
    "next"
  );
  const licaoDaSemana = getLicaoDaSemana(classe);
  const posicaoDaLicao = getPosicaoDaLicaoNoTrimestre(trimestre, licao);
  const estadoProgressao = getEstadoProgressaoLicao(
    trimestre,
    lessonContext.licao
  );
  const metaEstadoProgressao = getMetaEstadoProgressaoLicao(estadoProgressao);
  const licaoDaSemanaAtual =
    licaoDaSemana?.trimestre.slug === trimestre.slug &&
    licaoDaSemana.licao.slug === lessonContext.licao.slug;
  const lessonStructure = getLessonStructure(
    classeInfo,
    trimestre,
    lessonContext.licao
  );
  const lessonPrimaryReading = lessonStructure
    ? lessonStructure.tipo === "adultos"
      ? lessonStructure.leituraBiblicaEmClasse
      : lessonStructure.textoBiblico
    : [];
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
                      <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4 md:col-span-2">
                        <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                          Trilha do trimestre
                        </p>
                        <p className="text-sm text-[#212121]">
                          Lição {lessonContext.licao.numero} de {trimestre.licoes.length} ·{" "}
                          {metaEstadoProgressao.label}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 md:p-8">
                      <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                        Em breve
                      </p>
                      <p className="leading-relaxed text-[#555]">
                        Esta lição ainda está em preparação. Em breve, esta
                        página receberá o conteúdo completo para estudo,
                        leitura bíblica e apoio à classe.
                      </p>
                    </div>

                    {lessonPrimaryReading.length ? (
                      <div className="mt-8">
                        <p className="mb-4 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                          {classeInfo.leituraPrincipalLabel}
                        </p>
                        <EbdSupportList items={lessonPrimaryReading} />
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
                      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
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
                          <p className="mt-3 text-xs leading-relaxed text-[#555]">
                            {classeInfo.horarioLabel}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4">
                          <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                            Trilha
                          </p>
                          <p className="text-sm text-[#212121]">
                            Lição {posicaoDaLicao ?? lessonContext.licao.numero} de{" "}
                            {trimestre.licoes.length}
                          </p>
                          <div
                            className={`mt-3 inline-flex rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase ${metaEstadoProgressao.badgeClassName}`}
                          >
                            {metaEstadoProgressao.label}
                          </div>
                          {licaoDaSemanaAtual ? (
                            <p className="mt-3 text-xs font-semibold tracking-widest uppercase text-[#ef5350]">
                              Lição da semana
                            </p>
                          ) : null}
                        </div>
                      </div>

                    {lessonStructure ? (
                      <EbdLessonOverviewBlocks
                        classeInfo={classeInfo}
                        structure={lessonStructure}
                      />
                    ) : null}

                    <section className="mt-10 space-y-6">
                      <div className="max-w-3xl">
                        <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                          Desenvolvimento
                        </p>
                        <h2 className="mb-3 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                          Tópicos da lição
                        </h2>
                        <p className="leading-relaxed text-[#555]">
                          A lição foi organizada em tópicos para facilitar o
                          estudo e a compreensão do conteúdo.
                        </p>
                      </div>

                      <div className="space-y-6">
                        {lessonContext.licao.topicos.map((topico) => (
                          <section
                            key={topico.titulo}
                            className="rounded-3xl border border-black/5 bg-[#fafafa] p-5"
                          >
                            <h3 className="mb-3 font-acme text-2xl tracking-wide text-[#212121]">
                              {topico.titulo}
                            </h3>
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
                    </section>
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

              <EbdLessonAuxiliarySections
                classe={classe}
                classeInfo={classeInfo}
                trimestre={trimestre}
                licao={lessonContext.licao}
                posicaoDaLicao={posicaoDaLicao}
                metaEstadoProgressao={metaEstadoProgressao}
                licaoDaSemanaAtual={licaoDaSemanaAtual}
                licaoAnterior={licaoAnterior}
                proximaLicao={proximaLicao}
                licaoAnteriorNaTrilha={licaoAnteriorNaTrilha}
                proximaLicaoNaTrilha={proximaLicaoNaTrilha}
                isDraft={isDraft}
                isPubliclyAvailable={isPubliclyAvailable}
                summaryPrintHref={summaryPrintHref}
                fullPrintHref={fullPrintHref}
              />
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
                    ← Lição {licaoAnterior.numero}
                  </Link>
                ) : null}
                {proximaLicao ? (
                  <Link
                    href={`/ebd/${classe}/${trimestre.slug}/${proximaLicao.slug}`}
                    className="transition-colors hover:text-[#8b1e1e]"
                  >
                    Lição {proximaLicao.numero} →
                  </Link>
                ) : proximaLicaoNaTrilha ? (
                  <span className="text-[#555]">
                    Próxima na trilha: Lição {proximaLicaoNaTrilha.numero} (
                    {getMetaEstadoProgressaoLicao(
                      getEstadoProgressaoLicao(trimestre, proximaLicaoNaTrilha)
                    ).label.toLowerCase()}
                    )
                  </span>
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
