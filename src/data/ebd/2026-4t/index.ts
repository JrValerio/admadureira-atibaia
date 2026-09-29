import { extractBibleReferences, normalizeBibleReferenceNotation } from "@/lib/bible-reference";
import { getEbdLessonImagePath, getEbdQuarterCoverPath } from "../assets";
import {
  validateSubsidioAdultos,
  validateSubsidioJovens,
  type LicaoEBDAdultos,
  type LicaoEBDJovens,
  type StatusLicaoEBD,
  type StatusEditorialEBD,
  type TrimestreEBD,
} from "../types";
import cabecalhos from "./cabecalhos.json";
import { corposAdultos4T } from "./adultos";
import { corposJovens4T } from "./jovens";
import type { CorpoEditorial4T } from "./editorial";

// Abrir cada edição independentemente, após o gate humano da primeira lição.
export const statusTrimestres4T: Record<"adultos" | "jovens", StatusEditorialEBD> = {
  adultos: "partial",
  jovens: "partial",
};

// Alterar individualmente após a revisão humana. A janela semanal continua
// sendo aplicada por isLicaoPubliclyAvailable; não há antecipação de datas.
export const statusLicoes4T: Record<"adultos" | "jovens", Record<number, StatusLicaoEBD>> = {
  adultos: { 1: "published", 2: "draft", 3: "draft", 4: "draft", 5: "draft", 6: "draft", 7: "draft", 8: "draft", 9: "draft", 10: "draft", 11: "draft", 12: "draft", 13: "draft" },
  jovens: { 1: "published", 2: "draft", 3: "draft", 4: "draft", 5: "draft", 6: "draft", 7: "draft", 8: "draft", 9: "draft", 10: "draft", 11: "draft", 12: "draft", 13: "draft" },
};

const normalizar = normalizeBibleReferenceNotation;

function corpoDaLicao(corpos: CorpoEditorial4T[], numero: number) {
  const corpo = corpos.find((item) => item.numero === numero);
  if (!corpo) throw new Error(`Corpo editorial ausente na lição ${numero} do 4T2026`);
  return corpo;
}

/** Leitura e memorização da semana, montadas a partir do cabeçalho transcrito. */
function tarefasDaSemana(corpo: CorpoEditorial4T, leitura: string, textoChave: string) {
  // Referência que o site não reconhece (ex.: a forma impressa malformada da L2
  // de Jovens, mantida por decisão editorial) não entra numa instrução ao aluno.
  const leituraCitavel = extractBibleReferences(leitura).length > 0;
  return [
    leituraCitavel
      ? `Leia ${leitura} antes do domingo e marque os movimentos principais do texto.`
      : "Leia o texto bíblico da lição antes do domingo e marque os movimentos principais do texto.",
    `Releia ${textoChave} ao longo da semana e procure guardá-lo de memória.`,
    ...(corpo.tarefasAluno ?? []),
  ];
}

// Regra de repetição (ver editorial.ts): o conteúdo do tópico aparece na visão do
// aluno (topicos) e no subsídio do professor (desenvolvimento), e em nenhum
// outro lugar. Esboço e tarefas do aluno só entram com texto próprio.
function conteudoComum(corpo: CorpoEditorial4T, leitura: string, textoChave: string) {
  const esbocoCompleto = corpo.desenvolvimento.every((topico) => topico.esboco);
  return {
    resumo: corpo.introducao,
    objetivos: corpo.objetivos,
    topicos: corpo.desenvolvimento.map((topico) => ({
      titulo: topico.titulo,
      conteudo: [
        ...(topico.sinopse ? [topico.sinopse] : []),
        ...topico.paragrafos,
        ...(topico.aprofundamentoDoutrinario ?? []),
        topico.aplicacao,
      ],
    })),
    aplicacao: corpo.conclusao,
    apoioProfessor: [corpo.planejamento],
    apoioAluno: tarefasDaSemana(corpo, leitura, textoChave),
    ...(esbocoCompleto
      ? {
          esboco: corpo.desenvolvimento.map((topico) => ({
            titulo: topico.titulo,
            conteudo: topico.esboco!,
          })),
        }
      : {}),
  };
}

function desenvolvimento(corpo: CorpoEditorial4T, id: string) {
  return corpo.desenvolvimento.map((topico, index) => ({
    id: `${id}-topico-${index + 1}`,
    titulo: topico.titulo,
    ...(topico.sinopse ? { sinopse: topico.sinopse } : {}),
    explicacaoBiblica: topico.paragrafos,
    ...(topico.aprofundamentoDoutrinario ? { aprofundamentoDoutrinario: topico.aprofundamentoDoutrinario } : {}),
    aplicacaoPratica: [topico.aplicacao],
    ...(topico.referenciasCruzadas
      ? {
          referenciasCruzadas: topico.referenciasCruzadas.map((item) => ({
            ...item,
            referencia: normalizar(item.referencia),
          })),
        }
      : {}),
  }));
}

const licoesAdultos: LicaoEBDAdultos[] = cabecalhos.adultos.licoes.map((seed) => {
  const corpo = corpoDaLicao(corposAdultos4T, seed.numero);
  const id = `adultos-2026-4t-licao-${seed.numero}`;
  const leituraBiblica = [normalizar(seed.leituraBiblica)];
  return {
    ...conteudoComum(corpo, leituraBiblica[0], normalizar(seed.textoAureo.referencia)),
    id,
    publico: "adultos",
    slug: `licao-${seed.numero}`,
    numero: seed.numero,
    titulo: seed.titulo,
    data: seed.data,
    dataEspecial: seed.dataEspecial,
    statusEditorial: statusLicoes4T.adultos[seed.numero],
    imagem: getEbdLessonImagePath("adultos", "2026-4t", seed.numero, "jpg"),
    textoChave: normalizar(seed.textoAureo.referencia),
    verdadePratica: seed.verdadePratica,
    leituraBiblica,
    subsidioAdultos: validateSubsidioAdultos(id, {
      cabecalho: {
        numero: seed.numero,
        titulo: seed.titulo,
        data: seed.data,
        trimestre: cabecalhos.adultos.titulo,
        comentarista: cabecalhos.adultos.comentarista,
        textoAureo: `“${seed.textoAureo.texto}” (${normalizar(seed.textoAureo.referencia)})`,
        verdadePratica: seed.verdadePratica,
        leituraBiblicaEmClasse: leituraBiblica,
        // Fonte única desta seção: revista do professor; não o COMUNHÃO.
        leituraDiaria: seed.leituraDiaria.map((item) => ({
          dia: item.dia, referencia: normalizar(item.referencia), tema: item.tema,
        })),
        hinosSugeridos: corpo.hinosSugeridos?.map((hino) => `${hino} da Harpa Cristã`),
      },
      visaoGeral: {
        resumo: corpo.introducao,
        objetivos: corpo.objetivos,
        ...(corpo.ideiaCentral ? { ideiaCentral: corpo.ideiaCentral } : {}),
      },
      desenvolvimento: desenvolvimento(corpo, id),
      apoioProfessor: {
        ...(corpo.perguntaDeAbertura ? { perguntaDeAbertura: corpo.perguntaDeAbertura } : {}),
        perguntasParaDebate: corpo.revisao,
        ...(corpo.sugestaoDeFechamento ? { sugestaoDeFechamento: corpo.sugestaoDeFechamento } : {}),
      },
      ...(corpo.contextoHistorico ? { aprofundamento: { contextoHistorico: corpo.contextoHistorico } } : {}),
      revisao: {
        perguntas: corpo.revisao,
        ...(corpo.fraseDeSintese ? { fraseDeSintese: corpo.fraseDeSintese } : {}),
      },
    }),
  };
});

/**
 * Decisão expressa do usuário: manter as formas impressas, sem emendas.
 * Registro de curadoria apenas: estas notas não entram no objeto renderizado.
 */
export const ressalvasJovens4T: Record<number, string> = {
  2: "Referência transcrita como impressa: Filipenses 1.12-15-20,22,23,25-30. A sequência contém um intervalo malformado; não foi corrigida. Na preparação, confira os versículos reproduzidos na revista.",
  6: "Leitura semanal de segunda-feira: mantida a palavra “levada”, conforme impressa na revista. A proposta de alteração para “leveda” não foi aplicada.",
  8: "Leitura semanal de sábado: mantida a referência Fp 2.22, conforme impressa. A associação com o tema “O alinhamento dos entendimentos” permanece registrada como divergência editorial, sem substituição por Fp 2.2.",
};

const licoesJovens: LicaoEBDJovens[] = cabecalhos.jovens.licoes.map((seed) => {
  const corpo = corpoDaLicao(corposJovens4T, seed.numero);
  const id = `jovens-2026-4t-licao-${seed.numero}`;
  return {
    ...conteudoComum(corpo, normalizar(seed.leituraBiblica), normalizar(seed.textoPrincipal.referencia)),
    id,
    publico: "jovens",
    slug: `licao-${seed.numero}`,
    numero: seed.numero,
    titulo: seed.titulo,
    data: seed.data,
    dataEspecial: seed.dataEspecial,
    statusEditorial: statusLicoes4T.jovens[seed.numero],
    imagem: getEbdLessonImagePath("jovens", "2026-4t", seed.numero, "jpg"),
    textoChave: normalizar(seed.textoPrincipal.referencia),
    verdadePratica: seed.resumoLicao,
    leituraBiblica: [normalizar(seed.leituraBiblica)],
    apoioProfessor: [corpo.planejamento],
    subsidioJovens: validateSubsidioJovens(id, {
      cabecalho: {
        numero: seed.numero,
        titulo: seed.titulo,
        data: seed.data,
        trimestre: cabecalhos.jovens.titulo,
        textoPrincipal: `“${seed.textoPrincipal.texto}” (${normalizar(seed.textoPrincipal.referencia)})`,
        resumoDaLicao: seed.resumoLicao,
        leituraSemanal: seed.leituraSemanal.map((item) => ({
          dia: item.dia, referencia: normalizar(item.referencia), foco: item.tema,
        })),
      },
      arranquePedagogico: {
        objetivos: corpo.objetivos,
        interacao: corpo.introducao,
        orientacaoPedagogica: corpo.planejamento,
      },
      desenvolvimento: desenvolvimento(corpo, id),
      apoioProfessor: {
        ...(corpo.perguntaDeAbertura ? { perguntaChave: corpo.perguntaDeAbertura } : {}),
        ...(corpo.conducaoDaConversa ? { conducaoDaConversa: corpo.conducaoDaConversa } : {}),
        ...(corpo.sugestaoDeFechamento ? { fechamento: corpo.sugestaoDeFechamento } : {}),
      },
      ...(corpo.contextoHistorico ? { aprofundamentoOpcional: { contextoBiblico: corpo.contextoHistorico } } : {}),
      revisao: { horaDaRevisao: corpo.revisao, conclusao: corpo.conclusao },
    }),
  };
});

function criarTrimestre(classe: "adultos" | "jovens", licoes: TrimestreEBD["licoes"]): TrimestreEBD {
  const edicao = cabecalhos[classe];
  return {
    id: `${classe}-2026-4t`,
    slug: "2026-4t",
    ano: 2026,
    trimestre: 4,
    statusEditorial: statusTrimestres4T[classe],
    rotulo: "4º Trimestre de 2026",
    titulo: edicao.titulo,
    subtitulo: edicao.subtitulo,
    comentarista: edicao.comentarista,
    // Jovens: destacado na carta da editora (revista do professor, p. 4).
    // Adultos: a revista não destaca versículo; escolha editorial do usuário.
    versiculoBase: classe === "adultos" ? "Deuteronômio 7.9" : "Filipenses 4.4",
    descricao: classe === "adultos"
      ? "Treze lições sobre a aliança, a fidelidade de Deus e o chamado à obediência no Livro de Deuteronômio, lido à luz de Cristo."
      : "Treze lições sobre alegria, humildade, comunhão e perseverança na Carta aos Filipenses.",
    classe,
    imagem: getEbdQuarterCoverPath(classe, "2026-4t", "capa-professor.jpeg"),
    fontesEditoriais: [
      { titulo: "Revista do professor — CPAD, 4T/2026", conteudo: `Fonte dos títulos, datas, textos-chave e leituras. Comentarista: ${edicao.comentarista}.` },
      {
        titulo: "Livro de apoio",
        conteudo: `${classe === "adultos" ? "O Deus da Aliança, de Osiel Gomes" : "Regozijai-vos no Senhor, de Reynaldo Odilo"}. Citado por capítulo no aprofundamento das lições, a partir da L2, com citações diretas curtas; o restante é paráfrase.`,
      },
      { titulo: "Texto bíblico", conteudo: "Citações na Almeida Revista e Corrigida (ARC), a mesma tradução da revista. O leitor bíblico do site exibe a Almeida (JFA), que pode diferir na redação." },
      { titulo: "Subsídio de estudo", conteudo: "Objetivos, planejamento, desenvolvimento, aplicações e perguntas de revisão redigidos para o site a partir dos temas da revista. A partir da L2, o aprofundamento (contexto, sinopses, aprofundamento doutrinário e referências cruzadas) também se apoia no livro de apoio. Não constituem transcrição integral das publicações." },
    ],
    orientacaoUso: "Utilize a revista e a Bíblia na leitura dos textos. O subsídio organiza a preparação e a conversa em classe, sem substituir o estudo das fontes.",
    licoes,
  };
}

export const adultos2026QuartoTrimestre = criarTrimestre("adultos", licoesAdultos);
export const jovens2026QuartoTrimestre = criarTrimestre("jovens", licoesJovens);
