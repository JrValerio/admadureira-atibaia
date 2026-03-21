import {
  classesEBD,
  trimestresEBDPorClasse,
  type ClasseEBD,
  type ClasseEBDInfo,
  type LicaoEBD,
  type LicaoEBDComContexto,
  type StatusEditorialEBD,
  type StatusLicaoEBD,
  type TrimestreEBD,
} from "@/data/ebd";
import { getSaoPauloDate } from "@/lib/date-utils";

export type EstadoProgressaoLicaoEBD =
  | "concluida"
  | "liberada"
  | "em-breve"
  | "draft";

export type MetaEstadoProgressaoLicaoEBD = {
  label: string;
  cardClassName: string;
  badgeClassName: string;
  actionLabel: string;
};

export function isClasseEbd(value: string): value is ClasseEBD {
  return classesEBD.some((item) => item.slug === value);
}

export function getClasseEbdInfo(classe: ClasseEBD): ClasseEBDInfo {
  const classeInfo = classesEBD.find((item) => item.slug === classe);

  if (!classeInfo) {
    throw new Error(`[EBD] Classe não mapeada: "${classe}"`);
  }

  return classeInfo;
}

function isClassePublicadaNoSite(classe: ClasseEBD) {
  return getClasseEbdInfo(classe).publicadaNoSite;
}

function compareTrimestresDesc(a: TrimestreEBD, b: TrimestreEBD) {
  if (a.ano !== b.ano) {
    return b.ano - a.ano;
  }

  return b.trimestre - a.trimestre;
}

function compareLicoesAsc(a: LicaoEBDComContexto, b: LicaoEBDComContexto) {
  return a.licao.data.localeCompare(b.licao.data);
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getEbdSundayReferenceKey(date = new Date()) {
  const saoPauloDate = getSaoPauloDate(date);
  const sundayDate = new Date(saoPauloDate);
  const weekDay = sundayDate.getDay();
  const daysUntilSunday = weekDay === 0 ? 0 : 7 - weekDay;

  // Em dias úteis, ancoramos a consulta no domingo mais próximo à frente
  // para destacar a lição que a igreja está prestes a estudar.
  sundayDate.setHours(0, 0, 0, 0);
  sundayDate.setDate(sundayDate.getDate() + daysUntilSunday);

  return formatDateKey(sundayDate);
}

export function getEbdPublicLessonReferenceKey(date = new Date()) {
  const saoPauloDate = getSaoPauloDate(date);
  const sundayDate = new Date(saoPauloDate);
  const weekDay = sundayDate.getDay();

  sundayDate.setHours(0, 0, 0, 0);

  if (weekDay === 0 || weekDay === 5 || weekDay === 6) {
    const daysUntilSunday = weekDay === 0 ? 0 : 7 - weekDay;
    sundayDate.setDate(sundayDate.getDate() + daysUntilSunday);
  } else {
    sundayDate.setDate(sundayDate.getDate() - weekDay);
  }

  return formatDateKey(sundayDate);
}

export function getEbdStudyReferenceKey(date = new Date()) {
  const saoPauloDate = getSaoPauloDate(date);
  const sundayDate = new Date(saoPauloDate);
  const weekDay = sundayDate.getDay();
  const daysSinceSunday = weekDay === 0 ? 0 : weekDay;

  sundayDate.setHours(0, 0, 0, 0);
  sundayDate.setDate(sundayDate.getDate() - daysSinceSunday);

  return formatDateKey(sundayDate);
}

export function isLicaoPublished(licao: Pick<LicaoEBD, "statusEditorial">) {
  return (licao.statusEditorial ?? "published") === "published";
}

export function getLicaoReleaseWindowKey(licao: Pick<LicaoEBD, "data">) {
  const releaseDate = new Date(`${licao.data}T12:00:00-03:00`);
  const weekDay = releaseDate.getDay();
  const daysSinceFriday = (weekDay - 5 + 7) % 7;

  releaseDate.setHours(0, 0, 0, 0);
  releaseDate.setDate(releaseDate.getDate() - daysSinceFriday);

  return formatDateKey(releaseDate);
}

export function isTrimestreDraft(
  trimestre: Pick<TrimestreEBD, "statusEditorial">
) {
  return (trimestre.statusEditorial ?? "published") === "draft";
}

export function isLicaoInsideReleaseWindow(
  licao: Pick<LicaoEBD, "data">,
  date = new Date()
) {
  const releaseWindowKey = getLicaoReleaseWindowKey(licao);
  const currentDateKey = formatDateKey(getSaoPauloDate(date));

  return currentDateKey >= releaseWindowKey;
}

export function isLicaoPubliclyAvailable(
  trimestre: Pick<TrimestreEBD, "statusEditorial">,
  licao: Pick<LicaoEBD, "statusEditorial" | "data">,
  date = new Date()
) {
  return (
    !isTrimestreDraft(trimestre) &&
    isLicaoPublished(licao) &&
    isLicaoInsideReleaseWindow(licao, date)
  );
}

export function getTrimestrePublishedLessonCount(trimestre: TrimestreEBD) {
  return trimestre.licoes.filter((licao) => isLicaoPublished(licao)).length;
}

export function getTrimestrePublicLessonCount(
  trimestre: TrimestreEBD,
  date = new Date()
) {
  return trimestre.licoes.filter((licao) =>
    isLicaoPubliclyAvailable(trimestre, licao, date)
  ).length;
}

export function getTrimestreEditorialStatus(
  trimestre: TrimestreEBD
): StatusEditorialEBD {
  return trimestre.statusEditorial ?? "published";
}

export function getLicaoEditorialStatus(licao: LicaoEBD): StatusLicaoEBD {
  return licao.statusEditorial ?? "published";
}

export function getEstadoProgressaoLicao(
  trimestre: Pick<TrimestreEBD, "statusEditorial">,
  licao: Pick<LicaoEBD, "statusEditorial" | "data">,
  date = new Date()
): EstadoProgressaoLicaoEBD {
  if (isTrimestreDraft(trimestre) || !isLicaoPublished(licao)) {
    return "draft";
  }

  if (!isLicaoInsideReleaseWindow(licao, date)) {
    return "em-breve";
  }

  const referenceKey = getEbdPublicLessonReferenceKey(date);

  return licao.data < referenceKey ? "concluida" : "liberada";
}

export function getMetaEstadoProgressaoLicao(
  estado: EstadoProgressaoLicaoEBD
): MetaEstadoProgressaoLicaoEBD {
  switch (estado) {
    case "draft":
      return {
        label: "Draft",
        cardClassName: "border-black/5 bg-[#fafafa] shadow-sm",
        badgeClassName: "border-black/10 bg-white text-[#666]",
        actionLabel: "Conteúdo em preparação",
      };
    case "em-breve":
      return {
        label: "Em breve",
        cardClassName: "border-[#ffa726]/15 bg-[#fffaf3] shadow-sm",
        badgeClassName: "border-[#ffa726]/25 bg-white text-[#8b5b18]",
        actionLabel: "Liberação na janela da semana",
      };
    case "liberada":
      return {
        label: "Liberada",
        cardClassName:
          "border-[#ffa726]/35 bg-[#fff8ee] shadow-[0_12px_30px_rgba(0,0,0,0.06)]",
        badgeClassName: "border-[#ffa726]/30 bg-white text-[#8b5b18]",
        actionLabel: "Abrir lição →",
      };
    case "concluida":
    default:
      return {
        label: "Concluída",
        cardClassName: "border-black/5 bg-white/85 shadow-sm",
        badgeClassName: "border-black/10 bg-[#f5f5f5] text-[#666]",
        actionLabel: "Abrir lição →",
      };
  }
}

export function getContagemProgressaoDoTrimestre(
  trimestre: TrimestreEBD,
  date = new Date()
) {
  return trimestre.licoes.reduce(
    (acc, licao) => {
      const estado = getEstadoProgressaoLicao(trimestre, licao, date);
      acc[estado] += 1;
      return acc;
    },
    {
      concluida: 0,
      liberada: 0,
      "em-breve": 0,
      draft: 0,
    } as Record<EstadoProgressaoLicaoEBD, number>
  );
}

function getLicoesComContexto(classe: ClasseEBD): LicaoEBDComContexto[] {
  const classeInfo = getClasseEbdInfo(classe);

  return trimestresEBDPorClasse[classe]
    .flatMap((trimestre) =>
      trimestre.licoes.map((licao) => ({
        classe: classeInfo,
        trimestre,
        licao,
      }))
    )
    .sort(compareLicoesAsc);
}

function getPublishedLicoesComContexto(
  classe: ClasseEBD,
  date = new Date()
): LicaoEBDComContexto[] {
  return getLicoesComContexto(classe).filter(({ trimestre, licao }) =>
    isLicaoPubliclyAvailable(trimestre, licao, date)
  );
}

function getPrimeiraLicaoPublica(trimestre: TrimestreEBD, date = new Date()) {
  return (
    trimestre.licoes.find((licao) =>
      isLicaoPubliclyAvailable(trimestre, licao, date)
    ) ?? null
  );
}

function getUltimaLicaoPublica(trimestre: TrimestreEBD, date = new Date()) {
  for (let index = trimestre.licoes.length - 1; index >= 0; index -= 1) {
    const licao = trimestre.licoes[index];

    if (isLicaoPubliclyAvailable(trimestre, licao, date)) {
      return licao;
    }
  }

  return null;
}

function getLicoesPublicasNoTrimestre(
  trimestre: TrimestreEBD,
  date = new Date()
) {
  return trimestre.licoes.filter((licao) =>
    isLicaoPubliclyAvailable(trimestre, licao, date)
  );
}

export function getClassesEbd() {
  return [...classesEBD].sort((a, b) => a.ordem - b.ordem);
}

export function hasClasseEbdPublicada(classe: ClasseEBD, date = new Date()) {
  if (!isClassePublicadaNoSite(classe)) {
    return false;
  }

  return getTrimestresPorClasse(classe).some(
    (trimestre) => getTrimestrePublicLessonCount(trimestre, date) > 0
  );
}

export function isClasseEbdPublicada(value: string): value is ClasseEBD {
  return isClasseEbd(value) && hasClasseEbdPublicada(value);
}

export function getClassesEbdPublicadas(date = new Date()) {
  return getClassesEbd().filter((classe) =>
    hasClasseEbdPublicada(classe.slug, date)
  );
}

export function getTrimestreMaisRecente(classe: ClasseEBD, date = new Date()) {
  const trimestres = getTrimestresPorClasse(classe);

  return (
    trimestres.find((trimestre) => getTrimestrePublicLessonCount(trimestre, date) > 0) ??
    trimestres[0] ??
    null
  );
}

export function getTrimestreAtual(classe: ClasseEBD, date = new Date()) {
  if (!hasClasseEbdPublicada(classe, date)) {
    return null;
  }

  const referenceKey = getEbdPublicLessonReferenceKey(date);
  const trimestres = getTrimestresPorClasse(classe);

  const trimestreAtual =
    trimestres.find((trimestre) => {
      const primeiraLicao = getPrimeiraLicaoPublica(trimestre, date);
      const ultimaLicao = getUltimaLicaoPublica(trimestre, date);

      if (!primeiraLicao || !ultimaLicao) {
        return false;
      }

      return (
        referenceKey >= primeiraLicao.data &&
        referenceKey <= ultimaLicao.data
      );
    }) ?? null;

  if (trimestreAtual) {
    return trimestreAtual;
  }

  return (
    trimestres.find((trimestre) => {
      const primeiraLicao = getPrimeiraLicaoPublica(trimestre, date);
      return primeiraLicao ? primeiraLicao.data >= referenceKey : false;
    }) ?? getTrimestreMaisRecente(classe, date)
  );
}

export function getTrimestresPorClasse(classe: ClasseEBD) {
  return [...trimestresEBDPorClasse[classe]].sort(compareTrimestresDesc);
}

export function getTrimestresEbdPublicos(classe: ClasseEBD, date = new Date()) {
  if (!isClassePublicadaNoSite(classe)) {
    return [];
  }

  return getTrimestresPorClasse(classe).filter(
    (trimestre) => getTrimestrePublicLessonCount(trimestre, date) > 0
  );
}

export function getTrimestre(classe: ClasseEBD, edicao: string) {
  return (
    trimestresEBDPorClasse[classe].find((trimestre) => trimestre.slug === edicao) ??
    null
  );
}

export function getLicao(classe: ClasseEBD, edicao: string, licaoSlug: string) {
  const trimestre = getTrimestre(classe, edicao);

  if (!trimestre) {
    return null;
  }

  const licao = trimestre.licoes.find((item) => item.slug === licaoSlug) ?? null;

  if (!licao) {
    return null;
  }

  return {
    classe: getClasseEbdInfo(classe),
    trimestre,
    licao,
  };
}

export function getLicaoDaSemana(classe: ClasseEBD, date = new Date()) {
  if (!hasClasseEbdPublicada(classe, date)) {
    return null;
  }

  const publicReferenceKey = getEbdPublicLessonReferenceKey(date);

  return (
    getPublishedLicoesComContexto(classe, date).find(
      ({ licao }) => licao.data >= publicReferenceKey
    ) ?? null
  );
}

export function getLicaoEmEstudo(classe: ClasseEBD, date = new Date()) {
  if (!hasClasseEbdPublicada(classe, date)) {
    return null;
  }

  const studyReferenceKey = getEbdStudyReferenceKey(date);
  const licoes = getPublishedLicoesComContexto(classe, date);

  for (let index = licoes.length - 1; index >= 0; index -= 1) {
    const licao = licoes[index];

    if (licao.licao.data <= studyReferenceKey) {
      return licao;
    }
  }

  return licoes[0] ?? null;
}

export function getProximaLicao(classe: ClasseEBD, date = new Date()) {
  if (!hasClasseEbdPublicada(classe, date)) {
    return null;
  }

  const licaoDaSemana = getLicaoDaSemana(classe, date);

  if (!licaoDaSemana) {
    return null;
  }

  return (
    getPublishedLicoesComContexto(classe, date).find(
      ({ licao }) => licao.data > licaoDaSemana.licao.data
    ) ?? null
  );
}

export function getLicaoAnterior(
  classe: ClasseEBD,
  edicao: string,
  licaoSlug: string,
  date = new Date()
) {
  const trimestre = getTrimestre(classe, edicao);

  if (!trimestre) {
    return null;
  }

  const licoesPublicas = getLicoesPublicasNoTrimestre(trimestre, date);
  const currentIndex = licoesPublicas.findIndex((item) => item.slug === licaoSlug);

  return currentIndex > 0 ? licoesPublicas[currentIndex - 1] : null;
}

export function getLicaoProximaNoTrimestre(
  classe: ClasseEBD,
  edicao: string,
  licaoSlug: string,
  date = new Date()
) {
  const trimestre = getTrimestre(classe, edicao);

  if (!trimestre) {
    return null;
  }

  const licoesPublicas = getLicoesPublicasNoTrimestre(trimestre, date);
  const currentIndex = licoesPublicas.findIndex((item) => item.slug === licaoSlug);

  return currentIndex >= 0 && currentIndex < licoesPublicas.length - 1
    ? licoesPublicas[currentIndex + 1]
    : null;
}

export function getLicaoAdjacenteNoTrimestre(
  classe: ClasseEBD,
  edicao: string,
  licaoSlug: string,
  direction: "previous" | "next"
) {
  const trimestre = getTrimestre(classe, edicao);

  if (!trimestre) {
    return null;
  }

  const currentIndex = trimestre.licoes.findIndex(
    (item) => item.slug === licaoSlug
  );

  if (currentIndex < 0) {
    return null;
  }

  if (direction === "previous") {
    return currentIndex > 0 ? trimestre.licoes[currentIndex - 1] : null;
  }

  return currentIndex < trimestre.licoes.length - 1
    ? trimestre.licoes[currentIndex + 1]
    : null;
}

export function getPosicaoDaLicaoNoTrimestre(
  trimestre: TrimestreEBD,
  licaoSlug: string
) {
  const currentIndex = trimestre.licoes.findIndex(
    (item) => item.slug === licaoSlug
  );

  return currentIndex >= 0 ? currentIndex + 1 : null;
}

export function formatEbdDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00-03:00`));
}
