"use client";

import { useEffect, useState } from "react";

type BibleReadingModeToggleProps = {
  targetId: string;
};

export default function BibleReadingModeToggle({
  targetId,
}: BibleReadingModeToggleProps) {
  const [readingMode, setReadingMode] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);

    if (!target) {
      return undefined;
    }

    target.dataset.readingMode = readingMode ? "true" : "false";

    return () => {
      delete target.dataset.readingMode;
    };
  }, [readingMode, targetId]);

  return (
    <button
      type="button"
      onClick={() => setReadingMode((current) => !current)}
      className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#212121] transition-colors hover:border-[#ffa726] hover:text-[#ef5350]"
    >
      {readingMode ? "Modo padrão" : "Modo leitura"}
    </button>
  );
}
