import HeroPage from "@/components/HeroPage";
import Eventos from "@/sections/Eventos";
import { getEventosFuturos } from "@/lib/agenda-utils";
import { buildEventListJsonLd } from "@/lib/event-schema";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Eventos e Agenda | AD Madureira Atibaia",
  description:
    "Confira os próximos eventos da AD Madureira Atibaia: congressos, vigílias, encontros e cultos especiais.",
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
      <section className="pt-16 md:pt-20 pb-0">
        <div className="max-w-6xl mx-auto px-4">
          <HeroPage
            label="Agenda da Igreja"
            title="Eventos e agenda"
            description="Confira os próximos eventos da AD Madureira Atibaia, com congressos, vigílias, encontros e cultos especiais para toda a comunidade."
            image="/fachada-da-igreja.jpg"
            imageAlt="Fachada da AD Madureira Atibaia"
          />
        </div>
      </section>
      <Eventos eventos={eventos} showHeader={false} />
    </main>
  );
}
