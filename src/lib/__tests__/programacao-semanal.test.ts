import { describe, expect, it } from "vitest";
import { getProgramacaoSemanalAtual } from "../programacao-semanal";

describe("getProgramacaoSemanalAtual", () => {
  it("substitui o Curso de Teologia por Reunião Ministerial na semana da primeira segunda-feira", () => {
    const programacao = getProgramacaoSemanalAtual(
      new Date("2026-05-04T15:00:00.000Z")
    );
    const segundaNoite = programacao.find((item) => item.dia === "Segunda-feira");

    expect(segundaNoite?.titulo).toBe("Reunião Ministerial");
    expect(segundaNoite?.banner).toBe("/programacao/reuniao-ministerial.png");
  });

  it("não inclui atividade fixa de segunda-feira fora da semana da primeira segunda (Curso de Teologia suspenso em 29/08/2026)", () => {
    const programacao = getProgramacaoSemanalAtual(
      new Date("2026-05-11T15:00:00.000Z")
    );
    const segundaNoite = programacao.find((item) => item.dia === "Segunda-feira");

    expect(segundaNoite).toBeUndefined();
  });
});
