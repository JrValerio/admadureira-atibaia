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

export default function MensagensPage() {
  const mensagens = getMensagensRecentes();
  const mensagensComPregador = mensagens.filter((mensagem) => mensagem.pregador);
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
        label="Palavra e ensino"
        title="Mensagens da Igreja"
        description="Acompanhe mensagens pregadas na AD Madureira Atibaia e revisite ministrações que fortalecem a fé, a comunhão e a vida cristã."
        image={igrejaHeroMedia.mensagens}
        imageAlt="Púlpito da AD Madureira Atibaia"
      />
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Mensagens publicadas
              </p>
              <p className="font-acme text-4xl text-[#212121]">
                {mensagens.length}
              </p>
            </div>
            <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Pregadores destacados
              </p>
              <p className="font-acme text-4xl text-[#212121]">
                {mensagensComPregador.length}
              </p>
            </div>
            <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Conteúdo em vídeo
              </p>
              <p className="font-acme text-4xl text-[#212121]">YouTube</p>
            </div>
          </div>

          <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 max-w-4xl mx-auto mb-12">
            <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
              Conteúdo recorrente
            </p>
            <p className="text-[#555] leading-relaxed">
              Novas mensagens são publicadas semanalmente a partir dos cultos e
              ministrações da AD Madureira Atibaia. Acompanhe o ensino bíblico
              compartilhado na igreja e revisite conteúdos que fortalecem a fé.
            </p>
            <p className="text-[#777] text-sm leading-relaxed mt-3">
              Esta área concentra mensagens e ministrações publicadas no canal da
              igreja, criando uma biblioteca de ensino bíblico para quem deseja
              revisitar cultos, compartilhar a Palavra e acompanhar o conteúdo da
              AD Madureira Atibaia.
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
