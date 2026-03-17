import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import EbdLessonsGrid from "@/components/ebd/EbdLessonsGrid";
import {
  formatEbdDate,
  getClasseEbdInfo,
  getClassesEbd,
  getEbdSundayReferenceKey,
  getLicaoDaSemana,
  getProximaLicao,
  getTrimestreEditorialStatus,
  getTrimestrePublishedLessonCount,
  getTrimestre,
  getTrimestresPorClasse,
  isLicaoPublished,
  isTrimestreDraft,
  isClasseEbd,
} from "@/lib/ebd-utils";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{
    classe: string;
    edicao: string;
  }>;
};

export const revalidate = 3600;

function getQuarterStatusMeta(status: ReturnType<typeof getTrimestreEditorialStatus>) {
  if (status === "draft") {
    return {
      label: "Em preparação",
      badgeClassName: "border-black/10 bg-white text-[#666]",
      description:
        "Esta edição já está aberta no site e receberá as lições gradualmente conforme a curadoria e a revisão editorial forem concluídas.",
    };
  }

  if (status === "partial") {
    return {
      label: "Em publicação",
      badgeClassName: "border-[#ffa726]/25 bg-[#fff8ee] text-[#8b5b18]",
      description:
        "Este trimestre já começou a ser publicado e receberá novas lições e subsídios ao longo do período.",
    };
  }

  return {
    label: "Publicado",
    badgeClassName: "border-[#ef5350]/12 bg-[#fff3f2] text-[#b0453f]",
    description:
      "Este trimestre já está disponível para acompanhamento contínuo da classe e consulta das lições publicadas.",
  };
}

export async function generateStaticParams() {
  return getClassesEbd().flatMap((classe) =>
    getTrimestresPorClasse(classe.slug).map((trimestre) => ({
      classe: classe.slug,
      edicao: trimestre.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { classe, edicao } = await params;

  if (!isClasseEbd(classe)) {
    return {
      title: "Trimestre não encontrado | EBD",
    };
  }

  const trimestre = getTrimestre(classe, edicao);

  if (!trimestre) {
    return {
      title: "Trimestre não encontrado | EBD",
    };
  }

  const classeInfo = getClasseEbdInfo(classe);
  const isDraft = isTrimestreDraft(trimestre);

  const metadata = buildPageMetadata({
    title: `${trimestre.titulo} | EBD ${classeInfo.label}`,
    description: trimestre.descricao,
    path: `/ebd/${classe}/${trimestre.slug}`,
    image: trimestre.imagem,
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
  edicaoLabel,
}: {
  classe: string;
  classeLabel: string;
  edicaoLabel: string;
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
      <span className="font-medium text-[#212121]">{edicaoLabel}</span>
    </nav>
  );
}

export default async function EbdQuarterPage({ params }: PageProps) {
  const { classe, edicao } = await params;

  if (!isClasseEbd(classe)) {
    notFound();
  }

  const trimestre = getTrimestre(classe, edicao);

  if (!trimestre) {
    notFound();
  }

  const classeInfo = getClasseEbdInfo(classe);
  const statusMeta = getQuarterStatusMeta(getTrimestreEditorialStatus(trimestre));
  const publishedLessons = getTrimestrePublishedLessonCount(trimestre);
  const isDraft = isTrimestreDraft(trimestre);
  const licaoDaSemana = getLicaoDaSemana(classe);
  const proximaLicao = getProximaLicao(classe);
  const primeiraLicaoPublicada =
    trimestre.licoes.find((licao) => isLicaoPublished(licao)) ?? null;
  const licaoEmDestaque =
    licaoDaSemana?.trimestre.slug === trimestre.slug
      ? licaoDaSemana.licao
      : primeiraLicaoPublicada ?? trimestre.licoes[0] ?? null;
  const canonicalUrl = resolveSiteUrl(`/ebd/${classe}/${trimestre.slug}`);
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
        item: canonicalUrl,
      },
    ],
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${trimestre.titulo} | EBD ${classeInfo.label}`,
    description: trimestre.descricao,
    url: canonicalUrl,
    image: resolveSiteUrl(trimestre.imagem),
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: resolveSiteUrl("/"),
    },
    breadcrumb: {
      "@id": `${canonicalUrl}#breadcrumb`,
    },
    hasPart: trimestre.licoes.filter((licao) => isLicaoPublished(licao)).map((licao) => ({
      "@type": "Article",
      headline: `Lição ${licao.numero} | ${licao.titulo}`,
      url: resolveSiteUrl(`/ebd/${classe}/${trimestre.slug}/${licao.slug}`),
      datePublished: licao.data,
    })),
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

      <main className="min-h-screen bg-[#f5f5f5]">
        <HeroPage
          variant="full"
          label={`EBD ${classeInfo.label} · ${trimestre.rotulo}`}
          title={trimestre.titulo}
          description={trimestre.descricao}
          image={trimestre.imagem}
          imageAlt={trimestre.titulo}
        />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumb
            classe={classe}
            classeLabel={classeInfo.label}
            edicaoLabel={trimestre.rotulo}
          />

          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Visão geral do trimestre
              </p>
              <div
                className={`mb-4 inline-flex rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase ${statusMeta.badgeClassName}`}
              >
                {statusMeta.label}
              </div>
              <h1 className="mb-4 font-acme text-xl tracking-wide text-[#212121] md:text-4xl">
                {trimestre.titulo}
              </h1>
              {trimestre.subtitulo ? (
                <p className="mb-4 text-sm font-medium text-[#8b5b18]">
                  {trimestre.subtitulo}
                </p>
              ) : null}
              <div className="space-y-4 leading-relaxed text-[#555]">
                <p>{trimestre.descricao}</p>
                <p>
                  {statusMeta.description}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4">
                  <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                    Classe
                  </p>
                  <p className="font-acme text-xl md:text-3xl text-[#212121]">
                    {classeInfo.label}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4">
                  <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                    Lições publicadas
                  </p>
                  <p className="font-acme text-xl md:text-3xl text-[#212121]">
                    {publishedLessons}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4">
                  <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                    Horário
                  </p>
                  <p className="text-sm leading-relaxed text-[#212121]">
                    {classeInfo.horarioLabel}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link href={`/ebd/${classe}`} className="ui-btn-secondary">
                  Voltar para a classe
                </Link>
                <Link href="/programacao" className="ui-btn-ghost">
                  Ver programação da EBD
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm md:p-8">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                Em destaque
              </p>
              {licaoEmDestaque ? (
                <>
                  <h2 className="mb-3 font-acme text-xl md:text-3xl tracking-wide text-[#212121]">
                    {licaoEmDestaque.titulo}
                  </h2>
                  <p className="mb-2 text-sm font-medium text-[#8b5b18]">
                    Lição {licaoEmDestaque.numero} •{" "}
                    {formatEbdDate(licaoEmDestaque.data)}
                  </p>
                  <p className="mb-4 text-sm leading-relaxed text-[#555]">
                    {licaoEmDestaque.resumo}
                  </p>
                  <p className="mb-5 text-sm leading-relaxed text-[#555]">
                    {isDraft
                      ? "Este trimestre está visível no site para orientar a navegação anual da classe, mas o conteúdo das lições ainda está em preparação."
                      : licaoDaSemana?.trimestre.slug === trimestre.slug
                      ? "Esta é a lição que acompanha o domingo mais próximo da classe."
                      : "Esta edição está disponível para consulta e acompanhamento da classe."}
                  </p>
                  <Link
                    href={`/ebd/${classe}/${trimestre.slug}/${licaoEmDestaque.slug}`}
                    className="ui-btn-primary"
                  >
                    Abrir lição
                  </Link>
                  {proximaLicao && proximaLicao.trimestre.slug === trimestre.slug ? (
                    <p className="mt-4 text-sm text-[#555]">
                      Próxima lição:{" "}
                      <span className="font-semibold text-[#212121]">
                        {proximaLicao.licao.titulo}
                      </span>
                      .
                    </p>
                  ) : null}
                </>
              ) : (
                <p className="leading-relaxed text-[#555]">
                  Nenhuma lição em destaque foi encontrada para este trimestre.
                </p>
              )}
            </div>
          </div>

          <div className="mb-6 max-w-3xl">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Lições do trimestre
              </p>
              <h2 className="mb-4 font-acme text-xl tracking-wide text-[#212121] md:text-4xl">
                Acompanhe as 13 lições desta edição
              </h2>
              <p className="leading-relaxed text-[#555]">
              {isDraft
                ? "As lições deste trimestre já estão mapeadas no site. Os cards em preparação indicam o caminho da edição sem prometer conteúdo ainda não publicado."
                : "Os badges abaixo indicam a posição de cada lição em relação ao domingo de referência da semana: passada, esta semana ou próxima."}
              </p>
            </div>

          <EbdLessonsGrid
            classe={classe}
            edicao={trimestre.slug}
            licoes={trimestre.licoes}
            initialSundayReferenceKey={getEbdSundayReferenceKey()}
          />
        </div>
        </section>
      </main>
    </>
  );
}
