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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {spiritualFeatures.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-shadow"
              >
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  {feature.destaque}
                </p>
                <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-4 group-hover:text-[#ef5350] transition-colors">
                  {feature.titulo}
                </h2>
                <p className="text-[#555] leading-relaxed mb-6">
                  {feature.descricao}
                </p>
                <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase">
                  Acessar recurso →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
