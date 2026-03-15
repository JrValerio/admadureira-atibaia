export type ClasseEBD = "adultos" | "jovens" | "infantil";

export type NumeroTrimestreEBD = 1 | 2 | 3 | 4;
export type StatusEditorialEBD = "draft" | "partial" | "published";
export type StatusLicaoEBD = "draft" | "published";

export type ClasseEBDInfo = {
  slug: ClasseEBD;
  label: string;
  descricao: string;
  horarioLabel: string;
  ordem: number;
};

export type ListaItem = {
  titulo?: string;
  conteudo: string;
};

export type ReferenciaCruzada = {
  referencia: string;
  descricao?: string;
};

export type LeituraDiariaItem = {
  dia: string;
  referencia: string;
  tema?: string;
};

export type LeituraSemanalItem = {
  dia: string;
  referencia: string;
  foco?: string;
};

export type TopicoEBD = {
  titulo: string;
  conteudo: string[];
};

export type TopicoConteudo = {
  id: string;
  titulo: string;
  sinopse?: string;
  explicacaoBiblica?: string[];
  aprofundamentoDoutrinario?: string[];
  aplicacaoPratica?: string[];
  referenciasCruzadas?: ReferenciaCruzada[];
};

export type SubsidioAdultos = {
  cabecalho: {
    numero: number;
    titulo: string;
    data: string;
    trimestre: string;
    comentarista?: string;
    textoAureo?: string;
    verdadePratica?: string;
    leituraBiblicaEmClasse?: string[];
    leituraDiaria?: LeituraDiariaItem[];
  };
  visaoGeral: {
    resumo: string;
    ideiaCentral?: string;
    objetivos?: string[];
    palavraChave?: {
      termo: string;
      definicao?: string;
    };
  };
  desenvolvimento: TopicoConteudo[];
  apoioProfessor: {
    perguntaDeAbertura?: string;
    pontoSensivelDaAula?: string;
    erroComumDeInterpretacao?: string;
    perguntasParaDebate?: string[];
    sugestaoDeFechamento?: string;
  };
  aprofundamento?: {
    contextoHistorico?: string[];
    conceitoTeologico?: string[];
    notaDeVocabulario?: ListaItem[];
    leituraComplementar?: ListaItem[];
  };
  vidaCrista?: {
    oQueConfronta?: string[];
    oQueConsola?: string[];
    oQueExige?: string[];
    oQueRevelaSobreDeus?: string[];
  };
  revisao?: {
    perguntas?: string[];
    pontosChave?: string[];
    fraseDeSintese?: string;
  };
};

export type TopicoJovens = TopicoConteudo & {
  pense?: string;
  pontoImportante?: string;
};

export type SubsidioJovens = {
  cabecalho: {
    numero: number;
    titulo: string;
    data: string;
    trimestre: string;
    textoPrincipal?: string;
    resumoDaLicao?: string;
    leituraSemanal?: LeituraSemanalItem[];
  };
  arranquePedagogico: {
    objetivos?: string[];
    interacao?: string;
    orientacaoPedagogica?: string;
  };
  desenvolvimento: TopicoJovens[];
  apoioProfessor: {
    quebraGelo?: string;
    perguntaChave?: string;
    dificuldadeProvavelDaClasse?: string;
    conducaoDaConversa?: string[];
    fechamento?: string;
  };
  aprofundamentoOpcional?: {
    notaDoutrinariaCurta?: string[];
    contextoBiblico?: string[];
    conexaoComVidaCrista?: string[];
  };
  revisao?: {
    horaDaRevisao?: string[];
    quizCurto?: string[];
    conclusao?: string;
  };
};

export type LicaoEBD = {
  id: string;
  slug: string;
  numero: number;
  data: string;
  statusEditorial?: StatusLicaoEBD;
  titulo: string;
  resumo: string;
  imagem?: string;
  textoChave?: string;
  verdadePratica?: string;
  leituraBiblica: string[];
  objetivos: string[];
  topicos: TopicoEBD[];
  aplicacao: string;
  apoioProfessor?: string[];
  apoioAluno?: string[];
  esboco?: ListaItem[];
  subsidioAdultos?: SubsidioAdultos;
  subsidioJovens?: SubsidioJovens;
};

export type TrimestreEBD = {
  id: string;
  slug: string;
  ano: number;
  trimestre: NumeroTrimestreEBD;
  statusEditorial?: StatusEditorialEBD;
  rotulo: string;
  titulo: string;
  subtitulo?: string;
  descricao: string;
  comentarista?: string;
  classe: ClasseEBD;
  imagem: string;
  versiculoBase?: string;
  licoes: LicaoEBD[];
};

export type LicaoEBDComContexto = {
  classe: ClasseEBDInfo;
  trimestre: TrimestreEBD;
  licao: LicaoEBD;
};
