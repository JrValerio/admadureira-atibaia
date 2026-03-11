import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

  return (
    <main className="pt-[80px] bg-[#f5f5f5] min-h-screen">
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#212121] text-white mb-12">
            <div className="absolute inset-0 opacity-30">
              <Image
                src="/fachada-da-igreja.jpg"
                alt="Fachada da AD Madureira Atibaia"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_34%]"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/35" />

            <div className="relative z-10 px-6 py-14 md:px-10 md:py-18 lg:px-14 max-w-4xl">
              <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-3">
                Histórias de transformação
              </p>
              <h1 className="font-acme text-4xl md:text-5xl tracking-wide leading-tight mb-5">
                Testemunhos de Fé
              </h1>
              <p className="text-white/80 leading-relaxed max-w-2xl">
                Histórias reais de transformação vividas por pessoas da
                comunidade da Igreja Assembleia de Deus Ministério Madureira em
                Atibaia, em relatos escritos e também em vídeo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Testemunhos publicados
              </p>
              <p className="font-acme text-4xl text-[#212121]">
                {testemunhos.length}
              </p>
            </div>
            <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Testemunhos em vídeo
              </p>
              <p className="font-acme text-4xl text-[#212121]">
                {testemunhosEmVideo}
              </p>
            </div>
            <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Conteúdo local
              </p>
              <p className="font-acme text-4xl text-[#212121]">Atibaia</p>
            </div>
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
                className="group rounded-3xl overflow-hidden bg-white border border-black/5 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[16/10] bg-[#111] overflow-hidden">
                  <Image
                    src={testemunho.foto ?? "/pulpito-da-igreja.jpg"}
                    alt={testemunho.titulo}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                    {formatDate(testemunho.data)}
                  </p>
                  {testemunho.youtubeId && (
                    <p className="text-[#ef5350] text-[11px] font-semibold tracking-widest uppercase mb-2">
                      Vídeo testemunho
                    </p>
                  )}
                  <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-3 group-hover:text-[#ef5350] transition-colors">
                    {testemunho.titulo}
                  </h2>
                  <p className="text-[#5f5f5f] leading-relaxed line-clamp-3 mb-4">
                    {testemunho.resumo}
                  </p>
                  <p className="text-[#777] text-sm">Por: {testemunho.nome}</p>
                  <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mt-5">
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
