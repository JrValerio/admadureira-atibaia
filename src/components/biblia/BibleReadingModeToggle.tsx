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
      className="ui-btn-ghost"
    >
      {readingMode ? "Modo padrão" : "Modo leitura"}
    </button>
  );
}
