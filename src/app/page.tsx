import Hero from "@/sections/Hero";
import HeroEventos from "@/components/HeroEventos";
import ContadorEvento from "@/components/ContadorEvento";
import DailyReminder from "@/components/spiritual/DailyReminder";
import Destaques from "@/sections/Destaques";
import Cultos from "@/sections/Cultos";
import VersiculoDoDia from "@/sections/VersiculoDoDia";

export const revalidate = 86400;

export default function Home() {
  return (
    <main className="pt-0">
      <Hero />
      <HeroEventos />
      <ContadorEvento />
      <DailyReminder />
      <VersiculoDoDia />
      <Destaques />
      <Cultos />
    </main>
  );
}
