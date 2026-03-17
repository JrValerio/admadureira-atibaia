import Link from "next/link";
import { Card, Section } from "@/components/ui";
import { createBiblePath } from "@/lib/bible-navigation";
import { getDailyVerse } from "@/lib/getDailyVerse";

export default function VersiculoDoDia() {
  const verse = getDailyVerse();

  return (
    <Section className="bg-[#f5f5f5]">
      <Card className="overflow-hidden border border-[#ffa726]/15 bg-[#fff8ee] p-0 shadow-[0_12px_36px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-5 md:p-8 lg:p-10">
            <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
              Versículo do dia
            </p>
            <h2 className="font-acme text-2xl md:text-3xl lg:text-5xl text-[#212121] tracking-wide mb-5">
              Palavra para hoje
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-[#3f3f3f] mb-5">
              &quot;{verse.texto}&quot;
            </p>
            <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[#8b5b18] mb-8">
              {verse.referencia}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={createBiblePath(verse.livroSlug, verse.capitulo)}
                className="ui-btn-primary"
              >
                Ler capítulo
              </Link>
              <Link
                href="/espiritualidade/versiculo-do-dia"
                className="ui-btn-secondary"
              >
                Ver página diária
              </Link>
            </div>
          </div>

          <div className="border-t border-black/5 bg-white/50 p-5 md:p-8 lg:p-10 lg:border-l lg:border-t-0">
            <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
              Tema do dia
            </p>
            <h3 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-5">
              {verse.tema}
            </h3>
            <div className="space-y-4 text-[#555] leading-relaxed">
              <p>
                Comece o dia meditando na Palavra e use este versículo como ponto
                de oração, reflexão e constância espiritual.
              </p>
              <p>
                A leitura completa do capítulo está integrada à Bíblia Online do
                site para aprofundar a meditação sem sair da jornada espiritual.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}
