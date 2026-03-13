"use client";

import Link from "next/link";
import { createReadingPlanDayPath } from "@/data/plano-de-leitura";
import { useReadingPlanProgress } from "@/hooks/useReadingPlanProgress";

type ContinueReadingProps = {
  planSlug: string;
  totalDays: number;
};

export default function ContinueReading({
  planSlug,
  totalDays,
}: ContinueReadingProps) {
  const { lastDay } = useReadingPlanProgress(planSlug);

  if (!lastDay) {
    return null;
  }

  const normalizedProgress =
    lastDay > totalDays ? totalDays : lastDay < 1 ? 1 : lastDay;

  return (
    <div className="mb-5 rounded-2xl border border-white/60 bg-white/70 p-4">
      <p className="text-[#ef5350] text-[11px] font-bold tracking-[0.16em] uppercase mb-2">
        Continue de onde parou
      </p>
      <p className="text-sm text-[#555] leading-relaxed mb-4">
        Seu último progresso salvo neste plano foi no dia {normalizedProgress}.
      </p>
      <Link
        href={createReadingPlanDayPath(planSlug, normalizedProgress)}
        className="inline-flex items-center justify-center rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
      >
        Continuar leitura · Dia {normalizedProgress}
      </Link>
    </div>
  );
}
