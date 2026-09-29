import { describe, expect, it } from "vitest";
import { trimestresEBDPorClasse } from "@/data/ebd";
import cabecalhos from "@/data/ebd/2026-4t/cabecalhos.json";
import resolucoesCabecalho from "@/data/ebd/2026-4t/fontes/resolucoes-cabecalho.json";
import manifestoLivro from "@/data/ebd/2026-4t/fontes/livro-apoio.json";
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

const CITACAO_LIVRO = /\([^()]*,\s*[^()]*,\s*cap\.\s*\d+[^()]*\)/;
const VERSICULO = /\bvers[íi]culos?\s+\d+/i;

function licoesDoCorpo(classe: "adultos" | "jovens") {
  const trimestre = trimestresEBDPorClasse[classe].find((item) => item.slug === "2026-4t")!;
  return trimestre.licoes.map((licao) => {
    const subsidio = licao.subsidioAdultos ?? licao.subsidioJovens;
    const corpo = { ...(subsidio as Record<string, unknown>) };
    delete corpo.cabecalho;
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

describe("gate 4T2026 — camada 1: cabeçalhos com livro, capítulo e domingo válidos", () => {
  // Forma impressa malformada mantida por decisão editorial (ver ressalvasJovens4T).
  const MALFORMADAS = new Set(["Filipenses 1.12-15-20,22,23,25-30"]);

  for (const classe of ["adultos", "jovens"] as const) {
    const licoes = cabecalhos[classe].licoes as Array<Record<string, unknown>>;

    it(`${classe}: toda data de lição cai num domingo`, () => {
      for (const licao of licoes) {
        const data = String(licao.data);
        expect(new Date(`${data}T12:00:00-03:00`).getDay(), `${classe} L${licao.numero}: ${data}`).toBe(0);
      }
    });

    it(`${classe}: toda referência do cabeçalho aponta para livro e capítulo existentes`, () => {
      const chave = classe === "adultos" ? "textoAureo" : "textoPrincipal";
      const leituras = classe === "adultos" ? "leituraDiaria" : "leituraSemanal";
      for (const licao of licoes) {
        const refs = [
          (licao[chave] as { referencia: string }).referencia,
          String(licao.leituraBiblica),
          ...(licao[leituras] as Array<{ referencia: string }>).map((item) => item.referencia),
        ];
        for (const ref of refs) {
          if (MALFORMADAS.has(ref)) continue;
          for (const parte of ref.split(";").map((p) => p.trim())) {
            // "23.27" depois de "At 22.29;" herda o livro da parte anterior.
            const completa = /^\d/.test(parte) ? `${ref.split(/\s+\d/)[0]} ${parte}` : parte;
            const achadas = extractBibleReferences(normalizeBibleReferenceNotation(completa));
            expect(achadas.length, `${classe} L${licao.numero}: "${parte}" em "${ref}"`).toBeGreaterThan(0);
          }
        }
      }
    });
  }

  it("resoluções de cabeçalho só valem para o valor exato que está no JSON", () => {
    for (const resolucao of resolucoesCabecalho) {
      const [classe, rotulo, ...resto] = resolucao.id.split("-");
      const numero = Number(rotulo.slice(1));
      const licao = (cabecalhos as unknown as Record<string, { licoes: Array<Record<string, unknown>> }>)[classe].licoes[numero - 1];
      const caminho = resto.join("-");
      if (caminho === "hinosSugeridos") continue; // hinos vêm do corpo, conferidos pela camada 1 em script
      const valor = caminho.split(/\.|\[|\]/).filter(Boolean).reduce<unknown>(
        (atual, parte) => (atual as Record<string, unknown>)?.[parte], licao);
      expect(valor, resolucao.id).toBe(resolucao.valor);
      expect(resolucao.conferido, resolucao.id).toBe("imagem");
    }
  });
});

describe("gate 4T2026 — camada 3: manifesto do livro de apoio", () => {
  const livros = manifestoLivro.livros as Record<string, { citacao: string }>;

  for (const classe of ["adultos", "jovens"] as const) {
    it(`${classe}: cada entrada do manifesto aponta para um trecho existente que cita o livro com o capítulo`, () => {
      const porLicao = new Map(licoesDoCorpo(classe).map(({ licao, textos }) => [licao.numero, textos.map((t) => t.texto)]));
      for (const entrada of manifestoLivro.citacoes.filter((c) => c.classe === classe)) {
        const corpo = porLicao.get(entrada.licao) ?? [];
        expect(corpo.some((texto) => texto.includes(entrada.trecho)), `${entrada.id}: trecho não encontrado no corpo da L${entrada.licao}`).toBe(true);
        expect(entrada.trecho, entrada.id).toContain(`${livros[classe].citacao}, cap. ${entrada.capitulo}`);
        expect(entrada.ancoras.length, entrada.id).toBeGreaterThan(0);
      }
    });

    it(`${classe}: toda frase que cita o livro de apoio tem entrada no manifesto`, () => {
      const entradas = manifestoLivro.citacoes.filter((c) => c.classe === classe);
      for (const { licao, textos } of licoesDoCorpo(classe)) {
        const daLicao = entradas.filter((e) => e.licao === licao.numero);
        for (const { campo, texto } of textos) {
          for (const frase of frases(texto)) {
            if (!frase.includes(livros[classe].citacao)) continue;
            const coberta = daLicao.some((e) => frase.includes(e.trecho) || e.trecho.includes(frase));
            expect(coberta, `${licao.id} ${campo}: citação do livro sem entrada no manifesto — "${frase.slice(0, 90)}…"`).toBe(true);
          }
        }
      }
    });
  }

  it("ids do manifesto são únicos", () => {
    const ids = manifestoLivro.citacoes.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
