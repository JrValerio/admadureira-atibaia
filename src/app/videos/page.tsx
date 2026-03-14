import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import Videos from "@/sections/Videos";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Cultos e Vídeos | AD Madureira Atibaia",
  description:
    "Assista aos últimos cultos e pregações da AD Madureira Atibaia no YouTube.",
  path: "/videos",
});

export default function VideosPage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <HeroPage
        variant="full"
        label="Canal no YouTube"
        title="Cultos e vídeos"
        description="Assista aos últimos cultos e pregações da AD Madureira Atibaia, com transmissões ao vivo, destaques da semana e biblioteca de vídeos."
        image={igrejaHeroMedia.videos}
        imageAlt="Púlpito da AD Madureira Atibaia"
      />
      <Videos showHeader={false} />
    </main>
  );
}
