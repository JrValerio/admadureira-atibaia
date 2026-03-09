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
    titulo: "Culto para Mulheres",
    imagem: "/programacao/culto-para-mulheres.jpg",
    link: "/programacao",
  },
  {
    titulo: "Campanha de Quinta-feira",
    data: "Toda Quinta-feira",
    horario: "19h30",
    imagem: "/programacao/campanha-de-quinta.jpg",
    link: "/programacao",
  },
  {
    titulo: "Culto da Família",
    data: "Todo Domingo",
    horario: "18h30",
    imagem: "/programacao/culto-da-familia.jpg",
    link: "/programacao",
  },
];
