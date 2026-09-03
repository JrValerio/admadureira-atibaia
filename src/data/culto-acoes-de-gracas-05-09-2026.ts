import { SEDE_ADDRESS_INLINE, SEDE_PLACE_NAME } from "@/data/site";

const ANIVERSARIO_2025_PASTA =
  "/programacao/eventos/culto-acoes-de-gracas-05-09-2026";
const ANIVERSARIO_2025_TOTAL_FOTOS = 88;

// As 88 fotos vieram de uma curadoria feita pelo próprio usuário a partir do
// material bruto da celebração de 2025 (WhatsApp + câmera de celular) — não
// dá pra escrever uma legenda única por foto, então o alt segue um padrão
// numerado (honesto e acessível para um carrossel grande como este).
const fotosAniversario2025 = Array.from(
  { length: ANIVERSARIO_2025_TOTAL_FOTOS },
  (_, indice) => {
    const numero = indice + 1;
    const numeroFormatado = String(numero).padStart(2, "0");
    return {
      src: `${ANIVERSARIO_2025_PASTA}/aniversario-2025-${numeroFormatado}.webp`,
      alt: `Foto ${numero} de ${ANIVERSARIO_2025_TOTAL_FOTOS} da celebração de aniversário do Pr. Zacarias em 2025.`,
    };
  }
);

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
    foto: "/pastores/pr-zacarias.png",
    fotoClassName: "object-cover object-top",
    redes: [] as Array<{ plataforma: "Instagram" | "YouTube"; usuario: string; href: string }>,
  },
  anfitrioes: ["Pra. Anna Alzira Félix"],
  cantores: [],
  imagem: "/programacao/semanas/2026-08-31/culto-de-acao-de-graca.png",
  banner: "/banners/banner-culto-de-acao-de-graca.png",
  hero: "/banners/banner-culto-de-acao-de-graca.png",
  heroShare: "/banners/banner-culto-de-acao-de-graca.png",
  transmissaoAoVivoUrl: "https://www.youtube.com/live/7vKDuWB5-iA",
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
  memoriaAniversario: {
    titulo: "Relembre o aniversário do ano passado",
    descricao:
      "Em 2025, a igreja também se reuniu para celebrar a vida do Pr. Zacarias. Veja os registros daquele dia e reveja o depoimento gravado na ocasião.",
    fotos: fotosAniversario2025,
    videos: [
      {
        src: `${ANIVERSARIO_2025_PASTA}/aniversario-2025-video-01.mp4`,
        titulo: "Registro em vídeo da celebração de 2025",
      },
      {
        src: `${ANIVERSARIO_2025_PASTA}/aniversario-2025-video-02.mp4`,
        titulo: "Registro em vídeo da celebração de 2025",
      },
    ],
    depoimento: {
      youtubeId: "nD8ww-uzRgg",
      titulo:
        "Entrevista especial — Pr. Zacarias Bernardes Félix e Pra. Anna Alzira",
    },
  },
} as const;
