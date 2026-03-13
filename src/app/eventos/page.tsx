import HeroPage from "@/components/HeroPage";
import Eventos from "@/sections/Eventos";
import { getEventosFuturos } from "@/lib/agenda-utils";
import { buildEventListJsonLd } from "@/lib/event-schema";
import {
  buildPageMetadata,
  resolveSiteUrl,
  SITE_NAME,
} from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Eventos da Igreja | AD Madureira Atibaia",
  description:
    "Confira os próximos eventos especiais da AD Madureira Atibaia, com congressos, campanhas, batismos e cultos especiais.",
  path: "/eventos",
});

export default function EventosPage() {
  const eventos = getEventosFuturos(12);
  const canonicalUrl = resolveSiteUrl("/eventos");
  const eventListSchema = {
    ...buildEventListJsonLd(eventos),
    "@id": `${canonicalUrl}#event-list`,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: resolveSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Eventos",
        item: canonicalUrl,
      },
    ],
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Eventos da Igreja",
    description:
      "Acompanhe os próximos congressos, campanhas, batismos e celebrações especiais da AD Madureira Atibaia.",
    url: canonicalUrl,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: resolveSiteUrl("/"),
    },
    breadcrumb: {
      "@id": `${canonicalUrl}#breadcrumb`,
    },
    mainEntity: {
      "@id": `${canonicalUrl}#event-list`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <main className="bg-[#f5f5f5] min-h-screen">
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
    </>
  );
}
