import { describe, expect, it } from "vitest";
import { extractBibleReferences } from "../bible-reference";

describe("extractBibleReferences", () => {
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
