export interface HeroEvento {
  titulo: string;
  data?: string;
  horario?: string;
  imagem: string;
  link?: string;
}

// Banners da home ficam em /public/banners para não misturar
// com as artes dos cards da programação.
export const heroEventos: HeroEvento[] = [
  {
    titulo: "Culto para Mulheres",
    imagem: "/banners/banner-culto-para-mulheres.jpg",
    link: "/programacao",
  },
  {
    titulo: "Campanha de Quinta-feira",
    data: "Toda Quinta-feira",
    horario: "19h30",
    imagem: "/banners/banner-campanha-de-quinta.jpg",
    link: "/programacao",
  },
  {
    titulo: "Santa Ceia",
    data: "2º Sábado do Mês",
    imagem: "/banners/banner-culto-de-ceia.png",
    link: "/programacao",
  },
  {
    titulo: "Culto da Família",
    data: "Todo Domingo",
    horario: "18h30",
    imagem: "/banners/banner-culto-da-familia.png",
    link: "/programacao",
  },
];
