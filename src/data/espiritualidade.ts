export type SpiritualFeature = {
  href: string;
  titulo: string;
  descricao: string;
  destaque: string;
};

export const spiritualFeatures: SpiritualFeature[] = [
  {
    href: "/espiritualidade/versiculo-do-dia",
    titulo: "Versículo do Dia",
    descricao:
      "Receba uma porção diária da Palavra com link direto para o capítulo bíblico e meditação prática.",
    destaque: "Atualização diária",
  },
  {
    href: "/espiritualidade/biblia",
    titulo: "Bíblia Online",
    descricao:
      "Leia capítulos completos da Bíblia, escolha livro e capítulo e mantenha a Palavra sempre ao alcance.",
    destaque: "Leitura por capítulo",
  },
  {
    href: "/espiritualidade/plano-de-leitura",
    titulo: "Plano de Leitura",
    descricao:
      "Siga planos devocionais organizados por tema e duração para cultivar constância na leitura bíblica.",
    destaque: "Planos locais",
  },
  {
    href: "/espiritualidade/devocional",
    titulo: "Devocional",
    descricao:
      "Reflexões curtas com versículo, aplicação prática e oração para fortalecer sua caminhada com Deus.",
    destaque: "Conteúdo pastoral",
  },
  {
    href: "/espiritualidade/radio",
    titulo: "Rádio",
    descricao:
      "Estrutura pronta para transmissões ao vivo, louvores, mensagens e programação contínua da igreja.",
    destaque: "Canal em implantação",
  },
  {
    href: "/espiritualidade/podcast",
    titulo: "Podcast",
    descricao:
      "Base preparada para episódios em áudio com mensagens, entrevistas e séries temáticas da igreja.",
    destaque: "Distribuição futura",
  },
];

export const radioConfig = {
  streamUrl: "",
  streamHostLabel: "Link de streaming ainda não configurado",
  horarios: [
    "Manhãs de oração e louvor",
    "Mensagens e ministrações da igreja",
    "Programação especial em datas congregacionais",
  ],
};

export const podcastConfig = {
  spotifyEmbedUrl: "",
  youtubePlaylistUrl: "https://www.youtube.com/@ADMadureiraAtibaia",
  plataformas: ["Spotify", "YouTube", "Amazon Music"],
  linhasEditoriais: [
    "Mensagens em áudio para ouvir durante a semana",
    "Séries temáticas sobre família, oração e vida cristã",
    "Cortes e reflexões para distribuição em plataformas digitais",
  ],
};
