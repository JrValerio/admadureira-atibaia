"use client";

import Link from "next/link";
import { createReadingPlanDayPath } from "@/data/plano-de-leitura";
import { useReadingPlanProgress } from "@/hooks/useReadingPlanProgress";
import ReadingDayCompletionButton from "@/components/reading/ReadingDayCompletionButton";

type ReadingJourneyActionsProps = {
  planSlug: string;
  totalDays: number;
  suggestedDay: number;
  suggestedSummary?: string;
  title?: string;
  description?: string;
  showCompletionButton?: boolean;
};

export default function ReadingJourneyActions({
  planSlug,
  totalDays,
  suggestedDay,
  suggestedSummary,
  title = "Sua jornada de hoje",
  description = "Retome sua leitura de onde parou, abra o dia sugerido ou comece agora com constância.",
  showCompletionButton = true,
}: ReadingJourneyActionsProps) {
  const { lastDay } = useReadingPlanProgress(planSlug);
  const normalizedLastDay = lastDay
    ? Math.min(Math.max(lastDay, 1), totalDays)
    : null;

  return (
    <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
      <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
        {title}
      </p>
      <p className="text-sm text-[#555] leading-relaxed mb-3">{description}</p>
      <p className="text-xs text-[#8b5b18] mb-6">
        Dia sugerido de hoje: {suggestedDay}
        {suggestedSummary ? ` • ${suggestedSummary}` : ""}
      </p>

      <div className="flex flex-wrap gap-3">
        {normalizedLastDay ? (
          <Link
            href={createReadingPlanDayPath(planSlug, normalizedLastDay)}
            className="inline-flex items-center justify-center rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
          >
            Continuar leitura · Dia {normalizedLastDay}
          </Link>
        ) : null}

        <Link
          href={createReadingPlanDayPath(planSlug, suggestedDay)}
          className="inline-flex items-center justify-center rounded-full border border-[#212121] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#212121] hover:text-white"
        >
          Abrir dia sugerido
        </Link>

        <Link
          href={createReadingPlanDayPath(planSlug, 1)}
          className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:border-[#ffa726]/40 hover:bg-[#fff8ee]"
        >
          Começar agora
        </Link>

        {showCompletionButton ? (
          <ReadingDayCompletionButton
            planSlug={planSlug}
            day={suggestedDay}
            completedLabel="Leitura do dia concluída"
            pendingLabel="Marcar leitura do dia"
          />
        ) : null}
      </div>
    </div>
  );
}
