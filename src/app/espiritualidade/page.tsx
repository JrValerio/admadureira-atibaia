import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import { spiritualFeatures } from "@/data/espiritualidade";
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

export default function EspiritualidadePage() {
  const hubData = getSpiritualityHubData();

  return (
    <>
      <HeroPage
        variant="full"
        label="Crescimento espiritual"
        title="Espiritualidade"
        description="Uma área dedicada à leitura bíblica, devocionais, planos de leitura e futuros canais de áudio da AD Madureira Atibaia."
        image={igrejaHeroMedia.espiritualidade}
        imageAlt="Fachada da AD Madureira Atibaia"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SpiritualBreadcrumb items={[{ label: "Espiritualidade" }]} />

          {hubData ? (
            <>
              <HojeComDeus data={hubData} />
              <SuaJornada data={hubData} />
            </>
          ) : null}

          <div className="mb-8 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8">
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Recursos centrais
              </p>
              <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-5">
                Bíblia, devocional e recursos para constância espiritual
              </h2>
              <div className="space-y-4 text-[#555] leading-relaxed">
                <p>
                  Esta área reúne os caminhos principais para abrir a Palavra,
                  seguir um plano de leitura, acompanhar o devocional do dia e
                  manter uma rotina espiritual recorrente.
                </p>
                <p>
                  Depois de usar o bloco de hoje e retomar sua jornada, explore
                  abaixo os recursos disponíveis para leitura, áudio e meditação.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                Comece hoje
              </p>
              <ul className="space-y-4 text-[#555] text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                  <span>Abra o versículo do dia e leia o capítulo relacionado.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                  <span>Retome o plano bíblico do ponto onde você parou.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                  <span>Use Rádio e Podcast como apoio para seguir em constância.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-12 rounded-3xl bg-[#212121] p-6 md:p-8 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
              <div className="max-w-3xl">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Descoberta fluida
                </p>
                <h2 className="font-acme text-3xl md:text-4xl tracking-wide mb-4">
                  Leia, medite e ouça durante a semana
                </h2>
                <p className="text-white/80 leading-relaxed">
                  Use Bíblia, versículo, devocional e plano como eixo principal
                  da sua rotina. Quando quiser seguir em constância ao longo do
                  dia, Rádio e Podcast entram como apoio em áudio para continuar
                  perto da Palavra.
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {spiritualFeatures.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)]"
              >
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  {feature.destaque}
                </p>
                <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-4 group-hover:text-[#ef5350] transition-colors">
                  {feature.titulo}
                </h2>
                <p className="text-sm font-medium text-[#8b5b18] leading-relaxed mb-4">
                  {feature.uso}
                </p>
                <p className="text-[#555] leading-relaxed mb-6">
                  {feature.descricao}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  <p className="ui-link-accent inline-flex">{feature.ctaLabel} →</p>
                  {feature.supportHref && feature.supportLabel ? (
                    <span className="text-xs text-[#777]">
                      Continue com{" "}
                      <span className="font-semibold text-[#212121]">
                        {feature.supportLabel}
                      </span>
                    </span>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
