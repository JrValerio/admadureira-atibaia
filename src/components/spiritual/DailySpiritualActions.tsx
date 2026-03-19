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
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
      {normalizedLastDay ? (
        <Link
          href={createReadingPlanDayPath(planSlug, normalizedLastDay)}
          className="ui-btn-primary whitespace-nowrap"
        >
          Continuar leitura · Dia {normalizedLastDay}
        </Link>
      ) : (
        <Link
          href={createReadingPlanDayPath(planSlug, 1)}
          className="ui-btn-primary whitespace-nowrap"
        >
          Começar agora
        </Link>
      )}

      <Link
        href={createReadingPlanDayPath(planSlug, suggestedDay)}
        className="ui-btn-secondary whitespace-nowrap"
      >
        Abrir dia sugerido
      </Link>

      <button
        type="button"
        onClick={() => toggleDayCompleted(suggestedDay)}
        className={`whitespace-nowrap ${
          isSuggestedDayCompleted
            ? "ui-btn-success"
            : "ui-btn-secondary"
        }`}
      >
        {isSuggestedDayCompleted ? "Leitura concluída" : "Concluir leitura"}
      </button>
    </div>
  );
}
