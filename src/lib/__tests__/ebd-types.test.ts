import { describe, expect, it } from "vitest";
import {
  todosOsTrimestresEBD,
  validateSubsidioAdultos,
  validateSubsidioJovens,
} from "@/data/ebd";

describe("subsidios EBD", () => {
  it("valida os subsidios reais renderizados no catalogo", () => {
    const falhas: string[] = [];

    for (const trimestre of todosOsTrimestresEBD) {
      for (const licao of trimestre.licoes) {
        try {
          if (licao.subsidioAdultos) {
            validateSubsidioAdultos(licao.id, licao.subsidioAdultos);
          }

          if (licao.subsidioJovens) {
            validateSubsidioJovens(licao.id, licao.subsidioJovens);
          }
        } catch (error) {
          falhas.push(error instanceof Error ? error.message : String(error));
        }
      }
    }

    expect(falhas).toEqual([]);
  });

  it("rejeita campos obrigatorios vazios no subsidio de adultos", () => {
    expect(() =>
      validateSubsidioAdultos("adultos-2026-3t-licao-1", {
        cabecalho: {
          numero: 1,
          titulo: "",
          data: "2026-07-05",
          trimestre: "3º Trimestre de 2026",
        },
        visaoGeral: {
          resumo: "Resumo valido.",
        },
        desenvolvimento: [],
        apoioProfessor: {},
      })
    ).toThrow(/subsidioAdultos invalido|subsidioAdultos inválido/);
  });

  it("rejeita campos obrigatorios vazios no subsidio de jovens", () => {
    expect(() =>
      validateSubsidioJovens("jovens-2026-3t-licao-1", {
        cabecalho: {
          numero: 1,
          titulo: "Titulo valido",
          data: "2026-07-05",
          trimestre: "3º Trimestre de 2026",
        },
        arranquePedagogico: {
          interacao: "",
        },
        desenvolvimento: [],
        apoioProfessor: {},
      })
    ).toThrow(/subsidioJovens invalido|subsidioJovens inválido/);
  });
});
