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
          ? "inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#2e7d32] px-5 py-3 text-xs font-bold tracking-widest uppercase text-white transition-colors hover:bg-[#256429]"
          : "ui-btn-secondary whitespace-nowrap"
      }
    >
      {isCompleted ? completedLabel : pendingLabel}
    </button>
  );
}
