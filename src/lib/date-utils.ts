export const SAO_PAULO_TIME_ZONE = "America/Sao_Paulo";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function getDateInTimeZone(
  date = new Date(),
  timeZone = SAO_PAULO_TIME_ZONE
) {
  return new Date(
    date.toLocaleString("en-US", {
      timeZone,
    })
  );
}

export function getSaoPauloDate(date = new Date()) {
  return getDateInTimeZone(date, SAO_PAULO_TIME_ZONE);
}

export function getSaoPauloDayOfYear(date = new Date()) {
  const today = getSaoPauloDate(date);
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();

  return Math.floor(diff / 86400000);
}

export function formatSaoPauloDateKey(date = new Date()) {
  const today = getSaoPauloDate(date);

  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
    today.getDate()
  )}`;
}
