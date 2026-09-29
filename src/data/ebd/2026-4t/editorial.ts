/**
 * Conteúdo autoral de apoio; os cabeçalhos transcritos ficam em cabecalhos.json.
 *
 * Os campos opcionais seguem a paridade de campos do 3T (sinopse, aprofundamento
 * doutrinário, aplicação e referências cruzadas por tópico). Regra de repetição,
 * verificada em ebd-editorial-4t2026.test.ts: um texto aparece no máximo em dois
 * campos renderizados (visão do aluno e subsídio do professor); esboço, tarefas
 * do aluno, fechamento e síntese têm texto próprio.
 */
export type TopicoEditorial4T = {
  titulo: string;
  /** Uma frase que resume o tópico; abre o tópico no aluno e no professor. */
  sinopse?: string;
  paragrafos: string[];
  aprofundamentoDoutrinario?: string[];
  aplicacao: string;
  referenciasCruzadas?: { referencia: string; descricao?: string }[];
  /** Linha própria do esboço de aula; sem ela, o tópico fica fora do esboço. */
  esboco?: string;
};

export type CorpoEditorial4T = {
  numero: number;
  objetivos: string[];
  introducao: string;
  planejamento: string;
  desenvolvimento: TopicoEditorial4T[];
  conclusao: string;
  revisao: string[];
  hinosSugeridos?: string[];
  ideiaCentral?: string;
  perguntaDeAbertura?: string;
  contextoHistorico?: string[];
  /** Tarefas da semana para o aluno, além da leitura e da memorização. */
  tarefasAluno?: string[];
  /** Condução da conversa em Jovens; texto diferente do planejamento. */
  conducaoDaConversa?: string[];
  /** Sugestão de fechamento ao professor; texto diferente da conclusão. */
  sugestaoDeFechamento?: string;
  /** Frase de síntese da revisão; texto diferente da conclusão. */
  fraseDeSintese?: string;
};
