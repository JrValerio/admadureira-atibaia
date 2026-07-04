import { describe, expect, it } from "vitest";
import {
  todosOsTrimestresEBD,
  validateSubsidioAdultos,
  validateSubsidioJovens,
} from "@/data/ebd";

describe("subsidios EBD", () => {
  it("mantem campos canonicos de Adultos 2T alinhados a revista Professor", () => {
    const trimestre = todosOsTrimestresEBD.find(
      (item) => item.id === "adultos-2026-2t"
    );

    expect(trimestre).toBeDefined();

    const licao2 = trimestre?.licoes.find((licao) => licao.numero === 2);
    const licao13 = trimestre?.licoes.find((licao) => licao.numero === 13);

    expect(licao2?.subsidioAdultos?.cabecalho).toMatchObject({
      textoAureo:
        '"E apareceu o SENHOR a Abrão e disse: À tua semente darei esta terra. E edificou ali um altar ao SENHOR, que lhe aparecera." (Gn 12:7)',
      verdadePratica:
        "Quando Deus faz uma promessa incondicional, Ele a cumpre plenamente.",
      leituraBiblicaEmClasse: ["Gênesis 13:7-18"],
      hinosSugeridos: ["194", "232", "609"],
    });
    expect(licao2?.subsidioAdultos?.cabecalho.leituraDiaria).toHaveLength(6);
    expect(licao2?.subsidioAdultos?.cabecalho.leituraDiaria?.[5]).toEqual({
      dia: "Sábado",
      referencia: "Gálatas 3:7",
      tema: "Abraão, pai dos filhos da fé",
    });

    expect(licao13?.subsidioAdultos?.cabecalho).toMatchObject({
      textoAureo:
        '"Pela fé, Abraão, sendo chamado, obedeceu, indo para um lugar que havia de receber por herança; e saiu, sem saber para onde ia." (Hb 11:8)',
      verdadePratica:
        "Abraão, Isaque e Jacó deixaram um legado de fé em Deus para as futuras gerações.",
      leituraBiblicaEmClasse: ["Hebreus 11:8-12", "Hebreus 11:17-21"],
      hinosSugeridos: ["378", "610", "535"],
    });
    expect(licao13?.subsidioAdultos?.cabecalho.leituraDiaria).toHaveLength(6);
    expect(licao13?.subsidioAdultos?.cabecalho.leituraDiaria?.[0]).toEqual({
      dia: "Segunda",
      referencia: "Gênesis 12:1-3",
      tema: "O legado da obediência de Abraão",
    });

    const hinosEsperadosPorLicao = new Map<number, string[]>([
      [2, ["194", "232", "609"]],
      [3, ["8", "188", "302"]],
      [4, ["86", "127", "135"]],
      [5, ["5", "75", "557"]],
      [6, ["3", "259", "526"]],
      [7, ["89", "375", "610"]],
      [8, ["185", "305", "330"]],
      [9, ["3", "71", "308"]],
      [10, ["42", "292", "470"]],
      [11, ["75", "77", "184"]],
      [12, ["83", "578", "593"]],
      [13, ["378", "610", "535"]],
    ]);

    for (const [numero, hinosSugeridos] of hinosEsperadosPorLicao) {
      expect(
        trimestre?.licoes.find((licao) => licao.numero === numero)
          ?.subsidioAdultos?.cabecalho.hinosSugeridos
      ).toEqual(hinosSugeridos);
    }
  });

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
