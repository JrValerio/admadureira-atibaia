import { z } from "zod";

export const EBD_PUBLICOS = ["adultos", "jovens", "infantil"] as const;

export const ebdPublicoSchema = z.enum(EBD_PUBLICOS);

export type ClasseEBD = (typeof EBD_PUBLICOS)[number];
export type EbdPublico = ClasseEBD;

export type NumeroTrimestreEBD = 1 | 2 | 3 | 4;
export type StatusEditorialEBD = "draft" | "partial" | "published";
export type StatusLicaoEBD = "draft" | "published";

export type ItemChecklistProntidaoEditorialEBD = {
  key: string;
  label: string;
  concluido: boolean;
};

export type DiagnosticoProntidaoEditorialLicaoEBD = {
  pronta: boolean;
  checklist: ItemChecklistProntidaoEditorialEBD[];
  pendencias: string[];
};

export type ClasseEBDInfo = {
  slug: ClasseEBD;
  label: string;
  descricao: string;
  horarioLabel: string;
  textoBaseLabel: string;
  resumoDestaqueLabel: string;
  leituraPrincipalLabel: string;
  publicadaNoSite: boolean;
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

export const VERSOES_BIBLICAS = ["ARC", "ACF", "ARA", "NAA", "NTLH"] as const;

export const referenciaBiblicaSchema = z.object({
  referencia: z.string().min(1),
  texto: z.string().min(1),
  versao: z.enum(VERSOES_BIBLICAS).optional(),
});

export type ReferenciaBiblica = z.infer<typeof referenciaBiblicaSchema>;

const arrayTextoObrigatorio = z.array(z.string().min(1)).min(1);

export const notaExegeticaSchema = z.object({
  referencia: z.string().min(1),
  observacao: z.string().min(1),
  termoOriginal: z
    .object({
      termo: z.string().min(1),
      idioma: z.enum(["hebraico", "grego"]),
      transliteracao: z.string().min(1).optional(),
      significado: z.string().min(1),
    })
    .optional(),
});

export type NotaExegetica = z.infer<typeof notaExegeticaSchema>;

export const personagemBiblicoSchema = z.object({
  nome: z.string().min(1),
  descricao: z.string().min(1),
  papelNaLicao: z.string().min(1),
});

export type PersonagemBiblico = z.infer<typeof personagemBiblicoSchema>;

export const conexaoBiblicaSchema = z.object({
  referencia: z.string().min(1),
  conexao: z.string().min(1),
});

export type ConexaoBiblica = z.infer<typeof conexaoBiblicaSchema>;

export const dificuldadeInterpretativaSchema = z.object({
  questao: z.string().min(1),
  orientacao: z.string().min(1),
});

export type DificuldadeInterpretativa = z.infer<
  typeof dificuldadeInterpretativaSchema
>;

export const fonteSubsidioSchema = z.object({
  tipo: z.enum(["revista", "livro-apoio", "biblia-estudo", "biblia", "outro"]),
  titulo: z.string().min(1),
  autor: z.string().min(1).optional(),
  pagina: z.string().min(1).optional(),
  observacao: z.string().min(1).optional(),
});

export type FonteSubsidio = z.infer<typeof fonteSubsidioSchema>;

export const aplicacoesPorEsferaSchema = z.object({
  pessoal: arrayTextoObrigatorio.optional(),
  familia: arrayTextoObrigatorio.optional(),
  igreja: arrayTextoObrigatorio.optional(),
  sociedade: arrayTextoObrigatorio.optional(),
});

export type AplicacoesPorEsfera = z.infer<
  typeof aplicacoesPorEsferaSchema
>;

export const recursosProfessorSchema = z.object({
  perguntasAprofundamento: arrayTextoObrigatorio.optional(),
  ilustracoes: arrayTextoObrigatorio.optional(),
  dinamicas: arrayTextoObrigatorio.optional(),
  alertasPastorais: arrayTextoObrigatorio.optional(),
});

export type RecursosProfessor = z.infer<typeof recursosProfessorSchema>;

export const subsidioExpandidoSchema = z.object({
  titulo: z.string().min(1).optional(),
  chaveDaLicao: z.string().min(1).optional(),
  contextoHistorico: arrayTextoObrigatorio.optional(),
  contextoLiterario: arrayTextoObrigatorio.optional(),
  contextoTeologico: arrayTextoObrigatorio.optional(),
  notasExegeticas: z.array(notaExegeticaSchema).min(1).optional(),
  personagens: z.array(personagemBiblicoSchema).min(1).optional(),
  conexoesBiblicas: z.array(conexaoBiblicaSchema).min(1).optional(),
  dificuldadesInterpretativas: z
    .array(dificuldadeInterpretativaSchema)
    .min(1)
    .optional(),
  eixoCristocentrico: arrayTextoObrigatorio.optional(),
  aplicacoesPorEsfera: aplicacoesPorEsferaSchema.optional(),
  recursosProfessor: recursosProfessorSchema.optional(),
  referencias: z.array(fonteSubsidioSchema).min(1).optional(),
});

export type SubsidioExpandido = z.infer<typeof subsidioExpandidoSchema>;

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
    hinosSugeridos?: string[];
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

type LicaoEBDBase = {
  id: string;
  publico: EbdPublico;
  slug: string;
  numero: number;
  data: string;
  dataLiberacaoPublica?: string;
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
  subsidioExpandido?: SubsidioExpandido;
  subsidioAdultos?: SubsidioAdultos;
  subsidioJovens?: SubsidioJovens;
};

export type LicaoEBDAdultos = LicaoEBDBase & {
  publico: "adultos";
  subsidioAdultos?: SubsidioAdultos;
  subsidioJovens?: never;
};

export type LicaoEBDJovens = LicaoEBDBase & {
  publico: "jovens";
  subsidioAdultos?: never;
  subsidioJovens?: SubsidioJovens;
};

export type LicaoEBDInfantil = LicaoEBDBase & {
  publico: "infantil";
  subsidioAdultos?: never;
  subsidioJovens?: never;
};

export type LicaoEBD =
  | LicaoEBDAdultos
  | LicaoEBDJovens
  | LicaoEBDInfantil;

export function isLicaoEBDAdultos(
  licao: LicaoEBD
): licao is LicaoEBDAdultos {
  return licao.publico === "adultos";
}

export function isLicaoEBDJovens(
  licao: LicaoEBD
): licao is LicaoEBDJovens {
  return licao.publico === "jovens";
}

export function isLicaoEBDInfantil(
  licao: LicaoEBD
): licao is LicaoEBDInfantil {
  return licao.publico === "infantil";
}

export function validateSubsidioExpandido(
  licaoId: string,
  subsidio: unknown
): SubsidioExpandido {
  const result = subsidioExpandidoSchema.safeParse(subsidio);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(`subsidioExpandido inválido em "${licaoId}":\n${issues}`);
  }

  return result.data;
}

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

export type LicaoTopoEditorial = {
  numero: number;
  data: string;
  titulo: string;
  trimestre: string;
  classe: string;
  classeSlug: ClasseEBD;
};

export type LicaoEstruturaAdultos = {
  tipo: "adultos";
  topo: LicaoTopoEditorial;
  resumo: string;
  aplicacao: string;
  textoAureo?: string;
  verdadePratica?: string;
  leituraBiblicaEmClasse: string[];
  leituraDiaria: LeituraDiariaItem[];
  hinosSugeridos: string[];
  objetivos: string[];
  apoioProfessor: string[];
  apoioAluno: string[];
  esboco: ListaItem[];
};

export type LicaoEstruturaJovens = {
  tipo: "jovens";
  topo: LicaoTopoEditorial;
  resumo: string;
  aplicacao: string;
  textoPrincipal?: string;
  resumoDaLicao?: string;
  textoBiblico: string[];
  leituraSemanal: LeituraSemanalItem[];
  objetivos: string[];
  interacao?: string;
  orientacaoPedagogica?: string;
  horaDaRevisao: string[];
  apoioProfessor: string[];
  apoioAluno: string[];
  esboco: ListaItem[];
};

export type LicaoEstruturaPorClasse =
  | LicaoEstruturaAdultos
  | LicaoEstruturaJovens;
