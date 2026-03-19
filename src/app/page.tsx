import Hero from "@/sections/Hero";
import HeroEventos from "@/components/HeroEventos";
import { getHeroEventos } from "@/data/hero";
import Cultos from "@/sections/Cultos";
import HomeEBD from "@/sections/HomeEBD";
import DailySpiritual from "@/sections/DailySpiritual";
import Destaques from "@/sections/Destaques";

export const revalidate = 3600;

export default function Home() {
  const heroEventos = getHeroEventos();

  return (
    <main className="pt-0">
      <Hero />
      <HeroEventos eventos={heroEventos} />
      <Cultos />
      <HomeEBD />
      <DailySpiritual />
      <Destaques />
    </main>
  );
}
