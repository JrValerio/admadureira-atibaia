const ARTES = "/ministerios/confadat/cha-de-mulheres";

export const CHA_DE_MULHERES_17_10_2026 = {
  slug: "cha-de-mulheres-17-10-2026",
  path: "/eventos/cha-de-mulheres-17-10-2026",
  titulo: "Chá de Mulheres",
  tituloSeo: "Chá de Mulheres — 17 de Outubro de 2026 | AD Madureira Atibaia",
  subtitulo: "Mesa posta, Palavra aberta e tempo aos pés de Jesus",
  descricaoSeo:
    "Chá de Mulheres em Atibaia: sábado, 17 de outubro de 2026, às 19h, na Estrada do Ramalho, 918 — Chácaras Brasil, com ministração da Missionária Franciane Roberta e palestra da Dra. Jaqueline. Promovido pela Congregação Chácaras Brasil.",
  descricaoTopo:
    "Uma noite preparada para mulheres, com ministração da Palavra, palestra e louvor, promovida pela Congregação Chácaras Brasil. Venha e traga uma amiga.",
  data: "17 de outubro de 2026",
  diaSemana: "Sábado",
  horario: "19h",
  inicioIso: "2026-10-17T19:00:00-03:00",
  // A arte não informa o término; duração estimada para o calendário e o estado "encerrado".
  fimIso: "2026-10-17T21:30:00-03:00",
  // O evento NÃO é no templo da congregação (que fica no 765 da mesma estrada).
  local: "Estrada do Ramalho, 918 — Chácaras Brasil",
  endereco: "Estrada do Ramalho, 918 — Chácaras Brasil, Atibaia/SP",
  // Busca pelo endereço, sem o nome do bairro: com "Chácaras Brasil" o Google Maps
  // não resolve o endereço e mostra uma lista de lugares (testado no celular em
  // 09/10/2026). Provisório até chegar o pin exato do local.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Estrada%20do%20Ramalho%2C%20918%20-%20Atibaia%2C%20SP",
  // A congregação promove o evento; a página só leva até ela pelo botão "Conhecer a congregação".
  congregacaoSlug: "chacaras-brasil",
  artes: {
    feed: `${ARTES}/cha-de-mulheres-17-10-2026-feed.png`,
    story: `${ARTES}/cha-de-mulheres-17-10-2026-story.png`,
    // Faixa 3:1 do carrossel da home.
    hero: `${ARTES}/cha-de-mulheres-17-10-2026-hero.png`,
    // A mesma arte do feed em JPG leve: o WhatsApp descarta a prévia de imagens pesadas.
    og: `${ARTES}/cha-de-mulheres-17-10-2026-og.jpg`,
  },
  participantes: [
    { nome: "Missionária Franciane Roberta", papel: "Preletora" },
    { nome: "Dra. Jaqueline", papel: "Palestrante" },
    { nome: "Missionária Carla", papel: "Cantora" },
    { nome: "Missionária Amanda", papel: "Coordenadora" },
  ],
  liderancas: [
    {
      papel: "Pastores locais",
      nomes: "Ev. Levi Ribeiro Gonçalves e Missionária Elizabete Alves",
    },
    {
      papel: "Pastores presidentes",
      nomes: "Pr. Zacarias Bernardes Félix e Pra. Anna Alzira Félix",
    },
  ],
  reflexao: {
    paragrafos: [
      "Marta abriu a casa para receber Jesus e se ocupou com muitos serviços. Maria sentou aos pés Dele para ouvir. Quando Marta reclamou, Jesus não desprezou o serviço dela: chamou-a pelo nome, duas vezes, e lembrou que uma só coisa era necessária.",
      "Servir não é o problema. O problema é passar a vida servindo sem nunca sentar para ouvir o Senhor. O Chá de Mulheres é essa noite: mesa posta, Palavra aberta e tempo para estar aos pés de Jesus.",
      "Não é preciso ser da nossa igreja nem chegar com a vida em ordem. Venha como está: há um lugar preparado para você nesta mesa.",
    ],
    versiculo:
      "E, respondendo Jesus, disse-lhe: Marta, Marta, estás ansiosa e afadigada com muitas coisas, mas uma só é necessária; e Maria escolheu a boa parte, a qual não lhe será tirada.",
    referencia: "Lucas 10.41-42 (ARC)",
  },
  keywords: [
    "chá de mulheres Atibaia",
    "chá de mulheres Assembleia de Deus",
    "evento para mulheres Atibaia",
    "Congregação Chácaras Brasil",
    "CONFADAT",
  ],
} as const;
