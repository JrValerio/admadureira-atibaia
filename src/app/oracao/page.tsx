import HeroPage from "@/components/HeroPage";
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
    <main className="bg-[#f5f5f5] min-h-screen">
      <HeroPage
        variant="full"
        label="Intercessão"
        title="Pedido de Oração"
        description="Compartilhe seu pedido conosco. A equipe de intercessão da AD Madureira Atibaia caminha em oração com você e sua família."
        image="/pulpito-da-igreja.jpg"
        imageAlt="Púlpito da AD Madureira Atibaia"
      />
      <Oracao showHeader={false} />
    </main>
  );
}
