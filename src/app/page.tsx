import Hero from "@/sections/Hero";
import HeroEventos from "@/components/HeroEventos";
import ContadorEvento from "@/components/ContadorEvento";
import Destaques from "@/sections/Destaques";
import ProximosEventos from "@/sections/ProximosEventos";
import Cultos from "@/sections/Cultos";
import UltimasMensagens from "@/sections/UltimasMensagens";
import VersiculoDoDia from "@/sections/VersiculoDoDia";
import HistoriasDeFe from "@/sections/HistoriasDeFe";

export const revalidate = 86400;

export default function Home() {
  return (
    <main className="pt-0">
      <Hero />
      <HeroEventos />
      <ContadorEvento />
      <VersiculoDoDia />
      <Destaques />
      <ProximosEventos />
      <UltimasMensagens />
      <HistoriasDeFe />
      <Cultos />
    </main>
  );
}
