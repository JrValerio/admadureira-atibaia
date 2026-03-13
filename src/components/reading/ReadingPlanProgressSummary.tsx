"use client";

import { useReadingPlanProgress } from "@/hooks/useReadingPlanProgress";

type ReadingPlanProgressSummaryProps = {
  planSlug: string;
  totalDays: number;
  todayDay: number;
  showCalendar?: boolean;
};

export default function ReadingPlanProgressSummary({
  planSlug,
  totalDays,
  todayDay,
  showCalendar = false,
}: ReadingPlanProgressSummaryProps) {
  const { completedCount, isDayCompleted, toggleDayCompleted } =
    useReadingPlanProgress(planSlug);
  const safeTotalDays = Math.max(1, totalDays);
  const progressPercent = Math.round((completedCount / safeTotalDays) * 100);
  const isTodayCompleted = isDayCompleted(todayDay);

  return (
    <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
      <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
        Progresso do plano
      </p>
      <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-4">
        {completedCount} de {safeTotalDays} dias
      </h2>
      <p className="text-sm text-[#555] leading-relaxed mb-4">
        Acompanhe sua constância na Palavra e marque o dia atual quando concluir
        a leitura.
      </p>

      <div className="h-3 overflow-hidden rounded-full bg-white/80 mb-3">
        <div
          className="h-full rounded-full bg-[#ffa726]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <p className="text-xs text-[#777] mb-5">{progressPercent}% concluído.</p>

      <button
        type="button"
        onClick={() => toggleDayCompleted(todayDay)}
        className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-xs font-bold tracking-widest uppercase transition-colors ${
          isTodayCompleted
            ? "bg-[#2e7d32] text-white hover:bg-[#256429]"
            : "bg-[#ffa726] text-[#212121] hover:bg-[#ffb74d]"
        }`}
      >
        {isTodayCompleted
          ? `Dia ${todayDay} marcado como lido`
          : `Marcar dia ${todayDay} como lido`}
      </button>

      {showCalendar ? (
        <div className="mt-6">
          <p className="mb-3 text-[#777] text-xs font-bold tracking-widest uppercase">
            Calendário do plano
          </p>
          <div className="grid grid-cols-7 gap-2 md:grid-cols-14">
            {Array.from({ length: safeTotalDays }, (_, index) => {
              const day = index + 1;
              const isCompleted = isDayCompleted(day);
              const isToday = day === todayDay;

              return (
                <div
                  key={`${planSlug}-day-${day}`}
                  className={`flex h-9 items-center justify-center rounded-xl text-xs font-semibold ${
                    isCompleted
                      ? "bg-[#2e7d32] text-white"
                      : "bg-white text-[#555]"
                  } ${isToday ? "ring-2 ring-[#ffa726]" : ""}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
