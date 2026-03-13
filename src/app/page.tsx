import Hero from "@/sections/Hero";
import HeroEventos from "@/components/HeroEventos";
import ContadorEvento from "@/components/ContadorEvento";
import DailySpiritual from "@/sections/DailySpiritual";
import Destaques from "@/sections/Destaques";
import Cultos from "@/sections/Cultos";

export const revalidate = 86400;

export default function Home() {
  return (
    <main className="pt-0">
      <Hero />
      <HeroEventos />
      <ContadorEvento />
      <DailySpiritual />
      <Destaques />
      <Cultos />
    </main>
  );
}
