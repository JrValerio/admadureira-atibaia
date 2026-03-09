import Hero from "@/sections/Hero";
import HeroEventos from "@/components/HeroEventos";
import Destaques from "@/sections/Destaques";
import ProximosEventos from "@/sections/ProximosEventos";
import Cultos from "@/sections/Cultos";

export default function Home() {
  return (
    <main className="pt-0">
      <Hero />
      <HeroEventos />
      <Destaques />
      <ProximosEventos />
      <Cultos />
    </main>
  );
}
