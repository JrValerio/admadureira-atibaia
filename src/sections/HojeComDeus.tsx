import Link from "next/link";
import type { SpiritualityHubData } from "@/lib/spirituality-hub";

type HojeComDeusProps = {
  data: SpiritualityHubData;
};

export default function HojeComDeus({ data }: HojeComDeusProps) {
  return (
    <section className="mb-10">
      <div className="rounded-[2rem] border border-[#ffa726]/15 bg-[#fff8ee] p-4 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        <div className="mb-8 max-w-3xl">
          <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
            Hoje com Deus
          </p>
          <h2 className="font-acme text-2xl md:text-3xl lg:text-5xl text-[#212121] tracking-wide mb-4">
            Palavra, devocional e leitura para hoje
          </h2>
          <p className="text-[#555] leading-relaxed">
            Um ponto de partida simples para abrir a Bíblia, receber direção na
            rotina e cultivar constância espiritual ainda hoje.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="rounded-3xl bg-white/85 border border-white/70 p-6 md:p-7">
            <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
              Versículo do dia
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-[#3f3f3f] mb-4 max-w-[34ch]">
              &quot;{data.verse.texto}&quot;
            </p>
            <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[#8b5b18] mb-5">
              {data.verse.referencia}
            </p>
            <Link href={data.verseChapterHref} className="ui-link-accent inline-flex">
              Ler capítulo
            </Link>
          </div>

          <div className="rounded-3xl bg-white/85 border border-white/70 p-6 md:p-7">
            <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
              Devocional do dia
            </p>
            <h3 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-3">
              {data.devotional.titulo}
            </h3>
            <p className="text-sm text-[#8b5b18] mb-4">
              {data.devotional.versiculo}
            </p>
            <p className="text-[#555] leading-relaxed mb-5">
              {data.devotional.resumo}
            </p>
            <Link href={data.devotionalHref} className="ui-link-accent inline-flex">
              Abrir devocional
            </Link>
            <Link
              href="/espiritualidade/podcast"
              className="mt-4 inline-flex text-xs font-semibold tracking-widest uppercase text-[#8b5b18] transition-colors hover:text-[#ef5350]"
            >
              Continue com ouvir reflexões em áudio
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-[#212121] p-6 md:p-7 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-start">
            <div>
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Leitura sugerida
              </p>
              <h3 className="font-acme text-2xl md:text-4xl tracking-wide mb-3">
                Dia {data.suggestedDay}
              </h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed mb-3">
                {data.readingSummary}
              </p>
              {data.readingDay.foco ? (
                <p className="text-sm text-white/65 leading-relaxed max-w-3xl">
                  {data.readingDay.foco}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={data.readingDayHref} className="ui-btn-primary">
                Ler hoje
              </Link>
              <Link
                href={data.planHref}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-xs font-bold tracking-widest uppercase text-white transition-colors hover:bg-white hover:text-[#212121]"
              >
                Ver plano
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
