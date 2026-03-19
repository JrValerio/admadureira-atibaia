import type { Metadata } from "next";
import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import CardMedia from "@/components/media/CardMedia";
import { igrejaHeroMedia } from "@/data/igreja-media";
import { getTestemunhosRecentes } from "@/data/testemunhos";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Testemunhos | AD Madureira Atibaia",
  description:
    "Leia e assista testemunhos de fé e histórias de transformação vividas por pessoas da comunidade da AD Madureira Atibaia.",
  path: "/testemunhos",
});

function formatDate(data: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${data}T12:00:00-03:00`));
}

export default function TestemunhosPage() {
  const testemunhos = getTestemunhosRecentes();
  const testemunhosEmVideo = testemunhos.filter(
    (testemunho) => testemunho.youtubeId
  ).length;
  const stats = [
    {
      label: "Testemunhos publicados",
      value: String(testemunhos.length),
    },
    ...(testemunhosEmVideo > 0
      ? [
          {
            label: "Testemunhos em vídeo",
            value: String(testemunhosEmVideo),
          },
        ]
      : []),
    {
      label: "Conteúdo local",
      value: "Atibaia",
    },
  ];

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <HeroPage
        variant="full"
        label="Histórias de transformação"
        title="Testemunhos de Fé"
        description="Histórias reais de transformação vividas por pessoas da comunidade da Igreja Assembleia de Deus Ministério Madureira em Atibaia, em relatos escritos e também em vídeo."
        image={igrejaHeroMedia.testemunhos}
        imageAlt="Fachada da AD Madureira Atibaia"
        imageClassName="object-[center_34%]"
      />
      <section className="py-16 md:py-20">
        <div className="ui-page-container">

          <div
            className={`mb-12 grid grid-cols-1 gap-4 ${
              stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
            }`}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm"
              >
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                  {stat.label}
                </p>
                <p className="font-acme text-2xl md:text-4xl text-[#212121]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 max-w-4xl mx-auto mb-12">
            <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
              Comunidade viva
            </p>
            <p className="text-[#555] leading-relaxed">
              Esta página reúne testemunhos que mostram como Deus continua
              agindo por meio da fé, da oração e da comunhão da igreja, seja em
              relatos escritos ou em vídeos compartilhados pela comunidade.
            </p>
            <p className="text-[#777] text-sm leading-relaxed mt-3">
              Ao compartilhar histórias de restauração, resposta de oração e
              fortalecimento espiritual, a igreja registra experiências que
              edificam outras vidas e reforçam o cuidado pastoral com a
              comunidade.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testemunhos.map((testemunho) => (
              <Link
                key={testemunho.slug}
                href={`/testemunhos/${testemunho.slug}`}
                className="ui-card group overflow-hidden"
              >
                <CardMedia
                  src={testemunho.foto}
                  alt={testemunho.titulo}
                  variant="testimony"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  zoomOnHover
                  className="rounded-none"
                />

                <div className="p-6 md:p-8">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                    {formatDate(testemunho.data)}
                  </p>
                  {testemunho.youtubeId && (
                    <p className="text-[#ef5350] text-[11px] font-semibold tracking-widest uppercase mb-2">
                      Vídeo testemunho
                    </p>
                  )}
                  <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-3 group-hover:text-[#ef5350] transition-colors">
                    {testemunho.titulo}
                  </h2>
                  <p className="text-[#5f5f5f] leading-relaxed line-clamp-3 mb-4">
                    {testemunho.resumo}
                  </p>
                  <p className="text-[#777] text-sm">Por: {testemunho.nome}</p>
                  <p className="ui-link-accent mt-5 inline-flex">
                    Ler testemunho →
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
