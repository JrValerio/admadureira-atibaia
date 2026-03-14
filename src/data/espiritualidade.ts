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
      "Área preparada para reunir transmissões da igreja, louvores, mensagens em áudio e blocos de programação ao longo da semana.",
    destaque: "Canal em implantação",
  },
  {
    href: "/espiritualidade/podcast",
    titulo: "Podcast",
    descricao:
      "Área preparada para episódios em áudio com mensagens, conversas, séries temáticas e conteúdos pastorais para ouvir durante a semana.",
    destaque: "Conteúdo em preparação",
  },
];

export const radioConfig = {
  streamUrl: "",
  streamHostLabel: "Link de streaming ainda não configurado",
  statusLabel: "Canal em implantação",
  resumo:
    "A rádio da igreja foi pensada para concentrar momentos de oração, louvor, ministrações e conteúdos de edificação em uma única experiência de áudio.",
  horarios: [
    "Manhãs de oração e louvor",
    "Mensagens e ministrações da igreja",
    "Programação especial em datas congregacionais",
  ],
  faixas: [
    {
      titulo: "Oração e louvor",
      descricao:
        "Blocos devocionais para começar o dia com louvor, leitura bíblica e intercessão.",
    },
    {
      titulo: "Palavra durante a semana",
      descricao:
        "Mensagens em áudio e ministrações da igreja para acompanhar a rotina com constância espiritual.",
    },
    {
      titulo: "Transmissões especiais",
      descricao:
        "Cobertura de congressos, cultos especiais e datas congregacionais em formato contínuo.",
    },
  ],
  proximosPassos: [
    "Publicar o link oficial de transmissão ao vivo",
    "Organizar blocos fixos de oração, louvor e mensagens",
    "Divulgar a programação diretamente no hub espiritual do site",
  ],
};

export const podcastConfig = {
  spotifyEmbedUrl: "",
  youtubePlaylistUrl: "https://www.youtube.com/@ADMadureiraAtibaia",
  statusLabel: "Conteúdo em preparação",
  resumo:
    "O podcast da igreja foi pensado para reunir episódios em áudio com mensagens, conversas pastorais, séries temáticas e reflexões para acompanhar a rotina ao longo da semana.",
  plataformas: ["Spotify", "YouTube", "Amazon Music"],
  linhasEditoriais: [
    "Mensagens em áudio para ouvir durante a semana",
    "Séries temáticas sobre família, oração e vida cristã",
    "Cortes e reflexões para distribuição em plataformas digitais",
  ],
  seriesPrevistas: [
    {
      titulo: "Palavra para a semana",
      descricao:
        "Episódios curtos com aplicações bíblicas e reflexões para acompanhar a rotina diária.",
    },
    {
      titulo: "Conversas pastorais",
      descricao:
        "Conteúdos sobre família, fé, discipulado e vida cristã com linguagem acessível para a igreja local.",
    },
    {
      titulo: "Recortes de mensagens",
      descricao:
        "Trechos em áudio de ministrações e encontros da igreja para distribuição em plataformas digitais.",
    },
  ],
  proximosPassos: [
    "Definir o feed oficial e as plataformas de publicação",
    "Publicar os primeiros episódios com identidade editorial da igreja",
    "Integrar episódios em destaque ao hub espiritual do site",
  ],
};
