import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import BibleReferenceText from "@/components/biblia/BibleReferenceText";
import CardMedia from "@/components/media/CardMedia";
import { igrejaHeroMedia } from "@/data/igreja-media";
import {
  formatEbdDate,
  getClassesEbdPublicadas,
  getClasseEbdInfo,
  getLicaoDaSemana,
  getProximaLicao,
  getTrimestreEditorialStatus,
  getTrimestrePublishedLessonCount,
  getTrimestresEbdPublicos,
  getTrimestreAtual,
  isClasseEbdPublicada,
} from "@/lib/ebd-utils";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

type PageProps = {
  searchParams: Promise<{
    classe?: string;
  }>;
};

export const metadata = buildPageMetadata({
  title: "EBD | AD Madureira Atibaia",
  description:
    "Acompanhe a Escola Bíblica Dominical da AD Madureira Atibaia com classes, trimestres, lições e acesso rápido ao estudo da semana.",
  path: "/ebd",
  image: igrejaHeroMedia.ebd,
});

export const revalidate = 3600;

function getQuarterStatusMeta(status: ReturnType<typeof getTrimestreEditorialStatus>) {
  if (status === "draft") {
    return {
      label: "Em preparação",
      badgeClassName: "border-black/10 bg-white text-[#666]",
      description:
        "Estrutura anual já aberta no site, com publicação gradual das lições conforme a curadoria editorial for concluída.",
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

function Breadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#777]"
    >
      <Link href="/" className="transition-colors hover:text-[#212121]">
        Início
      </Link>
      <span>›</span>
      <span className="font-medium text-[#212121]">EBD</span>
    </nav>
  );
}

export default async function EbdHubPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const classes = getClassesEbdPublicadas();
  const classeAtiva =
    typeof params.classe === "string" && isClasseEbdPublicada(params.classe)
      ? params.classe
      : "adultos";
  const classeInfo = getClasseEbdInfo(classeAtiva);
  const licaoDaSemana = getLicaoDaSemana(classeAtiva);
  const proximaLicao = getProximaLicao(classeAtiva);
  const trimestreAtual = getTrimestreAtual(classeAtiva);
  const trimestresDaClasse = getTrimestresEbdPublicos(classeAtiva);
  const canonicalUrl = resolveSiteUrl("/ebd");
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
        item: canonicalUrl,
      },
    ],
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "EBD",
    description:
      "Área da Escola Bíblica Dominical da AD Madureira Atibaia com classes, trimestres, lições e acesso rápido ao estudo da semana.",
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
    hasPart: classes.map((classe) => ({
      "@type": "CollectionPage",
      name: `EBD ${classe.label}`,
      url: resolveSiteUrl(`/ebd/${classe.slug}`),
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
          title="EBD da Igreja"
          description="Uma área dedicada ao ensino bíblico contínuo da AD Madureira Atibaia, com classes, trimestres, lições e acesso rápido ao estudo da semana."
          image={igrejaHeroMedia.ebd}
          imageAlt="Capa da Escola Bíblica Dominical da AD Madureira Atibaia"
        />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumb />

          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Lição da semana
              </p>
              <h1 className="mb-4 font-acme text-xl md:text-3xl tracking-wide text-[#212121] md:text-4xl">
                {licaoDaSemana
                  ? `${classeInfo.label} · ${licaoDaSemana.licao.titulo}`
                  : `Classe ${classeInfo.label}`}
              </h1>
              {licaoDaSemana ? (
                <>
                  <p className="mb-2 text-sm font-medium text-[#8b5b18]">
                    Lição {licaoDaSemana.licao.numero} •{" "}
                    {formatEbdDate(licaoDaSemana.licao.data)}
                  </p>
                  <p className="mb-4 leading-relaxed text-[#555]">
                    {licaoDaSemana.licao.resumo}
                  </p>
                  <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-5">
                    <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                      {classeInfo.resumoDestaqueLabel}
                    </p>
                    <p className="leading-relaxed text-[#555]">
                      {licaoDaSemana.licao.verdadePratica}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Link
                      href={`/ebd/${classeAtiva}/${licaoDaSemana.trimestre.slug}/${licaoDaSemana.licao.slug}`}
                      className="ui-btn-primary"
                    >
                      Ver lição
                    </Link>
                    <Link
                      href={`/ebd/${classeAtiva}`}
                      className="ui-btn-secondary"
                    >
                      Ver classe completa
                    </Link>
                  </div>
                </>
              ) : (
                <p className="leading-relaxed text-[#555]">
                  Nenhuma lição da semana foi encontrada para esta classe.
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm md:p-8">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                Escolha a classe
              </p>
              <div className="mb-6 flex flex-wrap gap-3">
                {classes.map((classe) => {
                  const isActive = classe.slug === classeAtiva;

                  return (
                    <Link
                      key={classe.slug}
                      href={`/ebd?classe=${classe.slug}`}
                      className={`inline-flex rounded-full border px-4 py-2 text-xs font-bold tracking-[0.14em] uppercase transition-colors ${
                        isActive
                          ? "border-[#ffa726]/35 bg-white text-[#8b5b18]"
                          : "border-black/10 bg-transparent text-[#555] hover:border-[#ffa726]/25 hover:text-[#212121]"
                      }`}
                    >
                      {classe.label}
                    </Link>
                  );
                })}
              </div>

              <h2 className="mb-3 font-acme text-xl md:text-3xl tracking-wide text-[#212121]">
                {classeInfo.label}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-[#555]">
                {classeInfo.descricao}
              </p>
              <div className="space-y-4 text-sm leading-relaxed text-[#555]">
                <p>
                  <span className="font-semibold text-[#212121]">
                    Horário:
                  </span>{" "}
                  {classeInfo.horarioLabel}
                </p>
                {trimestreAtual ? (
                  <p>
                    <span className="font-semibold text-[#212121]">
                      Trimestre atual:
                    </span>{" "}
                    {trimestreAtual.rotulo} • {trimestreAtual.titulo}
                  </p>
                ) : null}
                {proximaLicao ? (
                  <p>
                    <span className="font-semibold text-[#212121]">
                      Próxima lição:
                    </span>{" "}
                    {proximaLicao.licao.titulo} em{" "}
                    {formatEbdDate(proximaLicao.licao.data)}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="mb-6 max-w-3xl">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Classes disponíveis
              </p>
              <h2 className="mb-4 font-acme text-xl md:text-3xl tracking-wide text-[#212121] md:text-4xl">
                Classes publicadas com caminho claro de estudo
              </h2>
              <p className="leading-relaxed text-[#555]">
                As classes com conteúdo já publicado reúnem trimestres, lições
                e material de apoio para facilitar a continuidade da Escola
                Bíblica Dominical ao longo da semana.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {classes.map((classe) => {
                const trimestre = getTrimestreAtual(classe.slug);
                const licaoAtual = getLicaoDaSemana(classe.slug);

                return (
                  <Link
                    key={classe.slug}
                    href={`/ebd/${classe.slug}`}
                    className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                  >
                    <CardMedia
                      src={trimestre?.imagem}
                      alt={`Classe ${classe.label} da EBD`}
                      variant="content"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="rounded-none"
                    >
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                          {classe.horarioLabel}
                        </p>
                        <h3 className="font-acme text-xl md:text-3xl tracking-wide text-white">
                          {classe.label}
                        </h3>
                      </div>
                    </CardMedia>

                    <div className="p-6">
                      <p className="mb-3 text-sm leading-relaxed text-[#555]">
                        {classe.descricao}
                      </p>
                      {licaoAtual ? (
                        <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4 mb-5">
                          <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                            Esta semana
                          </p>
                          <p className="font-semibold text-[#212121]">
                            {licaoAtual.licao.titulo}
                          </p>
                          <p className="mt-1 text-sm text-[#666]">
                            {formatEbdDate(licaoAtual.licao.data)}
                          </p>
                        </div>
                      ) : null}
                      <p className="text-xs font-semibold tracking-widest uppercase text-[#ef5350]">
                        Ver classe →
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-6 max-w-3xl">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                Trimestres de 2026
              </p>
              <h2 className="mb-4 font-acme text-xl md:text-3xl tracking-wide text-[#212121] md:text-4xl">
                Edições publicadas da classe {classeInfo.label.toLowerCase()}
              </h2>
              <p className="leading-relaxed text-[#555]">
                Acompanhe o trimestre atual e as edições já publicadas da
                classe, enquanto os próximos ciclos editoriais seguem em
                preparação interna.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {trimestresDaClasse.map((trimestre) => {
                const statusMeta = getQuarterStatusMeta(
                  getTrimestreEditorialStatus(trimestre)
                );
                const publishedLessons = getTrimestrePublishedLessonCount(trimestre);

                return (
                  <Link
                    key={trimestre.id}
                    href={`/ebd/${classeAtiva}/${trimestre.slug}`}
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
                        <h3 className="font-acme text-xl md:text-3xl tracking-wide text-white">
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
                          <p className="font-acme text-xl md:text-3xl text-[#212121]">
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
          </div>
        </div>
        </section>
      </main>
    </>
  );
}
