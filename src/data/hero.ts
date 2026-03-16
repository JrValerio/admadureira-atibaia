export interface HeroEvento {
  titulo: string;
  alt: string;
  imagem: string;
  href: string;
  ariaLabel: string;
}

// Banners da home ficam em /public/banners para não misturar
// com as artes dos cards da programação.
export const heroEventos: HeroEvento[] = [
  {
    titulo: "Curso de Teologia",
    alt: "Banner do Curso de Teologia da AD Madureira Atibaia",
    imagem: "/banners/banner-curso-de-teologia.png",
    href: "/eventos",
    ariaLabel: "Abrir página de eventos com informações do Curso de Teologia",
  },
  {
    titulo: "Culto de Ensino",
    alt: "Banner do Culto de Ensino da AD Madureira Atibaia",
    imagem: "/banners/banner-culto-de-ensino.png",
    href: "/programacao",
    ariaLabel: "Abrir página da programação com informações do Culto de Ensino",
  },
  {
    titulo: "Círculo de Oração",
    alt: "Banner do Círculo de Oração da AD Madureira Atibaia",
    imagem: "/banners/banner-circulo-de-oracao.png",
    href: "/programacao",
    ariaLabel: "Abrir página da programação com informações do Círculo de Oração",
  },
  {
    titulo: "Campanha de Jejum e Oração",
    alt: "Banner da Campanha de Jejum e Oração da AD Madureira Atibaia",
    imagem: "/banners/banner-campanha-jejum-e-oracao.png",
    href: "/eventos",
    ariaLabel: "Abrir página de eventos com informações da Campanha de Jejum e Oração",
  },
  {
    titulo: "Culto de Santa Ceia",
    alt: "Banner do Culto de Santa Ceia da AD Madureira Atibaia",
    imagem: "/banners/banner-culto-de-santa-ceia.png",
    href: "/programacao",
    ariaLabel: "Abrir página da programação com informações do Culto de Santa Ceia",
  },
  {
    titulo: "Culto de Mulheres",
    alt: "Banner do Culto de Mulheres da AD Madureira Atibaia",
    imagem: "/banners/banner-Culto-de-Mulhere.png",
    href: "/eventos",
    ariaLabel: "Abrir página de eventos com informações do Culto de Mulheres",
  },
  {
    titulo: "Reunião de Ministério",
    alt: "Banner da Reunião de Ministério da AD Madureira Atibaia",
    imagem: "/banners/banner-reuniao-de-ministerio.png",
    href: "/eventos",
    ariaLabel: "Abrir página de eventos com informações da Reunião de Ministério",
  },
  {
    titulo: "Reunião de Obreiros",
    alt: "Banner da Reunião de Obreiros da AD Madureira Atibaia",
    imagem: "/banners/banner-reuniao-de-obreiros.png",
    href: "/eventos",
    ariaLabel: "Abrir página de eventos com informações da Reunião de Obreiros",
  },
];
