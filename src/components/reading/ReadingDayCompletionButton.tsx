"use client";

import { useReadingPlanProgress } from "@/hooks/useReadingPlanProgress";

type ReadingDayCompletionButtonProps = {
  planSlug: string;
  day: number;
  completedLabel?: string;
  pendingLabel?: string;
};

export default function ReadingDayCompletionButton({
  planSlug,
  day,
  completedLabel = "Leitura concluída",
  pendingLabel = "Concluir leitura",
}: ReadingDayCompletionButtonProps) {
  const { isDayCompleted, toggleDayCompleted } = useReadingPlanProgress(planSlug);
  const isCompleted = isDayCompleted(day);

  return (
    <button
      type="button"
      onClick={() => toggleDayCompleted(day)}
      className={
        isCompleted
          ? "ui-btn-success whitespace-nowrap"
          : "ui-btn-secondary whitespace-nowrap"
      }
    >
      {isCompleted ? completedLabel : pendingLabel}
    </button>
  );
}
