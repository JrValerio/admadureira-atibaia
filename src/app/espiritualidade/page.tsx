import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import { spiritualFeatures } from "@/data/espiritualidade";
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
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 mb-12">
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Jornada de fé
              </p>
              <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-5">
                Recursos para leitura, oração e constância espiritual
              </h2>
              <div className="space-y-4 text-[#555] leading-relaxed">
                <p>
                  Esta área organiza recursos práticos para quem deseja manter
                  uma rotina de leitura bíblica, reflexão devocional e consumo de
                  conteúdo cristão ao longo da semana.
                </p>
                <p>
                  O objetivo é transformar o site da igreja em uma plataforma de
                  apoio espiritual, não apenas em uma vitrine institucional.
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
                  <span>Leia um capítulo da Bíblia e salve sua referência do dia.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                  <span>Escolha um plano simples de leitura para manter constância.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                  <span>Leia um devocional curto com aplicação e oração.</span>
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
