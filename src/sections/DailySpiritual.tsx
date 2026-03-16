import Link from "next/link";
import { createBiblePath } from "@/lib/bible-navigation";
import { getDailyVerse } from "@/lib/getDailyVerse";

export default function DailySpiritual() {
  const verse = getDailyVerse();

  return (
    <section className="bg-[#f5f5f5] pt-8 pb-5 md:pt-14 md:pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-[2rem] border border-[#ffa726]/15 bg-[#fff8ee] p-5 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
            Hoje com Deus
          </p>
          <h2 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-5">
            Versículo do dia
          </h2>

          <div className="rounded-3xl bg-white/80 border border-white/60 p-5 md:p-7 mb-6">
            <p className="text-base md:text-xl leading-relaxed text-[#3f3f3f] mb-4 max-w-[38ch]">
              &quot;{verse.texto}&quot;
            </p>
            <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[#8b5b18]">
              {verse.referencia}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={createBiblePath(verse.livroSlug, verse.capitulo)}
              className="ui-btn-primary"
            >
              Ler capítulo
            </Link>
            <Link href="/espiritualidade" className="ui-btn-secondary">
              Devocional e plano de leitura
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
