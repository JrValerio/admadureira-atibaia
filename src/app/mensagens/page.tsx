import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getMensagensRecentes,
  MENSAGENS_SERIES_DESCRIPTION,
  MENSAGENS_SERIES_NAME,
} from "@/data/mensagens";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mensagens | AD Madureira Atibaia",
  description:
    "Assista às mensagens e ministrações da AD Madureira Atibaia, com pregações, versículos-base e acesso rápido ao conteúdo em vídeo.",
  keywords: [
    "mensagens bíblicas",
    "pregações evangélicas",
    "AD Madureira Atibaia",
    "cultos igreja atibaia",
    "ensino bíblico",
  ],
  alternates: {
    canonical: `${SITE_URL}/mensagens`,
  },
  openGraph: {
    url: `${SITE_URL}/mensagens`,
    title: "Mensagens | AD Madureira Atibaia",
    description:
      "Assista às mensagens e ministrações da AD Madureira Atibaia, com pregações, versículos-base e acesso rápido ao conteúdo em vídeo.",
    images: [`${SITE_URL}/fachada-da-igreja.jpg`],
  },
};

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
  const mensagensSeriesSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: MENSAGENS_SERIES_NAME,
    description: MENSAGENS_SERIES_DESCRIPTION,
    inLanguage: "pt-BR",
    genre: "Sermons",
    url: `${SITE_URL}/mensagens`,
    publisher: {
      "@type": "Church",
      name: "AD Madureira Atibaia",
      url: SITE_URL,
    },
    hasPart: mensagens.map((mensagem) => ({
      "@type": "VideoObject",
      name: mensagem.titulo,
      url: `${SITE_URL}/mensagens/${mensagem.slug}`,
    })),
  };

  return (
    <main className="pt-[80px] bg-[#f5f5f5] min-h-screen">
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(mensagensSeriesSchema),
            }}
          />

          <div className="relative overflow-hidden rounded-[2rem] bg-[#212121] text-white mb-12">
            <div className="absolute inset-0 opacity-30">
              <Image
                src="/pulpito-da-igreja.jpg"
                alt="Púlpito da AD Madureira Atibaia"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/35" />

            <div className="relative z-10 px-6 py-14 md:px-10 md:py-18 lg:px-14 max-w-4xl">
              <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-3">
                Palavra e ensino
              </p>
              <h1 className="font-acme text-4xl md:text-5xl tracking-wide leading-tight mb-5">
                Mensagens da Igreja
              </h1>
              <p className="text-white/80 leading-relaxed max-w-2xl">
                Acompanhe mensagens pregadas na AD Madureira Atibaia e revisite
                ministrações que fortalecem a fé, a comunhão e a vida cristã.
              </p>
            </div>
          </div>

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
                <div className="relative aspect-[16/10] bg-[#111] overflow-hidden">
                  <Image
                    src={mensagem.capa ?? "/pulpito-da-igreja.jpg"}
                    alt={mensagem.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase">
                    Assistir mensagem
                  </div>
                </div>

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
