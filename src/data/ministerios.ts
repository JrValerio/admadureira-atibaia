export interface Ministerio {
  slug: string;
  nome: string;
  escopo: string;
  resumo: string;
  descricao: string[];
  lideranca?: string[];
  atividades?: string[];
  imagem?: string;
  icone?: string;
}

const ministerios: Ministerio[] = [
  {
    slug: "confadat",
    nome: "CONFADAT – Mulheres Campo de Atibaia",
    escopo: "Campo de Atibaia",
    resumo:
      "Departamento feminino do campo, dedicado à comunhão, ao discipulado, à oração e ao fortalecimento espiritual das mulheres.",
    descricao: [
      "A CONFADAT reúne as mulheres do Campo de Atibaia em um trabalho voltado à edificação espiritual, ao cuidado pastoral e ao fortalecimento da comunhão cristã.",
      "Por meio de cultos, encontros e ações ministeriais, o departamento incentiva a vida de oração, o serviço cristão e a participação ativa das irmãs na obra de Deus.",
    ],
    lideranca: ["Liderança feminina do Campo de Atibaia"],
    atividades: [
      "Cultos e encontros das mulheres do campo",
      "Ações de comunhão, discipulado e oração",
      "Participação em congressos e eventos especiais",
    ],
    imagem: "/programacao/culto-para-mulheres.jpg",
    icone: "👑",
  },
  {
    slug: "umadat",
    nome: "UMADAT – Jovens Campo de Atibaia",
    escopo: "Campo de Atibaia",
    resumo:
      "Departamento jovem do campo, voltado ao discipulado, à comunhão e ao fortalecimento espiritual da juventude.",
    descricao: [
      "A UMADAT reúne a juventude do Campo de Atibaia em uma caminhada de fé, adoração, serviço cristão e comunhão entre congregações.",
      "O departamento promove encontros, congressos e ações que incentivam os jovens a crescer no conhecimento da Palavra e no compromisso com a obra de Deus.",
    ],
    lideranca: ["Liderança da juventude do Campo de Atibaia"],
    atividades: [
      "Congressos e encontros de juventude",
      "Comunhão entre jovens das congregações",
      "Atividades de discipulado e serviço cristão",
    ],
    imagem: "/programacao/culto-de-jovens.png",
    icone: "🔥",
  },
  {
    slug: "rios-de-uncao",
    nome: "Rios de Unção – Jovens",
    escopo: "Local",
    resumo:
      "Grupo local da juventude da igreja, voltado à comunhão, ao louvor e ao crescimento espiritual dos jovens.",
    descricao: [
      "Rios de Unção é o ministério local de jovens da igreja, reunindo adolescentes e jovens em uma caminhada de fé, comunhão e serviço cristão.",
      "Por meio de ensaios, cultos e atividades próprias, os jovens são incentivados a desenvolver sua vocação, amadurecer espiritualmente e participar da vida da igreja.",
    ],
    lideranca: ["Liderança local da juventude"],
    atividades: [
      "Ensaios de jovens e preparação ministerial",
      "Participação nos cultos e eventos da igreja",
      "Momentos de comunhão, ensino bíblico e discipulado",
    ],
    imagem: "/programacao/ensaio-jovens.png",
    icone: "🌊",
  },
  {
    slug: "baluarte-da-fe",
    nome: "Baluarte da Fé – Mulheres",
    escopo: "Local",
    resumo:
      "Departamento local de mulheres, dedicado à oração, à comunhão e ao fortalecimento espiritual das irmãs da igreja.",
    descricao: [
      "Baluarte da Fé reúne as mulheres da igreja local em um ministério de intercessão, acolhimento e edificação cristã.",
      "O departamento participa ativamente dos cultos, encontros e ações femininas, fortalecendo famílias e apoiando a vida espiritual da igreja.",
    ],
    lideranca: ["Liderança local do departamento feminino"],
    atividades: [
      "Cultos e encontros femininos",
      "Momentos de oração e comunhão",
      "Apoio às ações espirituais e sociais da igreja",
    ],
    imagem: "/programacao/consagracao-mulheres.png",
    icone: "🛡️",
  },
  {
    slug: "infantil",
    nome: "Infantil",
    escopo: "Local",
    resumo:
      "Ministério voltado ao cuidado espiritual das crianças, ensinando a Palavra de Deus desde os primeiros anos.",
    descricao: [
      "O ministério infantil busca formar vidas desde a infância, transmitindo os princípios bíblicos com carinho, responsabilidade e linguagem adequada para cada faixa etária.",
      "Por meio de ensino, acolhimento e atividades próprias, as crianças são incentivadas a crescer no conhecimento da Palavra e na vida cristã.",
    ],
    lideranca: ["Equipe do ministério infantil e apoio da EBD"],
    atividades: [
      "Ensino bíblico para crianças",
      "Participação em atividades da Escola Bíblica Dominical",
      "Ações de acolhimento e formação cristã infantil",
    ],
    imagem: "/programacao/EBD.png",
    icone: "🌱",
  },
];

export function getMinisterios() {
  return ministerios;
}

export function getMinisterioBySlug(slug: string) {
  return ministerios.find((ministerio) => ministerio.slug === slug) ?? null;
}
