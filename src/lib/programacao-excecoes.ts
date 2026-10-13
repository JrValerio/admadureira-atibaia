import {
  excecoesProgramacao,
  type ExcecaoProgramacao,
} from "@/data/agenda-excecoes";
import type { ItemSemanal } from "@/data/agenda-types";
import { getWeekStartMonday } from "@/lib/programacao-recorrencia";

export const DIAS_PROGRAMACAO: Record<string, number[]> = {
  "Segunda a Sexta": [1, 2, 3, 4, 5],
  "Segunda-feira": [1],
  "Terça-feira": [2],
  "Quarta-feira": [3],
  "Quinta-feira": [4],
  "Sexta-feira": [5],
  Sábado: [6],
  Domingo: [0],
};

export type AvisoProgramacao = {
  slug: string;
  data: string;
  titulo: string;
  texto: string;
  href?: string;
};

function formatarDataIso(data: Date) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function aplicarExcecao(
  item: ItemSemanal,
  excecao: ExcecaoProgramacao
): ItemSemanal | null {
  if (excecao.acao === "suspender") {
    return null;
  }

  return {
    ...item,
    ...(excecao.horario ? { horario: excecao.horario } : {}),
    ...(excecao.titulo ? { titulo: excecao.titulo } : {}),
  };
}

function getExcecoesDaSemana(
  referencia: Date,
  excecoes: readonly ExcecaoProgramacao[]
) {
  const segunda = getWeekStartMonday(referencia);
  const domingo = new Date(segunda);
  domingo.setDate(domingo.getDate() + 6);
  const inicio = formatarDataIso(segunda);
  const fim = formatarDataIso(domingo);

  return excecoes.filter(
    (excecao) => excecao.data >= inicio && excecao.data <= fim
  );
}

/**
 * Item como ele vale num dia específico: `null` se a ocorrência está
 * suspensa, o item com horário/título trocados se foi alterada, ou o
 * próprio item quando não há exceção naquela data.
 */
export function aplicarExcecoesNaData(
  item: ItemSemanal,
  data: Date,
  excecoes: readonly ExcecaoProgramacao[] = excecoesProgramacao
): ItemSemanal | null {
  if (!item.slug) {
    return item;
  }

  const chave = formatarDataIso(data);
  const excecao = excecoes.find(
    (candidata) => candidata.slug === item.slug && candidata.data === chave
  );

  return excecao ? aplicarExcecao(item, excecao) : item;
}

/**
 * Lista da semana (segunda a domingo) com as exceções aplicadas. Só vale
 * para atividades de um dia por semana: numa atividade de vários dias
 * ("Segunda a Sexta"), a exceção de um dia não tira o card da semana.
 */
export function aplicarExcecoesDaSemana(
  itens: readonly ItemSemanal[],
  referencia: Date,
  excecoes: readonly ExcecaoProgramacao[] = excecoesProgramacao
): ItemSemanal[] {
  const daSemana = getExcecoesDaSemana(referencia, excecoes);

  if (daSemana.length === 0) {
    return [...itens];
  }

  return itens.flatMap((item) => {
    const umDiaPorSemana = (DIAS_PROGRAMACAO[item.dia] ?? []).length === 1;
    const excecao = daSemana.find((candidata) => candidata.slug === item.slug);

    if (!excecao || !item.slug || !umDiaPorSemana) {
      return [item];
    }

    const resultado = aplicarExcecao(item, excecao);
    return resultado ? [resultado] : [];
  });
}

/** Avisos das exceções da semana, para mostrar na página de programação. */
export function getAvisosProgramacaoDaSemana(
  itens: readonly ItemSemanal[],
  referencia: Date,
  excecoes: readonly ExcecaoProgramacao[] = excecoesProgramacao
): AvisoProgramacao[] {
  return getExcecoesDaSemana(referencia, excecoes).flatMap((excecao) => {
    const item = itens.find((candidato) => candidato.slug === excecao.slug);

    if (!item) {
      return [];
    }

    return [
      {
        slug: excecao.slug,
        data: excecao.data,
        titulo: item.titulo,
        texto: excecao.motivo,
        ...(excecao.href ? { href: excecao.href } : {}),
      },
    ];
  });
}
