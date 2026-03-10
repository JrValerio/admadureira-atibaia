import Hero from "@/sections/Hero";
import HeroEventos from "@/components/HeroEventos";
import ContadorEvento from "@/components/ContadorEvento";
import Destaques from "@/sections/Destaques";
import ProximosEventos from "@/sections/ProximosEventos";
import Cultos from "@/sections/Cultos";
import UltimasMensagens from "@/sections/UltimasMensagens";
import HistoriasDeFe from "@/sections/HistoriasDeFe";

export default function Home() {
  return (
    <main className="pt-0">
      <Hero />
      <HeroEventos />
      <ContadorEvento />
      <Destaques />
      <ProximosEventos />
      <UltimasMensagens />
      <HistoriasDeFe />
      <Cultos />
    </main>
  );
}
