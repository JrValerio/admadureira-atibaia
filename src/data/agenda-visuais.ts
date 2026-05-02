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
    imagem: "/programacao/reuniao-ministerial.png",
    banner: "/programacao/reuniao-ministerial.png",
  },
  "curso-de-teologia": {
    imagem: "/programacao/curso-teologia.png",
  },
  "santa-ceia": {
    imagem: "/programacao/culto-de-ceia.png",
    banner: "/programacao/culto-de-ceia.png",
  },
  "reuniao-de-obreiros": {
    imagem: "/programacao/reuniao-de-obreiro.png",
    banner: "/programacao/reuniao-de-obreiro.png",
  },
  "dia-das-mulheres": {
    imagem: "/programacao/culto-para-mulheres.png",
    banner: "/programacao/culto-para-mulheres.png",
  },
  batismo: {
    imagem: "/programacao/batismo.png",
    banner: "/programacao/batismo.png",
  },
  "culto-com-a-mocidade": {
    imagem: "/programacao/culto-de-jovens.png",
    banner: "/programacao/culto-de-jovens.png",
  },
  "congresso-circulo-de-oracao": {
    imagem: "/programacao/eventos/congresso-circulo-de-oracao.png",
    banner: "/programacao/eventos/congresso-circulo-de-oracao.png",
  },
  "congresso-criancas": {
    imagem: "/programacao/congresso-kids.png",
    banner: "/programacao/congresso-kids.png",
  },
  "evento-especial": {
    imagem: "/fachada-da-igreja.jpg",
    banner: "/fachada-da-igreja.jpg",
  },
};

export function getVisualEvento(tipo: EventoTipo): EventoVisual {
  return VISUAIS_EVENTO[tipo] ?? VISUAL_PADRAO;
}
