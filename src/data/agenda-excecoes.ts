import { buildBibleReferenceHref } from "@/lib/bible-reference";

/**
 * Exceções por data da programação semanal: único lugar para registrar que
 * uma atividade fixa não acontece, ou muda de horário/título, num dia
 * específico (feriado, ensaio trocado, culto unificado).
 *
 * `slug` é o do item em `programacaoSemanal` (src/data/agenda.ts) e `data`
 * é o dia da ocorrência afetada, em "AAAA-MM-DD". O `motivo` aparece como
 * aviso na página de programação durante a semana da exceção.
 */
type ExcecaoBase = {
  slug: string;
  data: string;
  motivo: string;
  /** Página com os detalhes do que acontece no lugar (opcional). */
  href?: string;
};

export type ExcecaoProgramacao =
  | (ExcecaoBase & { acao: "suspender" })
  | (ExcecaoBase & { acao: "alterar"; horario?: string; titulo?: string });

export const excecoesProgramacao: ExcecaoProgramacao[] = [
  {
    slug: "culto-de-ensino",
    data: "2026-10-13",
    acao: "alterar",
    titulo:
      "Culto de Ensino — Série especial: Estudando o livro de Tiago (cap. 2)",
    motivo:
      "Nesta terça, 13/10: série especial Estudando o livro de Tiago, capítulo 2. Preletor: Pr. Marcos Jorge",
    href: buildBibleReferenceHref("Tiago 2") ?? "/espiritualidade/biblia",
  },
  {
    slug: "ensaio-jovens-rios-de-uncao",
    data: "2026-10-18",
    acao: "suspender",
    motivo: "Neste domingo: Ensaio Geral da UMADAT às 13h",
    href: "/eventos/ensaio-geral-umadat-18-10-2026",
  },
];
