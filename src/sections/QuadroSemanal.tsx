"use client";

import { useSyncExternalStore } from "react";
import { programacaoSemanal } from "@/data/agenda";

type DiaQuadro = {
  id: number;
  sigla: string;
  nome: string;
};

type ItemQuadro = {
  id: string;
  horario: string;
  titulo: string;
};

const diasQuadro: DiaQuadro[] = [
  { id: 1, sigla: "Seg", nome: "Segunda" },
  { id: 2, sigla: "Ter", nome: "Terça" },
  { id: 3, sigla: "Qua", nome: "Quarta" },
  { id: 4, sigla: "Qui", nome: "Quinta" },
  { id: 5, sigla: "Sex", nome: "Sexta" },
  { id: 0, sigla: "Dom", nome: "Domingo" },
];

const mapaDias: Record<string, number[]> = {
  "Segunda a Sexta": [1, 2, 3, 4, 5],
  "Segunda-feira": [1],
  "Terça-feira": [2],
  "Quarta-feira": [3],
  "Quinta-feira": [4],
  "Sexta-feira": [5],
  Domingo: [0],
};

function extrairOrdemHorario(horario: string) {
  const match = horario.match(/(\d{1,2})h(\d{2})?/);
  if (!match) return Number.MAX_SAFE_INTEGER;

  const horas = parseInt(match[1], 10);
  const minutos = match[2] ? parseInt(match[2], 10) : 0;
  return horas * 60 + minutos;
}

function montarQuadroSemanal() {
  const quadro = new Map<number, ItemQuadro[]>();

  programacaoSemanal.forEach((item, index) => {
    const dias = mapaDias[item.dia] ?? [];

    dias.forEach((dia) => {
      const atuais = quadro.get(dia) ?? [];
      atuais.push({
        id: `${dia}-${item.titulo}-${index}`,
        horario: item.horario ?? "",
        titulo: item.titulo,
      });
      quadro.set(dia, atuais);
    });
  });

  diasQuadro.forEach((dia) => {
    const itens = quadro.get(dia.id) ?? [];
    itens.sort((a, b) => extrairOrdemHorario(a.horario) - extrairOrdemHorario(b.horario));
    quadro.set(dia.id, itens);
  });

  return quadro;
}

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

export default function QuadroSemanal() {
  const hoje = useSyncExternalStore(
    subscribeDiaAtual,
    getDiaAtualSnapshot,
    getDiaAtualServerSnapshot
  );
  const quadro = montarQuadroSemanal();

  return (
    <section className="mb-10 md:mb-20">
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
        <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
          Visão rápida da semana
        </p>
        <h3 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-4">
          Programação da Semana
        </h3>
        <p className="text-[#5f5f5f] leading-relaxed">
          Veja rapidamente os cultos e reuniões de cada dia e descubra quando
          você pode estar conosco ao longo da semana.
        </p>
      </div>

      <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-2 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-2 md:px-0 md:pb-0 md:overflow-visible md:gap-6 md:snap-none xl:grid-cols-3">
        {diasQuadro.map((dia) => {
          const itens = quadro.get(dia.id) ?? [];
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
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    {dia.sigla}
                  </p>
                  <h4 className="font-acme text-xl text-[#212121] tracking-wide md:text-[1.75rem]">
                    {dia.nome}
                  </h4>
                </div>
                {destaqueHoje ? (
                  <span className="inline-flex shrink-0 items-center rounded-full border border-[#ffa726]/35 bg-white px-3 py-1 text-[10px] font-bold tracking-[0.12em] uppercase text-[#8b5b18]">
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
                    <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
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
    </section>
  );
}
