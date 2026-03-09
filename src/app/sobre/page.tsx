import type { Metadata } from "next";
import Sobre from "@/sections/Sobre";

export const metadata: Metadata = {
  title: "Nossa Igreja | AD Madureira Atibaia",
  description:
    "Conheça a história, missão, visão e valores da Igreja Assembleia de Deus Ministério Madureira – Campo de Atibaia, fundada em 1977.",
};

export default function SobrePage() {
  return (
    <main className="pt-[80px]">
      <Sobre />
    </main>
  );
}
