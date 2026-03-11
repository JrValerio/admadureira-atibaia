import HeroPage from "@/components/HeroPage";
import Programacao from "@/sections/Programacao";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Programação Semanal | AD Madureira Atibaia",
  description:
    "Veja a programação semanal da AD Madureira Atibaia: cultos, reuniões de jovens, damas, escola bíblica e muito mais.",
  path: "/programacao",
});

export default function ProgramacaoPage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <section className="pt-16 md:pt-20 pb-0">
        <div className="max-w-6xl mx-auto px-4">
          <HeroPage
            label="Vida da Igreja"
            title="Programação Semanal"
            description="Veja a programação fixa da AD Madureira Atibaia e acompanhe os cultos, reuniões e encontros que marcam a rotina da igreja."
            image="/fachada-da-igreja.jpg"
            imageAlt="Fachada da AD Madureira Atibaia"
          />
        </div>
      </section>
      <Programacao showHeader={false} />
    </main>
  );
}
