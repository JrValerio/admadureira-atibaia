"use client";

import { useSyncExternalStore } from "react";
import type { ItemQuadro } from "@/sections/QuadroSemanal";

export type DiaQuadroComItens = {
  id: number;
  sigla: string;
  nome: string;
  itens: ItemQuadro[];
};

function subscribeDiaAtual(callback: () => void) {
  const id = window.setInterval(callback, 60_000);
  return () => window.clearInterval(id);
}

function getDiaAtualSnapshot() {
  return new Date().getDay();
}

function getDiaAtualServerSnapshot() {
  return null;
}

export default function QuadroSemanalGrid({ dias }: { dias: DiaQuadroComItens[] }) {
  // Só o destaque de "hoje" depende do relógio do visitante.
  const hoje = useSyncExternalStore(
    subscribeDiaAtual,
    getDiaAtualSnapshot,
    getDiaAtualServerSnapshot
  );

  return (
    <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-2 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-2 md:px-0 md:pb-0 md:overflow-visible md:gap-6 md:snap-none lg:grid-cols-3">
      {dias.map((dia) => {
        const { itens } = dia;
        const destaqueHoje = hoje === dia.id;

        return (
          <div
            key={dia.id}
            className={`min-w-60 snap-start rounded-3xl border p-4 transition-colors md:min-w-0 md:p-6 ${
              destaqueHoje
                ? "border-[#ffa726]/50 bg-[#fff8ee] shadow-[0_8px_28px_rgba(0,0,0,0.05)]"
                : "border-black/5 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.04)]"
            }`}
          >
            <div className="mb-3 md:mb-5 flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="ui-card-eyebrow mb-1">
                  {dia.sigla}
                </p>
                <h4 className="font-acme text-xl text-[#212121] tracking-wide md:text-[1.75rem]">
                  {dia.nome}
                </h4>
              </div>
              {destaqueHoje ? (
                <span className="inline-flex shrink-0 items-center rounded-full border border-[#ffa726]/35 bg-white px-3 py-1 text-[10px] font-bold tracking-[0.12em] uppercase text-text-accent">
                  Hoje
                </span>
              ) : null}
            </div>

            <div className="space-y-2 md:space-y-3">
              {itens.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-black/5 bg-[#f9f9f9] px-3 py-2 md:px-4 md:py-3"
                >
                  <p className="ui-card-eyebrow mb-1">
                    {item.horario}
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-[#212121]">
                    {item.titulo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
