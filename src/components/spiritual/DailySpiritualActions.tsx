"use client";

import Link from "next/link";
import { createReadingPlanDayPath } from "@/data/plano-de-leitura";
import { useReadingPlanProgress } from "@/hooks/useReadingPlanProgress";

type DailySpiritualActionsProps = {
  planSlug: string;
  suggestedDay: number;
  totalDays: number;
};

export default function DailySpiritualActions({
  planSlug,
  suggestedDay,
  totalDays,
}: DailySpiritualActionsProps) {
  const { lastDay, isDayCompleted, toggleDayCompleted } =
    useReadingPlanProgress(planSlug);

  const normalizedLastDay = lastDay
    ? Math.min(Math.max(lastDay, 1), totalDays)
    : null;
  const isSuggestedDayCompleted = isDayCompleted(suggestedDay);

  return (
    <div className="flex flex-wrap gap-3">
      {normalizedLastDay ? (
        <Link
          href={createReadingPlanDayPath(planSlug, normalizedLastDay)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
        >
          Continuar leitura · Dia {normalizedLastDay}
        </Link>
      ) : (
        <Link
          href={createReadingPlanDayPath(planSlug, 1)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
        >
          Começar agora
        </Link>
      )}

      <Link
        href={createReadingPlanDayPath(planSlug, suggestedDay)}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#212121] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#212121] hover:text-white"
      >
        Abrir dia sugerido
      </Link>

      <button
        type="button"
        onClick={() => toggleDayCompleted(suggestedDay)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-3 text-xs font-bold tracking-widest uppercase transition-colors ${
          isSuggestedDayCompleted
            ? "bg-[#2e7d32] text-white hover:bg-[#256429]"
            : "border border-black/10 bg-white text-[#212121] hover:border-[#ffa726]/35 hover:bg-[#fff8ee]"
        }`}
      >
        {isSuggestedDayCompleted ? "Leitura concluída" : "Concluir leitura"}
      </button>
    </div>
  );
}
