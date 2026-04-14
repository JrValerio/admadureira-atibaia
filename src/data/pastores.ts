export type PastorGrupo = "presidencia" | "vice-presidencia" | "congregacao";

export interface PastorVersiculo {
  referencia: string;
  texto: string;
}

export interface Pastor {
  slug: string;
  nome: string;
  cargo: string;
  grupo: PastorGrupo;
  foto: string;
  resumo: string;
  trajetoria: string[];
  ministerio: string[];
  formacao?: string[];
  versiculo?: PastorVersiculo;
  ministerioInfo?: {
    inicio?: string;
    funcao?: string;
    igreja?: string;
  };
  congregacaoSlug?: string;
  redes?: {
    instagram?: string;
    youtube?: string;
  };
  seo?: {
    title?: string;
    description?: string;
  };
}

export const pastores: Pastor[] = [
  {
    slug: "zacarias-bernardes-felix",
    nome: "Pr. Dr. Zacarias Bernardes Félix",
    cargo: "Pastor Presidente",
    grupo: "presidencia",
    foto: "/pastores/pr-zacarias.png",
    resumo:
      "Pastor Presidente do Campo de Atibaia desde 30 de maio de 2004, com ministério marcado pela fidelidade à Palavra, pela formação de líderes e pelo avanço da obra evangelística.",
    trajetoria: [
      "Nascido em São Paulo e criado em um lar cristão, viveu uma infância simples marcada pela fé, pela perseverança e por experiências profundas com Deus.",
      "Ainda na juventude recebeu o chamado ministerial e percorreu uma trajetória de serviço como auxiliar, diácono, presbítero e evangelista, até ser consagrado ao pastoreio.",
      "Em 30 de maio de 2004, foi empossado Pastor Presidente do Campo de Madureira em Atibaia pelo saudoso pastor Lupécio Verginiano, assumindo a liderança do campo com sabedoria, experiência e profundo compromisso com a obra de Deus.",
    ],
    ministerio: [
      "Ao longo de sua caminhada dirigiu igrejas e congregações, dedicando-se à pregação da Palavra de Deus, à formação de obreiros e ao cuidado pastoral.",
      "Sua liderança é marcada pela fidelidade à Palavra, pelo investimento em novos líderes e pelo avanço da obra evangelística no Campo de Atibaia.",
    ],
    formacao: [
      "Graduado em Geografia e História.",
      "Bacharel em Direito, atuando também na área jurídica.",
    ],
    versiculo: {
      referencia: "Jeremias 1:5",
      texto: "Antes que te formasse no ventre, eu te conheci.",
    },
    ministerioInfo: {
      inicio: "2004",
      funcao: "Pastor Presidente do Campo de Atibaia",
      igreja: "Assembleia de Deus Ministério Madureira",
    },
    seo: {
      title: "Pr. Dr. Zacarias Bernardes Félix | Pastor Presidente – AD Madureira Atibaia",
      description:
        "Pastor Presidente do Campo de Atibaia da Assembleia de Deus Madureira desde 2004. Conheça a liderança, a trajetória pastoral e a visão do campo.",
    },
  },
  {
    slug: "anna-alzira",
    nome: "Pra. Drª Anna Alzira",
    cargo: "Pastora Presidente",
    grupo: "presidencia",
    foto: "/pastores/pra-anna-alzira.png",
    resumo:
      "Pastora Presidente e companheira ministerial do Pastor Zacarias Bernardes Félix, referência no cuidado pastoral, no discipulado e no apoio às famílias do Campo de Atibaia.",
    trajetoria: [
      "Desde o início de sua vida conjugal, caminha ao lado do Pastor Presidente Zacarias Bernardes Félix no cuidado das igrejas e congregações do Campo de Atibaia.",
      "Sua atuação acompanha de perto o trabalho pastoral, o discipulado e o apoio às famílias da igreja, fortalecendo o ministério com sensibilidade e constância.",
    ],
    ministerio: [
      "É reconhecida por sua sabedoria, sensibilidade pastoral e dedicação às mulheres e às famílias do ministério.",
      "Seu trabalho é marcado pelo aconselhamento, pelo ensino da Palavra e pelo apoio constante às atividades da igreja.",
    ],
    formacao: [
      "Graduada em Pedagogia, História e Direito.",
      "Atuou também como educadora e servidora pública.",
    ],
    ministerioInfo: {
      funcao: "Pastora Presidente do Campo de Atibaia",
      igreja: "Assembleia de Deus Ministério Madureira",
    },
    seo: {
      title: "Pra. Drª Anna Alzira | Pastora Presidente – AD Madureira Atibaia",
      description:
        "Pastora Presidente do Campo de Atibaia da Assembleia de Deus Madureira. Cuidado pastoral, discipulado e apoio às famílias e mulheres da igreja.",
    },
  },
  {
    slug: "marcos-spaca",
    nome: "Pr. Marcos Spaca",
    cargo: "Pastor Vice-Presidente",
    grupo: "vice-presidencia",
    foto: "/pastores/pr-marcos.png",
    resumo:
      "Vice-presidente do Campo de Atibaia, colaborando diretamente com a liderança pastoral na administração do ministério e no cuidado das congregações.",
    trajetoria: [
      "Atua como vice-presidente do Campo de Atibaia, colaborando diretamente com a liderança pastoral na administração e no desenvolvimento das atividades ministeriais da igreja.",
      "Sua presença tem sido importante no acompanhamento das congregações e no fortalecimento das frentes de trabalho do campo.",
    ],
    ministerio: [
      "Contribui no discipulado de novos convertidos e no fortalecimento das atividades evangelísticas.",
      "Seu ministério é marcado pelo compromisso com a Palavra de Deus, pela liderança servidora e pelo apoio às diversas frentes de trabalho da igreja.",
    ],
    ministerioInfo: {
      funcao: "Pastor Vice-Presidente do Campo de Atibaia",
      igreja: "Assembleia de Deus Ministério Madureira",
    },
    seo: {
      title: "Pr. Marcos Spaca | Vice-Presidente – AD Madureira Atibaia",
      description:
        "Vice-Presidente do Campo de Atibaia da Assembleia de Deus Madureira. Apoio pastoral, discipulado e fortalecimento das congregações do campo.",
    },
  },
  {
    slug: "raimundo",
    nome: "Pr. Raimundo",
    cargo: "Pastor Vice-Presidente",
    grupo: "vice-presidencia",
    foto: "/pastores/pr-raimundo.png",
    resumo:
      "Vice-presidente que serve o Campo de Atibaia com zelo pastoral, discipulado e dedicação à formação de novos obreiros.",
    trajetoria: [
      "Exerce o ministério pastoral com zelo e dedicação, servindo como vice-presidente no Campo de Atibaia.",
      "Ao longo de sua caminhada cristã, tem colaborado no fortalecimento espiritual das congregações e no cuidado pastoral da igreja.",
    ],
    ministerio: [
      "Contribui para o discipulado, a formação de novos obreiros e o crescimento espiritual do campo.",
      "Seu trabalho reflete amor pela obra de Deus, compromisso com o ensino bíblico e cuidado com as famílias da igreja.",
    ],
    ministerioInfo: {
      funcao: "Pastor Vice-Presidente do Campo de Atibaia",
      igreja: "Assembleia de Deus Ministério Madureira",
    },
    seo: {
      title: "Pr. Raimundo | Vice-Presidente – AD Madureira Atibaia",
      description:
        "Vice-Presidente do Campo de Atibaia da Assembleia de Deus Madureira. Discipulado, formação de obreiros e cuidado espiritual da igreja.",
    },
  },
  {
    slug: "edilson-jose-dos-santos",
    nome: "Pb. Edilson José dos Santos",
    cargo: "Presbítero",
    grupo: "congregacao",
    congregacaoSlug: "jardim-sao-felipe",
    foto: "/pastores/pb-edilson-jose-dos-santos.jpg",
    resumo:
      "Presbítero responsável pela Congregação Jardim São Felipe do Campo de Atibaia, com trajetória de serviço desde 2005 — diácono, presbítero e dirigente de congregações.",
    trajetoria: [
      "Entrou no ministério em 2005 e veio congregar na Igreja do Jardim São Felipe como diácono.",
      "Em 2015 foi consagrado presbítero e dirigiu a Igreja do Parque Hortência de 2018 a 2023.",
      "Após dois anos na sede, assumiu a direção da Congregação Jardim São Felipe em janeiro de 2025.",
    ],
    ministerio: [
      "Responsável pela liderança da Congregação Jardim São Felipe, com cultos regulares, EBD e ministérios de oração.",
      "Seu ministério é marcado pelo foco no serviço ao Senhor e no cuidado espiritual da comunidade local.",
    ],
    ministerioInfo: {
      inicio: "2025",
      funcao: "Presbítero da Congregação Jardim São Felipe",
      igreja: "Assembleia de Deus Ministério Madureira – Campo de Atibaia",
    },
    seo: {
      title: "Pb. Edilson José dos Santos | Congregação Jardim São Felipe",
      description:
        "Presbítero da Congregação Jardim São Felipe, no Campo de Atibaia da Assembleia de Deus Madureira. Conheça o ministério, a história e os horários de culto.",
    },
  },
  {
    slug: "luis-teixeira",
    nome: "Pr. Luis Teixeira",
    cargo: "Pastor",
    grupo: "congregacao",
    congregacaoSlug: "jardim-cerejeiras",
    foto: "/pastores/pr-luis-teixeira.jpg",
    resumo:
      "Pastor responsável pela Congregação Jardim Cerejeiras do Campo de Atibaia, servindo a comunidade local com cuidado pastoral, ensino da Palavra e acolhimento às famílias.",
    trajetoria: [
      "Serve como pastor local da Congregação Jardim Cerejeiras, vinculada ao Campo de Atibaia da Assembleia de Deus Ministério Madureira.",
      "Sua atuação é marcada pela proximidade com a comunidade, o cuidado das famílias e o fortalecimento espiritual da congregação local.",
    ],
    ministerio: [
      "Responsável pela liderança pastoral da Congregação Jardim Cerejeiras, com cultos regulares, oração e cuidado com os membros.",
      "Seu ministério reflete dedicação à Palavra de Deus, ao discipulado e ao acolhimento de novos visitantes na congregação.",
    ],
    ministerioInfo: {
      funcao: "Pastor da Congregação Jardim Cerejeiras",
      igreja: "Assembleia de Deus Ministério Madureira – Campo de Atibaia",
    },
    seo: {
      title: "Pr. Luis Teixeira | Congregação Jardim Cerejeiras",
      description:
        "Pastor da Congregação Jardim Cerejeiras, no Campo de Atibaia da Assembleia de Deus Madureira. Conheça a congregação, horários e formas de contato.",
    },
  },
  {
    slug: "levi-ribeiro-goncalves",
    nome: "Ev. Levi Ribeiro Gonçalves",
    cargo: "Pastor Evangelista",
    grupo: "congregacao",
    congregacaoSlug: "chacaras-brasil",
    foto: "/pastores/ev-levi-ribeiro.jpg",
    resumo:
      "Presente desde a fundação da Congregação Chácaras Brasil, o Evangelista Levi entregou sua vida a Cristo nesta casa e ascendeu ao pastoreio após servir como membro, tesoureiro, diácono e presbítero. Seu ministério é marcado pelo ensino da sã doutrina e pela visão da igreja como uma família caminhando rumo à eternidade.",
    trajetoria: [
      "Presente desde a fundação da congregação, entregou sua vida a Cristo nesta mesma casa onde serviu como membro, tesoureiro, diácono e presbítero.",
      "Atuou como braço direito de pastores anteriores até ser consagrado evangelista e assumir a direção da Congregação Chácaras Brasil.",
    ],
    ministerio: [
      "Há mais de 14 anos no pastoreio, foca no ensino da sã doutrina e na formação espiritual da congregação.",
      "Conduz a igreja com a visão de uma família unida, preparando seus membros para a caminhada cristã e para a eternidade.",
    ],
    ministerioInfo: {
      inicio: "2012",
      funcao: "Pastor Evangelista da Congregação Chácaras Brasil",
      igreja: "Assembleia de Deus Ministério Madureira – Campo de Atibaia",
    },
    seo: {
      title: "Ev. Levi Ribeiro Gonçalves | Congregação Chácaras Brasil",
      description:
        "Pastor Evangelista da Congregação Chácaras Brasil, no Campo de Atibaia da Assembleia de Deus Madureira. Conheça o ministério, a história e os horários de culto.",
    },
  },
  {
    slug: "jorge",
    nome: "Pr. Jorge",
    cargo: "Pastor Vice-Presidente",
    grupo: "vice-presidencia",
    foto: "/pastores/pr-jorge.png",
    resumo:
      "Vice-presidente do Campo de Atibaia, auxiliando na liderança pastoral, no ensino da Palavra e no apoio às congregações do ministério.",
    trajetoria: [
      "Atua como vice-presidente do Campo de Atibaia, auxiliando na liderança pastoral e na condução das atividades ministeriais da igreja.",
      "Sua experiência no cuidado pastoral tem sido importante no apoio às congregações e no fortalecimento das ações evangelísticas do ministério.",
    ],
    ministerio: [
      "Tem desempenhado papel relevante no ensino da Palavra de Deus e no acompanhamento das frentes ministeriais do campo.",
      "Seu trabalho é marcado pela dedicação ao serviço cristão e pelo compromisso com o crescimento espiritual da igreja.",
    ],
    ministerioInfo: {
      funcao: "Pastor Vice-Presidente do Campo de Atibaia",
      igreja: "Assembleia de Deus Ministério Madureira",
    },
    seo: {
      title: "Pr. Jorge | Vice-Presidente – AD Madureira Atibaia",
      description:
        "Vice-Presidente do Campo de Atibaia da Assembleia de Deus Madureira. Ensino da Palavra e apoio pastoral às congregações do ministério.",
    },
  },
];

export function getPastores() {
  return pastores;
}

export function getPastorBySlug(slug: string) {
  return pastores.find((pastor) => pastor.slug === slug);
}

export function getPastoresByGrupo(grupo: PastorGrupo) {
  return pastores.filter((pastor) => pastor.grupo === grupo);
}
