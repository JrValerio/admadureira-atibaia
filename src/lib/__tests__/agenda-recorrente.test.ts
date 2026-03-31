import { describe, expect, it } from "vitest";
import { getNthWeekdayOfMonth } from "../agenda-recorrente";
import { gerarAgendaRecorrente } from "@/data/agenda-recorrente";

// ── getNthWeekdayOfMonth ─────────────────────────────────────────────────────
// month param is 0-based (0 = January).
// weekday: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat.
// nth: 1-based occurrence within the month.
//
// January 2026 starts on Thursday (getDay = 4).
// March 2026 starts on Sunday (getDay = 0).

describe("getNthWeekdayOfMonth", () => {
  // ── January 2026 (starts Thursday) ──────────────────────────────────────
  it("returns the 1st Monday of January 2026 as Jan 5", () => {
    const result = getNthWeekdayOfMonth(2026, 0, 1, 1);
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(5);
    expect(result.getDay()).toBe(1); // Monday
  });

  it("returns the 2nd Saturday of January 2026 as Jan 10", () => {
    const result = getNthWeekdayOfMonth(2026, 0, 6, 2);
    expect(result.getDate()).toBe(10);
    expect(result.getDay()).toBe(6); // Saturday
  });

  it("returns the 3rd Saturday of January 2026 as Jan 17", () => {
    const result = getNthWeekdayOfMonth(2026, 0, 6, 3);
    expect(result.getDate()).toBe(17);
    expect(result.getDay()).toBe(6);
  });

  it("returns the 4th Saturday of January 2026 as Jan 24", () => {
    const result = getNthWeekdayOfMonth(2026, 0, 6, 4);
    expect(result.getDate()).toBe(24);
    expect(result.getDay()).toBe(6);
  });

  it("returns the 1st Sunday of January 2026 as Jan 4", () => {
    const result = getNthWeekdayOfMonth(2026, 0, 0, 1);
    expect(result.getDate()).toBe(4);
    expect(result.getDay()).toBe(0); // Sunday
  });

  // ── March 2026 (starts Sunday) ───────────────────────────────────────────
  it("returns the 1st Monday of March 2026 as Mar 2", () => {
    const result = getNthWeekdayOfMonth(2026, 2, 1, 1);
    expect(result.getDate()).toBe(2);
    expect(result.getDay()).toBe(1);
  });

  it("returns the 2nd Saturday of March 2026 as Mar 14", () => {
    const result = getNthWeekdayOfMonth(2026, 2, 6, 2);
    expect(result.getDate()).toBe(14);
    expect(result.getDay()).toBe(6);
  });

  it("returns the 3rd Saturday of March 2026 as Mar 21", () => {
    const result = getNthWeekdayOfMonth(2026, 2, 6, 3);
    expect(result.getDate()).toBe(21);
    expect(result.getDay()).toBe(6);
  });

  it("returns the 4th Saturday of March 2026 as Mar 28", () => {
    const result = getNthWeekdayOfMonth(2026, 2, 6, 4);
    expect(result.getDate()).toBe(28);
    expect(result.getDay()).toBe(6);
  });

  // ── returned date is always the correct weekday ──────────────────────────
  it("result always falls on the requested weekday", () => {
    for (let weekday = 0; weekday <= 6; weekday++) {
      for (let nth = 1; nth <= 4; nth++) {
        const result = getNthWeekdayOfMonth(2026, 5, weekday, nth); // June 2026
        expect(result.getDay()).toBe(weekday);
      }
    }
  });
});

// ── gerarAgendaRecorrente ────────────────────────────────────────────────────

describe("gerarAgendaRecorrente", () => {
  const resultado = gerarAgendaRecorrente(2026, [1, 2, 3], "Sede");

  it("returns one block per requested month", () => {
    expect(resultado).toHaveLength(3);
  });

  it("each block has the correct mes name", () => {
    expect(resultado[0].mes).toBe("Janeiro");
    expect(resultado[1].mes).toBe("Fevereiro");
    expect(resultado[2].mes).toBe("Março");
  });

  it("each block has the correct ano", () => {
    for (const bloco of resultado) {
      expect(bloco.ano).toBe(2026);
    }
  });

  it("each block has exactly 4 events", () => {
    for (const bloco of resultado) {
      expect(bloco.eventos).toHaveLength(4);
    }
  });

  it("each block contains the 4 expected event types", () => {
    const tiposEsperados = [
      "reuniao-de-ministerio",
      "santa-ceia",
      "reuniao-de-obreiros",
      "culto-com-a-mocidade",
    ];
    for (const bloco of resultado) {
      const tipos = bloco.eventos.map((e) => e.tipo);
      for (const tipo of tiposEsperados) {
        expect(tipos).toContain(tipo);
      }
    }
  });

  it("Santa Ceia in January 2026 falls on Jan 10 (2nd Saturday)", () => {
    const janeiro = resultado[0];
    const santaCeia = janeiro.eventos.find((e) => e.tipo === "santa-ceia");
    expect(santaCeia?.data).toBe("10/01");
  });

  it("Reunião de Obreiros in January 2026 falls on Jan 17 (3rd Saturday)", () => {
    const janeiro = resultado[0];
    const obreiros = janeiro.eventos.find((e) => e.tipo === "reuniao-de-obreiros");
    expect(obreiros?.data).toBe("17/01");
  });

  it("Culto com a Mocidade in January 2026 falls on Jan 24 (4th Saturday)", () => {
    const janeiro = resultado[0];
    const mocidade = janeiro.eventos.find((e) => e.tipo === "culto-com-a-mocidade");
    expect(mocidade?.data).toBe("24/01");
  });

  it("each event has a non-empty slug", () => {
    for (const bloco of resultado) {
      for (const evento of bloco.eventos) {
        expect(typeof evento.slug).toBe("string");
        expect(evento.slug.length).toBeGreaterThan(0);
      }
    }
  });

  it("slugs within a month block are unique", () => {
    for (const bloco of resultado) {
      const slugs = bloco.eventos.map((e) => e.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("slugs encode the event type and date", () => {
    const janeiro = resultado[0];
    const santaCeia = janeiro.eventos.find((e) => e.tipo === "santa-ceia");
    expect(santaCeia?.slug).toMatch(/santa-ceia/);
    expect(santaCeia?.slug).toMatch(/2026/);
  });

  it("each event has a titulo and local", () => {
    for (const bloco of resultado) {
      for (const evento of bloco.eventos) {
        expect(typeof evento.titulo).toBe("string");
        expect(evento.titulo.length).toBeGreaterThan(0);
        expect(evento.local).toBe("Sede");
      }
    }
  });

  it("returns empty array when no months are requested", () => {
    expect(gerarAgendaRecorrente(2026, [], "Sede")).toHaveLength(0);
  });
});
