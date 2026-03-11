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
    <main className="pt-[80px]">
      <Sobre />
    </main>
  );
}
