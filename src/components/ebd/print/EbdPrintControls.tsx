"use client";

import Link from "next/link";
import { useEffect } from "react";

type EbdPrintControlsProps = {
  title: string;
  backHref: string;
  alternateHref: string;
  alternateLabel: string;
};

export default function EbdPrintControls({
  title,
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
    <div className="ebd-print-controls mx-auto mb-5 max-w-[190mm] border-b border-black/10 pb-3 text-[#444]">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ef5350]">
          Impressão da lição
        </p>
        <h1 className="mt-1 font-acme text-[2rem] leading-tight tracking-wide text-[#212121]">
          {title}
        </h1>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] font-medium text-[#212121]">
        <button
          type="button"
          onClick={() => window.print()}
          className="bg-transparent p-0 text-[#212121] underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
        >
          Imprimir / salvar em PDF
        </button>
        <Link
          href={alternateHref}
          className="text-[#212121] underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
        >
          {alternateLabel}
        </Link>
        <Link
          href={backHref}
          className="text-[#212121] underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
        >
          Voltar à lição
        </Link>
      </div>
    </div>
  );
}
