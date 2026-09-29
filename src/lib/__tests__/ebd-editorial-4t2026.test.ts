import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { trimestresEBDPorClasse, validateSubsidioAdultos, validateSubsidioJovens } from "@/data/ebd";
import cabecalhos from "@/data/ebd/2026-4t/cabecalhos.json";
import { corposAdultos4T } from "@/data/ebd/2026-4t/adultos";
import { corposJovens4T } from "@/data/ebd/2026-4t/jovens";
import { getDiagnosticoProntidaoEditorialLicao, getLicaoReleaseWindowKey, isLicaoPubliclyAvailable } from "../ebd-utils";
import { extractBibleReferences, normalizeBibleReferenceNotation } from "../bible-reference";

// Lições que passaram pelo gate humano contra a revista. Cada PR semanal de
// publicação acrescenta o número aqui junto com a troca de status.
const aprovadas: Record<"adultos" | "jovens", number[]> = { adultos: [1], jovens: [1] };

describe("curadoria de Adultos e Jovens — 4T2026", () => {
  for (const classe of ["adultos", "jovens"] as const) {
    const trimestre = trimestresEBDPorClasse[classe].find((item) => item.slug === "2026-4t")!;
    const corpos = classe === "adultos" ? corposAdultos4T : corposJovens4T;

    it(`${classe}: possui treze lições completas e únicas, publicadas só após o gate`, () => {
      expect(trimestre.statusEditorial).toBe("partial");
      expect(trimestre.titulo).toBe(cabecalhos[classe].titulo);
      expect(trimestre.comentarista).toBe(cabecalhos[classe].comentarista);
      expect(trimestre.licoes).toHaveLength(13);
      expect(new Set(trimestre.licoes.map((licao) => licao.id)).size).toBe(13);
      expect(corpos.map((corpo) => corpo.numero)).toEqual(Array.from({ length: 13 }, (_, i) => i + 1));
      for (const licao of trimestre.licoes) {
        expect(getDiagnosticoProntidaoEditorialLicao(trimestre, licao).pendencias, licao.id).toEqual([]);
        expect(licao.statusEditorial, licao.id).toBe(aprovadas[classe].includes(licao.numero) ? "published" : "draft");
        expect(licao.dataLiberacaoPublica).toBeUndefined();
        expect(licao.objetivos).toHaveLength(3);
        expect(licao.topicos).toHaveLength(3);
        const corpo = corpos.find((item) => item.numero === licao.numero)!;
        expect(corpo.planejamento.length).toBeGreaterThan(150);
        expect(corpo.revisao).toHaveLength(3);
        for (const topico of corpo.desenvolvimento) {
          expect(topico.paragrafos).toHaveLength(2);
          expect(topico.paragrafos.every((texto) => texto.length > 120)).toBe(true);
          expect(topico.aplicacao.length).toBeGreaterThan(30);
        }
        if (licao.publico === "adultos") validateSubsidioAdultos(licao.id, licao.subsidioAdultos);
        if (licao.publico === "jovens") validateSubsidioJovens(licao.id, licao.subsidioJovens);
      }
    });

    it(`${classe}: mantém as datas conferidas e o Dia da Bíblia`, () => {
      expect(trimestre.licoes.map((licao) => licao.data)).toEqual([
        "2026-10-04", "2026-10-11", "2026-10-18", "2026-10-25", "2026-11-01",
        "2026-11-08", "2026-11-15", "2026-11-22", "2026-11-29", "2026-12-06",
        "2026-12-13", "2026-12-20", "2026-12-27",
      ]);
      expect(trimestre.licoes.filter((licao) => licao.dataEspecial).map((licao) => [licao.numero, licao.dataEspecial])).toEqual([[11, "Dia da Bíblia"]]);
    });

    it(`${classe}: não publica rascunhos e preserva a janela semanal após aprovação`, () => {
      for (const licao of trimestre.licoes) {
        expect(isLicaoPubliclyAvailable(trimestre, licao, new Date("2027-01-01T12:00:00-03:00")), licao.id).toBe(
          aprovadas[classe].includes(licao.numero),
        );
        const aprovado = { ...licao, statusEditorial: "published" as const };
        const rascunho = { ...licao, statusEditorial: "draft" as const };
        const edicaoFechada = { ...trimestre, statusEditorial: "draft" as const };
        const inicio = new Date(`${getLicaoReleaseWindowKey(licao)}T00:00:00-03:00`);
        expect(isLicaoPubliclyAvailable(trimestre, aprovado, new Date(inicio.getTime() - 1000))).toBe(false);
        expect(isLicaoPubliclyAvailable(trimestre, aprovado, inicio)).toBe(true);
        expect(isLicaoPubliclyAvailable(edicaoFechada, aprovado, inicio)).toBe(false);
        expect(isLicaoPubliclyAvailable(trimestre, rascunho, inicio)).toBe(false);
      }
      // L1 aberta desde a janela de 25/09; L2 segue fechada mesmo com a janela
      // aberta (02/10), porque ainda não passou pelo gate.
      expect(isLicaoPubliclyAvailable(trimestre, trimestre.licoes[0], new Date("2026-09-28T12:00:00-03:00"))).toBe(true);
      expect(isLicaoPubliclyAvailable(trimestre, trimestre.licoes[1], new Date("2026-10-10T12:00:00-03:00"))).toBe(false);
      expect(getLicaoReleaseWindowKey(trimestre.licoes[0])).toBe("2026-09-25");
      expect(getLicaoReleaseWindowKey(trimestre.licoes[12])).toBe("2026-12-18");
    });

    it(`${classe}: aponta para capas e imagens existentes da edição correta`, () => {
      for (const asset of [trimestre.imagem, ...trimestre.licoes.map((licao) => licao.imagem!)]) {
        expect(asset).toContain(`/${classe}/2026-4t/`);
        expect(existsSync(path.join(process.cwd(), "public", asset)), asset).toBe(true);
      }
      expect(readFileSync(path.join(process.cwd(), "public", trimestre.imagem)).length).toBeGreaterThan(100_000);
    });

    it(`${classe}: preserva todos os cabeçalhos e as seis entradas de cada semana`, () => {
      for (const [index, seed] of cabecalhos[classe].licoes.entries()) {
        const licao = trimestre.licoes[index];
        expect(licao.titulo).toBe(seed.titulo);
        expect(licao.leituraBiblica).toEqual([normalizeBibleReferenceNotation(seed.leituraBiblica)]);
        const leituras = licao.subsidioAdultos?.cabecalho.leituraDiaria ?? licao.subsidioJovens?.cabecalho.leituraSemanal;
        const origem = "leituraDiaria" in seed ? seed.leituraDiaria : seed.leituraSemanal;
        expect(leituras?.map((item) => [item.dia, item.referencia, "tema" in item ? item.tema : "foco" in item ? item.foco : undefined])).toEqual(
          origem.map((item) => [item.dia, normalizeBibleReferenceNotation(item.referencia), item.tema]),
        );
        expect(leituras).toHaveLength(6);
        for (const leitura of leituras!) {
          expect(extractBibleReferences(leitura.referencia).length, `${licao.id}: ${leitura.referencia}`).toBe(leitura.referencia.split(";").length);
        }
      }
    });
  }

  it("mantém a leitura da revista de Adultos, as sete referências de Jovens L1 e os hinos conferidos", () => {
    const adultos = trimestresEBDPorClasse.adultos.find((item) => item.slug === "2026-4t")!;
    const jovens = trimestresEBDPorClasse.jovens.find((item) => item.slug === "2026-4t")!;
    const diaria = adultos.licoes[0].subsidioAdultos!.cabecalho.leituraDiaria!;
    expect(diaria[0].referencia).toBe("Js 1:8; 2 Tm 3:16");
    expect(diaria[5].referencia).toBe("Mt 4:4,7,10");
    expect(jovens.licoes[0].subsidioJovens!.cabecalho.leituraSemanal!.flatMap((item) => extractBibleReferences(item.referencia))).toHaveLength(7);
    const hinos = [[107,259,276],[58,225,365],[77,306,377],[103,210,508],[217,385,432],[50,176,386],[126,175,258],[158,201,452],[260,304,515],[47,205,459],[140,148,351],[118,215,509],[322,330,506]];
    expect(adultos.licoes.map((licao) => licao.subsidioAdultos!.cabecalho.hinosSugeridos)).toEqual(hinos.map((lista) => lista.map((numero) => `${numero} da Harpa Cristã`)));
  });

  it("respeita a decisão de conservar as três divergências impressas de Jovens", () => {
    const licoes = trimestresEBDPorClasse.jovens.find((item) => item.slug === "2026-4t")!.licoes;
    expect(licoes[1].leituraBiblica).toEqual(["Filipenses 1:12-15-20,22,23,25-30"]);
    expect(extractBibleReferences(licoes[1].leituraBiblica[0])).toEqual([]);
    expect(licoes[5].subsidioJovens!.cabecalho.leituraSemanal![0].foco).toBe("Um pouco de fermento levada toda a massa");
    expect(licoes[7].subsidioJovens!.cabecalho.leituraSemanal![5].referencia).toBe("Fp 2:22");
    for (const numero of [2, 6, 8]) expect(licoes[numero - 1].apoioProfessor).toHaveLength(2);
  });
});
