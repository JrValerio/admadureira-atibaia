import HeroPage from "@/components/HeroPage";
import Sobre from "@/sections/Sobre";
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
        image="/pulpito-da-igreja.jpg"
        imageAlt="Púlpito da AD Madureira Atibaia"
      />
      <Sobre showHeader={false} />
    </main>
  );
}
