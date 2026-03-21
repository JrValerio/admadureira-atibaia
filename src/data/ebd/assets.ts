export function getEbdQuarterCoverPath(
  classe: "adultos" | "jovens",
  edicao: string,
  arquivo: string
) {
  return `/images/EBD/${classe}/${edicao}/${arquivo}`;
}

export function getEbdLessonImagePath(
  classe: "adultos" | "jovens",
  edicao: string,
  numero: number,
  extensao: "jpg" | "png"
) {
  const numeroNormalizado = String(numero).padStart(2, "0");

  return `/images/EBD/${classe}/${edicao}/licao-${numeroNormalizado}.${extensao}`;
}

export const EBD_DEFAULT_COVER_IMAGE = getEbdQuarterCoverPath(
  "adultos",
  "2026-1t",
  "ebd-1t-capa.png"
);
