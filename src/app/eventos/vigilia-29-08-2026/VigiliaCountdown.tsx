"use client";

import { useEffect, useState } from "react";

type Estado =
  | { tipo: "carregando" }
  | { tipo: "futuro"; dias: number }
  | { tipo: "encerrado" };

function calcularEstado(targetIso: string): Estado {
  const diff = new Date(targetIso).getTime() - Date.now();

  if (diff <= 0) {
    return { tipo: "encerrado" };
  }

  return { tipo: "futuro", dias: Math.ceil(diff / (1000 * 60 * 60 * 24)) };
}

type Props = {
  targetIso: string;
};

export default function VigiliaCountdown({ targetIso }: Props) {
  const [estado, setEstado] = useState<Estado>({ tipo: "carregando" });

  useEffect(() => {
    setEstado(calcularEstado(targetIso));
  }, [targetIso]);

  if (estado.tipo === "carregando" || estado.tipo === "encerrado") return null;

  const { dias } = estado;

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#ffa726]/15 px-4 py-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
      Faltam {dias} {dias === 1 ? "dia" : "dias"} para a Vigília
    </span>
  );
}
