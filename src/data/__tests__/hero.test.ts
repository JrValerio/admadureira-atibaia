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
    expect(titles).toContain("Curso de Teologia");
  });

  it("oculta Curso de Teologia e Reunião de Ministério na semana da primeira segunda", () => {
    const titles = getTitlesAt("2026-06-01T15:00:00.000Z");

    expect(titles).not.toContain("Curso de Teologia");
    expect(titles).not.toContain("Reunião de Ministério");
  });

  it("exibe Reunião de Obreiros somente na semana do terceiro sábado", () => {
    expect(getTitlesAt("2026-05-13T15:00:00.000Z")).toContain(
      "Reunião de Obreiros"
    );
    expect(getTitlesAt("2026-05-20T15:00:00.000Z")).not.toContain(
      "Reunião de Obreiros"
    );
  });
});
