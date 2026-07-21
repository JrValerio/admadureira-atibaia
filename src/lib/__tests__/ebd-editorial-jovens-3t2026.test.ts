import { describe, expect, it } from "vitest";
import { editoriaisJovensTerceiroTrimestre } from "@/data/ebd/jovens-2026-3t/index";
import { contarPalavrasEditorialJovens3T } from "@/data/ebd/jovens-2026-3t-editorial";
import { sementesJovensTerceiroTrimestre } from "@/data/ebd/jovens-2026-3t";
import { subsidioJovensSchema, trimestresEBDPorClasse } from "@/data/ebd";
import {
  getEstadoProgressaoLicao,
  isLicaoPubliclyAvailable,
} from "@/lib/ebd-utils";

function coletarTextos(valor: unknown): string[] {
  if (typeof valor === "string") return [valor];
  if (Array.isArray(valor)) return valor.flatMap(coletarTextos);
  if (valor && typeof valor === "object") {
    return Object.values(valor).flatMap(coletarTextos);
  }
  return [];
}

function normalizarParagrafo(texto: string) {
  return texto
    .toLocaleLowerCase("pt-BR")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

type LocalBiblico = {
  livro: string;
  capitulo: number;
  versiculo: number;
  sufixo?: string;
};

function normalizarLivroBiblico(livro: string) {
  const normalizado = livro
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("pt-BR");

  const abreviacoesDaRevista: Record<string, string> = {
    jz: "juizes",
  };

  return abreviacoesDaRevista[normalizado] ?? normalizado;
}

function extrairLocalBiblico(texto: string): LocalBiblico {
  const referenciaEntreParenteses = texto.match(/\(([^()]*)\)\s*$/)?.[1];
  const referencia = referenciaEntreParenteses ?? texto;
  const partes = referencia.match(
    /^\s*((?:[1-3]\s+)?[\p{L}.]+(?:\s+[\p{L}.]+)*)\s+(\d+)[.:](\d+)([a-z])?/iu,
  );

  if (!partes) {
    throw new Error(`Referência bíblica inválida: ${texto}`);
  }

  return {
    livro: normalizarLivroBiblico(partes[1]),
    capitulo: Number(partes[2]),
    versiculo: Number(partes[3]),
    ...(partes[4] ? { sufixo: partes[4].toLowerCase() } : {}),
  };
}

function expectLocalBiblicoEquivalente(
  textoAtual: string,
  textoEsperado: string,
) {
  const atual = extrairLocalBiblico(textoAtual);
  const esperado = extrairLocalBiblico(textoEsperado);

  expect(atual.livro).toBe(esperado.livro);
  expect(atual.capitulo).toBe(esperado.capitulo);
  expect(atual.versiculo).toBe(esperado.versiculo);

  if (esperado.sufixo) {
    expect(atual.sufixo).toBe(esperado.sufixo);
  }
}

describe("editoriais de Jovens do 3T2026", () => {
  it("entrega as 13 lições oficiais com subsídios completos e equilibrados", () => {
    expect(Object.keys(editoriaisJovensTerceiroTrimestre)).toHaveLength(13);

    for (const semente of sementesJovensTerceiroTrimestre) {
      const editorial = editoriaisJovensTerceiroTrimestre[semente.numero];

      expect(editorial, `Lição ${semente.numero}`).toBeDefined();
      expect(editorial.titulo).toBe(semente.titulo);
      expect(editorial.data).toBe(semente.data);
      expect(editorial.resumo).toBe(semente.resumo);
      expect(editorial.textoChave).toContain(
        semente.textoPrincipal.match(/\d+\.\d+/)?.[0],
      );
      expect(editorial.textoChave).toMatch(/\d+\.\d+/);
      expect(editorial.textoChave).not.toMatch(/\d+:\d+/);
      expect(editorial.leituraBiblica.length).toBeGreaterThan(0);
      expect(editorial.leituraBiblica).not.toContainEqual(
        expect.stringMatching(/\d+:\d+/),
      );
      expect(editorial.objetivos).toHaveLength(3);
      expect(editorial.topicos.length).toBeGreaterThanOrEqual(2);
      expect(editorial.topicos.length).toBeLessThanOrEqual(3);

      const subsidio = subsidioJovensSchema.parse(editorial.subsidioJovens);
      const textoPrincipalDoSubsidio = subsidio.cabecalho.textoPrincipal;
      expect(textoPrincipalDoSubsidio).toBeDefined();

      if (!textoPrincipalDoSubsidio) {
        throw new Error(`Lição ${semente.numero} sem Texto Principal`);
      }

      expect(textoPrincipalDoSubsidio).toMatch(/— ACF\b/);
      expect(textoPrincipalDoSubsidio).not.toMatch(/\d+:\d+/);
      expectLocalBiblicoEquivalente(
        textoPrincipalDoSubsidio,
        semente.textoPrincipal,
      );
      expect(subsidio.cabecalho.leituraSemanal).toHaveLength(6);
      expect(
        subsidio.cabecalho.leituraSemanal?.map((item) => item.dia),
      ).toEqual(semente.leituraSemanal.map((item) => item.dia));
      expect(subsidio.cabecalho.leituraSemanal).not.toContainEqual(
        expect.objectContaining({
          referencia: expect.stringMatching(/\d+:\d+/),
        }),
      );
      expect(subsidio.revisao?.horaDaRevisao?.length).toBeGreaterThanOrEqual(5);
      expect(subsidio.revisao?.quizCurto?.length).toBeGreaterThanOrEqual(5);
      expect(
        subsidio.apoioProfessor.conducaoDaConversa?.some((item) =>
          item.startsWith("Dinâmica sugerida:"),
        ),
      ).toBe(true);

      const titulosDesenvolvimento = subsidio.desenvolvimento.map(
        (topico) => topico.titulo,
      );
      expect(titulosDesenvolvimento).toEqual(
        expect.arrayContaining([
          "Resumo em um minuto",
          "Conexão com Juízes",
          "Doutrina pentecostal em destaque",
          "Conexão com Cristo",
          "Erros de interpretação a evitar",
          "Para aprofundar",
        ]),
      );
      const fontesDaLicao = coletarTextos(
        subsidio.desenvolvimento.find(
          (topico) => topico.titulo === "Para aprofundar",
        ),
      ).join(" ");
      expect(fontesDaLicao).toMatch(/Lições Bíblicas|Revista/);
      expect(fontesDaLicao).toMatch(/Valmir|Nascimento/);
      expect(fontesDaLicao).toMatch(/ACF|Almeida Corrigida Fiel/);

      const palavras = contarPalavrasEditorialJovens3T(editorial);
      expect(palavras, `Lição ${semente.numero}`).toBeGreaterThanOrEqual(4500);
      expect(palavras, `Lição ${semente.numero}`).toBeLessThanOrEqual(6500);

      const minutosDoEsboco = editorial.esboco.reduce((total, item) => {
        const minutos = item.titulo?.match(/—\s*(\d+)\s*minutos/i)?.[1];
        return total + (minutos ? Number(minutos) : 0);
      }, 0);
      expect(minutosDoEsboco, `Lição ${semente.numero}`).toBeGreaterThanOrEqual(
        40,
      );
      expect(minutosDoEsboco, `Lição ${semente.numero}`).toBeLessThanOrEqual(
        50,
      );
    }
  });

  it("remove os placeholders e preserva os eixos críticos das lições 1 a 4", () => {
    const textos = Object.fromEntries(
      [1, 2, 3, 4].map((numero) => [
        numero,
        coletarTextos(
          editoriaisJovensTerceiroTrimestre[numero].subsidioJovens,
        ).join(" "),
      ]),
    ) as Record<number, string>;

    expect(textos[1]).toMatch(/Josué/);
    expect(textos[1]).toMatch(/juízes maiores/);
    expect(textos[1]).toMatch(/ciclo/);
    expect(textos[1]).toMatch(/Cristo/);

    expect(textos[2]).toMatch(/Juízes 1/);
    expect(textos[2]).toMatch(/Boquim/);
    expect(textos[2]).toMatch(/remorso/);
    expect(textos[2]).toMatch(/Baal/);

    expect(textos[3]).toMatch(/Acsa/);
    expect(textos[3]).toMatch(/jugo desigual/);
    expect(textos[3]).toMatch(/batismo no Espírito Santo/);
    expect(textos[3]).toMatch(/Nem todo sofrimento/);

    expect(textos[4]).toMatch(/Eglom/);
    expect(textos[4]).toMatch(/Sangar/);
    expect(textos[4]).toMatch(/aguilhada/);
    expect(textos[4]).toMatch(/violência/);
    expect(textos[4]).toMatch(/Libertador/);

    const corpus = Object.values(editoriaisJovensTerceiroTrimestre)
      .map((editorial) => coletarTextos(editorial.subsidioJovens).join(" "))
      .join(" ");
    expect(corpus).not.toContain(
      "Identificar o alerta bíblico central da lição",
    );
    expect(corpus).not.toContain(
      "Use as referências oficiais como mapa da aula",
    );
  });

  it("não repete parágrafos longos dentro do desenvolvimento de uma lição", () => {
    for (const editorial of Object.values(editoriaisJovensTerceiroTrimestre)) {
      const paragrafos = coletarTextos(editorial.subsidioJovens.desenvolvimento)
        .filter((texto) => texto.trim().split(/\s+/).length >= 25)
        .map(normalizarParagrafo);
      const repetidos = paragrafos.filter(
        (paragrafo, indice) => paragrafos.indexOf(paragrafo) !== indice,
      );

      expect([...new Set(repetidos)], `Lição ${editorial.numero}`).toEqual([]);
    }
  });

  it("mantém a visão geral concisa sem duplicar o comentário integral", () => {
    for (const editorial of Object.values(editoriaisJovensTerceiroTrimestre)) {
      const paragrafosDaVisaoGeral = editorial.topicos
        .flatMap((topico) => topico.conteudo)
        .filter((texto) => texto.trim().split(/\s+/).length >= 45)
        .map(normalizarParagrafo);
      const paragrafosDoSubsidio = coletarTextos(
        editorial.subsidioJovens.desenvolvimento,
      )
        .filter((texto) => texto.trim().split(/\s+/).length >= 45)
        .map(normalizarParagrafo);

      expect(
        paragrafosDaVisaoGeral.filter((paragrafo) =>
          paragrafosDoSubsidio.includes(paragrafo),
        ),
        `Lição ${editorial.numero}`,
      ).toEqual([]);
    }
  });

  it("libera a Lição 4 nesta semana e mantém a Lição 5 na janela futura", () => {
    const trimestre = trimestresEBDPorClasse.jovens.find(
      (item) => item.slug === "2026-3t",
    )!;
    const licao4 = trimestre.licoes.find((licao) => licao.numero === 4)!;
    const licao5 = trimestre.licoes.find((licao) => licao.numero === 5)!;
    const dataDeReferencia = new Date("2026-07-21T12:00:00-03:00");

    expect(isLicaoPubliclyAvailable(trimestre, licao4, dataDeReferencia)).toBe(
      true,
    );
    expect(getEstadoProgressaoLicao(trimestre, licao4, dataDeReferencia)).toBe(
      "liberada",
    );
    expect(getEstadoProgressaoLicao(trimestre, licao5, dataDeReferencia)).toBe(
      "em-breve",
    );
    expect(licao5.statusEditorial).toBe("published");
    expect(isLicaoPubliclyAvailable(trimestre, licao5, dataDeReferencia)).toBe(
      false,
    );
  });
});
