import HeroPage from "@/components/HeroPage";
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
          image="/fachada-da-igreja.jpg"
          imageAlt="Fachada da AD Madureira Atibaia"
        />
        <Programacao showHeader={false} />
      </main>
    </>
  );
}
