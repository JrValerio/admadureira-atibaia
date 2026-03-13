"use client";

import { useEffect, useState } from "react";

const DAILY_VISIT_KEY = "daily-visit";
const READING_PLAN_PROGRESS_KEY = "reading-plan-progress";

function getSaoPauloTodayKey() {
  const date = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Sao_Paulo",
    })
  );

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getContinueReadingHref() {
  try {
    const raw = window.localStorage.getItem(READING_PLAN_PROGRESS_KEY);

    if (!raw) {
      return "/espiritualidade/plano-de-leitura";
    }

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const firstEntry = Object.entries(parsed).find((entry) => {
      if (typeof entry[0] !== "string") {
        return false;
      }

      if (typeof entry[1] === "number") {
        return true;
      }

      if (typeof entry[1] !== "object" || entry[1] === null) {
        return false;
      }

      const value = entry[1] as { lastDay?: unknown };
      return typeof value.lastDay === "number";
    });

    if (!firstEntry) {
      return "/espiritualidade/plano-de-leitura";
    }

    const [planSlug, value] = firstEntry;
    const typedValue =
      typeof value === "object" && value !== null
        ? (value as { lastDay?: unknown })
        : null;
    const day =
      typeof value === "number"
        ? value
        : typeof typedValue?.lastDay === "number"
          ? typedValue.lastDay
          : null;

    if (!day) {
      return "/espiritualidade/plano-de-leitura";
    }

    const normalizedDay = Math.max(1, Math.floor(day));

    return `/espiritualidade/plano-de-leitura/${planSlug}/dia/${normalizedDay}`;
  } catch {
    return "/espiritualidade/plano-de-leitura";
  }
}

function getGreeting() {
  const hour = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Sao_Paulo",
    })
  ).getHours();

  if (hour < 12) {
    return "Bom dia";
  }

  if (hour < 18) {
    return "Boa tarde";
  }

  return "Boa noite";
}

export function useDailyReminder() {
  const [state, setState] = useState({
    ready: false,
    shouldShowReminder: false,
    continueReadingHref: "/espiritualidade/plano-de-leitura",
    greeting: "Bom dia",
  });

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      const todayKey = getSaoPauloTodayKey();
      const lastVisit = window.localStorage.getItem(DAILY_VISIT_KEY);

      window.localStorage.setItem(DAILY_VISIT_KEY, todayKey);

      setState({
        ready: true,
        shouldShowReminder: lastVisit !== todayKey,
        continueReadingHref: getContinueReadingHref(),
        greeting: getGreeting(),
      });
    });

    return () => window.cancelAnimationFrame(id);
  }, []);

  return state;
}
