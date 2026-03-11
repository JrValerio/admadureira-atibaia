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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListSchema) }}
      />
      <Eventos eventos={eventos} />
    </main>
  );
}
