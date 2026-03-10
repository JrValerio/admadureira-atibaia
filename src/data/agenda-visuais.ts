export const EVENTO_TIPOS = [
  "reuniao-de-ministerio",
  "curso-de-teologia",
  "santa-ceia",
  "reuniao-de-obreiros",
  "dia-das-mulheres",
  "batismo",
  "culto-com-a-mocidade",
  "congresso-circulo-de-oracao",
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
    imagem: "/programacao/reuniao-ministerial.png",
    banner: "/programacao/reuniao-ministerial.png",
  },
  "dia-das-mulheres": {
    imagem: "/programacao/dia-da-mulher.png",
    banner: "/programacao/dia-da-mulher.png",
  },
  batismo: {
    imagem: "/fachada-da-igreja.jpg",
  },
  "culto-com-a-mocidade": {
    imagem: "/programacao/culto-de-jovens.png",
    banner: "/programacao/culto-de-jovens.png",
  },
  "congresso-circulo-de-oracao": {
    imagem: "/programacao/circulo-de-oracao.png",
    banner: "/programacao/circulo-de-oracao.png",
  },
};

export function getVisualEvento(tipo: EventoTipo): EventoVisual {
  return VISUAIS_EVENTO[tipo] ?? VISUAL_PADRAO;
}
