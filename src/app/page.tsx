import Hero from "@/sections/Hero";
import HomeAgenda from "@/sections/HomeAgenda";
import HeroEventos from "@/components/HeroEventos";
import DailySpiritual from "@/sections/DailySpiritual";
import Destaques from "@/sections/Destaques";
import Cultos from "@/sections/Cultos";

export const revalidate = 3600;

export default function Home() {
  return (
    <main className="pt-0">
      <Hero />
      <HomeAgenda />
      <HeroEventos />
      <DailySpiritual />
      <Destaques />
      <Cultos />
    </main>
  );
}
