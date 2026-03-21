"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { ClasseEBD, LicaoEBD } from "@/data/ebd";
import {
  formatEbdDate,
  getEbdPublicLessonReferenceKey,
  getLicaoEditorialStatus,
} from "@/lib/ebd-utils";

type EbdLessonsGridProps = {
  classe: ClasseEBD;
  edicao: string;
  licoes: LicaoEBD[];
  initialSundayReferenceKey: string;
};

function subscribeReferenceDate(callback: () => void) {
  const id = window.setInterval(callback, 60 * 60 * 1000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  return getEbdPublicLessonReferenceKey();
}

function getLessonStatus(licao: LicaoEBD, sundayReferenceKey: string) {
  if (getLicaoEditorialStatus(licao) === "draft") {
    return {
      label: "Em preparação",
      cardClassName: "border-black/5 bg-[#fafafa] shadow-sm",
      badgeClassName: "border-black/10 bg-white text-[#666]",
    };
  }

  const lessonDate = licao.data;

  if (lessonDate < sundayReferenceKey) {
    return {
      label: "Passada",
      cardClassName: "border-black/5 bg-white/85 shadow-sm",
      badgeClassName: "border-black/10 bg-[#f5f5f5] text-[#666]",
    };
  }

  if (lessonDate === sundayReferenceKey) {
    return {
      label: "Esta semana",
      cardClassName:
        "border-[#ffa726]/35 bg-[#fff8ee] shadow-[0_12px_30px_rgba(0,0,0,0.06)]",
      badgeClassName: "border-[#ffa726]/30 bg-white text-[#8b5b18]",
    };
  }

  return {
    label: "Próxima",
    cardClassName: "border-black/5 bg-white shadow-sm",
    badgeClassName: "border-[#ef5350]/12 bg-[#fff3f2] text-[#b0453f]",
  };
}

export default function EbdLessonsGrid({
  classe,
  edicao,
  licoes,
  initialSundayReferenceKey,
}: EbdLessonsGridProps) {
  const sundayReferenceKey = useSyncExternalStore(
    subscribeReferenceDate,
    getSnapshot,
    () => initialSundayReferenceKey
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {licoes.map((licao) => {
        const status = getLessonStatus(licao, sundayReferenceKey);

        return (
          <Link
            key={licao.id}
            href={`/ebd/${classe}/${edicao}/${licao.slug}`}
            className={`group rounded-3xl border p-5 transition-shadow hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] ${status.cardClassName}`}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Lição {licao.numero}
                </p>
                <p className="text-sm text-[#666]">{formatEbdDate(licao.data)}</p>
              </div>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase ${status.badgeClassName}`}
              >
                {status.label}
              </span>
            </div>

            <h3 className="mb-3 font-acme text-2xl tracking-wide text-[#212121] transition-colors group-hover:text-[#ef5350]">
              {licao.titulo}
            </h3>
            <p className="text-sm leading-relaxed text-[#555] line-clamp-3">
              {licao.resumo}
            </p>
            <p className="mt-5 text-xs font-semibold tracking-widest uppercase text-[#ef5350]">
              Ver lição →
            </p>
          </Link>
        );
      })}
    </div>
  );
}
