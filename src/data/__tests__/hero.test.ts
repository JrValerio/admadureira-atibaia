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
});
