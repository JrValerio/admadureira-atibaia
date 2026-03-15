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

function compareTrimestresDesc(a: TrimestreEBD, b: TrimestreEBD) {
  if (a.ano !== b.ano) {
    return b.ano - a.ano;
  }

  return b.trimestre - a.trimestre;
}

function compareLicoesAsc(a: LicaoEBDComContexto, b: LicaoEBDComContexto) {
  return a.licao.data.localeCompare(b.licao.data);
}

export function isLicaoPublished(licao: Pick<LicaoEBD, "statusEditorial">) {
  return (licao.statusEditorial ?? "published") === "published";
}

export function isTrimestreDraft(
  trimestre: Pick<TrimestreEBD, "statusEditorial">
) {
  return (trimestre.statusEditorial ?? "published") === "draft";
}

export function getTrimestrePublishedLessonCount(trimestre: TrimestreEBD) {
  return trimestre.licoes.filter((licao) => isLicaoPublished(licao)).length;
}

export function getTrimestreEditorialStatus(
  trimestre: TrimestreEBD
): StatusEditorialEBD {
  return trimestre.statusEditorial ?? "published";
}

export function getLicaoEditorialStatus(licao: LicaoEBD): StatusLicaoEBD {
  return licao.statusEditorial ?? "published";
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

export function getEbdStudyReferenceKey(date = new Date()) {
  const saoPauloDate = getSaoPauloDate(date);
  const sundayDate = new Date(saoPauloDate);
  const weekDay = sundayDate.getDay();
  const daysSinceSunday = weekDay === 0 ? 0 : weekDay;

  sundayDate.setHours(0, 0, 0, 0);
  sundayDate.setDate(sundayDate.getDate() - daysSinceSunday);

  return formatDateKey(sundayDate);
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

function getPublishedLicoesComContexto(classe: ClasseEBD): LicaoEBDComContexto[] {
  return getLicoesComContexto(classe).filter(
    ({ trimestre, licao }) =>
      !isTrimestreDraft(trimestre) && isLicaoPublished(licao)
  );
}

function getPrimeiraLicaoPublicada(trimestre: TrimestreEBD) {
  return trimestre.licoes.find((licao) => isLicaoPublished(licao)) ?? null;
}

function getUltimaLicaoPublicada(trimestre: TrimestreEBD) {
  for (let index = trimestre.licoes.length - 1; index >= 0; index -= 1) {
    const licao = trimestre.licoes[index];

    if (isLicaoPublished(licao)) {
      return licao;
    }
  }

  return null;
}

export function getClassesEbd() {
  return [...classesEBD].sort((a, b) => a.ordem - b.ordem);
}

export function getTrimestreMaisRecente(classe: ClasseEBD) {
  const trimestres = getTrimestresPorClasse(classe);

  return (
    trimestres.find((trimestre) => getTrimestrePublishedLessonCount(trimestre) > 0) ??
    trimestres[0] ??
    null
  );
}

export function getTrimestreAtual(classe: ClasseEBD, date = new Date()) {
  const sundayReferenceKey = getEbdSundayReferenceKey(date);
  const trimestres = getTrimestresPorClasse(classe);

  const trimestreAtual =
    trimestres.find((trimestre) => {
      const primeiraLicao = getPrimeiraLicaoPublicada(trimestre);
      const ultimaLicao = getUltimaLicaoPublicada(trimestre);

      if (!primeiraLicao || !ultimaLicao) {
        return false;
      }

      return (
        sundayReferenceKey >= primeiraLicao.data &&
        sundayReferenceKey <= ultimaLicao.data
      );
    }) ?? null;

  if (trimestreAtual) {
    return trimestreAtual;
  }

  return (
    trimestres.find((trimestre) => {
      const primeiraLicao = getPrimeiraLicaoPublicada(trimestre);
      return primeiraLicao ? primeiraLicao.data >= sundayReferenceKey : false;
    }) ?? getTrimestreMaisRecente(classe)
  );
}

export function getTrimestresPorClasse(classe: ClasseEBD) {
  return [...trimestresEBDPorClasse[classe]].sort(compareTrimestresDesc);
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
  const sundayReferenceKey = getEbdSundayReferenceKey(date);

  return (
    getPublishedLicoesComContexto(classe).find(
      ({ licao }) => licao.data >= sundayReferenceKey
    ) ?? null
  );
}

export function getLicaoEmEstudo(classe: ClasseEBD, date = new Date()) {
  const studyReferenceKey = getEbdStudyReferenceKey(date);
  const licoes = getPublishedLicoesComContexto(classe);

  for (let index = licoes.length - 1; index >= 0; index -= 1) {
    const licao = licoes[index];

    if (licao.licao.data <= studyReferenceKey) {
      return licao;
    }
  }

  return licoes[0] ?? null;
}

export function getProximaLicao(classe: ClasseEBD, date = new Date()) {
  const licaoDaSemana = getLicaoDaSemana(classe, date);

  if (!licaoDaSemana) {
    return null;
  }

  return (
    getPublishedLicoesComContexto(classe).find(
      ({ licao }) => licao.data > licaoDaSemana.licao.data
    ) ?? null
  );
}

export function getLicaoAnterior(
  classe: ClasseEBD,
  edicao: string,
  licaoSlug: string
) {
  const trimestre = getTrimestre(classe, edicao);

  if (!trimestre) {
    return null;
  }

  const currentIndex = trimestre.licoes.findIndex(
    (item) => item.slug === licaoSlug
  );

  return currentIndex > 0 ? trimestre.licoes[currentIndex - 1] : null;
}

export function formatEbdDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00-03:00`));
}
