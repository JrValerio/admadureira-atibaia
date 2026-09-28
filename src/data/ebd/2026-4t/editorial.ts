/** Conteúdo autoral de apoio; os cabeçalhos transcritos ficam em cabecalhos.json. */
export type CorpoEditorial4T = {
  numero: number;
  objetivos: string[];
  introducao: string;
  planejamento: string;
  desenvolvimento: { titulo: string; paragrafos: string[]; aplicacao: string }[];
  conclusao: string;
  revisao: string[];
  hinosSugeridos?: string[];
};
