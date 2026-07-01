const WEEKDAY_OFFSET_FROM_LESSON_DATE: Record<string, number> = {
  segunda: -6,
  "segunda-feira": -6,
  terca: -5,
  "terca-feira": -5,
  quarta: -4,
  "quarta-feira": -4,
  quinta: -3,
  "quinta-feira": -3,
  sexta: -2,
  "sexta-feira": -2,
  sabado: -1,
  domingo: 0,
};

function normalizeWeekday(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function isIsoDateKey(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function addDaysToDateKey(dateKey: string, days: number) {
  if (!isIsoDateKey(dateKey)) {
    return null;
  }

  const date = new Date(`${dateKey}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  date.setUTCDate(date.getUTCDate() + days);

  return date.toISOString().slice(0, 10);
}

export function getEbdScheduleDateForLessonDay(
  lessonDate: string,
  weekday: string
) {
  const offset = WEEKDAY_OFFSET_FROM_LESSON_DATE[normalizeWeekday(weekday)];

  if (typeof offset !== "number") {
    return null;
  }

  return addDaysToDateKey(lessonDate, offset);
}

export function getSaoPauloDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "America/Sao_Paulo",
    year: "numeric",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return year && month && day ? `${year}-${month}-${day}` : null;
}
