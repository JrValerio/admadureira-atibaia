"use client";

import { useEffect, useState } from "react";

type Props = {
  dataFim: string; // ISO: "2026-09-27"
};

function calcularDias(dataFim: string): number | null {
  const fim = new Date(`${dataFim}T23:59:59-03:00`).getTime();
  const agora = Date.now();
  const diff = fim - agora;
  if (diff < 0) return null;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function TrimestreCountdownBadge({ dataFim }: Props) {
  const [dias, setDias] = useState<number | null | undefined>(undefined);

  useEffect(() => {
    setDias(calcularDias(dataFim));
  }, [dataFim]);

  if (dias === undefined) return null;

  if (dias === null) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-[#555]/10 px-4 py-2 text-xs font-bold tracking-widest uppercase text-[#555]">
        Trimestre encerrado
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#ef5350]/10 px-4 py-2 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
      <span className="h-2 w-2 animate-pulse rounded-full bg-[#ef5350]" />
      Em andamento · {dias} {dias === 1 ? "dia" : "dias"} restantes
    </span>
  );
}
