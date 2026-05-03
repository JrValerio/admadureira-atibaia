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

  it("mantem o fallback padrao quando a arte da semana nao existe", () => {
    vi.setSystemTime(new Date("2026-04-06T15:00:00.000Z"));

    expect(getBannerSemanal("/programacao/curso-teologia.png")).toBe(
      "/programacao/curso-teologia.png"
    );
  });
});
