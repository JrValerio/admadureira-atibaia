import {
  SEDE_ADDRESS_CONGREGACAO,
  SEDE_CONTACT,
  SEDE_COORDINATES,
  SEDE_HORARIOS_CONGREGACAO,
  SEDE_MAPS_URL,
  SEDE_WHATSAPP_CONGREGACAO_URL,
} from "@/data/site";

export interface LiderancaCongregacao {
  nome: string;
  cargo: string;
  pastorSlug?: string;
}

export interface Congregacao {
  slug: string;
  igreja: string;
  cidade: string;
  pastor: string;
  pastorSlug?: string;
  endereco: string;
  telefone?: string;
  whatsappUrl?: string;
  imagem: string;
  imagemInterior?: string;
  resumo: string;
  mapsUrl?: string;
  // Formato esperado: "Dia · Horário · Título" — ex: "Quarta · 19h30 · Culto de Ensino"
  horarios: string[];
  lideranca: LiderancaCongregacao[];
  programacoesEspeciais?: string[];
  ministerios?: string[];
  historico?: string;
  observacoes?: string;
  anoDeFundacao?: number;
  estimativaMembros?: number;
  seo?: {
    title?: string;
    description?: string;
  };
  localizacao?: {
    bairro?: string;
    cidade?: string;
    estado?: string;
    pais?: string;
    lat?: number;
    lng?: number;
  };
}

export const congregacoes: Congregacao[] = [
  {
    slug: "atibaia-sede",
    igreja: "AD Madureira – Templo Sede",
    cidade: "Atibaia",
    pastor: "Pr. Dr. Zacarias Bernardes Félix",
    pastorSlug: "zacarias-bernardes-felix",
    endereco: SEDE_ADDRESS_CONGREGACAO,
    telefone: SEDE_CONTACT.whatsappDisplay,
    whatsappUrl: SEDE_WHATSAPP_CONGREGACAO_URL,
    imagem: "/fachada-da-igreja.jpg",
    resumo:
      "O Templo Sede da AD Madureira Atibaia é o coração do Campo de Atibaia, reunindo cultos, ensino bíblico, discipulado e ações de cuidado pastoral voltadas à cidade e à região.",
    mapsUrl: SEDE_MAPS_URL,
    horarios: [...SEDE_HORARIOS_CONGREGACAO],
    lideranca: [
      {
        nome: "Pr. Dr. Zacarias Bernardes Félix",
        cargo: "Pastor Presidente",
        pastorSlug: "zacarias-bernardes-felix",
      },
      {
        nome: "Pra. Drª Anna Alzira",
        cargo: "Pastora Presidente",
        pastorSlug: "anna-alzira",
      },
    ],
    seo: {
      title: "AD Madureira – Templo Sede | AD Madureira Atibaia",
      description:
        "Igreja Sede da Assembleia de Deus Madureira em Atibaia, no Centro. Cultos regulares, ensino bíblico e acolhimento pastoral para a cidade e a região.",
    },
    localizacao: {
      bairro: "Centro",
      cidade: "Atibaia",
      estado: "SP",
      pais: "BR",
      lat: SEDE_COORDINATES.lat,
      lng: SEDE_COORDINATES.lng,
    },
  },
  {
    slug: "jardim-cerejeiras",
    igreja: "Congregação Jardim Cerejeiras",
    cidade: "Atibaia",
    pastor: "Pr. Luis Teixeira",
    pastorSlug: "luis-teixeira",
    endereco: "Rua das Flores, 25 – Jardim Cerejeiras – Atibaia/SP",
    telefone: "(13) 99739-7114",
    whatsappUrl: "https://wa.me/5513997397114",
    imagem: "/congregacoes/jardim-cerejeiras.jpg",
    resumo:
      "Congregação do Campo de Atibaia localizada no bairro Jardim Cerejeiras, com cultos semanais e ministérios ativos voltados à comunidade local.",
    horarios: [
      "Quarta · 19h30 · Culto",
      "Sexta · 19h30 · Culto",
      "Domingo · 18h30 · Culto",
    ],
    programacoesEspeciais: ["Primeiro sábado – Santa Ceia"],
    ministerios: ["Círculo de Oração", "Jovens", "Infantil", "Louvor", "Evangelismo"],
    estimativaMembros: 60,
    lideranca: [
      {
        nome: "Pr. Luis Teixeira",
        cargo: "Pastor",
        pastorSlug: "luis-teixeira",
      },
    ],
    seo: {
      title: "Congregação Jardim Cerejeiras | AD Madureira Atibaia",
      description:
        "Congregação da Assembleia de Deus Madureira em Atibaia, no Jardim Cerejeiras. Cultos regulares, liderança pastoral e informações para visitar.",
    },
    localizacao: {
      bairro: "Jardim Cerejeiras",
      cidade: "Atibaia",
      estado: "SP",
      pais: "BR",
    },
  },
  {
    slug: "jardim-sao-felipe",
    igreja: "AD Madureira – Congregação Jardim São Felipe",
    cidade: "Atibaia",
    pastor: "Pb. Edilson José dos Santos",
    pastorSlug: "edilson-jose-dos-santos",
    endereco: "Rua São Felipe, 121 – Jardim São Felipe – Atibaia/SP",
    telefone: "(11) 99549-3857",
    whatsappUrl: "https://wa.me/5511995493857",
    imagem: "/congregacoes/sao-felipe.jpg",
    resumo:
      "Congregação do Campo de Atibaia localizada no Jardim São Felipe, com cultos semanais, Escola Bíblica Dominical e ministérios ativos voltados à comunidade local.",
    mapsUrl: "https://maps.app.goo.gl/PKfaSDPW1QQ6a9u48",
    horarios: [
      "Domingo · 9h · Escola Bíblica Dominical (EBD)",
      "Domingo · 18h30 · Culto",
      "Segunda · 19h30 · Círculo de Oração (quinzenal)",
      "Terça · 19h30 · Ensaio das Irmãs (quinzenal)",
      "Quarta · 19h30 · Culto",
      "Quinta · 19h30 · Culto",
    ],
    ministerios: ["Círculo de Oração", "Ensaio das Irmãs", "EBD"],
    historico:
      "Começou o trabalho com alguns irmãos na casa do Pastor Wilson. Com o tempo alugaram um salão e depois compraram um terreno próprio onde estão até hoje.",
    lideranca: [
      {
        nome: "Pb. Edilson José dos Santos",
        cargo: "Presbítero",
        pastorSlug: "edilson-jose-dos-santos",
      },
    ],
    seo: {
      title: "Congregação Jardim São Felipe | AD Madureira Atibaia",
      description:
        "Congregação da Assembleia de Deus Madureira no Jardim São Felipe, Atibaia. Cultos regulares, EBD, liderança pastoral e informações para visitar.",
    },
    localizacao: {
      bairro: "Jardim São Felipe",
      cidade: "Atibaia",
      estado: "SP",
      pais: "BR",
    },
  },
  {
    slug: "chacaras-brasil",
    igreja: "Assembleia de Deus Madureira Atibaia Chácaras Brasil",
    cidade: "Atibaia",
    pastor: "Ev. Levi Ribeiro Gonçalves",
    pastorSlug: "levi-ribeiro-goncalves",
    endereco: "Estrada do Ramalho, 765 – Jardim Estância Brasil – Atibaia/SP",
    telefone: "(11) 97245-1625",
    whatsappUrl: "https://wa.me/5511972451625",
    imagem: "/congregacoes/chacaras-brasil.jpg",
    imagemInterior: "/congregacoes/chacaras-brasil-interior.jpg",
    resumo:
      "Congregação do Campo de Atibaia com mais de duas décadas de história, localizada no Jardim Estância Brasil. Seu ministério é marcado pela constância na sã doutrina, pelo cuidado às famílias e pela dedicação ao crescimento espiritual da comunidade local.",
    mapsUrl: "https://maps.app.goo.gl/RxfweskEKas989cs9",
    horarios: [
      "Segunda · 19h30 · Culto",
      "Terça · 19h30 · Círculo de Oração e Ensaio das Irmãs",
      "Quarta · 19h30 · Culto",
      "Quinta · 19h30 · Culto",
      "Sexta · 19h30 · Culto",
      "Sábado · 19h30 · Culto",
    ],
    ministerios: ["Círculo de Oração", "Ensaio das Irmãs"],
    historico:
      "Há mais de duas décadas esta igreja mantém o compromisso inabalável com a preservação da sã doutrina e o ensino das Sagradas Escrituras. Nossa trajetória é marcada pela constância, sem abrir mão dos princípios bíblicos que nos nortearam desde o início. Nosso ministério visa o crescimento espiritual e se dedica com amor a ajudar ao próximo. Permanecemos firmes na fé, pois a vida aqui é o preparo diário para a eternidade.",
    observacoes:
      "Possui rampa de acesso, banheiro acessível, espaço infantil e estacionamento próximo. Contato por e-mail: igrejachacarasbrasil@gmail.com",
    lideranca: [
      {
        nome: "Ev. Levi Ribeiro Gonçalves",
        cargo: "Pastor Evangelista",
        pastorSlug: "levi-ribeiro-goncalves",
      },
    ],
    seo: {
      title: "Congregação Chácaras Brasil | AD Madureira Atibaia",
      description:
        "Congregação da Assembleia de Deus Madureira no Jardim Estância Brasil, Atibaia. Cultos regulares, liderança pastoral e informações para visitar.",
    },
    localizacao: {
      bairro: "Jardim Estância Brasil",
      cidade: "Atibaia",
      estado: "SP",
      pais: "BR",
    },
  },
  {
    slug: "mascate",
    igreja: "AD Madureira – Congregação Mascate",
    cidade: "Atibaia",
    pastor: "Pb. Willian Corrêa de M. Silva",
    pastorSlug: "willian-correa",
    endereco: "Rua São Paulo, 390 – Jardim Monte Verde – Atibaia/SP",
    imagem: "/congregacoes/mascate.jpg",
    imagemInterior: "/congregacoes/mascate-interior.jpg",
    resumo:
      "Congregação do Campo de Atibaia localizada no Jardim Monte Verde, reunindo famílias em cultos semanais de adoração, ensino e comunhão. Sob a liderança do Pb. Willian Corrêa, a igreja celebra cultos na quarta, sexta e domingo, com Santa Ceia no primeiro sábado de cada mês.",
    mapsUrl: "https://maps.app.goo.gl/qioTe57WhohBXQnB8",
    horarios: [
      "Domingo · 18h30 · Culto da Família",
      "Quarta · 19h30 · Culto ao Público",
      "Sexta · 19h30 · Culto de Ensino",
    ],
    programacoesEspeciais: [
      "Primeiro sábado de cada mês – Culto de Santa Ceia",
    ],
    ministerios: ["EBD", "Círculo de Oração"],
    lideranca: [
      {
        nome: "Pb. Willian Corrêa de M. Silva",
        cargo: "Presbítero",
        pastorSlug: "willian-correa",
      },
    ],
    seo: {
      title: "Congregação Mascate | AD Madureira Atibaia",
      description:
        "Congregação da Assembleia de Deus Madureira no Jardim Monte Verde, Atibaia. Cultos semanais de domingo, quarta e sexta. Informações de localização e contato.",
    },
    localizacao: {
      bairro: "Jardim Monte Verde",
      cidade: "Atibaia",
      estado: "SP",
      pais: "BR",
    },
  },
  {
    slug: "vila-sao-jose",
    igreja: "AD Madureira – Congregação Vila São José",
    cidade: "Atibaia",
    pastor: "Pb. Ricardo Tabajara Gomes da Costa",
    pastorSlug: "ricardo-costa",
    endereco: "Rua Seis, 23 – Caetetuba – Atibaia/SP",
    telefone: "(11) 97763-8782",
    whatsappUrl: "https://wa.me/5511977638782",
    imagem: "/congregacoes/vila-sao-jose.jpg",
    resumo:
      "Congregação do Campo de Atibaia no bairro Caetetuba, reunindo famílias em cultos semanais de adoração, ensino e comunhão. Sob a liderança do Pb. Ricardo Costa, a igreja celebra cultos nas quartas, sextas e domingos, com programações especiais ao longo do mês.",
    mapsUrl: "https://maps.app.goo.gl/MNPSNdsnkC2LCwie9",
    horarios: [
      "Domingo · 18h30 · Culto",
      "Quarta · 19h30 · Culto",
      "Sexta · 19h30 · Culto",
    ],
    programacoesEspeciais: [
      "Primeiro sábado – Santa Ceia (19h30)",
      "Quarta sexta do mês – Culto com as Irmãs",
    ],
    observacoes: "Instagram: @Ad_vilasaojose",
    lideranca: [
      {
        nome: "Pb. Ricardo Tabajara Gomes da Costa",
        cargo: "Presbítero",
        pastorSlug: "ricardo-costa",
      },
    ],
    seo: {
      title: "Congregação Vila São José | AD Madureira Atibaia",
      description:
        "Congregação da Assembleia de Deus Madureira no bairro Caetetuba, Atibaia. Cultos semanais de domingo, quarta e sexta. Informações de contato e localização.",
    },
    localizacao: {
      bairro: "Caetetuba",
      cidade: "Atibaia",
      estado: "SP",
      pais: "BR",
    },
  },
  {
    slug: "bela-vista-bom-jesus",
    igreja: "AD Madureira – Congregação Bela Vista",
    cidade: "Bom Jesus dos Perdões",
    pastor: "Pr. Eliton Patrick Campos",
    pastorSlug: "eliton-campos",
    endereco: "Rua Padre Manoel da Nóbrega, 90 – Jardim Bela Vista – Bom Jesus dos Perdões/SP",
    telefone: "(11) 93421-3661",
    whatsappUrl: "https://wa.me/5511934213661",
    imagem: "/congregacoes/bela-vista.jpg",
    imagemInterior: "/congregacoes/bela-vista-interior.jpg",
    resumo:
      "Uma das primeiras Assembleias de Deus de Bom Jesus dos Perdões, a Congregação Bela Vista é marcada pela perseverança, pelo ensino da Palavra e pelo trabalho com a juventude. Uma igreja que nunca desistiu da promessa de Deus sobre ela.",
    mapsUrl: "https://maps.app.goo.gl/c4uZdJCYSxQLZyrRA",
    horarios: [
      "Domingo · 9h · Escola Bíblica Dominical (EBD)",
      "Domingo · 18h30 · Culto da Família",
      "Quarta · 19h30 · Culto de Ensino",
    ],
    programacoesEspeciais: [
      "Primeiro sábado de cada mês – Culto de Santa Ceia",
      "Segunda quinta-feira de cada mês – Círculo de Oração",
    ],
    ministerios: ["EBD", "Trabalho com a Juventude", "Retiros Espirituais"],
    historico:
      "Uma das primeiras Assembleias de Deus da cidade de Bom Jesus dos Perdões, esta congregação é uma desbravadora na região. Sua história é marcada pela perseverança diante das dificuldades e pela fé inabalável na promessa de Deus sobre ela. Igreja batalhadora que mesmo nos momentos difíceis nunca deixou de acreditar e avançar.",
    observacoes: "Possui rampa de acesso e espaço/sala infantil. Instagram: @admadureira_bjp",
    lideranca: [
      {
        nome: "Pr. Eliton Patrick Campos",
        cargo: "Pastor",
        pastorSlug: "eliton-campos",
      },
    ],
    seo: {
      title: "Congregação Bela Vista – Bom Jesus dos Perdões | AD Madureira Atibaia",
      description:
        "Congregação da Assembleia de Deus Madureira em Bom Jesus dos Perdões. Uma das primeiras ADs da cidade, com cultos regulares, EBD e ministério para a juventude.",
    },
    localizacao: {
      bairro: "Jardim Bela Vista",
      cidade: "Bom Jesus dos Perdões",
      estado: "SP",
      pais: "BR",
    },
  },
];

export function getCongregacoes() {
  return congregacoes;
}

export function getCongregacaoBySlug(slug: string) {
  return congregacoes.find((congregacao) => congregacao.slug === slug) ?? null;
}
