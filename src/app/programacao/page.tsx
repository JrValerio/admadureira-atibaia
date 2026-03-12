import HeroPage from "@/components/HeroPage";
import Programacao from "@/sections/Programacao";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Programação da Igreja | AD Madureira Atibaia",
  description:
    "Veja a programação semanal da AD Madureira Atibaia e acompanhe a agenda anual de 2026 com cultos, reuniões e eventos especiais da igreja.",
  path: "/programacao",
});

export default function ProgramacaoPage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <section className="pt-16 md:pt-20 pb-0">
        <div className="max-w-6xl mx-auto px-4">
          <HeroPage
            label="Vida da Igreja"
            title="Programação da Igreja"
            description="Veja a programação semanal da AD Madureira Atibaia e acompanhe a agenda anual de 2026 com cultos, reuniões e eventos especiais da igreja."
            image="/fachada-da-igreja.jpg"
            imageAlt="Fachada da AD Madureira Atibaia"
          />
        </div>
      </section>
      <Programacao showHeader={false} />
    </main>
  );
}
