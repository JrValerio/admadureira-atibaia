"use client";

import { useEffect, useState } from "react";
import { getCountdownState, type CountdownState } from "@/lib/countdown";

type EventCountdownProps = {
  targetIso: string;
  endIso: string;
  eventName: string;
  variant?: "light" | "overlay";
};

const UNITS = [
  ["days", "dias"],
  ["hours", "horas"],
  ["minutes", "min"],
  ["seconds", "seg"],
] as const;

export default function EventCountdown({
  targetIso,
  endIso,
  eventName,
  variant = "light",
}: EventCountdownProps) {
  const [state, setState] = useState<CountdownState | null>(null);

  useEffect(() => {
    const update = () => setState(getCountdownState(targetIso, endIso));

    update();
    const intervalId = window.setInterval(update, 1000);

    return () => window.clearInterval(intervalId);
  }, [endIso, targetIso]);

  if (!state || state.type === "ended") {
    return null;
  }

  const isOverlay = variant === "overlay";
  const wrapperClassName = isOverlay
    ? "inline-flex flex-col rounded-xl border border-white/20 bg-black/55 px-3 py-2 text-white shadow-lg backdrop-blur-sm"
    : "inline-flex flex-col rounded-2xl border border-[#ffa726]/30 bg-[#fff8ed] px-4 py-3 text-[#212121] shadow-sm md:px-5";

  if (state.type === "live") {
    return (
      <div className={wrapperClassName} role="status">
        <span className="text-sm font-bold tracking-wide text-[#ffa726]">
          A {eventName} começou!
        </span>
      </div>
    );
  }

  const accessibleLabel = `Faltam ${state.days} dias, ${state.hours} horas, ${state.minutes} minutos e ${state.seconds} segundos para a ${eventName}.`;

  return (
    <div className={wrapperClassName} role="timer" aria-label={accessibleLabel}>
      <span
        className={`mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${
          isOverlay ? "text-[#ffc46b]" : "text-[#b96500]"
        }`}
      >
        Contagem regressiva
      </span>
      <span className="flex items-start gap-2" aria-hidden="true">
        {UNITS.map(([key, label]) => (
          <span key={key} className="flex min-w-10 flex-col items-center">
            <span
              className={`font-acme text-xl leading-none tabular-nums md:text-2xl ${
                isOverlay ? "text-white" : "text-[#212121]"
              }`}
            >
              {String(state[key]).padStart(2, "0")}
            </span>
            <span
              className={`mt-1 text-[9px] font-bold uppercase tracking-wider ${
                isOverlay ? "text-white/75" : "text-[#6b6258]"
              }`}
            >
              {label}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}
