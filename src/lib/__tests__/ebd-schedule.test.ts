import { describe, expect, it } from "vitest";
import {
  addDaysToDateKey,
  getEbdScheduleDateForLessonDay,
  getSaoPauloDateKey,
} from "../ebd-schedule";

describe("getEbdScheduleDateForLessonDay", () => {
  it("deriva a semana de leitura a partir do domingo da licao", () => {
    expect(getEbdScheduleDateForLessonDay("2026-07-19", "Segunda")).toBe(
      "2026-07-13"
    );
    expect(getEbdScheduleDateForLessonDay("2026-07-19", "Terça")).toBe(
      "2026-07-14"
    );
    expect(getEbdScheduleDateForLessonDay("2026-07-19", "Sábado")).toBe(
      "2026-07-18"
    );
    expect(getEbdScheduleDateForLessonDay("2026-07-19", "Domingo")).toBe(
      "2026-07-19"
    );
  });

  it("aceita variantes com feira e sem acento", () => {
    expect(getEbdScheduleDateForLessonDay("2026-07-19", "terça-feira")).toBe(
      "2026-07-14"
    );
    expect(getEbdScheduleDateForLessonDay("2026-07-19", "Sabado")).toBe(
      "2026-07-18"
    );
  });

  it("retorna null para datas ou dias desconhecidos", () => {
    expect(getEbdScheduleDateForLessonDay("19/07/2026", "Segunda")).toBeNull();
    expect(getEbdScheduleDateForLessonDay("2026-07-19", "Feriado")).toBeNull();
  });
});

describe("addDaysToDateKey", () => {
  it("soma dias usando a chave de data sem depender do fuso local", () => {
    expect(addDaysToDateKey("2026-07-19", -6)).toBe("2026-07-13");
  });
});

describe("getSaoPauloDateKey", () => {
  it("resolve a chave de data no fuso de Sao Paulo", () => {
    expect(getSaoPauloDateKey(new Date("2026-07-19T02:30:00.000Z"))).toBe(
      "2026-07-18"
    );
    expect(getSaoPauloDateKey(new Date("2026-07-19T03:30:00.000Z"))).toBe(
      "2026-07-19"
    );
  });
});
