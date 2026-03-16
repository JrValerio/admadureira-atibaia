import Hero from "@/sections/Hero";
import HeroEventos from "@/components/HeroEventos";
import { getHeroEventos } from "@/data/hero";
import Destaques from "@/sections/Destaques";
import DailySpiritual from "@/sections/DailySpiritual";
import HomeEBD from "@/sections/HomeEBD";
import Cultos from "@/sections/Cultos";

export const revalidate = 3600;

export default function Home() {
  const heroEventos = getHeroEventos();

  return (
    <main className="pt-0">
      <Hero />
      <HeroEventos eventos={heroEventos} />
      <Destaques />
      <DailySpiritual />
      <HomeEBD />
      <Cultos />
    </main>
  );
}
