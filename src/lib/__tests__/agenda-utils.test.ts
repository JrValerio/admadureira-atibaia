import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MesAgenda } from "@/data/agenda-types";
import {
  getCultoBySlug,
  getCultosSlugs,
  getEventoBySlug,
  getEventosAgenda,
  getEventosDestaque,
  getEventosFuturos,
  getHojeNaIgreja,
  getNextCultoSemanal,
  getProximoEventoPorTipo,
  groupEventosPorMes,
  ordenarEventosCronologicamente,
} from "../agenda-utils";

// agenda2026 é reconstruído toda semana a partir de eventos-especiais.ts (conteúdo
// real e crescente da igreja) — testes que comparam contra título/data exatos
// quebravam a cada evento novo publicado (issue #127). Fixamos agenda2026 com uma
// agenda determinística; programacaoSemanal continua real porque não é a fonte da
// instabilidade e outros testes abaixo dependem do seu conteúdo real (ex.: "Sunday
// has at least one atividade from programacaoSemanal").
vi.mock("@/data/agenda", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/data/agenda")>();

  const agenda2026: MesAgenda[] = [
    {
      mes: "Agosto",
      mesNumero: 8,
      ano: 2026,
      eventos: [
        {
          slug: "santa-ceia-08-08-2026",
          tipo: "santa-ceia",
          data: "08/08",
          titulo: "Santa Ceia",
          horario: "19h",
          destaque: true,
        },
        {
          slug: "reuniao-de-obreiros-15-08-2026",
          tipo: "reuniao-de-obreiros",
          data: "15/08",
          titulo: "Reunião de Obreiros",
          horario: "19h",
          destaque: true,
        },
        {
          slug: "vigilia-29-08-2026",
          tipo: "evento-especial",
          data: "29/08",
          titulo: "Vigília",
          horario: "22h",
          destaque: true,
        },
      ],
    },
    {
      mes: "Setembro",
      mesNumero: 9,
      ano: 2026,
      eventos: [
        {
          slug: "aniversario-pastor-zacarias-02-09-2026",
          tipo: "evento-especial",
          data: "02/09",
          titulo: "Aniversário do Pastor Zacarias Bernardes Félix",
          destaque: true,
        },
        {
          slug: "santa-ceia-12-09-2026",
          tipo: "santa-ceia",
          data: "12/09",
          titulo: "Santa Ceia",
          horario: "19h",
          destaque: true,
          imagem: "/programacao/semanas/2026-09-07/santa-ceia.png",
        },
        {
          slug: "batismo-27-09-2026",
          tipo: "batismo",
          data: "27/09",
          titulo: "Batismo",
          horario: "09h30",
          destaque: true,
        },
      ],
    },
    {
      mes: "Novembro",
      mesNumero: 11,
      ano: 2026,
      eventos: [
        {
          slug: "santa-ceia-e-reuniao-de-obreiros-14-11-2026",
          tipo: "santa-ceia",
          data: "14/11",
          titulo: "Santa Ceia e Reunião de Obreiros",
          horario: "19h",
          destaque: true,
        },
      ],
    },
  ];

  return {
    ...actual,
    agenda2026,
  };
});

// SP is UTC-3. Passing noon SP as UTC avoids day-boundary issues across timezones.
// 2026-01-07 = Wednesday  (Quarta-feira)
// 2026-01-11 = Sunday     (Domingo)
// 2026-01-08 = Thursday   (Quinta-feira)
const QUARTA_2026 = new Date("2026-01-07T15:00:00.000Z");
const DOMINGO_2026 = new Date("2026-01-11T15:00:00.000Z");
const QUINTA_2026 = new Date("2026-01-08T15:00:00.000Z");
const SABADO_LONGE = new Date("2030-06-15T15:00:00.000Z");

// ── getHojeNaIgreja ──────────────────────────────────────────────────────────

describe("getHojeNaIgreja", () => {
  it("returns the correct Portuguese day name for Wednesday", () => {
    expect(getHojeNaIgreja(QUARTA_2026).dia).toBe("Quarta-feira");
  });

  it("returns the correct Portuguese day name for Sunday", () => {
    expect(getHojeNaIgreja(DOMINGO_2026).dia).toBe("Domingo");
  });

  it("returns titulo as string", () => {
    const result = getHojeNaIgreja(QUARTA_2026);
    expect(typeof result.titulo).toBe("string");
    expect(result.titulo.length).toBeGreaterThan(0);
  });

  it("returns atividades as array", () => {
    expect(Array.isArray(getHojeNaIgreja(QUARTA_2026).atividades)).toBe(true);
  });

  it("each atividade has required fields with non-empty strings", () => {
    const { atividades } = getHojeNaIgreja(QUARTA_2026);
    for (const atividade of atividades) {
      expect(typeof atividade.id).toBe("string");
      expect(atividade.id.length).toBeGreaterThan(0);
      expect(typeof atividade.titulo).toBe("string");
      expect(atividade.titulo.length).toBeGreaterThan(0);
      expect(atividade.origem === "evento" || atividade.origem === "programacao").toBe(true);
    }
  });

  it("returns no duplicate activity ids", () => {
    const { atividades } = getHojeNaIgreja(QUARTA_2026);
    const ids = atividades.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("Sunday has at least one atividade from programacaoSemanal", () => {
    const { atividades } = getHojeNaIgreja(DOMINGO_2026);
    const fromProgramacao = atividades.filter((a) => a.origem === "programacao");
    expect(fromProgramacao.length).toBeGreaterThan(0);
  });
});

// ── getNextCultoSemanal ──────────────────────────────────────────────────────

describe("getNextCultoSemanal", () => {
  it("returns non-null for a Thursday reference (culto exists within 7 days)", () => {
    const result = getNextCultoSemanal(QUINTA_2026);
    expect(result).not.toBeNull();
  });

  it("returned evento has required fields", () => {
    const result = getNextCultoSemanal(QUINTA_2026);
    if (!result) return;
    expect(typeof result.evento.titulo).toBe("string");
    expect(typeof result.evento.href).toBe("string");
    expect(result.evento.origem === "programacao" || result.evento.origem === "evento").toBe(true);
    expect(result.dataEvento).toBeInstanceOf(Date);
  });

  it("returned dataEvento is on or after the reference date", () => {
    const result = getNextCultoSemanal(QUINTA_2026);
    if (!result) return;
    const referencaSP = new Date("2026-01-08T15:00:00.000Z");
    expect(result.dataEvento.getTime()).toBeGreaterThanOrEqual(referencaSP.getTime());
  });
});

// ── getEventoBySlug ──────────────────────────────────────────────────────────

describe("getEventoBySlug", () => {
  it("returns null for an unknown slug", () => {
    expect(getEventoBySlug("slug-que-nao-existe-xyz-999")).toBeNull();
  });

  it("returns the matching evento for a known slug", () => {
    const todos = getEventosAgenda();
    if (todos.length === 0) return;
    const first = todos[0];
    const result = getEventoBySlug(first.slug);
    expect(result).not.toBeNull();
    expect(result?.slug).toBe(first.slug);
    expect(result?.titulo).toBe(first.titulo);
  });
});

// ── getEventosAgenda ─────────────────────────────────────────────────────────

describe("getEventosAgenda", () => {
  it("returns an array", () => {
    expect(Array.isArray(getEventosAgenda())).toBe(true);
  });

  it("each evento has required fields", () => {
    for (const evento of getEventosAgenda()) {
      expect(typeof evento.slug).toBe("string");
      expect(evento.slug.length).toBeGreaterThan(0);
      expect(typeof evento.titulo).toBe("string");
      expect(evento.titulo.length).toBeGreaterThan(0);
      expect(typeof evento.tipo).toBe("string");
    }
  });

  it("slugs are unique", () => {
    const slugs = getEventosAgenda().map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

// ── getEventosFuturos ────────────────────────────────────────────────────────

describe("getEventosFuturos", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-15T15:00:00.000Z")); // 15 Jan 2026 noon SP
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns an array", () => {
    expect(Array.isArray(getEventosFuturos())).toBe(true);
  });

  it("respects the limite parameter", () => {
    expect(getEventosFuturos(3).length).toBeLessThanOrEqual(3);
    expect(getEventosFuturos(1).length).toBeLessThanOrEqual(1);
  });

  it("returns fewer or equal events when limite is smaller", () => {
    const todos = getEventosFuturos();
    const limitados = getEventosFuturos(2);
    expect(limitados.length).toBeLessThanOrEqual(todos.length);
  });

  it("each returned evento has slug and titulo", () => {
    for (const evento of getEventosFuturos()) {
      expect(typeof evento.slug).toBe("string");
      expect(typeof evento.titulo).toBe("string");
    }
  });

  it("does not return past events", () => {
    const eventos = getEventosFuturos();
    // All events should be from 2026-01-15 onwards
    // We verify by ensuring they have mes and ano consistent with the timeline
    for (const evento of eventos) {
      const isAfterOrAt2026 = evento.ano >= 2026;
      expect(isAfterOrAt2026).toBe(true);
    }
  });
});

// ── getEventosDestaque ───────────────────────────────────────────────────────

describe("getEventosDestaque", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-15T15:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns at most `limite` events", () => {
    expect(getEventosDestaque(2).length).toBeLessThanOrEqual(2);
    expect(getEventosDestaque(5).length).toBeLessThanOrEqual(5);
  });

  it("returns an array with valid eventos", () => {
    for (const evento of getEventosDestaque()) {
      expect(typeof evento.titulo).toBe("string");
      expect(typeof evento.slug).toBe("string");
    }
  });

  // TODO(#127): acoplado a @/data/agenda — quebra a cada evento publicado na janela
  it("mantem os destaques em ordem cronologica mes a mes", () => {
    vi.setSystemTime(new Date("2026-08-01T15:00:00.000Z"));

    expect(
      getEventosDestaque(6).map((evento) => [evento.data, evento.titulo])
    ).toEqual([
      ["08/08", "Santa Ceia"],
      ["15/08", "Reunião de Obreiros"],
      ["29/08", "Vigília"],
      ["02/09", "Aniversário do Pastor Zacarias Bernardes Félix"],
      ["12/09", "Santa Ceia"],
      ["27/09", "Batismo"],
    ]);
  });

  it("destaca a Santa Ceia de setembro no lugar da de novembro", () => {
    vi.setSystemTime(new Date("2026-08-01T15:00:00.000Z"));

    const destaques = getEventosDestaque(6);
    const santaCeiaSetembro = destaques.find(
      (evento) => evento.slug === "santa-ceia-12-09-2026"
    );

    expect(santaCeiaSetembro?.imagem).toBe(
      "/programacao/semanas/2026-09-07/santa-ceia.png"
    );
    expect(destaques).not.toContainEqual(
      expect.objectContaining({
        slug: "santa-ceia-e-reuniao-de-obreiros-14-11-2026",
      })
    );
  });

  it("returns empty array when incluirFallback is false and no destaque exists", () => {
    // With no destaques flagged, fallback=false should return []
    const todos = getEventosFuturos();
    const comDestaque = todos.filter((e) => e.destaque);
    if (comDestaque.length === 0) {
      expect(getEventosDestaque(3, false)).toHaveLength(0);
    }
  });
});

// ── groupEventosPorMes ───────────────────────────────────────────────────────

describe("groupEventosPorMes", () => {
  it("returns an array", () => {
    expect(Array.isArray(groupEventosPorMes(getEventosAgenda()))).toBe(true);
  });

  it("each group has required fields", () => {
    for (const grupo of groupEventosPorMes(getEventosAgenda())) {
      expect(typeof grupo.id).toBe("string");
      expect(typeof grupo.mes).toBe("string");
      expect(typeof grupo.ano).toBe("number");
      expect(typeof grupo.mesNumero).toBe("number");
      expect(grupo.mesNumero).toBeGreaterThanOrEqual(1);
      expect(grupo.mesNumero).toBeLessThanOrEqual(12);
      expect(Array.isArray(grupo.eventos)).toBe(true);
      expect(grupo.eventos.length).toBeGreaterThan(0);
    }
  });

  it("groups are sorted chronologically", () => {
    const grupos = groupEventosPorMes(getEventosAgenda());
    for (let i = 1; i < grupos.length; i++) {
      const prev = grupos[i - 1];
      const curr = grupos[i];
      const prevKey = prev.ano * 100 + prev.mesNumero;
      const currKey = curr.ano * 100 + curr.mesNumero;
      expect(currKey).toBeGreaterThanOrEqual(prevKey);
    }
  });

  it("total eventos across groups equals input length", () => {
    const todos = getEventosAgenda();
    const grupos = groupEventosPorMes(todos);
    const total = grupos.reduce((sum, g) => sum + g.eventos.length, 0);
    expect(total).toBe(todos.length);
  });

  it("returns empty array for empty input", () => {
    expect(groupEventosPorMes([])).toHaveLength(0);
  });

  it("ordena eventos dentro do mes mesmo quando a entrada vem embaralhada", () => {
    const eventos = getEventosAgenda();
    const setembro = eventos.filter(
      (evento) => evento.ano === 2026 && evento.mes === "Setembro"
    );

    expect(
      ordenarEventosCronologicamente([...setembro].reverse()).map(
        (evento) => evento.data
      )
    ).toEqual(setembro.map((evento) => evento.data));
  });
});

// ── getProximoEventoPorTipo ──────────────────────────────────────────────────

describe("getProximoEventoPorTipo", () => {
  it("returns null when reference is far in the future (beyond agenda)", () => {
    const result = getProximoEventoPorTipo(["batismo", "santa-ceia"], SABADO_LONGE);
    expect(result).toBeNull();
  });

  it("returns an evento with valid fields when found", () => {
    const result = getProximoEventoPorTipo(
      ["santa-ceia", "batismo", "evento-especial", "culto-com-a-mocidade"],
      QUARTA_2026
    );
    if (!result) return; // agenda might not have these types
    expect(typeof result.titulo).toBe("string");
    expect(typeof result.slug).toBe("string");
    expect(typeof result.tipo).toBe("string");
  });
});

// ── getCultosSlugs ───────────────────────────────────────────────────────────

describe("getCultosSlugs", () => {
  it("returns an array of strings", () => {
    const slugs = getCultosSlugs();
    expect(Array.isArray(slugs)).toBe(true);
    for (const slug of slugs) {
      expect(typeof slug).toBe("string");
      expect(slug.length).toBeGreaterThan(0);
    }
  });

  it("returns no duplicate slugs", () => {
    const slugs = getCultosSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

// ── getCultoBySlug ───────────────────────────────────────────────────────────

describe("getCultoBySlug", () => {
  it("returns undefined for unknown slug", () => {
    expect(getCultoBySlug("culto-inexistente-xyz")).toBeUndefined();
  });

  it("returns the correct culto for a known slug", () => {
    const slugs = getCultosSlugs();
    if (slugs.length === 0) return;
    const result = getCultoBySlug(slugs[0]);
    expect(result).toBeDefined();
    expect(result?.slug).toBe(slugs[0]);
  });
});
