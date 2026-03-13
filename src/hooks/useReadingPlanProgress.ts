"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "reading-plan-progress";

type PlanProgress = {
  lastDay: number | null;
  completedDays: number[];
};

type ProgressMap = Record<string, PlanProgress>;

function normalizeDay(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return Math.max(1, Math.floor(value));
}

function normalizeCompletedDays(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .map((day) => normalizeDay(day))
        .filter((day): day is number => day !== null)
    )
  ).sort((left, right) => left - right);
}

function normalizePlanProgress(value: unknown): PlanProgress {
  if (typeof value === "number") {
    return {
      lastDay: normalizeDay(value),
      completedDays: [],
    };
  }

  if (typeof value !== "object" || value === null) {
    return {
      lastDay: null,
      completedDays: [],
    };
  }

  const parsed = value as {
    lastDay?: unknown;
    completedDays?: unknown;
  };

  return {
    lastDay: normalizeDay(parsed.lastDay ?? null),
    completedDays: normalizeCompletedDays(parsed.completedDays),
  };
}

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
      Object.entries(parsed)
        .filter((entry): entry is [string, unknown] => typeof entry[0] === "string")
        .map(([planSlug, progress]) => [
          planSlug,
          normalizePlanProgress(progress),
        ])
        .filter(
          (entry): entry is [string, PlanProgress] =>
            typeof entry[0] === "string" && typeof entry[1] === "object"
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
  const [planProgress, setPlanProgress] = useState<PlanProgress>(() => {
    const storage = readStorage();
    return (
      storage[planSlug] ?? {
        lastDay: null,
        completedDays: [],
      }
    );
  });

  const saveLastOpenedDay = useCallback(
    (day: number) => {
      const normalizedDay = normalizeDay(day);

      if (!normalizedDay) {
        return;
      }

      const storage = readStorage();
      const current = storage[planSlug] ?? {
        lastDay: null,
        completedDays: [],
      };
      const next = {
        ...current,
        lastDay: normalizedDay,
      };

      storage[planSlug] = next;
      writeStorage(storage);
      setPlanProgress(next);
    },
    [planSlug]
  );

  const toggleDayCompleted = useCallback(
    (day: number) => {
      const normalizedDay = normalizeDay(day);

      if (!normalizedDay) {
        return;
      }

      const storage = readStorage();
      const current = storage[planSlug] ?? {
        lastDay: null,
        completedDays: [],
      };
      const isCompleted = current.completedDays.includes(normalizedDay);
      const completedDays = isCompleted
        ? current.completedDays.filter((item) => item !== normalizedDay)
        : [...current.completedDays, normalizedDay].sort(
            (left, right) => left - right
          );
      const next = {
        ...current,
        completedDays,
      };

      storage[planSlug] = next;
      writeStorage(storage);
      setPlanProgress(next);
    },
    [planSlug]
  );

  const isDayCompleted = useCallback(
    (day: number) => planProgress.completedDays.includes(day),
    [planProgress.completedDays]
  );

  return {
    progress: planProgress.lastDay,
    lastDay: planProgress.lastDay,
    completedDays: planProgress.completedDays,
    completedCount: planProgress.completedDays.length,
    saveLastOpenedDay,
    toggleDayCompleted,
    isDayCompleted,
  };
}
