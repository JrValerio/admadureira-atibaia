"use client";

import { useEffect, useState } from "react";

type Props = {
  dataInicio: string; // ISO: "2026-07-05"
  dataFim: string;    // ISO: "2026-09-27"
};

type Estado =
  | { tipo: "carregando" }
  | { tipo: "futuro"; dias: number }
  | { tipo: "em-andamento"; dias: number }
  | { tipo: "encerrado" };

function calcularEstado(dataInicio: string, dataFim: string): Exclude<Estado, { tipo: "carregando" }> {
  const agora = Date.now();
  const inicio = new Date(`${dataInicio}T00:00:00-03:00`).getTime();
  const fim = new Date(`${dataFim}T23:59:59-03:00`).getTime();

  if (agora < inicio) {
    return { tipo: "futuro", dias: Math.ceil((inicio - agora) / (1000 * 60 * 60 * 24)) };
  }
  if (agora <= fim) {
    return { tipo: "em-andamento", dias: Math.ceil((fim - agora) / (1000 * 60 * 60 * 24)) };
  }
  return { tipo: "encerrado" };
}

export default function TrimestreCountdownBadge({ dataInicio, dataFim }: Props) {
  const [estado, setEstado] = useState<Estado>({ tipo: "carregando" });

  useEffect(() => {
    setEstado(calcularEstado(dataInicio, dataFim));
  }, [dataInicio, dataFim]);

  if (estado.tipo === "carregando") return null;

  if (estado.tipo === "encerrado") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-[#555]/10 px-4 py-2 text-xs font-bold tracking-widest uppercase text-[#555]">
        Trimestre encerrado
      </span>
    );
  }

  if (estado.tipo === "futuro") {
    const { dias } = estado;
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-[#1565c0]/10 px-4 py-2 text-xs font-bold tracking-widest uppercase text-[#1565c0]">
        Começa em {dias} {dias === 1 ? "dia" : "dias"}
      </span>
    );
  }

  const { dias } = estado;
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#ef5350]/10 px-4 py-2 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
      <span className="h-2 w-2 animate-pulse rounded-full bg-[#ef5350]" />
      Em andamento · {dias} {dias === 1 ? "dia" : "dias"} restantes
    </span>
  );
}
