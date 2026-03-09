import { agenda2026 } from "@/data/agenda";

const mesParaNumero: Record<string, number> = {
  Janeiro: 1, Fevereiro: 2, Março: 3, Abril: 4,
  Maio: 5, Junho: 6, Julho: 7, Agosto: 8,
  Setembro: 9, Outubro: 10, Novembro: 11, Dezembro: 12,
};

export interface EventoFuturo {
  mes: string;
  ano: number;
  data: string;
  titulo: string;
  horario?: string;
  banner?: string;
  destaque?: boolean;
}

/** Extrai o primeiro dia numérico de strings como "02/03", "09,16/03", "29–30/05" */
function primeiroDia(data: string): number {
  const m = data.match(/\d+/);
  return m ? parseInt(m[0]) : 1;
}

/** Retorna os próximos N eventos do agenda2026 a partir de hoje */
export function getProximosEventos(limite = 4): EventoFuturo[] {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return agenda2026
    .flatMap((bloco) =>
      bloco.eventos.map((ev) => {
        const mesNum = bloco.mesNumero ?? mesParaNumero[bloco.mes] ?? 1;
        const ordem = new Date(bloco.ano, mesNum - 1, primeiroDia(ev.data));
        return { ev, bloco, ordem };
      })
    )
    .filter(({ ordem }) => ordem >= hoje)
    .sort((a, b) => a.ordem.getTime() - b.ordem.getTime())
    .slice(0, limite)
    .map(({ ev, bloco }) => ({
      ...ev,
      mes: bloco.mes,
      ano: bloco.ano,
    }));
}
