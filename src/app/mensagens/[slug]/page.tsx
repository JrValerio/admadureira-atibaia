import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getMensagemBySlug,
  getMensagens,
} from "@/data/mensagens";
import { SITE_NAME } from "@/lib/site";
import {
  buildVideoJsonLd,
  buildVideoSeriesJsonLd,
  getVideoEmbedUrl,
  getVideoPageUrl,
  getVideoThumbnailUrls,
} from "@/lib/video-schema";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatMensagemDate(data: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${data}T12:00:00-03:00`));
}

export async function generateStaticParams() {
  return getMensagens().map((mensagem) => ({
    slug: mensagem.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mensagem = getMensagemBySlug(slug);

  if (!mensagem) {
    return {
      title: "Mensagem não encontrada | AD Madureira Atibaia",
    };
  }

  const title = `${mensagem.titulo} | AD Madureira Atibaia`;
  const url = getVideoPageUrl(mensagem);
  const imageUrls = getVideoThumbnailUrls(mensagem);

  return {
    title,
    description: mensagem.resumo,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "video.other",
      locale: "pt_BR",
      url,
      siteName: SITE_NAME,
      title,
      description: mensagem.resumo,
      images: imageUrls.map((imageUrl) => ({
        url: imageUrl,
        alt: mensagem.titulo,
      })),
      videos: [
        {
          url: getVideoEmbedUrl(mensagem),
          secureUrl: getVideoEmbedUrl(mensagem),
          type: "text/html",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: mensagem.resumo,
      images: [imageUrls[0]],
    },
  };
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
      <Link href="/mensagens" className="hover:underline">
        Mensagens
      </Link>
      <span>›</span>
      <span className="text-[#212121] font-medium">{nome}</span>
    </nav>
  );
}

export default async function MensagemPage({ params }: PageProps) {
  const { slug } = await params;
  const mensagem = getMensagemBySlug(slug);

  if (!mensagem) {
    notFound();
  }

  const seriesSchema = buildVideoSeriesJsonLd();
  const schema = buildVideoJsonLd(mensagem);

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />

          <Breadcrumb nome={mensagem.titulo} />

          <div className="rounded-3xl overflow-hidden bg-white border border-black/5 shadow-lg">
            <div className="relative aspect-[16/9] bg-[#111]">
              <Image
                src={mensagem.capa ?? "/pulpito-da-igreja.jpg"}
                alt={mensagem.titulo}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 to-transparent" />
            </div>

            <div className="p-6 md:p-10">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Mensagem em vídeo
              </p>
              <h1 className="font-acme text-3xl md:text-5xl text-[#212121] tracking-wide mb-4">
                {mensagem.titulo}
              </h1>
              <p className="text-[#555] text-lg leading-relaxed max-w-3xl mb-8">
                {mensagem.resumo}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Data
                  </p>
                  <p className="text-[#212121] text-sm">
                    {formatMensagemDate(mensagem.data)}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Pregador
                  </p>
                  <p className="text-[#212121] text-sm">
                    {mensagem.pregador ?? "AD Madureira Atibaia"}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Plataforma
                  </p>
                  <p className="text-[#212121] text-sm">YouTube</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
                <div className="rounded-3xl bg-[#111] overflow-hidden shadow-sm">
                  <div className="aspect-video">
                    <iframe
                      title={mensagem.titulo}
                      src={`https://www.youtube.com/embed/${mensagem.youtubeId}`}
                      width="100%"
                      height="100%"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {mensagem.versiculo && (
                    <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6">
                      <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-3">
                        Versículo-base
                      </h2>
                      <p className="text-[#555] leading-relaxed">
                        {mensagem.versiculo}
                      </p>
                    </div>
                  )}

                  <div className="rounded-3xl bg-[#f9f9f9] border border-black/5 p-6">
                    <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-3">
                      Sobre esta mensagem
                    </h2>
                    <p className="text-[#555] leading-relaxed">
                      {mensagem.resumo}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <a
                      href={`https://www.youtube.com/watch?v=${mensagem.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                    >
                      Assistir no YouTube
                    </a>
                    <Link
                      href="/mensagens"
                      className="inline-flex items-center justify-center border border-[#ef5350] text-[#ef5350] hover:bg-[#ef5350] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                    >
                      Ver outras mensagens
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
