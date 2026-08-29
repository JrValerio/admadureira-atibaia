import { programacaoSemanal, type ItemSemanal } from "@/data/agenda";
import { BANNERS_PROGRAMACAO } from "@/data/programacao-banners";
import { SEDE_PROGRAMACAO_HORARIOS } from "@/data/site";
import { getSaoPauloDate } from "@/lib/date-utils";
import { isFirstMondayWeek } from "@/lib/programacao-recorrencia";

const reuniaoMinisterialSemanal: ItemSemanal = {
  dia: "Segunda-feira",
  titulo: "Reunião Ministerial",
  horario: SEDE_PROGRAMACAO_HORARIOS.cursoTeologia,
  banner: BANNERS_PROGRAMACAO.reuniaoMinisterio,
  descricao:
    "Encontro mensal de alinhamento, comunhão e oração com a liderança ministerial da igreja.",
  convite:
    "Lideranças e membros do ministério são convidados a participar deste tempo de direção e fortalecimento para o serviço cristão.",
};

export function getProgramacaoSemanalAtual(referencia = new Date()) {
  const dataReferencia = getSaoPauloDate(referencia);

  if (!isFirstMondayWeek(dataReferencia)) {
    return programacaoSemanal;
  }

  // A Reunião Ministerial não depende do Curso de Teologia (suspenso em
  // 29/08/2026, removido de `programacaoSemanal`) — ela entra na posição de
  // segunda-feira só na semana da primeira segunda do mês, mantendo a ordem
  // cronológica do restante da lista (logo antes de Terça-feira).
  const indiceTercaFeira = programacaoSemanal.findIndex(
    (item) => item.dia === "Terça-feira"
  );
  const posicaoInsercao =
    indiceTercaFeira === -1 ? programacaoSemanal.length : indiceTercaFeira;

  return [
    ...programacaoSemanal.slice(0, posicaoInsercao),
    reuniaoMinisterialSemanal,
    ...programacaoSemanal.slice(posicaoInsercao),
  ];
}
