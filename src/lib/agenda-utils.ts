import { agenda2026, type Evento } from "@/data/agenda";

const mesParaNumero: Record<string, number> = {
  Janeiro: 1,
  Fevereiro: 2,
  Março: 3,
  Abril: 4,
  Maio: 5,
  Junho: 6,
  Julho: 7,
  Agosto: 8,
  Setembro: 9,
  Outubro: 10,
  Novembro: 11,
  Dezembro: 12,
};

export interface EventoFuturo extends Evento {
  mes: string;
  ano: number;
}

function primeiroDia(data: string): number {
  const match = data.match(/\d+/);
  return match ? parseInt(match[0], 10) : 1;
}

function extrairHorario(horario?: string) {
  let hora = 0;
  let minuto = 0;

  if (horario) {
    const match = horario.match(/(\d+)h(\d+)?/);
    if (match) {
      hora = parseInt(match[1], 10);
      minuto = match[2] ? parseInt(match[2], 10) : 0;
    }
  }

  return { hora, minuto };
}

function expandirAgenda() {
  return agenda2026
    .flatMap((bloco) =>
      bloco.eventos.map((evento) => {
        const mesNumero = bloco.mesNumero ?? mesParaNumero[bloco.mes] ?? 1;
        const { hora, minuto } = extrairHorario(evento.horario);
        const dataEvento = new Date(
          bloco.ano,
          mesNumero - 1,
          primeiroDia(evento.data),
          hora,
          minuto
        );

        return {
          evento: {
            ...evento,
            mes: bloco.mes,
            ano: bloco.ano,
          } satisfies EventoFuturo,
          dataEvento,
        };
      })
    )
    .sort((a, b) => a.dataEvento.getTime() - b.dataEvento.getTime());
}

export function getEventoBySlug(slug: string) {
  return expandirAgenda().find((item) => item.evento.slug === slug)?.evento ?? null;
}

export function getEventosAgenda() {
  return expandirAgenda().map((item) => item.evento);
}

export function getEventosFuturos(limite?: number) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const futuros = expandirAgenda()
    .filter((item) => item.dataEvento >= hoje)
    .map((item) => item.evento);

  return typeof limite === "number" ? futuros.slice(0, limite) : futuros;
}

export function getProximoEventoComData(): {
  evento: EventoFuturo;
  dataEvento: Date;
} | null {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const resultado = expandirAgenda().find((item) => item.dataEvento >= hoje);
  return resultado ?? null;
}

export function getProximosEventos(limite = 4) {
  return getEventosFuturos(limite);
}
