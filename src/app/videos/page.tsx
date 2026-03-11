import HeroPage from "@/components/HeroPage";
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
      <section className="pt-16 md:pt-20 pb-0">
        <div className="max-w-6xl mx-auto px-4">
          <HeroPage
            label="Canal no YouTube"
            title="Cultos e vídeos"
            description="Assista aos últimos cultos e pregações da AD Madureira Atibaia, com transmissões ao vivo, destaques da semana e biblioteca de vídeos."
            image="/pulpito-da-igreja.jpg"
            imageAlt="Púlpito da AD Madureira Atibaia"
          />
        </div>
      </section>
      <Videos showHeader={false} />
    </main>
  );
}
