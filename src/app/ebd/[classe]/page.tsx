import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import BibleReferenceText from "@/components/biblia/BibleReferenceText";
import CardMedia from "@/components/media/CardMedia";
import { igrejaHeroMedia } from "@/data/igreja-media";
import {
  formatEbdDate,
  getClassesEbd,
  getClasseEbdInfo,
  getLicaoDaSemana,
  getProximaLicao,
  getTrimestreAtual,
  getTrimestresPorClasse,
  isClasseEbd,
} from "@/lib/ebd-utils";
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

  return buildPageMetadata({
    title: `EBD ${classeInfo.label} | AD Madureira Atibaia`,
    description: classeInfo.descricao,
    path: `/ebd/${classeInfo.slug}`,
    image: igrejaHeroMedia.ebd,
  });
}

function Breadcrumb({ classeLabel }: { classeLabel: string }) {
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
      <span className="font-medium text-[#212121]">{classeLabel}</span>
    </nav>
  );
}

export default async function EbdClassPage({ params }: PageProps) {
  const { classe } = await params;

  if (!isClasseEbd(classe)) {
    notFound();
  }

  const classeInfo = getClasseEbdInfo(classe);
  const trimestres = getTrimestresPorClasse(classe);
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

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumb classeLabel={classeInfo.label} />

          <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Classe em destaque
              </p>
              <h1 className="mb-4 font-acme text-3xl tracking-wide text-[#212121] md:text-4xl">
                {classeInfo.label}
              </h1>
              <div className="space-y-4 leading-relaxed text-[#555]">
                <p>{classeInfo.descricao}</p>
                <p>
                  Esta página reúne os trimestres publicados, a lição da semana
                  e os caminhos para acompanhar o conteúdo da classe ao longo do
                  período.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link href="/ebd" className="ui-btn-secondary">
                  Voltar ao hub da EBD
                </Link>
                <Link href="/programacao" className="ui-btn-ghost">
                  Ver horário da EBD
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm md:p-8">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                Domingo mais próximo
              </p>
              {licaoDaSemana ? (
                <>
                  <h2 className="mb-3 font-acme text-3xl tracking-wide text-[#212121]">
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
          </div>

          <div>
            <div className="mb-6 max-w-3xl">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Trimestres publicados
              </p>
              <h2 className="mb-4 font-acme text-3xl tracking-wide text-[#212121] md:text-4xl">
                Conteúdo organizado por edição
              </h2>
              <p className="leading-relaxed text-[#555]">
                Cada trimestre reúne a visão geral da classe e as lições
                publicadas para acompanhamento contínuo da Escola Bíblica
                Dominical.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {trimestres.map((trimestre) => (
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
                      <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                        {trimestre.rotulo}
                      </p>
                      <h3 className="font-acme text-3xl tracking-wide text-white">
                        {trimestre.titulo}
                      </h3>
                    </div>
                  </CardMedia>

                  <div className="p-6">
                    <p className="mb-4 text-sm leading-relaxed text-[#555]">
                      {trimestre.descricao}
                    </p>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-black/5 bg-[#fafafa] p-4">
                        <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                          Lições
                        </p>
                        <p className="font-acme text-3xl text-[#212121]">
                          {trimestre.licoes.length}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-black/5 bg-[#fafafa] p-4">
                        <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                          Versículo-base
                        </p>
                        <p className="text-sm leading-relaxed text-[#212121]">
                          <BibleReferenceText
                            text={trimestre.versiculoBase ?? "A confirmar"}
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
              ))}
            </div>
          </div>
        </div>
        </section>
      </main>
    </>
  );
}
