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
    <main className="pt-[80px]">
      <Programacao />
    </main>
  );
}
