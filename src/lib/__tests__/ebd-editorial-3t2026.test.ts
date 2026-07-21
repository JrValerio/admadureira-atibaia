import { describe, expect, it } from "vitest";
import { trimestresEBDPorClasse } from "@/data/ebd";
import { editoriaisAdultosTerceiroTrimestre } from "@/data/ebd/adultos-2026-3t";
import { contarPalavrasEditorialAdultos3T } from "@/data/ebd/adultos-2026-3t-editorial";
import {
  getDiagnosticoProntidaoEditorialLicao,
  getEstadoProgressaoLicao,
} from "../ebd-utils";

function coletarTextos(valor: unknown): string[] {
  if (typeof valor === "string") return [valor];
  if (Array.isArray(valor)) return valor.flatMap(coletarTextos);
  if (valor && typeof valor === "object") {
    return Object.values(valor).flatMap(coletarTextos);
  }
  return [];
}

function normalizarFraseEditorial(frase: string) {
  return frase
    .toLocaleLowerCase("pt-BR")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

describe("prontidao editorial do 3T2026", () => {
  for (const classe of ["jovens", "adultos"] as const) {
    it(`mantem todas as licoes de ${classe} completas e publicadas editorialmente`, () => {
      const trimestre = trimestresEBDPorClasse[classe].find(
        (item) => item.slug === "2026-3t",
      );

      expect(trimestre).toBeDefined();
      expect(trimestre?.statusEditorial).toBe("published");
      expect(trimestre?.licoes).toHaveLength(13);

      for (const licao of trimestre?.licoes ?? []) {
        const diagnostico = getDiagnosticoProntidaoEditorialLicao(
          trimestre!,
          licao,
        );

        expect(licao.statusEditorial, licao.id).toBe("published");
        expect(diagnostico.pendencias, licao.id).toEqual([]);
        expect(diagnostico.pronta, licao.id).toBe(true);
      }
    });

    it(`preserva a janela publica das licoes futuras de ${classe}`, () => {
      const trimestre = trimestresEBDPorClasse[classe].find(
        (item) => item.slug === "2026-3t",
      )!;
      const licao5 = trimestre.licoes.find((licao) => licao.numero === 5)!;

      expect(
        getEstadoProgressaoLicao(
          trimestre,
          licao5,
          new Date("2026-07-21T12:00:00-03:00"),
        ),
      ).toBe("em-breve");
    });
  }

  it("mantem os subsidios de Adultos densos, autorais e uniformes", () => {
    const dadosOficiais: Record<
      number,
      {
        titulo: string;
        referenciaTextoAureo: string;
        leitura: string[];
        topicos: string[];
      }
    > = {
      1: {
        titulo: "O Chamado para os Gentios",
        referenciaTextoAureo: "At 13:2",
        leitura: ["At 13:1-12"],
        topicos: [
          "I - O Nascimento da Missão Gentílica",
          "II - O Espírito Santo e a Obra Missionária",
          "III - A Igreja como Agência Missionária",
        ],
      },
      2: {
        titulo: "A Porta da Fé se Abre entre os Gentios",
        referenciaTextoAureo: "At 13:47",
        leitura: ["At 13:44-52"],
        topicos: [
          "I - A Missão em Chipre: a Primeira Porta Aberta entre os Gentios",
          "II - A Missão em Antioquia da Pisídia: o Evangelho que Ilumina",
          "III - A Missão em Icônio, Listra e Derbe: a Fé que Persevera",
        ],
      },
      3: {
        titulo: "A Graça que Alcança todas as Nações",
        referenciaTextoAureo: "Ef 2:8",
        leitura: ["At 15:1-5,28,29,36-39"],
        topicos: [
          "I - Quando a Graça Preserva a Unidade da Igreja",
          "II - Um Presente de Salvação para Todos",
          "III - Crescendo na Graça",
        ],
      },
      4: {
        titulo: "O Espírito que nos Guia para além das Fronteiras",
        referenciaTextoAureo: "At 16:5",
        leitura: ["At 16:11-18,25-31"],
        topicos: [
          "I - Lídia: Quando o Espírito Abre o Coração e Funda uma Igreja",
          "II - A Libertação da Jovem Possessa e o Confronto com os Poderes das Trevas",
          "III - A Prisão de Paulo e Silas e a Conversão do Carcereiro",
        ],
      },
      5: {
        titulo: "Cristo entre os Filósofos: o Deus desconhecido se Revela",
        referenciaTextoAureo: "At 17:30",
        leitura: ["At 17:15-20", "At 17:30-32"],
        topicos: [
          "I - Contexto histórico, cultural e religioso de Atenas",
          "II - Os filósofos epicureus e estoicos",
          "III - O discurso de Paulo no Areópago",
        ],
      },
      6: {
        titulo: "A Suficiência da Graça na Cidade de Corinto",
        referenciaTextoAureo: "At 18:10",
        leitura: ["At 18:1-11"],
        topicos: [
          "I - Paulo chega a Corinto",
          "II - A continuidade da missão e o encorajamento divino",
          "III - Paulo diante de Gálio: a graça que sustenta em meio à oposição",
        ],
      },
      7: {
        titulo: "Quando o Espírito Sopra em Éfeso",
        referenciaTextoAureo: "At 19:20",
        leitura: ["At 19:1-12"],
        topicos: [
          "I - O Espírito Santo sobre o ministério de Paulo",
          "II - O derramamento do Espírito Santo e o impacto do Evangelho na cidade",
          "III - A manifestação do poder de Deus entre os gentios",
        ],
      },
      8: {
        titulo: "Despedida em Éfeso: entre Lágrimas e Alertas",
        referenciaTextoAureo: "At 20:28",
        leitura: ["At 20:17-25", "At 20:36-38"],
        topicos: [
          "I - O ministério de Paulo como exemplo de fidelidade",
          "II - Advertências aos presbíteros contra os falsos mestres",
          "III - O cuidado pastoral de Paulo com os líderes da igreja",
        ],
      },
      9: {
        titulo: "Coragem para Testemunhar: Paulo diante da Multidão",
        referenciaTextoAureo: "At 22:15",
        leitura: ["At 21:27,28,30,31,33,39,40", "At 22:1-7"],
        topicos: [
          "I - A Prisão de Paulo em Jerusalém",
          "II - A Oportunidade para Testemunhar",
          "III - O Poder do Testemunho Pessoal",
        ],
      },
      10: {
        titulo: "Uma Esperança Inabalável perante os Poderosos",
        referenciaTextoAureo: "At 24:16",
        leitura: ["At 24:1-6,10-16"],
        topicos: [
          "I - A Acusação Injusta",
          "II - A Defesa do Evangelho Baseada na Verdade",
          "III - A Esperança que Supera a Opressão",
        ],
      },
      11: {
        titulo: "Entre Tempestades e Promessas",
        referenciaTextoAureo: "At 27:22",
        leitura: ["At 27:9-15,21-26"],
        topicos: [
          "I - A Tempestade que Surge na Viagem",
          "II - A Intervenção de Deus na Hora do Desespero",
          "III - A Providência Divina no Naufrágio",
        ],
      },
      12: {
        titulo: "O Evangelho Chega ao Coração do Império",
        referenciaTextoAureo: "At 28:31",
        leitura: ["At 28:16-24,28-31"],
        topicos: [
          "I - Paulo em Roma: Prisioneiro, mas Livre em Cristo",
          "II - O Evangelho Pregado aos Judeus em Roma",
          "III - A Rejeição dos Judeus e a Salvação aos Gentios",
        ],
      },
      13: {
        titulo: "A Missão Continua em Nós",
        referenciaTextoAureo: "Mc 13:10",
        leitura: ["Mt 28:18-20", "At 1:8", "Ef 2:13-18"],
        topicos: [
          "I - O Mandato Universal de Jesus",
          "II - O Poder do Espírito Santo na Missão",
          "III - A Grande Comissão e a Continuidade do Chamado Missionário",
        ],
      },
    };
    const hinosOficiais: Record<number, string[]> = {
      1: ["24", "340", "358"],
      2: ["65", "224", "305"],
      3: ["394", "409", "433"],
      4: ["155", "290", "511"],
      5: ["48", "124", "505"],
      6: ["79", "89", "205"],
      7: ["24", "340", "349"],
      8: ["15", "187", "304"],
      9: ["126", "193", "459"],
      10: ["107", "300", "581"],
      11: ["4", "515", "578"],
      12: ["18", "192", "298"],
      13: ["115", "127", "227"],
    };

    expect(Object.keys(editoriaisAdultosTerceiroTrimestre)).toHaveLength(13);
    const contagensDePalavras: number[] = [];

    for (const numero of Array.from({ length: 13 }, (_, index) => index + 1)) {
      const editorial = editoriaisAdultosTerceiroTrimestre[numero];
      const oficial = dadosOficiais[numero];
      expect(editorial, `Licao ${numero}`).toBeDefined();
      const palavras = contarPalavrasEditorialAdultos3T(editorial);
      contagensDePalavras.push(palavras);
      expect
        .soft(palavras, `Licao ${numero}: ${palavras} palavras`)
        .toBeGreaterThanOrEqual(4500);
      expect
        .soft(palavras, `Licao ${numero}: ${palavras} palavras`)
        .toBeLessThanOrEqual(7000);
      expect(editorial.titulo).toBe(oficial.titulo);
      expect(editorial.subsidioAdultos.cabecalho.textoAureo).toContain(
        oficial.referenciaTextoAureo,
      );
      expect(editorial.leituraBiblica).toEqual(oficial.leitura);
      expect(
        editorial.topicos.map((topico) =>
          topico.titulo.toLocaleLowerCase("pt-BR"),
        ),
      ).toEqual(
        oficial.topicos.map((topico) => topico.toLocaleLowerCase("pt-BR")),
      );
      expect(editorial.objetivos).toHaveLength(3);
      expect(
        editorial.subsidioAdultos.desenvolvimento.length,
      ).toBeGreaterThanOrEqual(10);
      expect(
        editorial.subsidioAdultos.desenvolvimento.some(
          (topico) => topico.titulo === "Conexão com Atos",
        ),
      ).toBe(true);
      expect(
        editorial.subsidioAdultos.aprofundamento?.leituraComplementar?.length,
      ).toBeGreaterThanOrEqual(3);
      expect(editorial.subsidioAdultos.revisao?.perguntas).toHaveLength(6);
      expect(editorial.subsidioAdultos.cabecalho.hinosSugeridos).toHaveLength(
        3,
      );
      expect(
        editorial.subsidioAdultos.cabecalho.hinosSugeridos?.map(
          (hino) => hino.match(/\d+/)?.[0],
        ),
      ).toEqual(hinosOficiais[numero]);
    }

    expect(
      Math.max(...contagensDePalavras) - Math.min(...contagensDePalavras),
    ).toBeLessThanOrEqual(2000);
  });

  it("evita repeticao estrutural e frases genericas nos editoriais de Adultos", () => {
    const ocorrenciasEntreLicoes = new Map<string, Set<number>>();

    for (const [numeroTexto, editorial] of Object.entries(
      editoriaisAdultosTerceiroTrimestre,
    )) {
      const numero = Number(numeroTexto);
      const ocorrenciasNaLicao = new Map<string, number>();
      const frases = coletarTextos(
        editorial.subsidioAdultos.desenvolvimento,
      ).flatMap((texto) => texto.split(/(?<=[.!?])\s+/));

      for (const frase of frases) {
        const normalizada = normalizarFraseEditorial(frase);
        if (normalizada.split(" ").length < 12) continue;

        ocorrenciasNaLicao.set(
          normalizada,
          (ocorrenciasNaLicao.get(normalizada) ?? 0) + 1,
        );
        const licoes = ocorrenciasEntreLicoes.get(normalizada) ?? new Set();
        licoes.add(numero);
        ocorrenciasEntreLicoes.set(normalizada, licoes);
      }

      expect(
        [...ocorrenciasNaLicao.entries()].filter(([, total]) => total > 1),
        `Licao ${numero}`,
      ).toEqual([]);
    }

    expect(
      [...ocorrenciasEntreLicoes.entries()].filter(
        ([, licoes]) => licoes.size >= 3,
      ),
    ).toEqual([]);
  });
});
