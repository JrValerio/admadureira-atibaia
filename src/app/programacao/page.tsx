import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import Programacao from "@/sections/Programacao";
import {
  buildPageMetadata,
  resolveSiteUrl,
  SITE_NAME,
} from "@/lib/site";

export const revalidate = 3600;

export const metadata = buildPageMetadata({
  title: "Programação da Igreja | AD Madureira Atibaia",
  description:
    "Veja a programação semanal da AD Madureira Atibaia com cultos, reuniões e atividades fixas da igreja ao longo da semana.",
  path: "/programacao",
});

export default function ProgramacaoPage() {
  const canonicalUrl = resolveSiteUrl("/programacao");
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
        name: "Programação",
        item: canonicalUrl,
      },
    ],
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Programação da Igreja",
    description:
      "Veja os cultos, reuniões e atividades fixas da AD Madureira Atibaia ao longo da semana.",
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
  };

  return (
    <>
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
          label="Vida da Igreja"
          title="Programação da Igreja"
          description="Veja os cultos, reuniões e atividades fixas da AD Madureira Atibaia ao longo da semana."
          image={igrejaHeroMedia.programacao}
          imageAlt="Culto da AD Madureira Atibaia"
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
                    Organize sua semana e veja como participar
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                    Depois de conferir a rotina semanal da igreja, veja também os
                    eventos especiais, a Escola Bíblica Dominical e como chegar
                    à sede em Atibaia.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/eventos" className="ui-btn-primary">
                    Ver eventos especiais
                  </Link>
                  <Link href="/ebd" className="ui-btn-secondary">
                    Escola Bíblica Dominical
                  </Link>
                  <Link href="/contato" className="ui-btn-secondary">
                    Como chegar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Programacao showHeader={false} />
      </main>
    </>
  );
}
