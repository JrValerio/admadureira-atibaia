import type { EventoFuturo } from "@/lib/agenda-utils";
import { CHURCH_OFFICIAL_NAME, SEDE_POSTAL_ADDRESS } from "@/data/site";
import { buildEventSchedule } from "@/lib/event-date";
import { resolveSiteUrl, SITE_URL } from "@/lib/site";

const EVENT_ORGANIZER_NAME = "AD Madureira Atibaia";
const DEFAULT_EVENT_LOCATION_NAME = CHURCH_OFFICIAL_NAME;

function getEventDescription(evento: EventoFuturo) {
  return (
    evento.descricao ??
    `${evento.titulo} na AD Madureira Atibaia em ${evento.data}.`
  );
}

function buildEventEntity(evento: EventoFuturo) {
  const schedule = buildEventSchedule(evento.data, evento.horario, evento.ano);
  const image = resolveSiteUrl(
    evento.hero ?? evento.imagem ?? evento.banner ?? "/fachada-da-igreja.jpg"
  );
  const url = resolveSiteUrl(`/eventos/${evento.slug}`);
  const locationName = evento.local ?? DEFAULT_EVENT_LOCATION_NAME;

  return {
    "@type": "Event",
    "@id": `${url}#event`,
    name: evento.titulo,
    description: getEventDescription(evento),
    inLanguage: "pt-BR",
    startDate: schedule.startDate,
    ...(schedule.endDate ? { endDate: schedule.endDate } : {}),
    image: [image],
    location: {
      "@type": "Place",
      name: locationName,
      address: SEDE_POSTAL_ADDRESS,
    },
    organizer: {
      "@type": "Organization",
      name: EVENT_ORGANIZER_NAME,
      url: SITE_URL,
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
    },
  };
}

export function buildEventJsonLd(evento: EventoFuturo) {
  return {
    "@context": "https://schema.org",
    ...buildEventEntity(evento),
  };
}

export function buildEventListJsonLd(eventos: EventoFuturo[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Eventos da AD Madureira Atibaia",
    description:
      "Lista de próximos eventos, congressos, vigílias, encontros e cultos especiais da AD Madureira Atibaia.",
    url: resolveSiteUrl("/eventos"),
    numberOfItems: eventos.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: eventos.map((evento, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: resolveSiteUrl(`/eventos/${evento.slug}`),
      item: buildEventEntity(evento),
    })),
  };
}
