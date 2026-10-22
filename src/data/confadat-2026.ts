import {
  OFFICIAL_SOCIAL_LINKS,
  SEDE_ADDRESS_INLINE,
  SEDE_MAPS_URL,
  SEDE_PLACE_NAME,
} from "@/data/site";

const ARTES = "/ministerios/confadat/confadat-2026";

export const CONFADAT_2026 = {
  slug: "confadat-2026",
  path: "/eventos/confadat-2026",
  // Atalho para bio, stories e púlpito; o redirect fica em next.config.ts.
  atalho: "/confadat",
  titulo: "CONFADAT 2026",
  descritor: "Congresso das Irmãs",
  tema: "Floresça onde Deus te plantar",
  tituloSeo:
    "CONFADAT 2026 — Floresça onde Deus te plantar · 27 e 28 de novembro | AD Madureira Atibaia",
  descricaoSeo:
    "CONFADAT 2026, o Congresso das Irmãs do Campo de Atibaia: 27 e 28 de novembro de 2026, às 19h, na Igreja Sede, em Atibaia/SP. Tema: Floresça onde Deus te plantar (Isaías 35:1). Preletoras: Missionária Adriane Medeiros na sexta, 27, e Missionária Erinete Teodoro no sábado, 28. Com transmissão ao vivo.",
  descricaoTopo:
    "Duas noites de Palavra, louvor e oração preparadas pela CONFADAT, o departamento feminino do Campo de Atibaia, na Igreja Sede. Venha e traga uma irmã: há um lugar preparado para você.",
  baseBiblica: "Isaías 35:1",
  data: "27 e 28 de novembro de 2026",
  horario: "19h",
  horarioAgenda: "19h00",
  inicioIso: "2026-11-27T19:00:00-03:00",
  // As artes não informam o término; 21h30 é estimativa, como no Congresso UMADAT.
  fimIso: "2026-11-28T21:30:00-03:00",
  local: SEDE_PLACE_NAME,
  endereco: SEDE_ADDRESS_INLINE,
  mapsUrl: SEDE_MAPS_URL,
  // Os links de cada live só existem quando a transmissão é agendada; até lá, o canal.
  transmissaoUrl: OFFICIAL_SOCIAL_LINKS.youtube,
  ministerio: {
    nome: "CONFADAT – Mulheres Campo de Atibaia",
    path: "/ministerios/confadat",
  },
  noites: [
    {
      noite: "1ª noite",
      diaSemana: "Sexta-feira",
      data: "27 de novembro de 2026",
      horario: "19h",
      inicioIso: "2026-11-27T19:00:00-03:00",
      fimIso: "2026-11-27T21:30:00-03:00",
      preletora: "Missionária Adriane Medeiros",
    },
    {
      noite: "2ª noite",
      diaSemana: "Sábado",
      data: "28 de novembro de 2026",
      horario: "19h",
      inicioIso: "2026-11-28T19:00:00-03:00",
      fimIso: "2026-11-28T21:30:00-03:00",
      preletora: "Missionária Erinete Teodoro",
    },
  ],
  // Uma preletora por noite, como nas artes de 22/10 (feed e capa do
  // YouTube); ordem confirmada pelo Amaro para o site. Na ordem das noites.
  preletoras: [
    {
      nome: "Missionária Adriane Medeiros",
      papel: "Preletora e cantora",
      quando: "Sexta, 27 de novembro",
      instagram: {
        usuario: "@adrianemedeirosoficial",
        href: "https://www.instagram.com/adrianemedeirosoficial/",
      },
    },
    {
      nome: "Missionária Erinete Teodoro",
      papel: "Preletora",
      quando: "Sábado, 28 de novembro",
      instagram: {
        usuario: "@erineteteodoro_oficial",
        href: "https://www.instagram.com/erineteteodoro_oficial/",
      },
    },
  ],
  liderancas: [
    {
      papel: "Pastores presidentes",
      nomes: "Pr. Zacarias Bernardes Félix e Pra. Anna Alzira Félix",
    },
  ],
  reflexao: {
    titulo: "O deserto vai florescer",
    paragrafos: [
      "Isaías 35 começa no lugar mais improvável para uma flor: a terra seca, o ermo onde ninguém planta. E é no próprio deserto, não depois dele, que o profeta vê a rosa abrir.",
      "Florescer onde Deus te plantou não é esperar a vida mudar de cenário para só então dar fruto. É descobrir que o Senhor faz brotar vida no lugar em que você está, até na estação que você não escolheria.",
      "Atravessar um deserto não é sinal de fé pequena. Quem chega cansada, enlutada ou esperando há muito tempo também tem lugar nestas duas noites. Venha como está: há um lugar preparado para você.",
    ],
    versiculo:
      "O deserto e os lugares secos se alegrarão com isso; e o ermo exultará e florescerá como a rosa.",
    referencia: "Isaías 35:1 (ARC)",
  },
  // Playlist do congresso: as quatro faixas das artes, na ordem delas. Links
  // sem parâmetros de rastreio (si, utm_*, pi), que o teste barra.
  playlist: {
    faixas: [
      { titulo: "Não Me Deixe Esquecer", artista: "Valesca Mayssa" },
      { titulo: "Floresça", artista: "Antônia Gomes" },
      { titulo: "Não Mais Escravos", artista: "Julia Vitória" },
      { titulo: "Vai Florescer", artista: "Gersinho" },
    ],
    // YouTube em destaque: a playlist de lá é do canal da igreja.
    plataformas: [
      {
        nome: "YouTube",
        href: "https://www.youtube.com/playlist?list=PLTwu-a85ERIw",
        principal: true,
      },
      {
        nome: "YouTube Music",
        href: "https://music.youtube.com/playlist?list=PLTwu-a85ERIw",
        principal: false,
      },
      {
        nome: "Spotify",
        href: "https://open.spotify.com/playlist/7vHhAGzAKSBWlxDbzz95oR",
        principal: false,
      },
      {
        nome: "Apple Music",
        href: "https://music.apple.com/br/playlist/confadat-2k26/pl.u-yZyVD9mtdoJJ9yg",
        principal: false,
      },
    ],
  },
  artes: {
    // Arte do feed (4:5): topo da página em todas as telas e card da agenda.
    feed: `${ARTES}/confadat-2026-feed.png`,
    // A mesma arte do feed em JPG leve: o WhatsApp descarta a prévia de imagens pesadas.
    og: `${ARTES}/confadat-2026-og.jpg`,
    // Faixa 3:1 do carrossel da home.
    banner: "/banners/banner-confadat-2026.png",
  },
  keywords: [
    "CONFADAT 2026",
    "CONFADAT Atibaia",
    "Congresso das Irmãs Atibaia",
    "congresso de mulheres Assembleia de Deus",
    "Floresça onde Deus te plantar",
    "Isaías 35:1",
    "Adriane Medeiros",
    "Erinete Teodoro",
    "AD Madureira Atibaia",
  ],
} as const;
