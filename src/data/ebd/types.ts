export type ClasseEBD = "adultos" | "jovens" | "infantil";

export type NumeroTrimestreEBD = 1 | 2 | 3 | 4;

export type ClasseEBDInfo = {
  slug: ClasseEBD;
  label: string;
  descricao: string;
  horarioLabel: string;
  ordem: number;
};

export type TopicoEBD = {
  titulo: string;
  conteudo: string[];
};

export type LicaoEBD = {
  id: string;
  slug: string;
  numero: number;
  data: string;
  titulo: string;
  resumo: string;
  textoChave?: string;
  verdadePratica?: string;
  leituraBiblica: string[];
  objetivos: string[];
  topicos: TopicoEBD[];
  aplicacao: string;
  apoioProfessor?: string[];
  apoioAluno?: string[];
};

export type TrimestreEBD = {
  id: string;
  slug: string;
  ano: number;
  trimestre: NumeroTrimestreEBD;
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
