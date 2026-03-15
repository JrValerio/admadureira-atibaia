"use client";

import Link from "next/link";
import { useEffect } from "react";

type EbdPrintControlsProps = {
  title: string;
  subtitle: string;
  backHref: string;
  alternateHref: string;
  alternateLabel: string;
};

export default function EbdPrintControls({
  title,
  subtitle,
  backHref,
  alternateHref,
  alternateLabel,
}: EbdPrintControlsProps) {
  useEffect(() => {
    document.body.classList.add("ebd-print-mode");

    return () => {
      document.body.classList.remove("ebd-print-mode");
    };
  }, []);

  return (
    <div className="ebd-print-controls mx-auto mb-6 flex max-w-5xl flex-col gap-4 rounded-[1.75rem] border border-black/10 bg-white px-5 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.08)] md:flex-row md:items-center md:justify-between md:px-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#ef5350]">
          Impressão da lição
        </p>
        <h1 className="mt-1 font-acme text-2xl tracking-wide text-[#212121]">
          {title}
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-[#666]">{subtitle}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="ui-btn-primary"
        >
          Imprimir / salvar em PDF
        </button>
        <Link href={alternateHref} className="ui-btn-secondary">
          {alternateLabel}
        </Link>
        <Link href={backHref} className="ui-btn-ghost">
          Voltar à lição
        </Link>
      </div>
    </div>
  );
}
