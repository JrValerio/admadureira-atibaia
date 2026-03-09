export type PastorGrupo = "presidencia" | "vice-presidencia";

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
}

const pastores: Pastor[] = [
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

