import HeroPage from "@/components/HeroPage";
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
      <section className="pt-16 md:pt-20 pb-0">
        <div className="max-w-6xl mx-auto px-4">
          <HeroPage
            label="Departamentos"
            title="Ministérios da Igreja"
            description="Conheça os ministérios da AD Madureira Atibaia e veja como cada área serve a igreja por meio do discipulado, da adoração, da oração e da formação cristã."
            image="/fachada-da-igreja.jpg"
            imageAlt="Fachada da AD Madureira Atibaia"
          />
        </div>
      </section>
      <Ministerios showHeader={false} />
    </main>
  );
}
