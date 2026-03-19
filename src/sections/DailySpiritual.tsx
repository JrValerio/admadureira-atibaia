import Link from "next/link";
import { getDevotionalOfTheDay } from "@/data/devocionais";
import { createBiblePath } from "@/lib/bible-navigation";
import { getDailyVerse } from "@/lib/getDailyVerse";

const slideClass =
  "min-w-[84vw] max-w-[21rem] shrink-0 snap-center sm:min-w-0 sm:max-w-none";

export default function DailySpiritual() {
  const verse = getDailyVerse();
  const devotional = getDevotionalOfTheDay();

  return (
    <section className="bg-[#f5f5f5] pt-6 pb-8 md:pt-8 md:pb-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-6 max-w-3xl text-center md:mb-8">
          <p className="mb-3 text-xs font-bold tracking-widest text-[#ffa726] uppercase">
            Hoje com Deus
          </p>
          <h2 className="font-acme text-2xl tracking-wide text-[#212121] md:text-4xl">
            Palavra e devocional do dia
          </h2>
        </div>

        <div className="-mx-4 flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none">
          {/* Versículo */}
          <div className={slideClass}>
            <article className="ui-panel ui-panel-pad h-full w-full">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Versículo do dia
              </p>
              <p className="mb-4 max-w-[34ch] text-base leading-relaxed text-[#3f3f3f]">
                &quot;{verse.texto}&quot;
              </p>
              <p className="mb-5 text-sm font-semibold tracking-[0.16em] uppercase text-[#8b5b18]">
                {verse.referencia}
              </p>
              <Link
                href={createBiblePath(verse.livroSlug, verse.capitulo)}
                className="text-xs font-semibold tracking-widest uppercase text-[#ef5350]"
              >
                Ler capítulo →
              </Link>
            </article>
          </div>

          {/* Devocional */}
          {devotional ? (
            <div className={slideClass}>
              <article className="ui-panel-accent ui-panel-pad h-full w-full">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Devocional do dia
                </p>
                <h3 className="mb-3 font-acme text-2xl tracking-wide text-[#212121]">
                  {devotional.titulo}
                </h3>
                <p className="mb-4 text-sm text-[#8b5b18]">{devotional.versiculo}</p>
                <p className="mb-5 text-sm leading-relaxed text-[#555]">
                  {devotional.resumo}
                </p>
                <Link
                  href={`/espiritualidade/devocional/${devotional.slug}`}
                  className="text-xs font-semibold tracking-widest uppercase text-[#ef5350]"
                >
                  Abrir devocional →
                </Link>
              </article>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3 md:mt-8">
          <Link href="/espiritualidade" className="ui-btn-secondary">
            Devocional e plano de leitura
          </Link>
        </div>
      </div>
    </section>
  );
}
