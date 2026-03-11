"use client";

import { useEffect, useState } from "react";

type CopyPixButtonProps = {
  chave: string;
};

export default function CopyPixButton({ chave }: CopyPixButtonProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (status === "idle") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setStatus("idle");
    }, 2500);

    return () => window.clearTimeout(timeout);
  }, [status]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chave);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ef5350] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#ef5350] transition-colors hover:bg-[#ef5350]/5"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        {status === "success" ? "Chave copiada" : "Copiar chave"}
      </button>
      <p className="mt-2 text-xs text-[#777]">
        {status === "error"
          ? "Nao foi possivel copiar automaticamente. Copie a chave manualmente."
          : "Copie a chave para abrir o app do seu banco e concluir a contribuicao."}
      </p>
    </div>
  );
}
