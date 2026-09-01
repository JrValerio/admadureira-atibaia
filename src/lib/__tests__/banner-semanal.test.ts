import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getBannerSemanal } from "../banner-semanal";

describe("getBannerSemanal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("usa a segunda-feira da semana atual para resolver o banner semanal", () => {
    vi.setSystemTime(new Date("2026-04-12T15:00:00.000Z"));

    expect(getBannerSemanal("/programacao/culto-de-terca.png")).toBe(
      "/programacao/semanas/2026-04-06/culto-de-ensino.png"
    );
  });

  it("resolve arquivos com o mesmo nome padrão dentro da pasta semanal", () => {
    vi.setSystemTime(new Date("2026-04-06T15:00:00.000Z"));

    expect(getBannerSemanal("/programacao/reuniao-ministerial.png")).toBe(
      "/programacao/semanas/2026-04-06/reuniao-ministerial.png"
    );
  });

  it("resolve a reuniao ministerial da semana de 3 de agosto", () => {
    vi.setSystemTime(new Date("2026-08-03T15:00:00.000Z"));

    expect(getBannerSemanal("/programacao/reuniao-ministerial.png")).toBe(
      "/programacao/semanas/2026-08-03/reuniao-ministerial.png"
    );
  });

  it("usa a semana anterior mais recente quando a arte da semana atual nao existe", () => {
    vi.setSystemTime(new Date("2026-05-04T15:00:00.000Z"));

    expect(getBannerSemanal("/programacao/curso-teologia.png")).toBe(
      "/programacao/semanas/2026-04-27/curso-teologia.png"
    );
  });

  it("resolve o culto de domingo pelo nome atual da arte semanal", () => {
    vi.setSystemTime(new Date("2026-05-04T15:00:00.000Z"));

    expect(getBannerSemanal("/programacao/culto-de-domingo.png")).toBe(
      "/programacao/semanas/2026-05-04/culto-de-domingo.png"
    );
  });

  it("resolve a vigilia pelo arquivo da programacao semanal", () => {
    vi.setSystemTime(new Date("2026-07-20T15:00:00.000Z"));

    expect(getBannerSemanal("/programacao/eventos/vigilia.png")).toBe(
      "/programacao/semanas/2026-07-20/vigilia.png"
    );
  });

  it("mantem compatibilidade com semanas antigas do culto da familia", () => {
    vi.setSystemTime(new Date("2026-04-06T15:00:00.000Z"));

    expect(getBannerSemanal("/programacao/culto-de-domingo.png")).toBe(
      "/programacao/semanas/2026-04-06/culto-da-familia.png"
    );
  });

  it("mantem compatibilidade com a semana-base que usa nomes antigos", () => {
    vi.setSystemTime(new Date("2026-03-30T15:00:00.000Z"));

    expect(getBannerSemanal("/programacao/EBD.png")).toBe(
      "/programacao/semanas/2026-03-30/EBD.png"
    );
    expect(getBannerSemanal("/programacao/culto-de-ceia.png")).toBe(
      "/programacao/semanas/2026-03-30/culto-de-ceia.png"
    );
  });

  it("resolve todas as artes recorrentes da semana de 31 de agosto", () => {
    vi.setSystemTime(new Date("2026-09-01T15:00:00.000Z"));

    const bannersEsperados = [
      ["/programacao/oracao-matinal.png", "oracao-matinal.png"],
      [
        "/programacao/oracao-matinal-domingo.png",
        "oracao-matinal-domingo.png",
      ],
      ["/programacao/culto-de-terca.png", "culto-de-ensino.png"],
      [
        "/programacao/consagracao-mulheres.png",
        "consagracao-mulheres.png",
      ],
      ["/programacao/circulo-de-oracao.png", "circulo-de-oracao.png"],
      ["/programacao/ensaio-irmas.png", "ensaio-irmas.png"],
      ["/programacao/culto-de-quinta.png", "culto-de-quinta.png"],
      [
        "/programacao/culto-de-libertacao.png",
        "culto-de-libertacao.png",
      ],
      ["/programacao/EBD.png", "ebd.png"],
      ["/programacao/ensaio-jovens.png", "ensaio-jovens.png"],
      ["/programacao/culto-de-domingo.png", "culto-de-domingo.png"],
      ["/programacao/jejum-e-oracao.png", "jejum-e-oração.png"],
    ] as const;

    for (const [defaultPath, filename] of bannersEsperados) {
      expect(getBannerSemanal(defaultPath)).toBe(
        `/programacao/semanas/2026-08-31/${filename}`
      );
    }
  });

  it("mantem o fallback padrao para caminhos que nao fazem parte da programacao semanal", () => {
    expect(getBannerSemanal("/programacao/eventos/congresso-circulo-de-oracao.png")).toBe(
      "/programacao/eventos/congresso-circulo-de-oracao.png"
    );
  });
});
