"use client";

import { useEffect, useState } from "react";

type BibleShareButtonProps = {
  reference: string;
  url: string;
};

type ShareState = "idle" | "copied" | "error";

export default function BibleShareButton({
  reference,
  url,
}: BibleShareButtonProps) {
  const [shareState, setShareState] = useState<ShareState>("idle");

  useEffect(() => {
    if (shareState === "idle") {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShareState("idle");
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [shareState]);

  const handleShare = async () => {
    const text = `${reference}\n\nLeia na Bíblia:\n${url}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: reference,
          text,
          url,
        });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setShareState("copied");
        return;
      }

      setShareState("error");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setShareState("error");
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
      <button
        type="button"
        onClick={handleShare}
        aria-label={`Compartilhar ${reference}`}
        className="ui-btn-ghost"
      >
        Compartilhar este capítulo
      </button>
      {shareState === "copied" ? (
        <span className="text-xs font-semibold text-green-700">Copiado!</span>
      ) : null}
      {shareState === "error" ? (
        <span className="text-xs font-semibold text-[#ef5350]">
          Não foi possível compartilhar.
        </span>
      ) : null}
    </div>
  );
}
