import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import Sobre from "@/sections/Sobre";
import HistoriasDeFe from "@/sections/HistoriasDeFe";
import { Section } from "@/components/ui/Section";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Nossa Igreja | AD Madureira Atibaia",
  description:
    "Conheça a história, missão, visão, valores e a liderança pastoral da Igreja Assembleia de Deus Ministério Madureira – Campo de Atibaia, fundada em 1977.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <HeroPage
        variant="full"
        label="Campo de Atibaia"
        title="Nossa Igreja"
        description="Conheça a história, a missão, os valores e a liderança pastoral da Igreja Assembleia de Deus Ministério Madureira no Campo de Atibaia."
        image={igrejaHeroMedia.sobre}
        imageAlt="Igreja reunida em culto na AD Madureira Atibaia"
      />
      <Sobre showHeader={false} />
      <HistoriasDeFe />
      <Section bg="gray" className="text-center">
        <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
          Primeira visita
        </p>
        <h2 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-4">
          Você é bem-vindo aqui
        </h2>
        <p className="text-[#5f5f5f] leading-relaxed max-w-2xl mx-auto mb-8">
          Não importa de onde você vem ou como chegou até aqui. Nossa porta está
          sempre aberta para quem busca a Deus.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contato" className="ui-btn-primary">
            Como chegar
          </Link>
          <Link href="/programacao" className="ui-btn-secondary">
            Ver programação
          </Link>
        </div>
      </Section>
    </main>
  );
}
