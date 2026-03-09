import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import Destaques from "@/sections/Destaques";
import Cultos from "@/sections/Cultos";
import Ministerios from "@/sections/Ministerios";
import Sobre from "@/sections/Sobre";
import Contato from "@/sections/Contato";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-0">
        <Hero />
        <Destaques />
        <Cultos />
        <Ministerios />
        <Sobre />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
