import Hero from "@/sections/Hero";
import HeroEventos from "@/components/HeroEventos";
import { getHeroEventos } from "@/data/hero";
import { getYouTubeFeed } from "@/lib/youtube";
import Cultos from "@/sections/Cultos";
import HomeEBD from "@/sections/HomeEBD";
import DailySpiritual from "@/sections/DailySpiritual";
import Destaques from "@/sections/Destaques";

// Next.js requires route segment config exports to stay statically analyzable.
export const revalidate = 120;

export default async function Home() {
  const heroEventos = getHeroEventos();
  const { liveNow } = await getYouTubeFeed();

  return (
    <main className="pt-0">
      <Hero liveNow={liveNow} />
      <HeroEventos eventos={heroEventos} />
      <Cultos />
      <HomeEBD />
      <DailySpiritual />
      <Destaques />
    </main>
  );
}
