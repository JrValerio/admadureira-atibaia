import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
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
  const eventos = getEventosFuturos();
  const proximoEvento = eventos[0] ?? null;
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
          image={igrejaHeroMedia.eventos}
          imageAlt="Fachada da AD Madureira Atibaia"
        />
        <section className="border-b border-black/5 bg-white/90">
          <div className="ui-page-container py-5 md:py-6">
            <div className="ui-panel ui-panel-pad-sm">
              <p className="ui-section-eyebrow ui-section-eyebrow--gold">
                Próximo passo
              </p>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="font-acme text-xl tracking-wide text-[#212121] md:text-2xl">
                    Acompanhe a agenda especial e planeje sua visita
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                    Confira o próximo encontro especial da igreja e, se for a sua
                    primeira vez, veja também a programação semanal e como chegar.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {proximoEvento ? (
                    <Link href={`/eventos/${proximoEvento.slug}`} className="ui-btn-primary">
                      Abrir próximo evento
                    </Link>
                  ) : null}
                  <Link href="/programacao" className="ui-btn-secondary">
                    Ver programação semanal
                  </Link>
                  <Link href="/contato" className="ui-btn-secondary">
                    Como chegar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Eventos eventos={eventos} showHeader={false} />
      </main>
    </>
  );
}
