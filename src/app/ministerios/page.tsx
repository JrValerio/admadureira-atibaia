import type { Metadata } from "next";
import Ministerios from "@/sections/Ministerios";

export const metadata: Metadata = {
  title: "Ministérios | AD Madureira Atibaia",
  description:
    "Conheça os ministérios da AD Madureira Atibaia: Jovens, Crianças, Louvor, Intercessão, Mulheres e Homens.",
};

export default function MinisteriosPage() {
  return (
    <main className="pt-[80px]">
      <Ministerios />
    </main>
  );
}
