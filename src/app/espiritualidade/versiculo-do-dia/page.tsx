import type { Metadata } from "next";
import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import { createBiblePath } from "@/lib/bible-navigation";
import { getDailyVerse } from "@/lib/getDailyVerse";
import { buildPageMetadata } from "@/lib/site";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const verse = getDailyVerse();

  return buildPageMetadata({
    title: `${verse.referencia} | Versículo do Dia`,
    description: verse.texto,
    path: "/espiritualidade/versiculo-do-dia",
    image: igrejaHeroMedia.versiculoDoDia,
    keywords: [
      "versículo do dia",
      verse.referencia.toLowerCase(),
      "bíblia online",
      "palavra do dia",
    ],
  });
}

export default function VersiculoDoDiaPage() {
  const verse = getDailyVerse();

  return (
    <>
      <HeroPage
        variant="full"
        label="Leitura diária"
        title="Versículo do Dia"
        description="Uma porção diária da Palavra para meditar, orar e seguir com o coração firmado em Cristo."
        image={igrejaHeroMedia.versiculoDoDia}
        imageAlt="Púlpito da AD Madureira Atibaia"
        objectPosition="center 30%"
      />

      <section className="py-16 md:py-20">
        <div className="ui-page-container ui-page-container--narrow">
          <SpiritualBreadcrumb
            items={[
              { label: "Espiritualidade", href: "/espiritualidade" },
              { label: "Versículo do Dia" },
            ]}
          />

          <div className="rounded-3xl bg-white border border-black/5 p-8 md:p-10 shadow-sm mb-8">
            <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
              Palavra para hoje
            </p>
            <h1 className="font-acme text-xl md:text-3xl lg:text-5xl text-[#212121] tracking-wide mb-6">
              {verse.referencia}
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-[#3f3f3f] mb-8">
              &quot;{verse.texto}&quot;
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={createBiblePath(verse.livroSlug, verse.capitulo)}
                className="inline-flex items-center justify-center rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
              >
                Ler capítulo
              </Link>
              <Link
                href="/espiritualidade/biblia"
                className="inline-flex items-center justify-center rounded-full border border-[#212121] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#212121] hover:text-white"
              >
                Abrir Bíblia Online
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8">
            <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                Tema do dia
              </p>
              <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-4">
                {verse.tema}
              </h2>
              <p className="text-[#555] leading-relaxed">
                Use este texto como base para sua oração pessoal, sua meditação
                e sua caminhada diária com Deus.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Aplicação prática
              </p>
              <div className="space-y-4 text-[#555] leading-relaxed">
                <p>
                  Separe alguns minutos para ler o capítulo completo, observar o
                  contexto bíblico e transformar essa palavra em oração durante o
                  dia.
                </p>
                <p>
                  O objetivo não é apenas ler um versículo isolado, mas criar um
                  ponto de partida para constância espiritual e meditação bíblica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
