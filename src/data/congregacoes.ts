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
  resumo: string;
  mapsUrl?: string;
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
      "Quarta-feira – Culto – 19h30",
      "Sexta-feira – Culto – 19h30",
      "Domingo – Culto – 18h30",
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
    slug: "chacaras-brasil",
    igreja: "Assembleia de Deus Madureira Atibaia Chácaras Brasil",
    cidade: "Atibaia",
    pastor: "Ev. Levi Ribeiro Gonçalves",
    pastorSlug: "levi-ribeiro-goncalves",
    endereco: "Estrada do Ramalho, 765 – Jardim Estância Brasil – Atibaia/SP",
    telefone: "(11) 97245-1625",
    whatsappUrl: "https://wa.me/5511972451625",
    imagem: "/congregacoes/chacaras-brasil.jpg",
    resumo:
      "Congregação do Campo de Atibaia com mais de duas décadas de história, localizada no Jardim Estância Brasil. Seu ministério é marcado pela constância na sã doutrina, pelo cuidado às famílias e pela dedicação ao crescimento espiritual da comunidade local.",
    mapsUrl: "https://maps.app.goo.gl/RxfweskEKas989cs9",
    horarios: [
      "Segunda-feira – Culto – 19h30",
      "Terça-feira – Círculo de Oração e Ensaio das Irmãs – 19h30",
      "Quarta-feira – Culto – 19h30",
      "Quinta-feira – Culto – 19h30",
      "Sexta-feira – Culto – 19h30",
      "Sábado – Culto – 19h30",
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
];

export function getCongregacoes() {
  return congregacoes;
}

export function getCongregacaoBySlug(slug: string) {
  return congregacoes.find((congregacao) => congregacao.slug === slug) ?? null;
}
