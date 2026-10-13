import { describe, expect, it } from "vitest";
import type { ExcecaoProgramacao } from "@/data/agenda-excecoes";
import type { ItemSemanal } from "@/data/agenda-types";
import { getHojeNaIgreja, getNextCultoSemanal } from "../agenda-utils";
import {
  aplicarExcecoesDaSemana,
  aplicarExcecoesNaData,
  getAvisosProgramacaoDaSemana,
} from "../programacao-excecoes";
import {
  getAvisosProgramacaoSemanalAtual,
  getProgramacaoSemanalAtual,
} from "../programacao-semanal";

const ENSAIO = "ensaio-jovens-rios-de-uncao";

// Meio-dia em São Paulo (15h UTC) do dia informado.
function meioDia(data: string) {
  return new Date(`${data}T15:00:00.000Z`);
}

function ensaioNaSemana(data: string) {
  return getProgramacaoSemanalAtual(meioDia(data)).find(
    (item) => item.slug === ENSAIO
  );
}

describe("exceção de 18/10/2026: Ensaio da Mocidade dá lugar ao Ensaio Geral da UMADAT", () => {
  it("tira o ensaio da programação da semana de 12 a 18/10", () => {
    for (const dia of ["2026-10-12", "2026-10-15", "2026-10-18"]) {
      expect(ensaioNaSemana(dia), dia).toBeUndefined();
    }
  });

  it("mantém o ensaio às 11h nos domingos 11/10 e 25/10", () => {
    for (const dia of ["2026-10-11", "2026-10-25"]) {
      expect(ensaioNaSemana(dia)?.horario, dia).toBe("11h00");
    }
  });

  it("não tira nenhuma outra atividade da semana", () => {
    const comExcecao = getProgramacaoSemanalAtual(meioDia("2026-10-14"));
    const semExcecao = getProgramacaoSemanalAtual(meioDia("2026-10-21"));

    expect(comExcecao.map((item) => item.titulo)).toEqual(
      semExcecao
        .filter((item) => item.slug !== ENSAIO)
        .map((item) => item.titulo)
    );
  });

  it("mostra o aviso com link só na semana da exceção", () => {
    expect(getAvisosProgramacaoSemanalAtual(meioDia("2026-10-14"))).toEqual([
      {
        slug: ENSAIO,
        data: "2026-10-18",
        titulo: "Ensaio da Mocidade Rios de Unção",
        texto: "Neste domingo: Ensaio Geral da UMADAT às 13h",
        href: "/eventos/ensaio-geral-umadat-18-10-2026",
      },
    ]);
    expect(getAvisosProgramacaoSemanalAtual(meioDia("2026-10-11"))).toEqual([]);
    expect(getAvisosProgramacaoSemanalAtual(meioDia("2026-10-19"))).toEqual([]);
  });

  it("some de Hoje na Igreja em 18/10 e aparece em 11/10 e 25/10", () => {
    const titulos = (dia: string) =>
      getHojeNaIgreja(new Date(`${dia}T11:00:00.000Z`)).atividades.map(
        (atividade) => atividade.titulo
      );

    expect(titulos("2026-10-18")).not.toContain(
      "Ensaio da Mocidade Rios de Unção"
    );
    expect(titulos("2026-10-18")).toContain("Ensaio Geral da UMADAT");
    expect(titulos("2026-10-11")).toContain("Ensaio da Mocidade Rios de Unção");
    expect(titulos("2026-10-25")).toContain("Ensaio da Mocidade Rios de Unção");
  });

  it("não anuncia o ensaio suspenso como próxima atividade da semana", () => {
    // Domingo 18/10, 10h em São Paulo: depois da EBD (9h), antes das 11h.
    const proximo = getNextCultoSemanal(new Date("2026-10-18T13:00:00.000Z"));

    expect(proximo?.evento.titulo).not.toBe("Ensaio da Mocidade Rios de Unção");
  });
});

describe("regras gerais das exceções", () => {
  const culto: ItemSemanal = {
    dia: "Quinta-feira",
    titulo: "Culto de teste",
    horario: "19h30",
    slug: "culto-de-teste",
  };
  const diario: ItemSemanal = {
    dia: "Segunda a Sexta",
    titulo: "Oração de teste",
    horario: "06h00",
    slug: "oracao-de-teste",
  };
  const quinta = new Date(2026, 10, 5, 12);
  const quintaSeguinte = new Date(2026, 10, 12, 12);

  it("altera horário e título só na data da exceção", () => {
    const excecoes: ExcecaoProgramacao[] = [
      {
        slug: "culto-de-teste",
        data: "2026-11-05",
        acao: "alterar",
        horario: "20h00",
        titulo: "Culto de teste unificado",
        motivo: "Nesta quinta o culto começa às 20h",
      },
    ];

    expect(aplicarExcecoesNaData(culto, quinta, excecoes)).toMatchObject({
      horario: "20h00",
      titulo: "Culto de teste unificado",
    });
    expect(aplicarExcecoesNaData(culto, quintaSeguinte, excecoes)).toBe(culto);
    expect(aplicarExcecoesDaSemana([culto], quinta, excecoes)[0].horario).toBe(
      "20h00"
    );
    expect(
      aplicarExcecoesDaSemana([culto], quintaSeguinte, excecoes)[0]
    ).toBe(culto);
  });

  it("numa atividade de vários dias, suspende só o dia e mantém o card da semana", () => {
    const excecoes: ExcecaoProgramacao[] = [
      {
        slug: "oracao-de-teste",
        data: "2026-11-05",
        acao: "suspender",
        motivo: "Nesta quinta não haverá oração de teste",
      },
    ];

    expect(aplicarExcecoesNaData(diario, quinta, excecoes)).toBeNull();
    expect(aplicarExcecoesDaSemana([diario], quinta, excecoes)).toEqual([
      diario,
    ]);
    expect(
      getAvisosProgramacaoDaSemana([diario], quinta, excecoes)
    ).toHaveLength(1);
  });

  it("ignora exceção de slug que não existe na programação", () => {
    const excecoes: ExcecaoProgramacao[] = [
      {
        slug: "nao-existe",
        data: "2026-11-05",
        acao: "suspender",
        motivo: "sem efeito",
      },
    ];

    expect(aplicarExcecoesDaSemana([culto], quinta, excecoes)).toEqual([culto]);
    expect(getAvisosProgramacaoDaSemana([culto], quinta, excecoes)).toEqual([]);
  });
});
