export const EVENTO_TIPOS = [
  "reuniao-de-ministerio",
  "curso-de-teologia",
  "santa-ceia",
  "reuniao-de-obreiros",
  "dia-das-mulheres",
  "batismo",
  "culto-com-a-mocidade",
  "congresso-circulo-de-oracao",
  "congresso-criancas",
  "evento-especial",
] as const;

export type EventoTipo = (typeof EVENTO_TIPOS)[number];

export interface EventoVisual {
  imagem: string;
  banner?: string;
}

export const VISUAL_PADRAO: EventoVisual = {
  imagem: "/fachada-da-igreja.jpg",
};

export const VISUAIS_EVENTO: Record<EventoTipo, EventoVisual> = {
  "reuniao-de-ministerio": {
    imagem: "/programacao/semanas/2026-03-30/reuniao-ministerial.png",
    banner: "/programacao/semanas/2026-03-30/reuniao-ministerial.png",
  },
  "curso-de-teologia": {
    imagem: "/programacao/semanas/2026-03-30/curso-teologia.png",
  },
  "santa-ceia": {
    imagem: "/programacao/semanas/2026-03-30/culto-de-ceia.png",
    banner: "/programacao/semanas/2026-03-30/culto-de-ceia.png",
  },
  "reuniao-de-obreiros": {
    imagem: "/programacao/semanas/2026-03-30/reuniao-de-obreiro.png",
    banner: "/programacao/semanas/2026-03-30/reuniao-de-obreiro.png",
  },
  "dia-das-mulheres": {
    imagem: "/programacao/semanas/2026-03-30/consagracao-mulheres.png",
    banner: "/programacao/semanas/2026-03-30/consagracao-mulheres.png",
  },
  batismo: {
    imagem: "/programacao/semanas/2026-03-30/batismo.png",
    banner: "/programacao/semanas/2026-03-30/batismo.png",
  },
  "culto-com-a-mocidade": {
    imagem: "/programacao/semanas/2026-03-30/culto-de-jovens.png",
    banner: "/programacao/semanas/2026-03-30/culto-de-jovens.png",
  },
  "congresso-circulo-de-oracao": {
    imagem: "/programacao/eventos/congresso-circulo-de-oracao.png",
    banner: "/programacao/eventos/congresso-circulo-de-oracao.png",
  },
  "congresso-criancas": {
    imagem: "/programacao/semanas/2026-03-30/congresso-kids.png",
    banner: "/programacao/semanas/2026-03-30/congresso-kids.png",
  },
  "evento-especial": {
    imagem: "/fachada-da-igreja.jpg",
    banner: "/fachada-da-igreja.jpg",
  },
};

export function getVisualEvento(tipo: EventoTipo): EventoVisual {
  return VISUAIS_EVENTO[tipo] ?? VISUAL_PADRAO;
}
