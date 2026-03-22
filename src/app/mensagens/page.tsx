import type { Metadata } from "next";
import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import CardMedia from "@/components/media/CardMedia";
import { igrejaHeroMedia } from "@/data/igreja-media";
import { getMensagensRecentes } from "@/data/mensagens";
import {
  buildVideoListJsonLd,
  buildVideoSeriesJsonLd,
} from "@/lib/video-schema";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Mensagens | AD Madureira Atibaia",
  description:
    "Assista às mensagens e ministrações da AD Madureira Atibaia, com pregações, versículos-base e acesso rápido ao conteúdo em vídeo.",
  path: "/mensagens",
  image: igrejaHeroMedia.mensagens,
  keywords: [
    "mensagens bíblicas",
    "pregações evangélicas",
    "AD Madureira Atibaia",
    "cultos igreja atibaia",
    "ensino bíblico",
  ],
});

function formatMensagemDate(data: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${data}T12:00:00-03:00`));
}

export default async function MensagensPage() {
  const mensagens = await getMensagensRecentes();
  const mensagemMaisRecente = mensagens[0] ?? null;
  const mensagensComPregador = [
    ...new Set(
      mensagens
        .map((mensagem) => mensagem.pregador?.trim())
        .filter((pregador): pregador is string => Boolean(pregador))
    ),
  ];
  const mensagensListSchema = buildVideoListJsonLd(mensagens);
  const mensagensSeriesSchema = buildVideoSeriesJsonLd(mensagens);

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mensagensListSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mensagensSeriesSchema),
        }}
      />
      <HeroPage
        variant="full"
        label="Pregações e ministrações"
        title="Mensagens da Igreja"
        description="Curadoria da playlist oficial de Mensagens da AD Madureira Atibaia, com vídeos reais do canal e espaço preservado para enriquecimento editorial futuro."
        image={igrejaHeroMedia.mensagens}
        imageAlt="Púlpito da AD Madureira Atibaia durante ministração"
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
                  Revise a mensagem mais recente e acompanhe a playlist da igreja
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                  Esta página acompanha a playlist oficial de Mensagens do canal.
                  Comece pela publicação mais recente, abra o YouTube completo da
                  igreja e, se quiser participar presencialmente, veja também a
                  programação.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {mensagemMaisRecente ? (
                  <Link href={`/mensagens/${mensagemMaisRecente.slug}`} className="ui-btn-primary">
                    Ver mensagem mais recente
                  </Link>
                ) : null}
                <a
                  href="https://www.youtube.com/@ADMadureiraAtibaia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn-secondary"
                >
                  Abrir canal no YouTube
                </a>
                <Link href="/programacao" className="ui-btn-secondary">
                  Ver programação
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="ui-page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="ui-panel ui-panel-pad-lg">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Mensagens publicadas
              </p>
              <p className="font-acme text-4xl text-[#212121]">
                {mensagens.length}
              </p>
            </div>
            <div className="ui-panel ui-panel-pad-lg">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Pregadores identificados
              </p>
              <p className="font-acme text-4xl text-[#212121]">
                {mensagensComPregador.length}
              </p>
            </div>
            <div className="ui-panel ui-panel-pad-lg">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Conteúdo em vídeo
              </p>
              <p className="font-acme text-4xl text-[#212121]">YouTube</p>
            </div>
          </div>

          <div className="ui-panel-accent ui-panel-pad-lg max-w-4xl mx-auto mb-12">
            <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
              Conteúdo recorrente
            </p>
            <p className="text-[#555] leading-relaxed">
              Esta área usa prioritariamente a playlist oficial de Mensagens da
              igreja para exibir vídeos reais com título, thumbnail, data e link
              direto para cada pregação publicada no canal.
            </p>
            <p className="text-[#777] text-sm leading-relaxed mt-3">
              Quando houver metadado editorial adicional, esta mesma estrutura
              continua compatível com pregador, resumo expandido e versículo-base
              sem exigir retrabalho na integração com o YouTube.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {mensagens.map((mensagem) => (
              <Link
                key={mensagem.slug}
                href={`/mensagens/${mensagem.slug}`}
                className="group rounded-3xl overflow-hidden bg-white border border-black/5 shadow-sm hover:shadow-lg transition-shadow"
              >
                <CardMedia
                  src={mensagem.capa}
                  alt={mensagem.titulo}
                  variant="content"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  zoomOnHover
                  className="rounded-none"
                >
                  <div className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase">
                    Assistir mensagem
                  </div>
                </CardMedia>

                <div className="p-6">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                    {formatMensagemDate(mensagem.data)}
                  </p>
                  <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-3 group-hover:text-[#ef5350] transition-colors">
                    {mensagem.titulo}
                  </h2>
                  <p className="text-[#5f5f5f] text-sm leading-relaxed line-clamp-3 mb-4">
                    {mensagem.resumo}
                  </p>
                  <div className="space-y-1">
                    <p className="text-[#777] text-sm">
                      Pregador: {mensagem.pregador ?? "AD Madureira Atibaia"}
                    </p>
                    {mensagem.versiculo && (
                      <p className="text-[#777] text-sm">
                        Versículo-base: {mensagem.versiculo}
                      </p>
                    )}
                  </div>
                  <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mt-5">
                    Ver mensagem →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
