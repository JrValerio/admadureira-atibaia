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

const textoObrigatorio = z.string().min(1);
const arrayTexto = z.array(textoObrigatorio);

export const listaItemSchema = z.object({
  titulo: textoObrigatorio.optional(),
  conteudo: textoObrigatorio,
});

export type ListaItem = z.infer<typeof listaItemSchema>;

export const referenciaCruzadaSchema = z.object({
  referencia: textoObrigatorio,
  descricao: textoObrigatorio.optional(),
});

export type ReferenciaCruzada = z.infer<typeof referenciaCruzadaSchema>;

export const leituraDiariaItemSchema = z.object({
  dia: textoObrigatorio,
  referencia: textoObrigatorio,
  tema: textoObrigatorio.optional(),
});

export type LeituraDiariaItem = z.infer<typeof leituraDiariaItemSchema>;

export const leituraSemanalItemSchema = z.object({
  dia: textoObrigatorio,
  referencia: textoObrigatorio,
  foco: textoObrigatorio.optional(),
});

export type LeituraSemanalItem = z.infer<typeof leituraSemanalItemSchema>;

export const topicoConteudoSchema = z.object({
  id: textoObrigatorio,
  titulo: textoObrigatorio,
  sinopse: textoObrigatorio.optional(),
  explicacaoBiblica: arrayTexto.optional(),
  aprofundamentoDoutrinario: arrayTexto.optional(),
  aplicacaoPratica: arrayTexto.optional(),
  referenciasCruzadas: z.array(referenciaCruzadaSchema).optional(),
});

export type TopicoConteudo = z.infer<typeof topicoConteudoSchema>;

export const subsidioAdultosSchema = z.object({
  cabecalho: z.object({
    numero: z.number().int().positive(),
    titulo: textoObrigatorio,
    data: textoObrigatorio,
    trimestre: textoObrigatorio,
    comentarista: textoObrigatorio.optional(),
    textoAureo: textoObrigatorio.optional(),
    verdadePratica: textoObrigatorio.optional(),
    leituraBiblicaEmClasse: arrayTexto.optional(),
    leituraDiaria: z.array(leituraDiariaItemSchema).optional(),
    hinosSugeridos: arrayTexto.optional(),
  }),
  visaoGeral: z.object({
    resumo: textoObrigatorio,
    ideiaCentral: textoObrigatorio.optional(),
    objetivos: arrayTexto.optional(),
    palavraChave: z
      .object({
        termo: textoObrigatorio,
        definicao: textoObrigatorio.optional(),
      })
      .optional(),
  }),
  desenvolvimento: z.array(topicoConteudoSchema),
  apoioProfessor: z.object({
    perguntaDeAbertura: textoObrigatorio.optional(),
    pontoSensivelDaAula: textoObrigatorio.optional(),
    erroComumDeInterpretacao: textoObrigatorio.optional(),
    perguntasParaDebate: arrayTexto.optional(),
    sugestaoDeFechamento: textoObrigatorio.optional(),
  }),
  aprofundamento: z
    .object({
      contextoHistorico: arrayTexto.optional(),
      conceitoTeologico: arrayTexto.optional(),
      notaDeVocabulario: z.array(listaItemSchema).optional(),
      leituraComplementar: z.array(listaItemSchema).optional(),
    })
    .optional(),
  vidaCrista: z
    .object({
      oQueConfronta: arrayTexto.optional(),
      oQueConsola: arrayTexto.optional(),
      oQueExige: arrayTexto.optional(),
      oQueRevelaSobreDeus: arrayTexto.optional(),
    })
    .optional(),
  revisao: z
    .object({
      perguntas: arrayTexto.optional(),
      pontosChave: arrayTexto.optional(),
      fraseDeSintese: textoObrigatorio.optional(),
    })
    .optional(),
});

export type SubsidioAdultos = z.infer<typeof subsidioAdultosSchema>;

export const topicoJovensSchema = topicoConteudoSchema.extend({
  pense: textoObrigatorio.optional(),
  pontoImportante: textoObrigatorio.optional(),
});

export type TopicoJovens = z.infer<typeof topicoJovensSchema>;

export const subsidioJovensSchema = z.object({
  cabecalho: z.object({
    numero: z.number().int().positive(),
    titulo: textoObrigatorio,
    data: textoObrigatorio,
    trimestre: textoObrigatorio,
    textoPrincipal: textoObrigatorio.optional(),
    resumoDaLicao: textoObrigatorio.optional(),
    leituraSemanal: z.array(leituraSemanalItemSchema).optional(),
  }),
  arranquePedagogico: z.object({
    objetivos: arrayTexto.optional(),
    interacao: textoObrigatorio.optional(),
    orientacaoPedagogica: textoObrigatorio.optional(),
  }),
  desenvolvimento: z.array(topicoJovensSchema),
  apoioProfessor: z.object({
    quebraGelo: textoObrigatorio.optional(),
    perguntaChave: textoObrigatorio.optional(),
    dificuldadeProvavelDaClasse: textoObrigatorio.optional(),
    conducaoDaConversa: arrayTexto.optional(),
    fechamento: textoObrigatorio.optional(),
  }),
  aprofundamentoOpcional: z
    .object({
      notaDoutrinariaCurta: arrayTexto.optional(),
      contextoBiblico: arrayTexto.optional(),
      conexaoComVidaCrista: arrayTexto.optional(),
    })
    .optional(),
  revisao: z
    .object({
      horaDaRevisao: arrayTexto.optional(),
      quizCurto: arrayTexto.optional(),
      conclusao: textoObrigatorio.optional(),
    })
    .optional(),
});

export type SubsidioJovens = z.infer<typeof subsidioJovensSchema>;

export type TopicoEBD = {
  titulo: string;
  conteudo: string[];
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

function formatZodIssues(error: z.ZodError) {
  return error.issues
    .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
}

export function validateSubsidioAdultos(
  licaoId: string,
  subsidio: unknown
): SubsidioAdultos {
  const result = subsidioAdultosSchema.safeParse(subsidio);

  if (!result.success) {
    throw new Error(
      `subsidioAdultos inválido em "${licaoId}":\n${formatZodIssues(
        result.error
      )}`
    );
  }

  return result.data;
}

export function validateSubsidioJovens(
  licaoId: string,
  subsidio: unknown
): SubsidioJovens {
  const result = subsidioJovensSchema.safeParse(subsidio);

  if (!result.success) {
    throw new Error(
      `subsidioJovens inválido em "${licaoId}":\n${formatZodIssues(
        result.error
      )}`
    );
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
  percurso?: ListaItem[];
  fontesEditoriais?: ListaItem[];
  orientacaoUso?: string;
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
