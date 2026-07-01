import { describe, expect, it } from "vitest";
import { validateSubsidioExpandido } from "@/data/ebd";

describe("validateSubsidioExpandido", () => {
  it("aceita um subsidio expandido com arrays preenchidos", () => {
    expect(
      validateSubsidioExpandido("adultos-2026-3t-licao-1", {
        titulo: "Aprofundamento da licao",
        contextoHistorico: ["Antioquia se tornou base missionaria."],
        notasExegeticas: [
          {
            referencia: "Atos 13.2",
            observacao: "O chamado parte da iniciativa do Espirito Santo.",
          },
        ],
        referencias: [
          {
            tipo: "revista",
            titulo: "Licoes Biblicas Adultos Professor",
            pagina: "6-8",
          },
        ],
      })
    ).toMatchObject({
      titulo: "Aprofundamento da licao",
    });
  });

  it("rejeita campos presentes com arrays vazios", () => {
    expect(() =>
      validateSubsidioExpandido("adultos-2026-3t-licao-1", {
        contextoHistorico: [],
      })
    ).toThrow(/subsidioExpandido invalido|subsidioExpandido inválido/);
  });
});
