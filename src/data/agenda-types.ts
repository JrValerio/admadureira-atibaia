import type { EventoTipo } from "@/data/agenda-visuais";

export interface ReferenciaBiblicaLink {
  referencia: string;
  href: string;
}

export interface ConteudoRelacionadoLink {
  label: string;
  href: string;
  descricao?: string;
}

export interface EventoBase {
  slug: string;
  tipo: EventoTipo;
  data: string;
  titulo: string;
  horario?: string;
  descricao?: string;
  convite?: string;
  baseBiblica?: ReferenciaBiblicaLink[];
  recursos?: ConteudoRelacionadoLink[];
  local?: string;
  destaque?: boolean;
  imagem?: string;
  banner?: string;
}

export type Evento = EventoBase;

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

export interface CampanhaData {
  titulo: string;
  versiculo?: { texto: string; referencia: string };
  datas: Array<{ data: string; preletora?: string }>;
  cantoras?: string[];
  local?: string;
  horario?: string;
}

export interface ItemSemanal {
  dia: string;
  titulo: string;
  horario?: string;
  banner?: string;
  slug?: string;
  descricao?: string;
  convite?: string;
  baseBiblica?: ReferenciaBiblicaLink[];
  recursos?: ConteudoRelacionadoLink[];
  campanha?: CampanhaData;
  local?: string;
}
