import { SEDE_ADDRESS_INLINE, SEDE_PLACE_NAME } from "@/data/site";

export const CULTO_ACOES_DE_GRACAS_05_09_2026 = {
  slug: "culto-acoes-de-gracas-05-09-2026",
  path: "/eventos/culto-acoes-de-gracas-05-09-2026",
  titulo: "Culto de Ações de Graças",
  tituloSeo:
    "Culto de Ações de Graças ao vivo — Celebrando o Pastor Zacarias | AD Madureira Atibaia",
  subtitulo: "Celebrando a vida do nosso pastor presidente",
  data: "5 de setembro de 2026",
  diaSemana: "Sábado",
  horario: "19h",
  inicioIso: "2026-09-05T19:00:00-03:00",
  fimIso: "2026-09-05T21:00:00-03:00",
  local: SEDE_PLACE_NAME,
  endereco: SEDE_ADDRESS_INLINE,
  preletor: {
    nome: "Pr. Zacarias Bernardes Félix",
    papel: "Ministrador da Palavra",
    foto: "/pastores/zacarias-felix.jpg",
    fotoClassName: "object-cover object-top",
    redes: [] as Array<{ plataforma: "Instagram" | "YouTube"; usuario: string; href: string }>,
  },
  anfitrioes: ["Pra. Anna Alzira Félix"],
  cantores: [],
  imagem: "/programacao/eventos/culto-acoes-de-gracas.png",
  banner: "/programacao/eventos/culto-acoes-de-gracas.png",
  hero: "/programacao/eventos/culto-acoes-de-gracas.png",
  heroShare: "/programacao/eventos/culto-acoes-de-gracas.png",
  descricaoSeo:
    "Participe do Culto de Ações de Graças ao vivo da AD Madureira Atibaia, sábado, 05 de setembro de 2026, às 19h, celebrando a vida do Pastor Zacarias B. Félix com ministração da Palavra e presidência da Pra. Anna Alzira Félix. Transmissão ao vivo.",
  descricaoTopo:
    "A Assembleia de Deus — Ministério Madureira Campo de Atibaia convida você e sua família para o Culto de Ações de Graças, celebrando a vida e ministério do nosso pastor presidente.",
  sobre: [
    "Uma noite de gratidão. A igreja se reúne para agradecer a Deus pela vida, pelo ministério e pelo cuidado pastoral do Pr. Zacarias B. Félix à frente do Campo de Atibaia.",
    "Honrar um pastor não é exaltar um homem: é reconhecer que Deus usa pessoas para cuidar de pessoas. E gratidão não é o sentimento que aparece depois que a vida melhora — é a decisão de reconhecer Deus antes mesmo da resposta chegar.",
    "Uma transmissão para fortalecer quem está querendo agradecer e sem saber como, longe da igreja mas guardando o que aprendeu aqui, esperando resposta e com pouco motivo aparente para gratidão, ou servindo em silêncio, sem ninguém ver.",
    "Se você foi alcançado por esta igreja em algum momento da sua vida, este culto também é seu. Venha participar presencialmente conosco. Se não puder estar presente, acompanhe por aqui.",
  ],
  baseBiblica:
    '"Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco." — 1 Tessalonicenses 5.18',
  keywords: [
    "Culto de Ações de Graças",
    "AD Madureira Atibaia",
    "Pastor Zacarias",
    "Assembleia de Deus Atibaia",
    "Transmissão ao vivo",
    "Culto em Atibaia",
    "Pastor Zacarias B. Félix",
    "Gratidão",
    "Aniversário do pastor",
  ],
} as const;
