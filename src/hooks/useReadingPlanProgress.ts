"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "reading-plan-progress";

type ProgressMap = Record<string, number>;

function readStorage(): ProgressMap {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);

    if (typeof parsed !== "object" || parsed === null) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, number] =>
          typeof entry[0] === "string" && typeof entry[1] === "number"
      )
    );
  } catch {
    return {};
  }
}

function writeStorage(data: ProgressMap) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useReadingPlanProgress(planSlug: string) {
  const [progress, setProgress] = useState<number | null>(
    () => readStorage()[planSlug] ?? null
  );

  const saveProgress = useCallback(
    (day: number) => {
      const storage = readStorage();
      storage[planSlug] = day;
      writeStorage(storage);
      setProgress(day);
    },
    [planSlug]
  );

  return {
    progress,
    saveProgress,
  };
}
