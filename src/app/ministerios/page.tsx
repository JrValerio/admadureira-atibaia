import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import Ministerios from "@/sections/Ministerios";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Ministérios | AD Madureira Atibaia",
  description:
    "Conheça os ministérios da AD Madureira Atibaia, como CONFADAT, UMADAT, Rios de Unção, Baluarte da Fé e Ministério Infantil.",
  path: "/ministerios",
});

export default function MinisteriosPage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <HeroPage
        variant="full"
        label="Departamentos"
        title="Ministérios da Igreja"
        description="Conheça os ministérios da AD Madureira Atibaia e veja como cada área serve a igreja por meio do discipulado, da adoração, da oração e da formação cristã."
        image={igrejaHeroMedia.ministerios}
        imageAlt="Culto na AD Madureira Atibaia"
        imageClassName="object-[center_34%]"
      />
      <Ministerios showHeader={false} />
    </main>
  );
}
