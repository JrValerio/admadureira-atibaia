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
  pendingLabel = "Marcar como lido",
}: ReadingDayCompletionButtonProps) {
  const { isDayCompleted, toggleDayCompleted } = useReadingPlanProgress(planSlug);
  const isCompleted = isDayCompleted(day);

  return (
    <button
      type="button"
      onClick={() => toggleDayCompleted(day)}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-xs font-bold tracking-widest uppercase transition-colors ${
        isCompleted
          ? "bg-[#2e7d32] text-white hover:bg-[#256429]"
          : "border border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white"
      }`}
    >
      {isCompleted ? completedLabel : pendingLabel}
    </button>
  );
}
