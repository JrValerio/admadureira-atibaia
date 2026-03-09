import type { Metadata } from "next";
import Eventos from "@/sections/Eventos";

export const metadata: Metadata = {
  title: "Eventos e Agenda | AD Madureira Atibaia",
  description:
    "Confira os próximos eventos da AD Madureira Atibaia: congressos, vigílias, encontros e cultos especiais.",
};

export default function EventosPage() {
  return (
    <main className="pt-[80px]">
      <Eventos />
    </main>
  );
}
