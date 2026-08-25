"use client";

import Link from "next/link";
import { useDailyReminder } from "@/hooks/useDailyReminder";

export default function DailyReminder() {
  const { ready, shouldShowReminder, continueReadingHref, greeting } =
    useDailyReminder();

  if (!ready || !shouldShowReminder) {
    return null;
  }

  return (
    <section className="bg-[#f5f5f5] py-8">
      <div className="ui-page-container">
        <div className="rounded-3xl border border-[#ffa726]/15 bg-[#fff8ee] p-6 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <p className="ui-card-eyebrow mb-3">
            {greeting}
          </p>
          <h2 className="font-acme text-xl md:text-3xl lg:text-4xl text-[#212121] tracking-wide mb-4">
            Já separou alguns minutos para a Palavra hoje?
          </h2>
          <p className="text-[#555] leading-relaxed mb-6 max-w-3xl">
            Use este momento para abrir o versículo do dia e continuar sua
            jornada espiritual com constância, leitura bíblica e meditação.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/espiritualidade/versiculo-do-dia"
              className="inline-flex items-center justify-center rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
            >
              Ver versículo do dia
            </Link>
            <Link
              href={continueReadingHref}
              className="inline-flex items-center justify-center rounded-full border border-[#212121] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#212121] hover:text-white"
            >
              Continuar leitura
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
