import type { EventoBase, MesAgendaBase } from "@/data/agenda-types";
import { getNthWeekdayOfMonth } from "@/lib/agenda-recorrente";

const NOMES_MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
] as const;

function formatarData(data: Date) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  return `${dia}/${mes}`;
}

function slugRecorrente(tipo: string, data: Date) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${tipo}-${dia}-${mes}-${ano}`;
}

function criarEventoRecorrente(
  data: Date,
  local: string,
  config: Omit<EventoBase, "data" | "local" | "slug">
): EventoBase {
  return {
    ...config,
    slug: slugRecorrente(config.tipo, data),
    data: formatarData(data),
    local,
  };
}

export function gerarAgendaRecorrente(
  ano: number,
  meses: number[],
  local: string
): MesAgendaBase[] {
  return meses.map((mesNumero) => {
    const indiceMes = mesNumero - 1;

    const reuniaoMinisterio = getNthWeekdayOfMonth(ano, indiceMes, 1, 1);
    const santaCeia = getNthWeekdayOfMonth(ano, indiceMes, 6, 2);
    const reuniaoObreiros = getNthWeekdayOfMonth(ano, indiceMes, 6, 3);
    const cultoMocidade = getNthWeekdayOfMonth(ano, indiceMes, 6, 4);

    return {
      mes: NOMES_MESES[indiceMes],
      mesNumero,
      ano,
      eventos: [
        criarEventoRecorrente(reuniaoMinisterio, local, {
          tipo: "reuniao-de-ministerio",
          titulo: "Reunião de Ministério",
          descricao:
            "Encontro de alinhamento e oração com a liderança ministerial da igreja.",
        }),
        criarEventoRecorrente(santaCeia, local, {
          tipo: "santa-ceia",
          titulo: "Santa Ceia",
          horario: "18h30",
          descricao:
            "Culto de comunhão e gratidão em memória do sacrifício de Cristo.",
        }),
        criarEventoRecorrente(reuniaoObreiros, local, {
          tipo: "reuniao-de-obreiros",
          titulo: "Reunião de Obreiros",
          horario: "18h00",
          descricao:
            "Reunião ministerial com obreiros para comunhão, direção e oração.",
        }),
        criarEventoRecorrente(cultoMocidade, local, {
          tipo: "culto-com-a-mocidade",
          titulo: "Culto com a Mocidade",
          horario: "19h30",
          descricao:
            "Culto especial dirigido pela mocidade, com participação dos jovens no louvor e na palavra.",
        }),
      ],
    };
  });
}
