import { describe, expect, it } from "vitest";
import { extractBibleReferences, normalizeBibleReferenceNotation } from "../bible-reference";

describe("extractBibleReferences", () => {
  it("preserva dois capítulos no mesmo dia e versículos separados por vírgula", () => {
    expect(extractBibleReferences("At 22.29; 23.27").map((ref) => [ref.bookSlug, ref.chapter, ref.verseStart])).toEqual([
      ["atos", 22, 29], ["atos", 23, 27],
    ]);
    expect(extractBibleReferences("Mt 4.4,7,10")[0]).toMatchObject({
      matchedText: "Mt 4.4,7,10", chapter: 4, verseStart: 4, verseEnd: undefined,
    });
    expect(normalizeBibleReferenceNotation("At 22.29; 23.27")).toBe("At 22:29; 23:27");
  });

  it("reconhece mudança de livro, ordinais e abreviações acentuadas", () => {
    expect(extractBibleReferences("Js 1.8; 2 Tm 3.16; Êx 18.21").map((ref) => ref.bookSlug)).toEqual([
      "josue", "2-timoteo", "exodo",
    ]);
    expect(extractBibleReferences("1 Ts 2.2; Fp 1.1").map((ref) => ref.chapter)).toEqual([2, 1]);
    expect(extractBibleReferences("Jó 1.1; Jo 1.1").map((ref) => ref.bookSlug)).toEqual(["jo", "joao"]);
  });

  it("não inventa intervalo contínuo a partir de trechos separados", () => {
    expect(extractBibleReferences("Deuteronômio 1.9-12,19-21,26-28,34-36")[0]).toMatchObject({
      matchedText: "Deuteronômio 1.9-12,19-21,26-28,34-36",
      verseStart: 9, verseEnd: 12, href: "/espiritualidade/biblia/deuteronomio/1#v9-12",
    });
  });

  it("não corrige nem cria links para intervalos malformados ou capítulos inexistentes", () => {
    expect(extractBibleReferences("Filipenses 1.12-15-20,22,23,25-30")).toEqual([]);
    expect(extractBibleReferences("Fp 5.1")).toEqual([]);
    expect(extractBibleReferences("At 22.29; 29.1")).toHaveLength(1);
    expect(extractBibleReferences("Fp 2.22")[0]).toMatchObject({ chapter: 2, verseStart: 22 });
  });

  it("reconhece a abreviação Jz com capítulo e intervalo de versículos", () => {
    expect(extractBibleReferences("Jz 2.16-22")).toEqual([
      {
        matchedText: "Jz 2.16-22",
        bookSlug: "juizes",
        bookName: "Juízes",
        chapter: 2,
        verseStart: 16,
        verseEnd: 22,
        href: "/espiritualidade/biblia/juizes/2#v16-22",
        index: 0,
      },
    ]);
  });
});
