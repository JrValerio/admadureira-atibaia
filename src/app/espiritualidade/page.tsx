import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import {
  complementarySpiritualFeatures,
  primarySpiritualFeatures,
} from "@/data/espiritualidade";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import HojeComDeus from "@/sections/HojeComDeus";
import SuaJornada from "@/sections/SuaJornada";
import { getSpiritualityHubData } from "@/lib/spirituality-hub";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Espiritualidade | AD Madureira Atibaia",
  description:
    "Acesse a área de espiritualidade da AD Madureira Atibaia com Bíblia Online, plano de leitura, devocional, rádio e podcast.",
  path: "/espiritualidade",
  image: igrejaHeroMedia.espiritualidade,
  keywords: [
    "bíblia online",
    "plano de leitura bíblica",
    "devocional cristão",
    "rádio evangélica",
    "podcast cristão",
  ],
});

export const revalidate = 3600;

export default function EspiritualidadePage() {
  const hubData = getSpiritualityHubData();
  const startTodayHref = hubData?.verseChapterHref ?? "/espiritualidade/versiculo-do-dia";
  const continueJourneyHref = hubData?.readingDayHref ?? "/espiritualidade/plano-de-leitura";

  const guidedSteps = [
    {
      step: "Passo 1",
      title: "Comece pelo que é de hoje",
      description:
        "Abra primeiro o bloco do dia com versículo, devocional e leitura sugerida para não começar perdido.",
      href: hubData ? "#hub-hoje" : startTodayHref,
      cta: "Ver bloco de hoje",
    },
    {
      step: "Passo 2",
      title: "Retome sua constância",
      description:
        "Depois de usar o conteúdo de hoje, volte para a sua jornada de leitura e siga do ponto onde parou.",
      href: hubData ? "#hub-jornada" : continueJourneyHref,
      cta: "Retomar jornada",
    },
    {
      step: "Passo 3",
      title: "Use áudio como apoio",
      description:
        "Rádio e podcast entram como companhia ao longo da semana, não como substitutos da leitura e da meditação.",
      href: hubData ? "#hub-audio" : "/espiritualidade/radio",
      cta: "Explorar apoio em áudio",
    },
  ];

  return (
    <>
      <HeroPage
        variant="full"
        label="Crescimento espiritual"
        title="Espiritualidade"
        description="Comece com a Palavra de hoje, retome sua jornada de leitura e use recursos em áudio como apoio para seguir em constância espiritual ao longo da semana."
        image={igrejaHeroMedia.espiritualidade}
        imageAlt="Fachada da AD Madureira Atibaia"
      />
      <section className="border-b border-black/5 bg-white/90">
        <div className="ui-page-container py-5 md:py-6">
          <div className="ui-panel ui-panel-pad-sm">
            <p className="ui-section-eyebrow ui-section-eyebrow--gold">
              Comece por aqui
            </p>
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <h2 className="font-acme text-xl tracking-wide text-[#212121] md:text-2xl">
                  Uma jornada simples para usar esta área sem ficar escolhendo demais
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                  Se esta for a sua entrada principal na área de espiritualidade,
                  siga esta ordem: comece pelo conteúdo de hoje, retome seu plano
                  bíblico e deixe os recursos em áudio como companhia ao longo da
                  rotina.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={startTodayHref} className="ui-btn-primary">
                  Abrir versículo de hoje
                </Link>
                <Link href={continueJourneyHref} className="ui-btn-secondary">
                  Retomar leitura
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {guidedSteps.map((item) => (
                <article key={item.title} className="ui-panel-accent ui-panel-pad-sm h-full">
                  <p className="text-[#ef5350] text-[11px] font-bold tracking-widest uppercase mb-2">
                    {item.step}
                  </p>
                  <h3 className="font-acme text-lg tracking-wide text-[#212121] md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f]">
                    {item.description}
                  </p>
                  <Link href={item.href} className="ui-link-accent mt-4 inline-flex">
                    {item.cta} →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="ui-page-container">
          <SpiritualBreadcrumb items={[{ label: "Espiritualidade" }]} />

          {hubData ? (
            <>
              <div id="hub-hoje" className="scroll-mt-24">
                <HojeComDeus data={hubData} />
              </div>
              <div id="hub-jornada" className="scroll-mt-24">
                <SuaJornada data={hubData} />
              </div>
            </>
          ) : null}

          <div className="mb-8 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8">
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <p className="ui-card-eyebrow mb-3">
                Trilha principal
              </p>
              <h2 className="font-acme text-xl md:text-3xl lg:text-4xl text-[#212121] tracking-wide mb-5">
                Hoje, jornada e aprofundamento em sequência
              </h2>
              <div className="space-y-4 text-[#555] leading-relaxed">
                <p>
                  Esta área funciona melhor quando você usa primeiro o conteúdo
                  do dia, depois retoma sua jornada de leitura e só então
                  explora os recursos centrais para aprofundar a constância
                  espiritual.
                </p>
                <p>
                  Bíblia Online, plano de leitura, versículo e devocional não
                  competem entre si. Eles formam um núcleo único para abrir a
                  Palavra, meditar com direção e seguir com clareza ao longo da
                  semana.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                Se esta for a sua primeira visita
              </p>
              <ul className="space-y-4 text-[#555] text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                  <span>Comece pelo bloco de hoje para receber direção sem precisar escolher entre muitos recursos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                  <span>Use a jornada de leitura para ganhar continuidade e evitar que a rotina espiritual dependa só do impulso do momento.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                  <span>Recursos em áudio entram como apoio durante deslocamentos, trabalho e pausas, não como ponto de partida obrigatório.</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            id="hub-audio"
            className="mb-12 rounded-3xl bg-[#212121] p-6 md:p-8 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] scroll-mt-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
              <div className="max-w-3xl">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Apoio em áudio
                </p>
                <h2 className="font-acme text-xl md:text-3xl lg:text-4xl tracking-wide mb-4">
                  Continue perto da Palavra durante a rotina
                </h2>
                <p className="text-white/80 leading-relaxed">
                  Depois de abrir a Bíblia, meditar e retomar sua leitura, use
                  Rádio e Podcast como companhia para continuar perto da Palavra
                  em deslocamentos, trabalho, pausas e momentos de oração ao
                  longo da semana.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/espiritualidade/radio" className="ui-btn-primary">
                  Ouvir rádio
                </Link>
                <Link
                  href="/espiritualidade/podcast"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-xs font-bold tracking-widest uppercase text-white transition-colors hover:bg-white hover:text-[#212121]"
                >
                  Explorar podcast
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="mb-6 max-w-3xl">
              <p className="ui-card-eyebrow mb-3">
                Recursos principais
              </p>
              <h2 className="font-acme text-xl md:text-3xl lg:text-4xl text-[#212121] tracking-wide mb-4">
                Aprofunde depois de usar o conteúdo do dia
              </h2>
              <p className="text-[#555] leading-relaxed">
                Estes são os caminhos centrais para transformar o impulso do dia
                em rotina: abrir a Bíblia, continuar o plano, meditar com
                direção e manter constância prática ao longo da semana.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {primarySpiritualFeatures.map((feature) => (
                <article
                  key={feature.href}
                  className="group rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)]"
                >
                  <p className="ui-card-eyebrow mb-3">
                    {feature.destaque}
                  </p>
                  <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-4 group-hover:text-[#ef5350] transition-colors">
                    {feature.titulo}
                  </h2>
                  <p className="text-sm font-medium text-[#8b5b18] leading-relaxed mb-4">
                    {feature.uso}
                  </p>
                  <p className="text-[#555] leading-relaxed mb-6">
                    {feature.descricao}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    <Link href={feature.href} className="ui-link-accent inline-flex">
                      {feature.ctaLabel} →
                    </Link>
                    {feature.supportHref && feature.supportLabel ? (
                      <Link
                        href={feature.supportHref}
                        className="text-xs text-[#777] transition-colors hover:text-[#212121]"
                      >
                        Continue com{" "}
                        <span className="font-semibold text-[#212121]">
                          {feature.supportLabel}
                        </span>
                      </Link>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 max-w-3xl">
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                Recursos complementares
              </p>
              <h2 className="font-acme text-xl md:text-3xl lg:text-4xl text-[#212121] tracking-wide mb-4">
                Áudio para acompanhar sua jornada ao longo do dia
              </h2>
              <p className="text-[#555] leading-relaxed">
                Rádio e Podcast funcionam como apoio da rotina espiritual:
                caminhos em áudio para ouvir durante deslocamentos, trabalho,
                pausas e momentos de oração ao longo da semana.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {complementarySpiritualFeatures.map((feature) => (
                <article
                  key={feature.href}
                  className="group rounded-3xl border border-[#ffa726]/18 bg-[#fff8ee] p-6 md:p-8 shadow-sm transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)]"
                >
                  <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                    {feature.destaque}
                  </p>
                  <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-4 group-hover:text-[#ef5350] transition-colors">
                    {feature.titulo}
                  </h2>
                  <p className="text-sm font-medium text-[#8b5b18] leading-relaxed mb-4">
                    {feature.uso}
                  </p>
                  <p className="text-[#555] leading-relaxed mb-6">
                    {feature.descricao}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    <Link href={feature.href} className="ui-link-accent inline-flex">
                      {feature.ctaLabel} →
                    </Link>
                    {feature.supportHref && feature.supportLabel ? (
                      <Link
                        href={feature.supportHref}
                        className="text-xs text-[#777] transition-colors hover:text-[#212121]"
                      >
                        Continue com{" "}
                        <span className="font-semibold text-[#212121]">
                          {feature.supportLabel}
                        </span>
                      </Link>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
