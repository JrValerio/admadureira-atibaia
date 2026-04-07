export type GaleriaCategoria = "culto" | "evento" | "ebd";

export type GaleriaImagem = {
  src: string;
  alt: string;
  caption?: string;
};

export type GaleriaAlbum = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  shortDescription?: string;
  coverImage: GaleriaImagem;
  images: GaleriaImagem[];
  category: GaleriaCategoria;
};

const galeriaCategoryLabelMap: Record<GaleriaCategoria, string> = {
  culto: "Culto",
  evento: "Evento",
  ebd: "EBD",
};

export const GALERIA_PAGE_COPY = {
  heroLabel: "Galeria da igreja",
  heroTitle: "Registros que contam a caminhada da igreja",
  heroDescription:
    "Registros fotográficos dos cultos e eventos da Igreja Assembleia de Deus - Ministério Madureira em Atibaia.",
  introTitle: "Momentos que ajudam a lembrar a caminhada da igreja",
  introDescription:
    "Aqui você encontra registros de cultos, eventos e momentos especiais da AD Madureira Atibaia, reunidos com cuidado e reverência.",
  emptyTitle: "Os primeiros álbuns chegarão em breve",
  emptyDescription:
    "Em breve esta área receberá os primeiros registros fotográficos da igreja. Enquanto isso, acompanhe a programação presencial e as transmissões.",
} as const;

export const GALERIA_ALBUNS: GaleriaAlbum[] = [];

function parseGaleriaDate(date: string) {
  return new Date(`${date}T12:00:00-03:00`);
}

export function formatGaleriaDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parseGaleriaDate(date));
}

export function getGaleriaCategoryLabel(category: GaleriaCategoria) {
  return galeriaCategoryLabelMap[category];
}

export function getGaleriaAlbuns() {
  return [...GALERIA_ALBUNS].sort(
    (left, right) =>
      parseGaleriaDate(right.date).getTime() -
      parseGaleriaDate(left.date).getTime()
  );
}

export function getGaleriaAlbumBySlug(slug: string) {
  return getGaleriaAlbuns().find((album) => album.slug === slug) ?? null;
}

export function getGaleriaAlbumCount() {
  return GALERIA_ALBUNS.length;
}

export function getGaleriaPhotoCount() {
  return GALERIA_ALBUNS.reduce((total, album) => total + album.images.length, 0);
}

export function getGaleriaLatestDate() {
  const albumMaisRecente = getGaleriaAlbuns()[0];

  return albumMaisRecente ? parseGaleriaDate(albumMaisRecente.date) : null;
}
