import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import Contato from "@/sections/Contato";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Contato | AD Madureira Atibaia",
  description:
    "Entre em contato com a AD Madureira Atibaia. Praça Pio XII, 122 – Centro, Atibaia/SP. WhatsApp: (11) 91611-6102. Telefone: (11) 4411-6116.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <HeroPage
        variant="full"
        label="Venha nos visitar"
        title="Contato e localização"
        description="Encontre a sede da AD Madureira Atibaia, consulte os canais oficiais e fale com a igreja por WhatsApp, telefone ou redes sociais."
        image={igrejaHeroMedia.contato}
        imageAlt="Fachada da AD Madureira Atibaia"
        imageClassName="object-[center_34%]"
      />
      <Contato showHeader={false} />
    </main>
  );
}
