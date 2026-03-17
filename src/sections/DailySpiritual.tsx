import Link from "next/link";
import { getDevotionalOfTheDay } from "@/data/devocionais";
import { createBiblePath } from "@/lib/bible-navigation";
import { getDailyVerse } from "@/lib/getDailyVerse";

const slideClass = "min-w-80 w-[calc(100vw-3rem)] max-w-120 shrink-0 snap-center lg:min-w-0 lg:w-auto lg:max-w-none";

export default function DailySpiritual() {
  const verse = getDailyVerse();
  const devotional = getDevotionalOfTheDay();

  return (
    <section className="bg-[#f5f5f5] pt-8 pb-5 md:pt-14 md:pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-[2rem] border border-[#ffa726]/15 bg-[#fff8ee] p-5 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
            Hoje com Deus
          </p>
          <h2 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-5">
            Palavra e devocional do dia
          </h2>

          <div className="-mx-5 flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 lg:snap-none">
            {/* Versículo */}
            <div className={slideClass}>
              <div className="w-full rounded-3xl bg-white/80 border border-white/60 p-5 lg:p-7">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Versículo do dia
                </p>
                <p className="text-base leading-relaxed text-[#3f3f3f] mb-4 max-w-[34ch]">
                  &quot;{verse.texto}&quot;
                </p>
                <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[#8b5b18] mb-5">
                  {verse.referencia}
                </p>
                <Link
                  href={createBiblePath(verse.livroSlug, verse.capitulo)}
                  className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase"
                >
                  Ler capítulo →
                </Link>
              </div>
            </div>

            {/* Devocional */}
            {devotional ? (
              <div className={slideClass}>
                <div className="w-full rounded-3xl bg-white/80 border border-white/60 p-5 lg:p-7">
                  <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                    Devocional do dia
                  </p>
                  <h3 className="font-acme text-2xl text-[#212121] tracking-wide mb-3">
                    {devotional.titulo}
                  </h3>
                  <p className="text-sm text-[#8b5b18] mb-4">{devotional.versiculo}</p>
                  <p className="text-sm text-[#555] leading-relaxed mb-5">
                    {devotional.resumo}
                  </p>
                  <Link
                    href={`/espiritualidade/devocional/${devotional.slug}`}
                    className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase"
                  >
                    Abrir devocional →
                  </Link>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/espiritualidade" className="ui-btn-secondary">
              Devocional e plano de leitura
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
