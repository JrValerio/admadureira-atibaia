export interface HeroEvento {
  titulo: string;
  data?: string;
  horario?: string;
  imagem: string;
  link?: string;
}

// Coloque aqui os destaques que aparecem no topo da home.
// Use imagens de /public/eventos/ (artes largas, estilo stories/banner)
// ou reaproveite imagens de /public/programacao/.
export const heroEventos: HeroEvento[] = [
  {
    titulo: "Confraternização Dia das Mulheres",
    data: "28 de Março",
    horario: "19h00",
    imagem: "/programacao/dia-da-mulher.png",
    link: "/programacao",
  },
  {
    titulo: "Congresso Círculo de Oração",
    data: "29 e 30 de Maio",
    imagem: "/programacao/circulo-de-oracao.png",
    link: "/programacao",
  },
  {
    titulo: "Culto de Jovens",
    data: "Toda Quinta-feira",
    horario: "19h30",
    imagem: "/programacao/culto-de-jovens.png",
    link: "/programacao",
  },
  {
    titulo: "Culto da Noite",
    data: "Todo Domingo",
    horario: "18h30",
    imagem: "/programacao/culto-de-domingo.png",
    link: "/programacao",
  },
];
