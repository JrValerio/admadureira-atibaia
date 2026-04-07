import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import BibleReferenceText from "@/components/biblia/BibleReferenceText";
import EbdBreadcrumb from "@/components/ebd/EbdBreadcrumb";
import CardMedia from "@/components/media/CardMedia";
import { igrejaHeroMedia } from "@/data/igreja-media";
import {
  formatEbdDate,
  getClassesEbd,
  getClasseEbdInfo,
  getLicaoDaSemana,
  getProximaLicao,
  getTrimestreAtual,
  getTrimestreEditorialStatus,
  getTrimestrePublicLessonCount,
  getTrimestresEbdPublicos,
  hasClasseEbdPublicada,
  isClasseEbd,
} from "@/lib/ebd-utils";
import { getQuarterStatusMeta } from "@/lib/ebd-ui";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{
    classe: string;
  }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  return getClassesEbd().map((classe) => ({
    classe: classe.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { classe } = await params;

  if (!isClasseEbd(classe)) {
    return {
      title: "Classe não encontrada | EBD",
    };
  }

  const classeInfo = getClasseEbdInfo(classe);
  const metadata = buildPageMetadata({
    title: `EBD ${classeInfo.label} | AD Madureira Atibaia`,
    description: classeInfo.descricao,
    path: `/ebd/${classeInfo.slug}`,
    image: igrejaHeroMedia.ebd,
  });

  return hasClasseEbdPublicada(classe)
    ? metadata
    : {
        ...metadata,
        robots: {
          index: false,
          follow: true,
        },
      };
}

export default async function EbdClassPage({ params }: PageProps) {
  const { classe } = await params;

  if (!isClasseEbd(classe)) {
    notFound();
  }

  const classeInfo = getClasseEbdInfo(classe);
  const trimestres = getTrimestresEbdPublicos(classe);
  const licaoDaSemana = getLicaoDaSemana(classe);
  const proximaLicao = getProximaLicao(classe);
  const trimestreAtual = getTrimestreAtual(classe);
  const canonicalUrl = resolveSiteUrl(`/ebd/${classe}`);
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
        item: canonicalUrl,
      },
    ],
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `EBD ${classeInfo.label}`,
    description: classeInfo.descricao,
    url: canonicalUrl,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: resolveSiteUrl("/"),
    },
    breadcrumb: {
      "@id": `${canonicalUrl}#breadcrumb`,
    },
    hasPart: trimestres.map((trimestre) => ({
      "@type": "CollectionPage",
      name: `${trimestre.titulo} — ${trimestre.rotulo}`,
      url: resolveSiteUrl(`/ebd/${classe}/${trimestre.slug}`),
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
          label="Escola Bíblica Dominical"
          title={`Classe ${classeInfo.label}`}
          description={`${classeInfo.descricao} ${classeInfo.horarioLabel}.`}
          image={trimestreAtual?.imagem ?? igrejaHeroMedia.ebd}
          imageAlt={`Classe ${classeInfo.label} da EBD`}
        />

        <section className="py-16 md:py-20 xl:py-24">
          <div className="mx-auto max-w-7xl px-4 xl:px-6">
            <EbdBreadcrumb
              items={[
                { label: "EBD", href: "/ebd" },
                { label: classeInfo.label },
              ]}
            />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-10">
              <div className="space-y-12">
                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8 lg:p-10">
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                    Classe em destaque
                  </p>
                  <h2 className="mb-4 max-w-4xl font-acme text-xl tracking-wide text-[#212121] md:text-4xl lg:text-5xl">
                    {classeInfo.label}
                  </h2>
                  <div className="max-w-4xl space-y-4 text-base leading-relaxed text-[#555] lg:text-lg">
                    <p>{classeInfo.descricao}</p>
                    <p>
                      Aqui você acompanha a lição da semana, os trimestres já
                      disponíveis e o caminho de estudo da classe ao longo do ano.
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Link href="/ebd" className="ui-btn-secondary">
                      Voltar para a EBD
                    </Link>
                    <Link href="/programacao" className="ui-btn-ghost">
                      Ver horário da EBD
                    </Link>
                  </div>
                </div>

                <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm md:p-8 lg:hidden">
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                    Domingo mais próximo
                  </p>
                  {licaoDaSemana ? (
                    <>
                      <h2 className="mb-3 font-acme text-xl tracking-wide text-[#212121] md:text-3xl">
                        {licaoDaSemana.licao.titulo}
                      </h2>
                      <p className="mb-2 text-sm font-medium text-[#8b5b18]">
                        Lição {licaoDaSemana.licao.numero} •{" "}
                        {formatEbdDate(licaoDaSemana.licao.data)}
                      </p>
                      <p className="mb-4 text-sm leading-relaxed text-[#555]">
                        {licaoDaSemana.licao.resumo}
                      </p>
                      {proximaLicao ? (
                        <p className="mb-5 text-sm leading-relaxed text-[#555]">
                          Próxima lição:{" "}
                          <span className="font-semibold text-[#212121]">
                            {proximaLicao.licao.titulo}
                          </span>{" "}
                          em {formatEbdDate(proximaLicao.licao.data)}.
                        </p>
                      ) : null}
                      <Link
                        href={`/ebd/${classe}/${licaoDaSemana.trimestre.slug}/${licaoDaSemana.licao.slug}`}
                        className="ui-btn-primary"
                      >
                        Abrir lição da semana
                      </Link>
                    </>
                  ) : (
                    <p className="leading-relaxed text-[#555]">
                      Nenhuma lição da semana foi encontrada para esta classe.
                    </p>
                  )}
                </div>

                <div>
                  <div className="mb-6 max-w-4xl">
                    <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                      Trimestres de 2026
                    </p>
                    <h2 className="mb-4 font-acme text-xl tracking-wide text-[#212121] md:text-4xl lg:text-5xl">
                      Edições publicadas da classe
                    </h2>
                    <p className="leading-relaxed text-[#555]">
                      Cada trimestre reúne lições e material de apoio para ajudar a
                      classe a seguir estudando com clareza e constância.
                    </p>
                  </div>

                  {trimestres.length ? (
                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                      {trimestres.map((trimestre) => {
                        const statusMeta = getQuarterStatusMeta(
                          getTrimestreEditorialStatus(trimestre)
                        );
                        const publishedLessons =
                          getTrimestrePublicLessonCount(trimestre);

                        return (
                          <Link
                            key={trimestre.id}
                            href={`/ebd/${classe}/${trimestre.slug}`}
                            className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                          >
                            <CardMedia
                              src={trimestre.imagem}
                              alt={trimestre.titulo}
                              variant="content"
                              sizes="(max-width: 1280px) 100vw, 50vw"
                              className="rounded-none"
                            >
                              <div className="absolute inset-x-0 bottom-0 p-5">
                                <div
                                  className={`mb-3 inline-flex rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase ${statusMeta.badgeClassName}`}
                                >
                                  {statusMeta.label}
                                </div>
                                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                                  {trimestre.rotulo}
                                </p>
                                <h3 className="font-acme text-xl tracking-wide text-white md:text-3xl">
                                  {trimestre.titulo}
                                </h3>
                              </div>
                            </CardMedia>

                            <div className="p-6">
                              <p className="mb-3 text-sm leading-relaxed text-[#555]">
                                {trimestre.descricao}
                              </p>
                              <p className="mb-4 text-sm leading-relaxed text-[#666]">
                                {statusMeta.description}
                              </p>
                              <div className="mb-4 grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-black/5 bg-[#fafafa] p-4">
                                  <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                                    Lições publicadas
                                  </p>
                                  <p className="font-acme text-xl text-[#212121] md:text-3xl">
                                    {publishedLessons}
                                  </p>
                                </div>
                                <div className="rounded-2xl border border-black/5 bg-[#fafafa] p-4">
                                  <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                                    Versículo-base
                                  </p>
                                  <p className="text-sm leading-relaxed text-[#212121]">
                                    <BibleReferenceText
                                      text={trimestre.versiculoBase ?? "A confirmar"}
                                      renderLinks={false}
                                      linkClassName="font-medium text-[#212121] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
                                    />
                                  </p>
                                </div>
                              </div>
                              <p className="text-xs font-semibold tracking-widest uppercase text-[#ef5350]">
                                Ver trimestre →
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
                      <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                        Publicação pausada
                      </p>
                      <p className="leading-relaxed text-[#555]">
                        Esta classe ainda não tem conteúdo disponível nesta página.
                        Assim que novos materiais forem publicados, eles aparecerão
                        aqui.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm">
                    <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                      Estudo da semana
                    </p>
                    {licaoDaSemana ? (
                      <>
                        <h2 className="mb-3 font-acme text-2xl tracking-wide text-[#212121]">
                          {licaoDaSemana.licao.titulo}
                        </h2>
                        <p className="mb-2 text-sm font-medium text-[#8b5b18]">
                          Lição {licaoDaSemana.licao.numero} •{" "}
                          {formatEbdDate(licaoDaSemana.licao.data)}
                        </p>
                        <p className="text-sm leading-relaxed text-[#555]">
                          {licaoDaSemana.licao.resumo}
                        </p>
                        <div className="mt-5 flex flex-col gap-3">
                          <Link
                            href={`/ebd/${classe}/${licaoDaSemana.trimestre.slug}/${licaoDaSemana.licao.slug}`}
                            className="ui-btn-primary"
                          >
                            Abrir lição da semana
                          </Link>
                          {proximaLicao ? (
                            <p className="text-sm leading-relaxed text-[#555]">
                              Próxima lição em{" "}
                              <span className="font-semibold text-[#212121]">
                                {formatEbdDate(proximaLicao.licao.data)}
                              </span>
                              .
                            </p>
                          ) : null}
                        </div>
                      </>
                    ) : (
                      <p className="leading-relaxed text-[#555]">
                        Nenhuma lição da semana foi encontrada para esta classe.
                      </p>
                    )}
                  </div>

                  <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                    <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                      Visão da classe
                    </p>
                    <h2 className="mb-3 font-acme text-2xl tracking-wide text-[#212121]">
                      {classeInfo.label}
                    </h2>
                    <div className="space-y-3 text-sm leading-relaxed text-[#555]">
                      <p>
                        <span className="font-semibold text-[#212121]">Horário:</span>{" "}
                        {classeInfo.horarioLabel}
                      </p>
                      {trimestreAtual ? (
                        <p>
                          <span className="font-semibold text-[#212121]">
                            Trimestre atual:
                          </span>{" "}
                          {trimestreAtual.rotulo}
                        </p>
                      ) : null}
                      <p>{classeInfo.descricao}</p>
                    </div>
                    <div className="mt-5 flex flex-col gap-3">
                      <Link href="/ebd" className="ui-btn-secondary">
                        Voltar para a EBD
                      </Link>
                      <Link href="/programacao" className="ui-btn-ghost">
                        Ver programação da EBD
                      </Link>
                    </div>
                  </div>

                  {trimestres.length ? (
                    <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                      <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                        Edições da classe
                      </p>
                      <div className="space-y-3">
                        {trimestres.map((trimestre) => (
                          <Link
                            key={trimestre.id}
                            href={`/ebd/${classe}/${trimestre.slug}`}
                            className={`block rounded-2xl border p-4 transition-colors ${
                              trimestreAtual?.slug === trimestre.slug
                                ? "border-[#ffa726]/30 bg-[#fff8ee]"
                                : "border-black/5 bg-[#fafafa] hover:border-[#ffa726]/20 hover:bg-white"
                            }`}
                          >
                            <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#ef5350]">
                              {trimestre.rotulo}
                            </p>
                            <p className="mt-2 font-semibold text-[#212121]">
                              {trimestre.titulo}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
