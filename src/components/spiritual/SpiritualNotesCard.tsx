"use client";

import { useState } from "react";
import { useSpiritualNotes } from "@/hooks/useSpiritualNotes";

type SpiritualNotesCardProps = {
  noteKey: string;
  title?: string;
  description?: string;
  placeholder?: string;
};

export default function SpiritualNotesCard({
  noteKey,
  title = "Minhas anotações",
  description = "Guarde aqui os aprendizados, aplicações e orações que Deus colocou no seu coração.",
  placeholder = "Escreva aqui sua reflexão, um pedido de oração, um aprendizado ou o que o Senhor ministrou ao seu coração...",
}: SpiritualNotesCardProps) {
  const { note, setNote, saveNote, clearNote, hasSavedNote } =
    useSpiritualNotes(noteKey);
  const [feedback, setFeedback] = useState<"idle" | "saved">("idle");

  function handleSave() {
    saveNote();
    setFeedback("saved");
    window.setTimeout(() => {
      setFeedback("idle");
    }, 2000);
  }

  function handleClear() {
    clearNote();
    setFeedback("idle");
  }

  return (
    <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
      <p className="ui-card-eyebrow mb-3">
        {title}
      </p>
      <p className="text-sm text-[#555] leading-relaxed mb-5">{description}</p>

      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder={placeholder}
        className="min-h-[180px] w-full rounded-2xl border border-black/10 bg-[#fafafa] px-4 py-4 text-sm leading-relaxed text-[#212121] outline-none transition-colors placeholder:text-[#888] focus:border-[#ffa726]/40 focus:bg-white"
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center justify-center rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
        >
          Salvar anotação
        </button>
        {hasSavedNote ? (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center justify-center rounded-full border border-[#212121] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#212121] hover:text-white"
          >
            Limpar
          </button>
        ) : null}
        {feedback === "saved" ? (
          <p className="text-xs font-semibold tracking-widest uppercase text-[#2e7d32]">
            Anotação salva
          </p>
        ) : null}
      </div>
    </div>
  );
}
