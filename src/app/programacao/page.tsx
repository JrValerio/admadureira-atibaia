import type { Metadata } from "next";
import Programacao from "@/sections/Programacao";

export const metadata: Metadata = {
  title: "Programação Semanal | AD Madureira Atibaia",
  description:
    "Veja a programação semanal da AD Madureira Atibaia: cultos, reuniões de jovens, damas, escola bíblica e muito mais.",
};

export default function ProgramacaoPage() {
  return (
    <main className="pt-[80px]">
      <Programacao />
    </main>
  );
}
