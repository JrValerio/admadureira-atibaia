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
      title: "AD Madureira – Templo Sede | Congregações do Campo de Atibaia",
      description:
        "Conheça o Templo Sede da AD Madureira Atibaia, com endereço, horários de culto, liderança pastoral e informações de visitação.",
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
      },
    ],
    seo: {
      title: "Congregação Jardim Cerejeiras | AD Madureira Campo de Atibaia",
      description:
        "Conheça a Congregação Jardim Cerejeiras da AD Madureira Atibaia. Horários de culto, endereço e contato.",
    },
    localizacao: {
      bairro: "Jardim Cerejeiras",
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
