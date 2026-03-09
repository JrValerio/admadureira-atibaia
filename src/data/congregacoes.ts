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
}

const congregacoes: Congregacao[] = [
  {
    slug: "atibaia-sede",
    igreja: "AD Madureira – Templo Sede",
    cidade: "Atibaia",
    pastor: "Pr. Dr. Zacarias Bernardes Félix",
    pastorSlug: "zacarias-bernardes-felix",
    endereco: "Praça Pio XII, 122 – Centro – Atibaia/SP",
    telefone: "(11) 91611-6102",
    whatsappUrl:
      "https://wa.me/5511916116102?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20a%20congregação.",
    imagem: "/fachada-da-igreja.jpg",
    resumo:
      "O Templo Sede da AD Madureira Atibaia é o coração do Campo de Atibaia, reunindo cultos, ensino bíblico, discipulado e ações de cuidado pastoral voltadas à cidade e à região.",
    mapsUrl:
      "https://maps.google.com/?q=Praça+Pio+XII,+122,+Centro,+Atibaia,+SP",
    horarios: [
      "Segunda a Sexta · 06h00 – 07h00 · Oração Matinal",
      "Segunda · 19h30 · Curso de Teologia",
      "Terça · 19h30 · Culto de Ensino",
      "Quarta · 09h00 · Consagração",
      "Quarta · 15h00 · Círculo de Oração",
      "Quarta · 19h00 · Ensaio das Irmãs",
      "Quinta · 19h30 · Quinta da Vitória",
      "Sexta · 14h30 · Tarde de Libertação",
      "Domingo · 08h00 · Oração Matinal",
      "Domingo · 09h00 · Escola Bíblica Dominical",
      "Domingo · 11h00 · Ensaio Jovens Rios de Unção",
      "Domingo · 18h30 · Culto da Família",
    ],
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
  },
];

export function getCongregacoes() {
  return congregacoes;
}

export function getCongregacaoBySlug(slug: string) {
  return congregacoes.find((congregacao) => congregacao.slug === slug) ?? null;
}

