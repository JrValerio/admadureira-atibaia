import { afterEach, describe, expect, it, vi } from "vitest";
import { getHeroEventos } from "../hero";

describe("getHeroEventos", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("mantem o banner de batismo fora da rotacao enquanto nao for liberado", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-05T15:00:00.000Z"));

    const slides = getHeroEventos();

    expect(slides.some((slide) => slide.imagem === "/banners/banner-batismo.png")).toBe(false);
    expect(slides.some((slide) => slide.titulo === "Batismo")).toBe(false);
  });

  it("mantem o congresso kids fora da rotacao e ativa o congresso do circulo de oracao", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-02T15:00:00.000Z"));

    const slides = getHeroEventos();
    const congressoCirculo = slides.find(
      (slide) => slide.imagem === "/banners/banner-congresso-circulo-de-oracao.png"
    );

    expect(slides.some((slide) => slide.imagem === "/banners/banner-congresso-kids.png")).toBe(false);
    expect(congressoCirculo).toMatchObject({
      titulo: "Congresso do Círculo de Oração",
      href: "/eventos/congresso-circulo-de-oracao-29-05-2026",
      priority: "high",
    });
  });
});
