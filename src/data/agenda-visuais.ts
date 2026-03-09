export type EventoTipo =
  | "reuniao-de-ministerio"
  | "curso-de-teologia"
  | "santa-ceia"
  | "reuniao-de-obreiros"
  | "dia-das-mulheres"
  | "batismo"
  | "culto-com-a-mocidade"
  | "congresso-circulo-de-oracao";

export interface EventoVisual {
  imagem: string;
  banner?: string;
}

export const VISUAIS_EVENTO: Record<EventoTipo, EventoVisual> = {
  "reuniao-de-ministerio": {
    imagem: "/programacao/reuniao-ministerial.png",
    banner: "/programacao/reuniao-ministerial.png",
  },
  "curso-de-teologia": {
    imagem: "/fachada-da-igreja.jpg",
  },
  "santa-ceia": {
    imagem: "/fachada-da-igreja.jpg",
  },
  "reuniao-de-obreiros": {
    imagem: "/pulpito-da-igreja.jpg",
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
