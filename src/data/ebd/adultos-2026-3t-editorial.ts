import type {
  LeituraDiariaItem,
  ListaItem,
  ReferenciaCruzada,
  SubsidioAdultos,
  TopicoConteudo,
  TopicoEBD,
} from "./types";
import { normalizeBibleReferenceNotation } from "@/lib/bible-reference";

export type TopicoEditorialAdultos3T = {
  id: string;
  titulo: string;
  sinopse: string;
  explicacaoBiblica: string[];
  aprofundamentoDoutrinario: string[];
  aplicacaoPratica: string[];
  referenciasCruzadas: ReferenciaCruzada[];
};

export type RecursosDidaticosAdultos3T = {
  perguntaDeAbertura: string;
  ilustracao: string;
  dinamica: string;
  objeto?: string;
  gerenciamentoDoTempo: string[];
  duvidasProvaveis: string[];
  sugestaoDeFechamento: string;
};

export type ConfigEditorialAdultos3T = {
  numero: number;
  data: string;
  titulo: string;
  textoChave: string;
  textoAureo: string;
  verdadePratica: string;
  leituraBiblica: string[];
  leituraDiaria: LeituraDiariaItem[];
  hinosSugeridos: string[];
  resumo: string;
  ideiaCentral: string;
  palavraChave: { termo: string; definicao: string };
  objetivos: string[];
  introducao: string[];
  contextoHistorico: string[];
  contextoBiblico: string[];
  topicos: TopicoEditorialAdultos3T[];
  doutrinaPentecostal: string[];
  conexaoCristocentrica: string[];
  vidaCrista: {
    oQueConfronta: string[];
    oQueConsola: string[];
    oQueExige: string[];
    oQueRevelaSobreDeus: string[];
  };
  recursosDidaticos: RecursosDidaticosAdultos3T;
  errosDeInterpretacao: string[];
  curiosidadesBiblicas: ListaItem[];
  referenciasPorAssunto: ListaItem[];
  sinteseDoutrinaria: string[];
  conclusao: string[];
  revisao: {
    perguntas: string[];
    pontosChave: string[];
    fraseDeSintese: string;
  };
  bibliografiaComentada: ListaItem[];
};

export type EditorialAdultos3T = {
  numero: number;
  data: string;
  titulo: string;
  textoChave: string;
  verdadePratica: string;
  leituraBiblica: string[];
  resumo: string;
  objetivos: string[];
  topicos: TopicoEBD[];
  aplicacao: string;
  apoioProfessor: string[];
  apoioAluno: string[];
  esboco: ListaItem[];
  subsidioAdultos: SubsidioAdultos;
};

const trimestreAdultos3T =
  "A Igreja dos Gentios - Da Chamada Missionária à Consolidação do Evangelho entre os Povos";

function normalizarReferencias(referencias: string[]) {
  return referencias.map(normalizeBibleReferenceNotation);
}

function criarTopicoComplementar(
  id: string,
  titulo: string,
  conteudo: string[],
  tipo: "biblico" | "doutrinario" | "pratico" = "biblico",
): TopicoConteudo {
  const [sinopse, ...detalhes] = conteudo;

  return {
    id,
    titulo,
    sinopse,
    ...(tipo === "doutrinario"
      ? { aprofundamentoDoutrinario: detalhes }
      : tipo === "pratico"
        ? { aplicacaoPratica: detalhes }
        : { explicacaoBiblica: detalhes }),
  };
}

export function criarEditorialAdultos3T(
  config: ConfigEditorialAdultos3T,
): EditorialAdultos3T {
  const referenciasTematicas = config.referenciasPorAssunto.map(
    (item) => `${item.titulo}: ${item.conteudo}`,
  );
  const apoioProfessor = [
    config.recursosDidaticos.perguntaDeAbertura,
    `Ilustração sugerida: ${config.recursosDidaticos.ilustracao}`,
    `Dinâmica sugerida: ${config.recursosDidaticos.dinamica}`,
    ...(config.recursosDidaticos.objeto
      ? [`Objeto didático: ${config.recursosDidaticos.objeto}`]
      : []),
    ...config.recursosDidaticos.gerenciamentoDoTempo,
    ...config.recursosDidaticos.duvidasProvaveis,
    config.recursosDidaticos.sugestaoDeFechamento,
  ];

  const desenvolvimento: TopicoConteudo[] = [
    criarTopicoComplementar(
      `adultos-3t-licao-${config.numero}-introducao`,
      "Introdução expositiva",
      config.introducao,
    ),
    criarTopicoComplementar(
      `adultos-3t-licao-${config.numero}-contexto-biblico`,
      "Conexão com Atos",
      config.contextoBiblico,
    ),
    ...config.topicos,
    criarTopicoComplementar(
      `adultos-3t-licao-${config.numero}-doutrina-pentecostal`,
      "Doutrina pentecostal em destaque",
      config.doutrinaPentecostal,
      "doutrinario",
    ),
    criarTopicoComplementar(
      `adultos-3t-licao-${config.numero}-conexao-cristocentrica`,
      "Conexão cristocêntrica",
      config.conexaoCristocentrica,
      "doutrinario",
    ),
    criarTopicoComplementar(
      `adultos-3t-licao-${config.numero}-erros-interpretacao`,
      "Erros de interpretação a evitar",
      config.errosDeInterpretacao,
      "pratico",
    ),
    criarTopicoComplementar(
      `adultos-3t-licao-${config.numero}-referencias-tematicas`,
      "Referências cruzadas por assunto",
      referenciasTematicas,
    ),
    criarTopicoComplementar(
      `adultos-3t-licao-${config.numero}-sintese`,
      "Síntese doutrinária",
      config.sinteseDoutrinaria,
      "doutrinario",
    ),
    criarTopicoComplementar(
      `adultos-3t-licao-${config.numero}-conclusao`,
      "Conclusão pastoral",
      config.conclusao,
      "pratico",
    ),
  ];

  return {
    numero: config.numero,
    data: config.data,
    titulo: config.titulo,
    textoChave: normalizeBibleReferenceNotation(config.textoChave),
    verdadePratica: config.verdadePratica,
    leituraBiblica: normalizarReferencias(config.leituraBiblica),
    resumo: config.resumo,
    objetivos: config.objetivos,
    topicos: config.topicos.map((topico) => ({
      titulo: topico.titulo,
      conteudo: [
        topico.sinopse,
        ...topico.explicacaoBiblica,
        ...topico.aprofundamentoDoutrinario,
        ...topico.aplicacaoPratica,
      ],
    })),
    aplicacao: config.conclusao.join(" "),
    apoioProfessor,
    apoioAluno: [
      `Leia antecipadamente ${normalizarReferencias(config.leituraBiblica).join(", ")} e marque os movimentos principais do texto.`,
      `Memorize ou releia ${normalizeBibleReferenceNotation(config.textoChave)} durante a semana.`,
      `Responda pessoalmente à pergunta: ${config.recursosDidaticos.perguntaDeAbertura}`,
      ...config.vidaCrista.oQueExige,
      "Compartilhe com alguém uma verdade da lição e registre uma ação concreta de obediência.",
    ],
    esboco: [
      {
        titulo: "Abertura",
        conteudo: config.recursosDidaticos.perguntaDeAbertura,
      },
      { titulo: "Introdução", conteudo: config.introducao.join(" ") },
      ...config.topicos.map((topico) => ({
        titulo: topico.titulo,
        conteudo: topico.sinopse,
      })),
      {
        titulo: "Doutrina pentecostal",
        conteudo: config.doutrinaPentecostal.join(" "),
      },
      {
        titulo: "Conexão com Cristo",
        conteudo: config.conexaoCristocentrica.join(" "),
      },
      { titulo: "Conclusão", conteudo: config.conclusao.join(" ") },
    ],
    subsidioAdultos: {
      cabecalho: {
        numero: config.numero,
        titulo: config.titulo,
        data: config.data,
        trimestre: trimestreAdultos3T,
        comentarista: "Wagner Gaby",
        textoAureo: normalizeBibleReferenceNotation(config.textoAureo),
        verdadePratica: config.verdadePratica,
        leituraBiblicaEmClasse: normalizarReferencias(config.leituraBiblica),
        leituraDiaria: config.leituraDiaria.map((item) => ({
          ...item,
          referencia: normalizeBibleReferenceNotation(item.referencia),
        })),
        hinosSugeridos: config.hinosSugeridos,
      },
      visaoGeral: {
        resumo: config.resumo,
        ideiaCentral: config.ideiaCentral,
        objetivos: config.objetivos,
        palavraChave: config.palavraChave,
      },
      desenvolvimento,
      apoioProfessor: {
        perguntaDeAbertura: config.recursosDidaticos.perguntaDeAbertura,
        pontoSensivelDaAula:
          config.recursosDidaticos.duvidasProvaveis.join(" "),
        erroComumDeInterpretacao: config.errosDeInterpretacao.join(" "),
        perguntasParaDebate: config.revisao.perguntas.slice(0, 5),
        sugestaoDeFechamento: config.recursosDidaticos.sugestaoDeFechamento,
      },
      aprofundamento: {
        contextoHistorico: config.contextoHistorico,
        notaDeVocabulario: config.curiosidadesBiblicas,
        leituraComplementar: config.bibliografiaComentada,
      },
      vidaCrista: config.vidaCrista,
      revisao: config.revisao,
    },
  };
}

export function contarPalavrasEditorialAdultos3T(
  editorial: EditorialAdultos3T,
) {
  return contarPalavrasEmConteudo(editorial.subsidioAdultos);
}

function coletarTextos(valor: unknown): string[] {
  if (typeof valor === "string") return [valor];
  if (Array.isArray(valor)) return valor.flatMap(coletarTextos);
  if (valor && typeof valor === "object") {
    return Object.values(valor).flatMap(coletarTextos);
  }
  return [];
}

function contarPalavrasEmConteudo(valor: unknown) {
  const texto = coletarTextos(valor).join(" ");

  return texto.trim().split(/\s+/).filter(Boolean).length;
}
