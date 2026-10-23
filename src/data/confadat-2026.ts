import {
  OFFICIAL_SOCIAL_LINKS,
  SEDE_ADDRESS_INLINE,
  SEDE_MAPS_URL,
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
    "CONFADAT 2026, o Congresso das Irmãs do Campo de Atibaia: 27 e 28 de novembro de 2026, às 19h, na Assembleia de Deus Ministério Madureira, em Atibaia/SP. Tema: Floresça onde Deus te plantar (Isaías 35:1). Sexta, 27: Missionária Erinete Teodoro e a cantora Anne Reis. Sábado, 28: Missionária e cantora Adriane Medeiros. Com transmissão ao vivo.",
  descricaoTopo:
    "Duas noites de Palavra, louvor e oração preparadas pela CONFADAT, o departamento feminino do Campo de Atibaia, na Igreja Sede. Venha e traga uma irmã: há um lugar preparado para você.",
  baseBiblica: "Isaías 35:1",
  data: "27 e 28 de novembro de 2026",
  horario: "19h",
  horarioAgenda: "19h00",
  inicioIso: "2026-11-27T19:00:00-03:00",
  // As artes não informam o término. 21h30 é só uma referência interna (fim da
  // contagem "ao vivo", saída do slide da home, "evento encerrado"): não vai
  // para texto, agenda nem dados estruturados.
  fimIso: "2026-11-28T21:30:00-03:00",
  local: "Assembleia de Deus Ministério Madureira — Campo de Atibaia",
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
      participantes: [
        { nome: "Missionária Erinete Teodoro", funcao: "Preletora" },
        { nome: "Cantora Anne Reis", funcao: "Louvor" },
      ],
    },
    {
      noite: "2ª noite",
      diaSemana: "Sábado",
      data: "28 de novembro de 2026",
      horario: "19h",
      inicioIso: "2026-11-28T19:00:00-03:00",
      participantes: [
        { nome: "Missionária e cantora Adriane Medeiros", funcao: "Pregação e louvor" },
      ],
    },
  ],
  // Programação do kit oficial de 23/10/2026 (LEIA-ME e manifesto), que
  // substitui a de 22/10: sexta, Erinete Teodoro e Anne Reis; sábado, Adriane
  // Medeiros. Na ordem das noites. Anne Reis não tem Instagram: não inventar.
  convidadas: [
    {
      nome: "Missionária Erinete Teodoro",
      funcao: "Preletora",
      quando: "Sexta, 27 de novembro",
      arte: `${ARTES}/confadat-2026-erinete-teodoro.jpg`,
      instagram: {
        usuario: "@erineteteodoro_oficial",
        href: "https://www.instagram.com/erineteteodoro_oficial/",
      },
    },
    {
      nome: "Cantora Anne Reis",
      funcao: "Louvor",
      quando: "Sexta, 27 de novembro",
      arte: `${ARTES}/confadat-2026-anne-reis.jpg`,
      instagram: null,
    },
    {
      nome: "Missionária e cantora Adriane Medeiros",
      funcao: "Pregação e louvor",
      quando: "Sábado, 28 de novembro",
      arte: `${ARTES}/confadat-2026-adriane-medeiros.jpg`,
      instagram: {
        usuario: "@adrianemedeirosoficial",
        href: "https://www.instagram.com/adrianemedeirosoficial/",
      },
    },
  ],
  liderancas: [
    {
      nome: "Pr. Zacarias Bernardes Félix",
      papel: "Presidente do Campo de Atibaia",
      arte: `${ARTES}/confadat-2026-pastor-zacarias.jpg`,
    },
    {
      nome: "Pra. Anna Alzira Félix",
      papel: "Presidente da CONFADAT",
      arte: `${ARTES}/confadat-2026-pastora-anna-alzira.jpg`,
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
  // Paleta de vestuário da festividade. Mapeamento confirmado pelo Amaro em
  // 22/10: as cores entram como HTML (nomes e códigos da arte "Paleta de
  // cores") e os looks 03 a 08, na ordem do carrossel, como foto. A capa e o
  // slide da paleta ficam fora do site.
  paleta: {
    cores: [
      { nome: "Rosa claro", hex: "#F6D4D6" },
      { nome: "Rosa antigo", hex: "#D99AA2" },
      { nome: "Rosa coral", hex: "#F2A5A6" },
      { nome: "Rosa queimado", hex: "#C7676F" },
      { nome: "Vinho", hex: "#8E3A48" },
    ],
    looks: [
      {
        src: `${ARTES}/paleta/vestidos-rosa-antigo-e-queimado.jpg`,
        titulo: "Vestidos",
        legenda: "Rosa antigo · Rosa queimado",
        alt: "Vestidos midi em rosa antigo e em rosa queimado, com sapato nude.",
      },
      {
        src: `${ARTES}/paleta/blusa-e-saia-rosa-e-vinho.jpg`,
        titulo: "Blusa e saia",
        legenda: "Rosa claro + vinho · Vinho + rosa coral",
        alt: "Blusa rosa claro com saia plissada vinho, e blusa vinho com saia rosa coral.",
      },
      {
        src: `${ARTES}/paleta/saia-preta-rosa-antigo-e-coral.jpg`,
        titulo: "Com saia preta",
        legenda: "Rosa antigo + preto · Rosa coral + preto",
        alt: "Blusa rosa antigo e blusa rosa coral, as duas com saia preta.",
      },
      {
        src: `${ARTES}/paleta/vestidos-rosa-claro-e-vinho.jpg`,
        titulo: "Vestidos",
        legenda: "Rosa claro · Vinho",
        alt: "Vestido rosa claro com cinto e vestido vinho com botões, os dois midi.",
      },
      {
        src: `${ARTES}/paleta/blusa-e-saia-tons-de-rosa.jpg`,
        titulo: "Blusa e saia",
        legenda: "Rosa coral + rosa antigo · Rosa queimado + rosa claro",
        alt: "Camisa rosa coral com saia plissada rosa antigo, e blusa rosa queimado com saia rosa claro.",
      },
      {
        src: `${ARTES}/paleta/saia-preta-rosa-queimado-e-vinho.jpg`,
        titulo: "Com saia preta",
        legenda: "Rosa queimado + preto · Vinho + preto",
        alt: "Blusa rosa queimado e camisa vinho, as duas com saia preta.",
      },
    ],
  },
  // Artes do kit oficial de 23/10 (artes/*.png, conferidas pelo sha256 do
  // manifesto). As retrato vão em JPG para a página ficar leve, sem recorte.
  artes: {
    // hero-desktop (3:1) com as três convidadas e a liderança: carrossel da
    // home e topo da página no desktop. 2048x682 levada a 2172x724.
    banner: "/banners/banner-confadat-2026.png",
    // hero-mobile (4:5), com as mesmas três convidadas e a liderança: topo da
    // página no celular e cards dos eventos de 27 e 28/11 na agenda.
    heroMobile: `${ARTES}/confadat-2026-hero-mobile.jpg`,
    // youtube-geral (16:9): topo das páginas dos eventos de 27 e 28/11, que
    // usam aspect-video, sem corte.
    youtube: `${ARTES}/confadat-2026-youtube.png`,
    // A youtube-geral em JPG leve (1200x675): o WhatsApp descarta prévia pesada.
    og: `${ARTES}/confadat-2026-og.jpg`,
  },
  keywords: [
    "CONFADAT 2026",
    "CONFADAT Atibaia",
    "Congresso das Irmãs Atibaia",
    "congresso de mulheres Assembleia de Deus",
    "Floresça onde Deus te plantar",
    "Isaías 35:1",
    "Erinete Teodoro",
    "Anne Reis",
    "Adriane Medeiros",
    "AD Madureira Atibaia",
  ],
} as const;
