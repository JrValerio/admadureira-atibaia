import Hero from "@/sections/Hero";
import HomeAgenda from "@/sections/HomeAgenda";
import HeroEventos from "@/components/HeroEventos";
import { getHeroEventos } from "@/data/hero";
import DailySpiritual from "@/sections/DailySpiritual";
import HomeEBD from "@/sections/HomeEBD";
import Destaques from "@/sections/Destaques";
import Cultos from "@/sections/Cultos";

export const revalidate = 3600;

export default function Home() {
  const heroEventos = getHeroEventos();

  return (
    <main className="pt-0">
      <Hero />
      <HomeAgenda />
      <HeroEventos eventos={heroEventos} />
      <DailySpiritual />
      <HomeEBD />
      <Destaques />
      <Cultos />
    </main>
  );
}
