import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import LiderancaDestaque from "../LiderancaDestaque";

describe("LiderancaDestaque", () => {
  it("renderiza nome, cargo e foto quando existe", () => {
    const html = renderToStaticMarkup(
      <LiderancaDestaque lider={{ nome: "Pr. Fulano", cargo: "Presidente", foto: "/pastores/fulano.jpg" }} />
    );
    expect(html).toContain("Pr. Fulano");
    expect(html).toContain("Presidente");
    expect(html).toContain("fulano.jpg");
    expect(html).toContain('alt="Pr. Fulano, Presidente"');
  });

  it("não renderiza nada quando ausente", () => {
    expect(renderToStaticMarkup(<LiderancaDestaque />)).toBe("");
  });
});
