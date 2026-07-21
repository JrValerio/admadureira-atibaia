import type {
  LeituraSemanalItem,
  ListaItem,
  ReferenciaCruzada,
  SubsidioJovens,
  TopicoConteudo,
  TopicoEBD,
} from "./types";

export type TopicoEditorialJovens3T = {
  id: string;
  titulo: string;
  sinopse: string;
  explicacaoBiblica: string[];
  aprofundamentoDoutrinario: string[];
  aplicacaoPratica: string[];
  referenciasCruzadas: ReferenciaCruzada[];
  pense: string;
  pontoImportante: string;
};

export type RecursosDidaticosJovens3T = {
  quebraGelo: string;
  perguntaChave: string;
  dinamica: string;
  objeto?: string;
  gerenciamentoDoTempo: string[];
  dificuldadeProvavelDaClasse: string;
  conducaoDaConversa: string[];
  fechamento: string;
};

export type ConfigEditorialJovens3T = {
  numero: number;
  data: string;
  titulo: string;
  referenciaTextoPrincipal: string;
  textoPrincipal: string;
  resumoDaLicao: string;
  leituraSemanal: LeituraSemanalItem[];
  textoBiblico: string[];
  objetivos: string[];
  interacao: string;
  orientacaoPedagogica: string;
  panorama: string[];
  introducao: string[];
  contextoHistorico: string[];
  contextoBiblico: string[];
  topicos: TopicoEditorialJovens3T[];
  doutrinaPentecostal: string[];
  conexaoCristocentrica: string[];
  vidaCrista: {
    oQueConfronta: string[];
    oQueConsola: string[];
    oQueExige: string[];
    oQueRevelaSobreDeus: string[];
  };
  recursosDidaticos: RecursosDidaticosJovens3T;
  errosDeInterpretacao: string[];
  curiosidadesBiblicas: ListaItem[];
  referenciasPorAssunto: ListaItem[];
  sinteseDoutrinaria: string[];
  conclusao: string[];
  revisao: {
    perguntas: string[];
    quiz: string[];
    pontosChave: string[];
    fraseDeSintese: string;
  };
  bibliografiaComentada: ListaItem[];
};

export type EditorialJovens3T = {
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
  subsidioJovens: SubsidioJovens;
};

const trimestreJovens3T =
  "Fidelidade às Escrituras em Oposição à Apostasia — Lições Espirituais no Livro de Juízes";

function normalizarReferencias(referencias: string[]) {
  return [...referencias];
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

function formatarItens(itens: ListaItem[]) {
  return itens.map((item) =>
    item.titulo ? `${item.titulo}: ${item.conteudo}` : item.conteudo,
  );
}

export function criarEditorialJovens3T(
  config: ConfigEditorialJovens3T,
): EditorialJovens3T {
  const referenciasTematicas = formatarItens(config.referenciasPorAssunto);
  const leiturasComplementares = formatarItens(config.bibliografiaComentada);

  const desenvolvimento: SubsidioJovens["desenvolvimento"] = [
    criarTopicoComplementar(
      `jovens-3t-licao-${config.numero}-resumo`,
      "Resumo em um minuto",
      config.panorama,
    ),
    criarTopicoComplementar(
      `jovens-3t-licao-${config.numero}-introducao`,
      "Introdução expositiva",
      config.introducao,
    ),
    criarTopicoComplementar(
      `jovens-3t-licao-${config.numero}-contexto-historico`,
      "Contexto histórico",
      config.contextoHistorico,
    ),
    criarTopicoComplementar(
      `jovens-3t-licao-${config.numero}-conexao-juizes`,
      "Conexão com Juízes",
      config.contextoBiblico,
    ),
    ...config.topicos,
    criarTopicoComplementar(
      `jovens-3t-licao-${config.numero}-doutrina-pentecostal`,
      "Doutrina pentecostal em destaque",
      config.doutrinaPentecostal,
      "doutrinario",
    ),
    criarTopicoComplementar(
      `jovens-3t-licao-${config.numero}-conexao-cristo`,
      "Conexão com Cristo",
      config.conexaoCristocentrica,
      "doutrinario",
    ),
    criarTopicoComplementar(
      `jovens-3t-licao-${config.numero}-erros-interpretacao`,
      "Erros de interpretação a evitar",
      config.errosDeInterpretacao,
      "pratico",
    ),
    criarTopicoComplementar(
      `jovens-3t-licao-${config.numero}-curiosidades`,
      "Curiosidades bíblicas",
      formatarItens(config.curiosidadesBiblicas),
    ),
    criarTopicoComplementar(
      `jovens-3t-licao-${config.numero}-referencias`,
      "Referências cruzadas por assunto",
      referenciasTematicas,
    ),
    criarTopicoComplementar(
      `jovens-3t-licao-${config.numero}-sintese`,
      "Síntese doutrinária",
      config.sinteseDoutrinaria,
      "doutrinario",
    ),
    criarTopicoComplementar(
      `jovens-3t-licao-${config.numero}-aprofundar`,
      "Para aprofundar",
      leiturasComplementares,
    ),
    criarTopicoComplementar(
      `jovens-3t-licao-${config.numero}-conclusao`,
      "Conclusão pastoral",
      config.conclusao,
      "pratico",
    ),
  ];

  const conclusaoRevisao = [
    `Pontos-chave: ${config.revisao.pontosChave.join(" ")}`,
    `Frase de síntese: ${config.revisao.fraseDeSintese}`,
  ].join(" ");

  return {
    numero: config.numero,
    data: config.data,
    titulo: config.titulo,
    textoChave: config.referenciaTextoPrincipal,
    verdadePratica: config.resumoDaLicao,
    leituraBiblica: normalizarReferencias(config.textoBiblico),
    resumo: config.resumoDaLicao,
    objetivos: config.objetivos,
    topicos: config.topicos.map((topico) => ({
      titulo: topico.titulo,
      // A visão geral da página apresenta apenas a sinopse. O comentário
      // completo permanece no subsídio, evitando renderizar os mesmos
      // parágrafos extensos duas vezes para o leitor.
      conteudo: [topico.sinopse],
    })),
    aplicacao: `À luz de ${config.referenciaTextoPrincipal}, responda à pergunta-chave da lição: ${config.recursosDidaticos.perguntaChave} Registre uma decisão concreta e compartilhe-a com alguém maduro que possa acompanhar sua prática.`,
    apoioProfessor: [
      `Prepare a Lição ${config.numero} lendo antecipadamente ${normalizarReferencias(config.textoBiblico).join(", ")}.`,
      `Use o esboço cronometrado de 40–50 minutos e conduza a conversa a partir desta pergunta: ${config.recursosDidaticos.perguntaChave}`,
      "Consulte o roteiro do professor para a exposição completa, as cautelas interpretativas, a aplicação e a revisão.",
    ],
    apoioAluno: [
      `Leia antecipadamente ${normalizarReferencias(config.textoBiblico).join(", ")} e anote o movimento principal da narrativa.`,
      `Releia ${config.referenciaTextoPrincipal} e explique com suas palavras como o versículo se liga ao tema.`,
      `Responda pessoalmente: ${config.recursosDidaticos.perguntaChave}`,
      "Compartilhe uma verdade da lição com alguém e registre uma decisão concreta de fidelidade para a semana.",
    ],
    esboco: [
      {
        titulo: "Abertura — 5 minutos",
        conteudo: config.recursosDidaticos.quebraGelo,
      },
      {
        titulo: "Panorama e contexto — 7 minutos",
        conteudo: `Situe “${config.titulo}” no fluxo narrativo de Juízes e apresente o problema bíblico que orientará a aula.`,
      },
      ...config.topicos.map((topico, index) => ({
        titulo: `${index + 1}. ${topico.titulo} — 8 minutos`,
        conteudo: topico.sinopse,
      })),
      {
        titulo: "Doutrina e conexão com Cristo — 7 minutos",
        conteudo:
          "Retome a doutrina pentecostal relacionada ao texto e mostre como a lição encontra seu centro e cumprimento em Cristo.",
      },
      {
        titulo: "Revisão, aplicação e oração — 5 minutos",
        conteudo: `${config.revisao.fraseDeSintese} ${config.recursosDidaticos.fechamento}`,
      },
    ],
    subsidioJovens: {
      cabecalho: {
        numero: config.numero,
        titulo: config.titulo,
        data: config.data,
        trimestre: trimestreJovens3T,
        textoPrincipal: config.textoPrincipal,
        resumoDaLicao: config.resumoDaLicao,
        leituraSemanal: config.leituraSemanal.map((item) => ({
          ...item,
          referencia: item.referencia,
        })),
      },
      arranquePedagogico: {
        objetivos: config.objetivos,
        interacao: config.interacao,
        orientacaoPedagogica: config.orientacaoPedagogica,
      },
      desenvolvimento,
      apoioProfessor: {
        quebraGelo: config.recursosDidaticos.quebraGelo,
        perguntaChave: config.recursosDidaticos.perguntaChave,
        dificuldadeProvavelDaClasse:
          config.recursosDidaticos.dificuldadeProvavelDaClasse,
        conducaoDaConversa: [
          `Dinâmica sugerida: ${config.recursosDidaticos.dinamica}`,
          ...(config.recursosDidaticos.objeto
            ? [`Objeto didático: ${config.recursosDidaticos.objeto}`]
            : []),
          ...config.recursosDidaticos.gerenciamentoDoTempo,
          ...config.recursosDidaticos.conducaoDaConversa,
        ],
        fechamento: config.recursosDidaticos.fechamento,
      },
      aprofundamentoOpcional: {
        conexaoComVidaCrista: [
          "O que confronta:",
          ...config.vidaCrista.oQueConfronta,
          "O que consola:",
          ...config.vidaCrista.oQueConsola,
          "O que exige:",
          ...config.vidaCrista.oQueExige,
          "O que revela sobre Deus:",
          ...config.vidaCrista.oQueRevelaSobreDeus,
        ],
      },
      revisao: {
        horaDaRevisao: config.revisao.perguntas,
        quizCurto: config.revisao.quiz,
        conclusao: conclusaoRevisao,
      },
    },
  };
}

export function contarPalavrasEditorialJovens3T(editorial: EditorialJovens3T) {
  return contarPalavrasEmConteudo(editorial.subsidioJovens);
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
