import {
  classesEBD,
  trimestresEBDPorClasse,
  type ClasseEBD,
  type ClasseEBDInfo,
  type LicaoEBDComContexto,
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

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getSundayReferenceKey(date = new Date()) {
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

export function getClassesEbd() {
  return [...classesEBD].sort((a, b) => a.ordem - b.ordem);
}

export function getTrimestreAtual(classe: ClasseEBD) {
  return getTrimestresPorClasse(classe)[0] ?? null;
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
  const sundayReferenceKey = getSundayReferenceKey(date);

  return (
    getLicoesComContexto(classe).find(
      ({ licao }) => licao.data >= sundayReferenceKey
    ) ?? null
  );
}

export function getProximaLicao(classe: ClasseEBD, date = new Date()) {
  const licaoDaSemana = getLicaoDaSemana(classe, date);

  if (!licaoDaSemana) {
    return null;
  }

  return (
    getLicoesComContexto(classe).find(
      ({ licao }) => licao.data > licaoDaSemana.licao.data
    ) ?? null
  );
}

export function formatEbdDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00-03:00`));
}
