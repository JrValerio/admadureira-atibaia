import type { EventoTipo } from "@/data/agenda-visuais";

export interface EventoBase {
  slug: string;
  tipo: EventoTipo;
  data: string;
  titulo: string;
  horario?: string;
  descricao?: string;
  local?: string;
  destaque?: boolean;
}

export interface Evento extends EventoBase {
  imagem?: string;
  banner?: string;
}

export interface MesAgendaBase {
  mes: string;
  mesNumero?: number;
  ano: number;
  eventos: EventoBase[];
}

export interface MesAgenda {
  mes: string;
  mesNumero?: number;
  ano: number;
  eventos: Evento[];
}

export interface ItemSemanal {
  dia: string;
  titulo: string;
  horario?: string;
  icone?: string;
  banner?: string;
}
