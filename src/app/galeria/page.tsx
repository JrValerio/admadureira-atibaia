import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import GalleryAlbumCard from "@/components/gallery/GalleryAlbumCard";
import {
  GALERIA_PAGE_COPY,
  getGaleriaAlbuns,
  getGaleriaAlbumCount,
  getGaleriaPhotoCount,
} from "@/data/galeria";
import { igrejaHeroMedia } from "@/data/igreja-media";
import {
  buildPageMetadata,
  resolveSiteUrl,
  SITE_NAME,
} from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Galeria | AD Madureira Atibaia",
  description: GALERIA_PAGE_COPY.heroDescription,
  path: "/galeria",
  image: igrejaHeroMedia.eventos,
});

export default function GaleriaPage() {
  const albuns = getGaleriaAlbuns();
  const totalAlbuns = getGaleriaAlbumCount();
  const totalFotos = getGaleriaPhotoCount();
  const canonicalUrl = resolveSiteUrl("/galeria");
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
        name: "Galeria",
        item: canonicalUrl,
      },
    ],
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Galeria da Igreja",
    description: GALERIA_PAGE_COPY.heroDescription,
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
  const itemListSchema =
    albuns.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${canonicalUrl}#albums`,
          itemListElement: albuns.map((album, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: album.title,
            url: resolveSiteUrl(`/galeria/${album.slug}`),
          })),
        }
      : null;

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
      {itemListSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      ) : null}

      <main className="min-h-screen bg-[#f5f5f5]">
        <HeroPage
          variant="full"
          label={GALERIA_PAGE_COPY.heroLabel}
          title={GALERIA_PAGE_COPY.heroTitle}
          description={GALERIA_PAGE_COPY.heroDescription}
          image={igrejaHeroMedia.eventos}
          imageAlt="Registros da AD Madureira Atibaia durante um culto no templo sede"
        />

        <section className="border-b border-black/5 bg-white/90">
          <div className="ui-page-container py-5 md:py-6">
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex flex-wrap items-center gap-2 text-sm text-[#666]"
            >
              <Link href="/" className="transition-colors hover:text-[#212121]">
                Início
              </Link>
              <span>/</span>
              <span className="text-[#212121]">Galeria</span>
            </nav>

            <div className="ui-panel ui-panel-pad-sm">
              <p className="ui-section-eyebrow ui-section-eyebrow--gold">Galeria</p>

              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <h2 className="font-acme text-xl tracking-wide text-[#212121] md:text-2xl">
                    {GALERIA_PAGE_COPY.introTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                    {GALERIA_PAGE_COPY.introDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {albuns[0] ? (
                    <Link href={`/galeria/${albuns[0].slug}`} className="ui-btn-primary">
                      Abrir álbum mais recente
                    </Link>
                  ) : null}
                  <Link href="/programacao" className="ui-btn-secondary">
                    Ver programação
                  </Link>
                  <Link href="/videos" className="ui-btn-secondary">
                    Assistir transmissões
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <article className="ui-panel-accent ui-panel-pad-sm h-full">
                  <p className="mb-2 text-[11px] font-bold tracking-widest text-[#ef5350] uppercase">
                    Álbuns
                  </p>
                  <h3 className="font-acme text-lg tracking-wide text-[#212121] md:text-xl">
                    {totalAlbuns}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f]">
                    Cada álbum reúne momentos especiais da vida da igreja em uma
                    navegação simples e agradável.
                  </p>
                </article>

                <article className="ui-panel-accent ui-panel-pad-sm h-full">
                  <p className="mb-2 text-[11px] font-bold tracking-widest text-[#ef5350] uppercase">
                    Fotos
                  </p>
                  <h3 className="font-acme text-lg tracking-wide text-[#212121] md:text-xl">
                    {totalFotos} imagens
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f]">
                    A proposta é reunir seleções menores e mais organizadas para
                    que cada registro seja visto com calma.
                  </p>
                </article>

                <article className="ui-panel-accent ui-panel-pad-sm h-full">
                  <p className="mb-2 text-[11px] font-bold tracking-widest text-[#ef5350] uppercase">
                    Memória
                  </p>
                  <h3 className="font-acme text-lg tracking-wide text-[#212121] md:text-xl">
                    Momentos da igreja
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f]">
                    Cada álbum procura guardar com reverência os momentos
                    especiais vividos pela igreja.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="ui-page-container py-10 md:py-14">
            <div className="mb-7 max-w-3xl md:mb-10">
              <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-[#ef5350] uppercase">
                Fotografias da igreja
              </p>
              <h2 className="font-acme text-2xl tracking-wide text-[#212121] md:text-4xl">
                Álbuns da igreja
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                Explore os registros disponíveis e acompanhe os novos álbuns que
                forem sendo adicionados.
              </p>
            </div>

            {albuns.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {albuns.map((album, index) => (
                  <GalleryAlbumCard
                    key={album.slug}
                    album={album}
                    priority={index < 2}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[1.9rem] border border-black/6 bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.05)] md:p-8">
                <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-[#ffa726] uppercase">
                  Em breve
                </p>
                <h3 className="font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                  {GALERIA_PAGE_COPY.emptyTitle}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                  {GALERIA_PAGE_COPY.emptyDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/programacao" className="ui-btn-primary">
                    Participar da programação
                  </Link>
                  <Link href="/videos" className="ui-btn-secondary">
                    Ver cultos em vídeo
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
