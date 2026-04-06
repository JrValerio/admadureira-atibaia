import { z } from "zod";
import { EVENTO_TIPOS } from "@/data/agenda-visuais";

const ReferenciaBiblicaLinkSchema = z.object({
  referencia: z.string().min(1),
  href: z.string().min(1),
});

const ConteudoRelacionadoLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  descricao: z.string().optional(),
});

export const EventoSchema = z.object({
  slug: z.string().min(1),
  tipo: z.enum(EVENTO_TIPOS),
  data: z.string().min(1),
  titulo: z.string().min(1),
  horario: z.string().optional(),
  descricao: z.string().optional(),
  convite: z.string().optional(),
  baseBiblica: z.array(ReferenciaBiblicaLinkSchema).optional(),
  recursos: z.array(ConteudoRelacionadoLinkSchema).optional(),
  local: z.string().optional(),
  destaque: z.boolean().optional(),
});

export const MesAgendaSchema = z.object({
  mes: z.string().min(1),
  mesNumero: z.number().int().min(1).max(12).optional(),
  ano: z.number().int().min(1900).max(2100),
  eventos: z.array(EventoSchema),
});

const AgendaSchema = z.array(MesAgendaSchema);

export function assertNoDuplicateSlugs(
  agenda: Array<{ eventos: Array<{ slug: string }> }>
) {
  const seen = new Set<string>();

  for (const bloco of agenda) {
    for (const evento of bloco.eventos) {
      if (seen.has(evento.slug)) {
        throw new Error(`Slug duplicado na agenda: ${evento.slug}`);
      }

      seen.add(evento.slug);
    }
  }
}

export function validateAgenda<T extends Array<{ eventos: Array<{ slug: string }> }>>(
  agenda: T
) {
  const parsed = AgendaSchema.parse(agenda);
  assertNoDuplicateSlugs(parsed);
  return parsed;
}
