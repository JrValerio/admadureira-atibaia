import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import BibleReferenceText from "@/components/biblia/BibleReferenceText";
import EbdBreadcrumb from "@/components/ebd/EbdBreadcrumb";
import CardMedia from "@/components/media/CardMedia";
import { igrejaHeroMedia } from "@/data/igreja-media";
import {
  formatEbdDate,
  getClassesEbdPublicadas,
  getClasseEbdInfo,
  getLicaoDaSemana,
  getProximaLicao,
  getTrimestreAtual,
  getTrimestreEditorialStatus,
  getTrimestrePublicLessonCount,
  getTrimestresEbdPublicos,
  isClasseEbdPublicada,
} from "@/lib/ebd-utils";
import { getQuarterStatusMeta } from "@/lib/ebd-ui";
import {
  getLessonHighlightText,
  getLessonStructure,
} from "@/lib/ebd-lesson-structure";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

type PageProps = {
  searchParams: Promise<{
    classe?: string;
  }>;
};

export const metadata = buildPageMetadata({
  title: "EBD | AD Madureira Atibaia",
  description:
    "Central gratuita de apoio à Escola Bíblica Dominical da AD Madureira Atibaia — lição da semana, trimestres, classes e material de apoio para professores e alunos.",
  path: "/ebd",
  image: igrejaHeroMedia.ebd,
});

export const revalidate = 3600;

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
  const classesWithContext = classes.map((classe) => ({
    classe,
    trimestreAtual: getTrimestreAtual(classe.slug),
    licaoAtual: getLicaoDaSemana(classe.slug),
  }));
  const lessonStructure = licaoDaSemana
    ? getLessonStructure(classeInfo, licaoDaSemana.trimestre, licaoDaSemana.licao)
    : null;
  const lessonHighlight = getLessonHighlightText(lessonStructure);
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
          title="Ensino, preparo e crescimento na Palavra"
          description={`"Se é ensinar, haja dedicação ao ensino." — Rm 12.7 · Uma central gratuita de apoio à EBD da AD Madureira Atibaia para professores, alunos e toda a igreja.`}
          image={igrejaHeroMedia.ebd}
          imageAlt="Capa da Escola Bíblica Dominical da AD Madureira Atibaia"
        />

        <section className="border-b border-black/5 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 xl:px-6">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Para toda a igreja
              </p>
              <h2 className="mb-4 font-acme text-2xl tracking-wide text-[#212121] md:text-4xl">
                Uma central gratuita de apoio à EBD
              </h2>
              <p className="leading-relaxed text-[#555]">
                Material de apoio para professores, alunos e irmãos que querem
                estudar a Palavra com mais profundidade — todo domingo, às 09h.
              </p>
            </div>

            <div className="mb-10 rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm md:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                    Novo trimestre da EBD
                  </p>
                  <h2 className="mb-3 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                    3º Trimestre de 2026
                  </h2>
                  <p className="text-sm leading-relaxed text-[#555] md:text-base">
                    Começa em 05 de julho. Prepare-se para uma nova jornada de
                    estudo bíblico nas classes Adultos e Jovens.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="border-l-4 border-[#ffa726]/40 pl-4">
                    <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                      Adultos
                    </p>
                    <h3 className="mb-2 font-acme text-xl tracking-wide text-[#212121]">
                      A Igreja dos Gentios
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555]">
                      Da chamada missionária à consolidação do Evangelho entre
                      os povos.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#ffa726]/40 pl-4">
                    <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                      Jovens
                    </p>
                    <h3 className="mb-2 font-acme text-xl tracking-wide text-[#212121]">
                      Fidelidade às Escrituras
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555]">
                      Lições espirituais no livro de Juízes contra a apostasia.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 border-t border-[#ffa726]/20 pt-4 text-sm leading-relaxed text-[#555]">
                Os materiais de apoio serão liberados conforme a programação da
                EBD, sem alterar a lição da semana.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-black/5 bg-[#fafafa] p-6">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Para professores
                </p>
                <h3 className="mb-3 font-acme text-xl tracking-wide text-[#212121]">
                  Prepare sua aula com mais clareza
                </h3>
                <p className="text-sm leading-relaxed text-[#555]">
                  Acesse a lição da semana, os pontos principais, a verdade
                  prática e materiais de apoio para ensinar com fidelidade
                  bíblica e aplicação real.
                </p>
              </div>
              <div className="rounded-3xl border border-black/5 bg-[#fafafa] p-6">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Para alunos
                </p>
                <h3 className="mb-3 font-acme text-xl tracking-wide text-[#212121]">
                  Acompanhe a lição durante a semana
                </h3>
                <p className="text-sm leading-relaxed text-[#555]">
                  Leia os textos bíblicos, revise os pontos da lição e chegue
                  ao domingo preparado para aprender e participar com mais
                  entendimento.
                </p>
              </div>
              <div className="rounded-3xl border border-[#ffa726]/15 bg-[#fff8ee] p-6">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Para a igreja
                </p>
                <h3 className="mb-3 font-acme text-xl tracking-wide text-[#212121]">
                  Uma igreja que estuda cresce
                </h3>
                <p className="text-sm leading-relaxed text-[#555]">
                  A EBD é uma das maiores ferramentas de formação cristã.
                  Convide alguém para estudar a Palavra todo domingo, às 09h,
                  na AD Madureira Atibaia.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 xl:py-24">
          <div className="mx-auto max-w-7xl px-4 xl:px-6">
            <EbdBreadcrumb items={[{ label: "EBD" }]} />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-10">
              <div className="space-y-12">
                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8 lg:p-10">
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                    Lição da semana
                  </p>
                  <h2 className="mb-4 max-w-4xl font-acme text-xl tracking-wide text-[#212121] md:text-4xl lg:text-5xl">
                    {licaoDaSemana
                      ? `${classeInfo.label} · ${licaoDaSemana.licao.titulo}`
                      : `Classe ${classeInfo.label}`}
                  </h2>
                  {licaoDaSemana ? (
                    <>
                      <p className="mb-2 text-sm font-medium text-[#8b5b18]">
                        Lição {licaoDaSemana.licao.numero} •{" "}
                        {formatEbdDate(licaoDaSemana.licao.data)}
                      </p>
                      <p className="mb-4 max-w-4xl text-base leading-relaxed text-[#555] lg:text-lg">
                        {licaoDaSemana.licao.resumo}
                      </p>
                      <div className="max-w-4xl rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-5">
                        <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                          {classeInfo.resumoDestaqueLabel}
                        </p>
                        <p className="leading-relaxed text-[#555]">
                          {lessonHighlight ??
                            licaoDaSemana.licao.verdadePratica ??
                            licaoDaSemana.licao.resumo}
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

                <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm md:p-8 lg:hidden">
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

                  <h2 className="mb-3 font-acme text-xl tracking-wide text-[#212121] md:text-3xl">
                    {classeInfo.label}
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-[#555]">
                    {classeInfo.descricao}
                  </p>
                  <div className="space-y-4 text-sm leading-relaxed text-[#555]">
                    <p>
                      <span className="font-semibold text-[#212121]">Horário:</span>{" "}
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

                <div>
                  <div className="mb-6 max-w-4xl">
                    <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                      Classes da EBD
                    </p>
                    <h2 className="mb-4 font-acme text-xl tracking-wide text-[#212121] md:text-4xl lg:text-5xl">
                      Escolha sua classe e comece a estudar
                    </h2>
                    <p className="leading-relaxed text-[#555]">
                      Acompanhe as classes da EBD com trimestres, lições e
                      material de apoio para continuar estudando durante a semana.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                    {classesWithContext.map(
                      ({ classe, trimestreAtual, licaoAtual }) => (
                        <Link
                          key={classe.slug}
                          href={`/ebd/${classe.slug}`}
                          className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                        >
                          <CardMedia
                            src={trimestreAtual?.imagem}
                            alt={`Classe ${classe.label} da EBD`}
                            variant="content"
                            sizes="(max-width: 1280px) 100vw, 50vw"
                            className="rounded-none"
                          >
                            <div className="absolute inset-x-0 bottom-0 p-5">
                              <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                                {classe.horarioLabel}
                              </p>
                              <h3 className="font-acme text-xl tracking-wide text-white md:text-3xl">
                                {classe.label}
                              </h3>
                            </div>
                          </CardMedia>

                          <div className="p-6">
                            <p className="mb-3 text-sm leading-relaxed text-[#555]">
                              {classe.descricao}
                            </p>
                            {licaoAtual ? (
                              <div className="mb-5 rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4">
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
                      )
                    )}
                  </div>
                </div>

                <div>
                  <div className="mb-6 max-w-4xl">
                    <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                      Trimestres de {new Date().getFullYear()}
                    </p>
                    <h2 className="mb-4 font-acme text-xl tracking-wide text-[#212121] md:text-4xl lg:text-5xl">
                      Edições publicadas da classe {classeInfo.label.toLowerCase()}
                    </h2>
                    <p className="leading-relaxed text-[#555]">
                      Acompanhe o trimestre atual e as edições já disponíveis da
                      classe para seguir estudando com continuidade.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                    {trimestresDaClasse.map((trimestre) => {
                      const statusMeta = getQuarterStatusMeta(
                        getTrimestreEditorialStatus(trimestre)
                      );
                      const publishedLessons =
                        getTrimestrePublicLessonCount(trimestre);

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
                </div>
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm">
                    <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                      Classes disponíveis
                    </p>
                    <div className="space-y-3">
                      {classesWithContext.map(({ classe, licaoAtual }) => {
                        const isActive = classe.slug === classeAtiva;

                        return (
                          <Link
                            key={classe.slug}
                            href={`/ebd?classe=${classe.slug}`}
                            className={`block rounded-2xl border p-4 transition-colors ${
                              isActive
                                ? "border-[#ffa726]/30 bg-white"
                                : "border-black/5 bg-white/60 hover:border-[#ffa726]/20 hover:bg-white"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <h2 className="font-acme text-xl tracking-wide text-[#212121]">
                                {classe.label}
                              </h2>
                              <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#ef5350]">
                                {classe.horarioLabel}
                              </span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-[#555]">
                              {licaoAtual
                                ? licaoAtual.licao.titulo
                                : "Classe disponível para acompanhamento."}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                    <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                      Classe ativa
                    </p>
                    <h2 className="mb-3 font-acme text-2xl tracking-wide text-[#212121]">
                      {classeInfo.label}
                    </h2>
                    <p className="mb-4 text-sm leading-relaxed text-[#555]">
                      {classeInfo.descricao}
                    </p>
                    <div className="space-y-3 text-sm leading-relaxed text-[#555]">
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
                          {trimestreAtual.rotulo} · {trimestreAtual.titulo}
                        </p>
                      ) : null}
                      {proximaLicao ? (
                        <p>
                          <span className="font-semibold text-[#212121]">
                            Próxima lição:
                          </span>{" "}
                          {formatEbdDate(proximaLicao.licao.data)}
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-5 flex flex-col gap-3">
                      <Link href={`/ebd/${classeAtiva}`} className="ui-btn-secondary">
                        Ver classe completa
                      </Link>
                      {licaoDaSemana ? (
                        <Link
                          href={`/ebd/${classeAtiva}/${licaoDaSemana.trimestre.slug}/${licaoDaSemana.licao.slug}`}
                          className="ui-btn-ghost"
                        >
                          Abrir lição da semana
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  {trimestresDaClasse.length ? (
                    <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                      <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                        Trimestres publicados
                      </p>
                      <div className="space-y-3">
                        {trimestresDaClasse.map((trimestre) => (
                          <Link
                            key={trimestre.id}
                            href={`/ebd/${classeAtiva}/${trimestre.slug}`}
                            className="block rounded-2xl border border-black/5 bg-[#fafafa] p-4 transition-colors hover:border-[#ffa726]/20 hover:bg-white"
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
