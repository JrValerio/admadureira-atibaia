import HeroPage from "@/components/HeroPage";
import Programacao from "@/sections/Programacao";
import { buildPageMetadata } from "@/lib/site";

export const revalidate = 3600;

export const metadata = buildPageMetadata({
  title: "Programação da Igreja | AD Madureira Atibaia",
  description:
    "Veja a programação semanal da AD Madureira Atibaia com cultos, reuniões e atividades fixas da igreja ao longo da semana.",
  path: "/programacao",
});

export default function ProgramacaoPage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <HeroPage
        variant="full"
        label="Vida da Igreja"
        title="Programação da Igreja"
        description="Veja os cultos, reuniões e atividades fixas da AD Madureira Atibaia ao longo da semana."
        image="/fachada-da-igreja.jpg"
        imageAlt="Fachada da AD Madureira Atibaia"
      />
      <Programacao showHeader={false} />
    </main>
  );
}
