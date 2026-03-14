import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
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
        image={igrejaHeroMedia.oracao}
        imageAlt="Interior da AD Madureira Atibaia em momento de oração"
        imageClassName="object-[center_38%]"
      />
      <Oracao showHeader={false} />
    </main>
  );
}
