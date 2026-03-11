import Oracao from "@/sections/Oracao";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Pedido de Oração | AD Madureira Atibaia",
  description:
    "Envie seu pedido de oração para a equipe de intercessão da AD Madureira Atibaia.",
  path: "/oracao",
});

export default function OracaoPage() {
  return (
    <main className="pt-[80px]">
      <Oracao />
    </main>
  );
}
