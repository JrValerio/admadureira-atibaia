import { afterEach, describe, expect, it, vi } from "vitest";
import { getHeroEventos } from "../hero";

function getTitlesAt(date: string) {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(date));

  const titles = getHeroEventos().map((evento) => evento.titulo);

  vi.useRealTimers();
  return titles;
}

describe("getHeroEventos", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("exibe Reunião de Ministério na semana anterior à primeira segunda do mês", () => {
    const titles = getTitlesAt("2026-05-27T15:00:00.000Z");

    expect(titles).toContain("Reunião de Ministério");
  });

  it("oculta Reunião de Ministério na semana da primeira segunda", () => {
    const titles = getTitlesAt("2026-06-01T15:00:00.000Z");

    expect(titles).not.toContain("Reunião de Ministério");
  });

  it("não exibe o Curso de Teologia (suspenso em 29/08/2026)", () => {
    const titles = getTitlesAt("2026-05-11T15:00:00.000Z");

    expect(titles).not.toContain("Curso de Teologia");
  });

  it("exibe Reunião de Obreiros somente na semana do terceiro sábado", () => {
    expect(getTitlesAt("2026-05-13T15:00:00.000Z")).toContain(
      "Reunião de Obreiros"
    );
    expect(getTitlesAt("2026-05-20T15:00:00.000Z")).not.toContain(
      "Reunião de Obreiros"
    );
  });

  it("mantem a Vigilia na home ate o encerramento no fuso de Sao Paulo", () => {
    expect(getTitlesAt("2026-08-30T08:59:59.000Z")).toContain("Vigília");
    expect(getTitlesAt("2026-08-30T09:00:00.000Z")).not.toContain("Vigília");
  });

  it("deixa o CONFADAT 2026 depois do Congresso UMADAT até o congresso acabar", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-22T15:00:00.000Z"));

    const slides = getHeroEventos();
    const titles = slides.map((evento) => evento.titulo);

    expect(titles.indexOf("Congresso UMADAT 2026")).toBeLessThan(
      titles.indexOf("CONFADAT 2026")
    );
    expect(slides.find((evento) => evento.countdown)?.titulo).toBe(
      "Congresso UMADAT 2026"
    );
  });

  it("passa o primeiro slide e a contagem ao CONFADAT 2026 depois do UMADAT", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-26T15:00:00.000Z"));

    const slides = getHeroEventos();

    expect(slides[0]?.titulo).toBe("CONFADAT 2026");
    expect(slides.find((evento) => evento.countdown)?.titulo).toBe("CONFADAT 2026");
  });

  it("mantém o CONFADAT 2026 na home até o fim da segunda noite", () => {
    expect(getTitlesAt("2026-11-29T00:29:59.000Z")).toContain("CONFADAT 2026");
    expect(getTitlesAt("2026-11-29T00:30:00.000Z")).not.toContain("CONFADAT 2026");
  });

  it("mantem o Culto de Acoes de Gracas na home ate o encerramento", () => {
    expect(getTitlesAt("2026-09-05T23:59:59.000Z")).toContain(
      "Culto de Ações de Graças"
    );
    expect(getTitlesAt("2026-09-06T00:00:00.000Z")).not.toContain(
      "Culto de Ações de Graças"
    );
  });
});
