import { describe, expect, it } from "vitest";
import { trimestresEBDPorClasse } from "@/data/ebd";
import { extractBibleReferences, normalizeBibleReferenceNotation } from "../bible-reference";

// Parte estrutural do gate automatizado (scripts/gate/). Os scripts conferem as
// fontes (PDFs e ARC) localmente; estes testes conferem, sem rede nem PDFs, que o
// texto e os dados versionados do gate estão coerentes entre si.

type Texto = { campo: string; texto: string };

function textosDoCorpo(valor: unknown, campo = ""): Texto[] {
  if (typeof valor === "string") return [{ campo, texto: valor }];
  if (Array.isArray(valor)) return valor.flatMap((item) => textosDoCorpo(item, campo));
  if (valor && typeof valor === "object") {
    return Object.entries(valor).flatMap(([chave, item]) => textosDoCorpo(item, campo ? `${campo}.${chave}` : chave));
  }
  return [];
}

// Mesma regra de scripts/gate/comum.py: não quebra antes de "(", porque a
// referência entre parênteses pertence à frase anterior; a aspa de fechamento
// fica com a frase.
function frases(texto: string) {
  return texto.split(/(?<=[.!?][”"]?)\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ“"])/).map((f) => f.trim()).filter(Boolean);
}

const CITACAO_LIVRO = /\([^()]*,\s*[^()]*,\s*cap\.\s*\d+\)/;
const VERSICULO = /\bvers[íi]culos?\s+\d+/i;

function licoesDoCorpo(classe: "adultos" | "jovens") {
  const trimestre = trimestresEBDPorClasse[classe].find((item) => item.slug === "2026-4t")!;
  return trimestre.licoes.map((licao) => {
    const subsidio = licao.subsidioAdultos ?? licao.subsidioJovens;
    const { cabecalho: _cabecalho, ...corpo } = subsidio as Record<string, unknown>;
    return { licao, textos: [...textosDoCorpo(corpo), { campo: "resumo", texto: licao.resumo }] };
  });
}

describe("gate 4T2026 — camada 2: citações entre aspas têm fonte associada", () => {
  for (const classe of ["adultos", "jovens"] as const) {
    it(`${classe}: toda citação “…” está numa frase com referência bíblica, “versículo N” ou citação do livro de apoio`, () => {
      for (const { licao, textos } of licoesDoCorpo(classe)) {
        for (const { campo, texto } of textos) {
          for (const frase of frases(texto)) {
            if (!frase.includes("“")) continue;
            const temReferencia = extractBibleReferences(normalizeBibleReferenceNotation(frase)).length > 0;
            const temFonte = temReferencia || VERSICULO.test(frase) || CITACAO_LIVRO.test(frase);
            expect(temFonte, `${licao.id} ${campo}: citação sem fonte na frase — "${frase.slice(0, 90)}…"`).toBe(true);
          }
        }
      }
    });
  }
});
