"use client";

import { useEffect } from "react";
import { useBibleLastReading } from "@/hooks/useBibleLastReading";

type BibleLastReadingTrackerProps = {
  book: string;
  chapter: number;
};

function readVerseFromHash() {
  const match = window.location.hash.match(/^#v(\d+)$/);

  if (!match) {
    return undefined;
  }

  const verse = Number(match[1]);
  return Number.isFinite(verse) ? verse : undefined;
}

export default function BibleLastReadingTracker({
  book,
  chapter,
}: BibleLastReadingTrackerProps) {
  const { saveLastReading } = useBibleLastReading();

  useEffect(() => {
    const persist = () => {
      saveLastReading({
        book,
        chapter,
        verse: readVerseFromHash(),
      });
    };

    persist();
    window.addEventListener("hashchange", persist);

    return () => {
      window.removeEventListener("hashchange", persist);
    };
  }, [book, chapter, saveLastReading]);

  return null;
}
