"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProximoEventoComData } from "@/lib/agenda-utils";

interface Tempo {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

function calcularTempo(alvo: Date): Tempo {
  const diff = Math.max(0, alvo.getTime() - Date.now());
  const total = Math.floor(diff / 1000);
  return {
    dias: Math.floor(total / 86400),
    horas: Math.floor((total % 86400) / 3600),
    minutos: Math.floor((total % 3600) / 60),
    segundos: total % 60,
  };
}

function Bloco({ valor, label }: { valor: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-acme text-3xl md:text-4xl text-white leading-none w-16 text-center">
        {String(valor).padStart(2, "0")}
      </span>
      <span className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mt-1">
        {label}
      </span>
    </div>
  );
}

export default function ContadorEvento() {
  const [resultado, setResultado] = useState(() => getProximoEventoComData());
  const [tempo, setTempo] = useState<Tempo | null>(null);

  useEffect(() => {
    const atualizarContador = () => {
      const proximoCompromisso = getProximoEventoComData();
      setResultado(proximoCompromisso);
      setTempo(
        proximoCompromisso ? calcularTempo(proximoCompromisso.dataEvento) : null
      );
    };

    const timeoutId = window.setTimeout(atualizarContador, 0);
    const intervalId = window.setInterval(atualizarContador, 1000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  if (!resultado || !tempo) return null;

  const { evento } = resultado;
  const encerrado = Object.values(tempo).every((v) => v === 0);
  const botaoLabel =
    evento.origem === "evento" ? "Ver detalhes do evento" : "Ver programação";
  const eyebrow =
    evento.origem === "evento" ? "Próximo evento" : "Próximo compromisso";

  return (
    <section className="bg-[#212121] py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
          {eyebrow}
        </p>
        <h3 className="font-acme text-white text-2xl md:text-3xl tracking-wide mb-6">
          {evento.titulo}
        </h3>
        {evento.detalhe ? (
          <p className="text-white/55 text-xs font-bold tracking-widest uppercase mb-5">
            {evento.detalhe}
          </p>
        ) : null}

        {encerrado ? (
          <p className="text-white/60 text-sm">
            Compromisso em andamento ou encerrado.
          </p>
        ) : (
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <Bloco valor={tempo.dias} label="dias" />
            <span className="text-[#ffa726] text-2xl font-bold mb-4">:</span>
            <Bloco valor={tempo.horas} label="horas" />
            <span className="text-[#ffa726] text-2xl font-bold mb-4">:</span>
            <Bloco valor={tempo.minutos} label="min" />
            <span className="text-[#ffa726] text-2xl font-bold mb-4">:</span>
            <Bloco valor={tempo.segundos} label="seg" />
          </div>
        )}

        <p className="text-white/40 text-xs mt-5">
          {evento.data} · {evento.mes} · {evento.ano}
          {evento.horario && ` · ${evento.horario}`}
        </p>

        <Link
          href={evento.href}
          className="mt-5 inline-block text-[#ffa726] text-xs font-bold tracking-widest uppercase hover:underline"
        >
          {botaoLabel} →
        </Link>
      </div>
    </section>
  );
}
