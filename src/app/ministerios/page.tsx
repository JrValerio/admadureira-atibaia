import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import { getMinisterios } from "@/data/ministerios";
import Ministerios from "@/sections/Ministerios";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Ministérios | AD Madureira Atibaia",
  description:
    "Conheça os ministérios da AD Madureira Atibaia, como CONFADAT, UMADAT, Rios de Unção, Baluarte da Fé e Ministério Infantil.",
  path: "/ministerios",
  image: igrejaHeroMedia.ministerios,
});

export default function MinisteriosPage() {
  const ministerios = getMinisterios();
  const ministeriosDoCampo = ministerios.filter(
    (ministerio) => ministerio.escopo === "Campo de Atibaia"
  );
  const ministeriosLocais = ministerios.filter(
    (ministerio) => ministerio.escopo === "Local"
  );
  const canonicalUrl = resolveSiteUrl("/ministerios");
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
        name: "Ministérios",
        item: canonicalUrl,
      },
    ],
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ministérios da Igreja",
    description:
      "Conheça os ministérios da AD Madureira Atibaia e veja como cada área serve a igreja por meio do discipulado, da adoração, da oração e da formação cristã.",
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
          label="Departamentos"
          title="Ministérios da Igreja"
          description="Conheça os ministérios da AD Madureira Atibaia e veja como cada área serve a igreja por meio do discipulado, da adoração, da oração e da formação cristã."
          image={igrejaHeroMedia.ministerios}
          imageAlt="Culto na AD Madureira Atibaia"
          imageClassName="object-[center_34%]"
        />

        <section className="pt-16 md:pt-20">
          <div className="ui-page-container">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#777]"
            >
              <Link href="/" className="hover:underline">
                Início
              </Link>
              <span>›</span>
              <span className="font-medium text-[#212121]">Ministérios</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
              <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Vida da igreja
                </p>
                <h2 className="font-acme text-xl md:text-4xl text-[#212121] tracking-wide mb-5">
                  Áreas que acolhem, discipulam, servem e fortalecem a comunidade
                </h2>
                <div className="space-y-4 text-sm md:text-base text-[#555] leading-7 md:leading-8">
                  <p>
                    Os ministérios da AD Madureira Atibaia fazem parte da vida
                    cotidiana da igreja. Eles ajudam a transformar a comunhão em
                    serviço, a formação bíblica em prática e o cuidado pastoral
                    em presença real nas diferentes frentes da comunidade.
                  </p>
                  <p>
                    Alguns atuam em todo o Campo de Atibaia, fortalecendo o
                    vínculo entre congregações. Outros servem diretamente a
                    igreja local, acompanhando faixas etárias, departamentos e
                    necessidades específicas da rotina cristã.
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-4">
                  <Link href="/historia" className="ui-btn-secondary">
                    Ver história da igreja
                  </Link>
                  <Link href="/congregacoes" className="ui-btn-primary">
                    Ver congregações
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Estrutura ministerial
                </p>
                <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-5">
                  Do campo à igreja local, cada frente reforça uma dimensão da caminhada cristã
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                  <div>
                    <p className="font-acme text-2xl md:text-4xl text-[#212121]">
                      {ministerios.length}
                    </p>
                    <p className="text-[#555] text-sm mt-1">Ministérios em destaque</p>
                  </div>
                  <div>
                    <p className="font-acme text-2xl md:text-4xl text-[#212121]">
                      {ministeriosDoCampo.length}
                    </p>
                    <p className="text-[#555] text-sm mt-1">Frentes do campo</p>
                  </div>
                  <div>
                    <p className="font-acme text-2xl md:text-4xl text-[#212121]">
                      {ministeriosLocais.length}
                    </p>
                    <p className="text-[#555] text-sm mt-1">Frentes locais</p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-[#555] leading-7 md:leading-8">
                  O conjunto desses ministérios mostra uma igreja que cuida de
                  famílias, mulheres, juventude, crianças e diferentes áreas de
                  serviço cristão com identidade, comunhão e propósito.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Ministerios showHeader={false} />
      </main>
    </>
  );
}
