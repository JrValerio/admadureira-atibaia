export function buildYouTubeContentSlug(title: string, videoId: string) {
  const normalizedTitle = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " e ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return normalizedTitle
    ? `${normalizedTitle}-${videoId}`
    : videoId;
}

export function getYouTubeVideoIdFromSlug(slug: string) {
  return slug.match(/([A-Za-z0-9_-]{11})$/)?.[1] ?? null;
}

export function getBrazilDateFromIso(isoDate?: string | null) {
  if (!isoDate) {
    return null;
  }

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return year && month && day ? `${year}-${month}-${day}` : null;
}

export function normalizeYouTubeDescription(description?: string | null) {
  return (description ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\u00a0/g, " ")
    .trim();
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength).trim()}...`;
}

export function buildYouTubeSummary(
  description: string | undefined,
  fallback: string
) {
  const normalized = normalizeYouTubeDescription(description);

  if (!normalized) {
    return fallback;
  }

  const firstParagraph = normalized
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .find(Boolean);

  return firstParagraph ? truncateText(firstParagraph, 220) : fallback;
}

export function buildYouTubeStory(
  description: string | undefined,
  fallback: string
) {
  const normalized = normalizeYouTubeDescription(description);
  return normalized || fallback;
}

export function inferSpeakerFromTitle(title: string) {
  const segments = title
    .split("|")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .reverse();

  return segments.find((segment) =>
    /^(Pr\.?|Pra\.?|Pastor(?:a)?|Mission[aá]ria|Mission[aá]rio|Ev\.?|Pb\.?|Presb[ií]tero|Dc\.?|Di[aá]cono)/i.test(
      segment
    )
  );
}

export function inferTestimonyParticipants(title: string) {
  const cleanedTitle = title
    .replace(/^[^A-Za-z0-9À-ÿ]+/u, "")
    .replace(/^Entrevista Especial\s*[–-]\s*/iu, "")
    .replace(/^Testemunho\s*[–-]\s*/iu, "")
    .trim();

  if (cleanedTitle !== title && cleanedTitle.length > 0 && cleanedTitle.length <= 120) {
    return cleanedTitle;
  }

  return undefined;
}
