"use client";

import Link from "next/link";
import type { ClasseEBD, LicaoEBD, StatusEditorialEBD } from "@/data/ebd";
import {
  formatEbdDate,
  getEstadoProgressaoLicao,
  getMetaEstadoProgressaoLicao,
  isLicaoPubliclyAvailable,
} from "@/lib/ebd-utils";

type EbdLessonsGridProps = {
  classe: ClasseEBD;
  edicao: string;
  trimestreRotulo: string;
  licoes: LicaoEBD[];
  trimestreStatusEditorial?: StatusEditorialEBD;
  initialNowIso: string;
};

export default function EbdLessonsGrid({
  classe,
  edicao,
  trimestreRotulo,
  licoes,
  trimestreStatusEditorial,
  initialNowIso,
}: EbdLessonsGridProps) {
  const currentDate = new Date(initialNowIso);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {licoes.map((licao) => {
        const estado = getEstadoProgressaoLicao(
          {
            statusEditorial: trimestreStatusEditorial,
            classe,
            rotulo: trimestreRotulo,
          },
          licao,
          currentDate
        );
        const status = getMetaEstadoProgressaoLicao(estado);
        const isNavigable = isLicaoPubliclyAvailable(
          {
            statusEditorial: trimestreStatusEditorial,
            classe,
            rotulo: trimestreRotulo,
          },
          licao,
          currentDate
        );
        const cardClassName = `group block rounded-3xl border p-5 transition-shadow ${
          isNavigable ? "hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]" : ""
        } ${status.cardClassName}`;
        const cardContent = (
          <>
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
              {status.actionLabel}
            </p>
          </>
        );

        return isNavigable ? (
          <Link
            key={licao.id}
            href={`/ebd/${classe}/${edicao}/${licao.slug}`}
            className={cardClassName}
          >
            {cardContent}
          </Link>
        ) : (
          <article
            key={licao.id}
            data-disabled="true"
            className={cardClassName}
          >
            {cardContent}
          </article>
        );
      })}
    </div>
  );
}
