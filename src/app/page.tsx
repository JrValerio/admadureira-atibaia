import Hero from "@/sections/Hero";
import Destaques from "@/sections/Destaques";
import ProximosEventos from "@/sections/ProximosEventos";
import Cultos from "@/sections/Cultos";

export default function Home() {
  return (
    <main className="pt-0">
      <Hero />
      <Destaques />
      <ProximosEventos />
      <Cultos />
    </main>
  );
}
