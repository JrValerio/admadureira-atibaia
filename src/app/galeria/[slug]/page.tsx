import Link from "next/link";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import {
  formatGaleriaDate,
  getGaleriaAlbumBySlug,
  getGaleriaAlbuns,
  getGaleriaCategoryLabel,
} from "@/data/galeria";
import {
  buildPageMetadata,
  resolveSiteUrl,
  SITE_NAME,
} from "@/lib/site";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getGaleriaAlbuns().map((album) => ({
    slug: album.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const album = getGaleriaAlbumBySlug(slug);

  if (!album) {
    return buildPageMetadata({
      title: "Galeria | AD Madureira Atibaia",
      description:
        "Veja os álbuns públicos publicados pela AD Madureira Atibaia.",
      path: "/galeria",
    });
  }

  return buildPageMetadata({
    title: `${album.title} | Galeria | AD Madureira Atibaia`,
    description:
      album.description ??
      album.shortDescription ??
      "Veja os registros fotográficos publicados neste álbum da AD Madureira Atibaia.",
    path: `/galeria/${album.slug}`,
    image: album.coverImage.src,
  });
}

export default async function GaleriaAlbumPage({ params }: Props) {
  const { slug } = await params;
  const album = getGaleriaAlbumBySlug(slug);

  if (!album) {
    notFound();
  }

  const canonicalUrl = resolveSiteUrl(`/galeria/${album.slug}`);
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
        item: resolveSiteUrl("/galeria"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: album.title,
        item: canonicalUrl,
      },
    ],
  };
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: album.title,
    description:
      album.description ??
      album.shortDescription ??
      "Álbum fotográfico publicado pela AD Madureira Atibaia.",
    url: canonicalUrl,
    datePublished: album.date,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: resolveSiteUrl("/"),
    },
    breadcrumb: {
      "@id": `${canonicalUrl}#breadcrumb`,
    },
    image: album.images.map((image) => resolveSiteUrl(image.src)),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />

      <main className="min-h-screen bg-[#f5f5f5]">
        <HeroPage
          variant="full"
          label="Galeria da igreja"
          title={album.title}
          description={
            album.description ??
            album.shortDescription ??
            "Registros fotográficos publicados pela AD Madureira Atibaia."
          }
          image={album.coverImage.src}
          imageAlt={album.coverImage.alt}
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
              <Link
                href="/galeria"
                className="transition-colors hover:text-[#212121]"
              >
                Galeria
              </Link>
              <span>/</span>
              <span className="text-[#212121]">{album.title}</span>
            </nav>

            <div className="ui-panel ui-panel-pad-sm">
              <p className="ui-section-eyebrow ui-section-eyebrow--gold">
                Álbum publicado
              </p>

              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <h2 className="font-acme text-xl tracking-wide text-[#212121] md:text-2xl">
                    Reviva este registro com calma
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                    Esta seleção pública reúne {album.images.length} fotos
                    organizadas em uma navegação simples, pensada para valorizar
                    o momento registrado sem perder clareza visual.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/galeria" className="ui-btn-primary">
                    Voltar para galeria
                  </Link>
                  <Link href="/programacao" className="ui-btn-secondary">
                    Ver programação
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <article className="ui-panel-accent ui-panel-pad-sm h-full">
                  <p className="mb-2 text-[11px] font-bold tracking-widest text-[#ef5350] uppercase">
                    Categoria
                  </p>
                  <h3 className="font-acme text-lg tracking-wide text-[#212121] md:text-xl">
                    {getGaleriaCategoryLabel(album.category)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f]">
                    Cada álbum é categorizado para facilitar futuras expansões
                    da galeria sem misturar culto, evento especial e conteúdo de
                    ensino.
                  </p>
                </article>

                <article className="ui-panel-accent ui-panel-pad-sm h-full">
                  <p className="mb-2 text-[11px] font-bold tracking-widest text-[#ef5350] uppercase">
                    Data
                  </p>
                  <h3 className="font-acme text-lg tracking-wide text-[#212121] md:text-xl">
                    {formatGaleriaDate(album.date)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f]">
                    O álbum mantém sua data própria para facilitar organização,
                    leitura cronológica e futuras atualizações do acervo público.
                  </p>
                </article>

                <article className="ui-panel-accent ui-panel-pad-sm h-full">
                  <p className="mb-2 text-[11px] font-bold tracking-widest text-[#ef5350] uppercase">
                    Fotos
                  </p>
                  <h3 className="font-acme text-lg tracking-wide text-[#212121] md:text-xl">
                    {album.images.length} imagens
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f]">
                    Clique em qualquer foto para ampliar, navegar com teclado e
                    percorrer o álbum com mais conforto.
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
                Fotografias
              </p>
              <h2 className="font-acme text-2xl tracking-wide text-[#212121] md:text-4xl">
                Álbum completo
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                Clique em qualquer foto para abrir a visualização ampliada e
                navegar pelo álbum com mais tranquilidade.
              </p>
            </div>

            {album.images.length > 0 ? (
              <GalleryGrid albumTitle={album.title} images={album.images} />
            ) : (
              <div className="rounded-[1.9rem] border border-black/6 bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.05)] md:p-8">
                <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-[#ffa726] uppercase">
                  Em atualização
                </p>
                <h3 className="font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                  Este álbum ainda não recebeu fotos suficientes
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                  A estrutura da página já está pronta, mas as imagens ainda não
                  foram cadastradas neste álbum. Quando o material for
                  publicado, ele aparecerá aqui automaticamente.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
