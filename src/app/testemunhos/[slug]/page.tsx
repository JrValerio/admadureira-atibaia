import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTestemunhoBySlug, getTestemunhos } from "@/data/testemunhos";
import { buildPageMetadata, SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(data: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${data}T12:00:00-03:00`));
}

export async function generateStaticParams() {
  return getTestemunhos().map((testemunho) => ({
    slug: testemunho.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const testemunho = getTestemunhoBySlug(slug);

  if (!testemunho) {
    return {
      title: "Testemunho não encontrado | AD Madureira Atibaia",
    };
  }

  return buildPageMetadata({
    title: `${testemunho.titulo} | Testemunhos`,
    description: testemunho.resumo,
    path: `/testemunhos/${testemunho.slug}`,
    image: testemunho.foto ?? "/pulpito-da-igreja.jpg",
  });
}

function Breadcrumb({ nome }: { nome: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-sm text-[#777] mb-6 flex flex-wrap items-center gap-2"
    >
      <Link href="/" className="hover:underline">
        Início
      </Link>
      <span>›</span>
      <Link href="/testemunhos" className="hover:underline">
        Testemunhos
      </Link>
      <span>›</span>
      <span className="text-[#212121] font-medium">{nome}</span>
    </nav>
  );
}

export default async function TestemunhoPage({ params }: PageProps) {
  const { slug } = await params;
  const testemunho = getTestemunhoBySlug(slug);

  if (!testemunho) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: testemunho.titulo,
    description: testemunho.resumo,
    datePublished: testemunho.data,
    inLanguage: "pt-BR",
    image: [`${SITE_URL}${testemunho.foto ?? "/pulpito-da-igreja.jpg"}`],
    author: {
      "@type": "Person",
      name: testemunho.nome,
    },
    publisher: {
      "@type": "Church",
      name: "AD Madureira Atibaia",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/testemunhos/${testemunho.slug}`,
  };

  const videoSchema = testemunho.youtubeId
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: testemunho.titulo,
        description: testemunho.resumo,
        uploadDate: testemunho.data,
        inLanguage: "pt-BR",
        embedUrl: `https://www.youtube.com/embed/${testemunho.youtubeId}`,
        contentUrl: `https://www.youtube.com/watch?v=${testemunho.youtubeId}`,
        isFamilyFriendly: true,
        url: `${SITE_URL}/testemunhos/${testemunho.slug}`,
        thumbnailUrl: [
          `${SITE_URL}${testemunho.foto ?? "/pulpito-da-igreja.jpg"}`,
          `https://img.youtube.com/vi/${testemunho.youtubeId}/hqdefault.jpg`,
        ],
        publisher: {
          "@type": "Church",
          name: "AD Madureira Atibaia",
          url: SITE_URL,
        },
      }
    : null;

  const paragrafos = testemunho.historia
    .split("\n\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <section className="py-8 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
          {videoSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
            />
          )}

          <Breadcrumb nome={testemunho.titulo} />

          <div className="rounded-3xl overflow-hidden bg-white border border-black/5 shadow-lg">
            <div className="relative aspect-[16/9] bg-[#111]">
              <Image
                src={testemunho.foto ?? "/pulpito-da-igreja.jpg"}
                alt={testemunho.titulo}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 to-transparent" />
            </div>

            <div className="p-6 md:p-10">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Testemunho de fé
              </p>
              <h1 className="font-acme text-3xl md:text-5xl text-[#212121] tracking-wide mb-4">
                {testemunho.titulo}
              </h1>
              <p className="text-[#555] text-lg leading-relaxed max-w-3xl mb-8">
                {testemunho.resumo}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Publicado em
                  </p>
                  <p className="text-[#212121] text-sm">
                    {formatDate(testemunho.data)}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Testemunho de
                  </p>
                  <p className="text-[#212121] text-sm">{testemunho.nome}</p>
                </div>
              </div>

              {testemunho.youtubeId && (
                <div className="rounded-3xl bg-[#111] overflow-hidden shadow-sm mb-6">
                  <div className="aspect-video">
                    <iframe
                      title={testemunho.titulo}
                      src={`https://www.youtube.com/embed/${testemunho.youtubeId}`}
                      width="100%"
                      height="100%"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </div>
              )}

              <div className="rounded-3xl bg-[#f9f9f9] border border-black/5 p-6 md:p-8">
                <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-4">
                  História
                </h2>
                <div className="space-y-4 text-[#555] leading-relaxed">
                  {paragrafos.map((paragrafo) => (
                    <p key={paragrafo}>{paragrafo}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 mt-6">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Comunidade e fé
                </p>
                <p className="text-[#555] leading-relaxed">
                  Testemunhos como este registram a ação de Deus na vida de
                  famílias e pessoas que caminham com a AD Madureira Atibaia,
                  fortalecendo a fé da igreja e encorajando outras vidas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/testemunhos"
                  className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                >
                  Ver outros testemunhos
                </Link>
                {testemunho.youtubeId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${testemunho.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                  >
                    Assistir no YouTube
                  </a>
                )}
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center border border-[#ef5350] text-[#ef5350] hover:bg-[#ef5350] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                >
                  Entre em contato
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
