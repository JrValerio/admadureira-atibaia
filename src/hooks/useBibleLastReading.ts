"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "bible-last-reading";

export type BibleLastReading = {
  book: string;
  chapter: number;
  verse?: number;
};

function normalizeLastReading(value: unknown): BibleLastReading | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const parsed = value as Partial<BibleLastReading>;

  if (typeof parsed.book !== "string" || typeof parsed.chapter !== "number") {
    return null;
  }

  return {
    book: parsed.book,
    chapter: parsed.chapter,
    ...(typeof parsed.verse === "number" ? { verse: parsed.verse } : {}),
  };
}

function readStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return normalizeLastReading(JSON.parse(raw));
  } catch {
    return null;
  }
}

function writeStorage(value: BibleLastReading) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function useBibleLastReading() {
  const [lastReading, setLastReading] = useState<BibleLastReading | null>(
    () => readStorage()
  );

  const saveLastReading = useCallback((value: BibleLastReading) => {
    writeStorage(value);
    setLastReading(value);
  }, []);

  return {
    lastReading,
    saveLastReading,
  };
}
