import type { Metadata } from "next";
import Oracao from "@/sections/Oracao";

export const metadata: Metadata = {
  title: "Pedido de Oração | AD Madureira Atibaia",
  description:
    "Envie seu pedido de oração para a equipe de intercessão da AD Madureira Atibaia.",
};

export default function OracaoPage() {
  return (
    <main className="pt-[80px]">
      <Oracao />
    </main>
  );
}
