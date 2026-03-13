import HeroPage from "@/components/HeroPage";
import Eventos from "@/sections/Eventos";
import { getEventosFuturos } from "@/lib/agenda-utils";
import { buildEventListJsonLd } from "@/lib/event-schema";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Eventos da Igreja | AD Madureira Atibaia",
  description:
    "Confira os próximos eventos especiais da AD Madureira Atibaia, com congressos, campanhas, batismos e cultos especiais.",
  path: "/eventos",
});

export default function EventosPage() {
  const eventos = getEventosFuturos(12);
  const eventListSchema = buildEventListJsonLd(eventos);

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListSchema) }}
      />
      <HeroPage
        variant="full"
        label="Agenda da Igreja"
        title="Eventos da Igreja"
        description="Acompanhe os próximos congressos, campanhas, batismos e celebrações especiais da AD Madureira Atibaia."
        image="/fachada-da-igreja.jpg"
        imageAlt="Fachada da AD Madureira Atibaia"
      />
      <Eventos eventos={eventos} showHeader={false} />
    </main>
  );
}
