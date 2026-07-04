import { CONGRESSO_RIOS_DE_UNCAO_2026 as congressoRiosDeUncao } from "@/data/congresso-rios-de-uncao-2026";

export interface MinisterioDestaque {
  etiqueta: string;
  titulo: string;
  descricao: string;
  href: string;
  ctaLabel: string;
  detalhes?: string[];
}

export interface Ministerio {
  slug: string;
  nome: string;
  escopo: string;
  resumo: string;
  descricao: string[];
  lideranca?: string[];
  atividades?: string[];
  destaque?: MinisterioDestaque;
  imagem?: string;
}

const ministerios: Ministerio[] = [
  {
    slug: "missoes",
    nome: "Missões",
    escopo: "Local e apoio missionário",
    resumo:
      "Ministério voltado à oração, ao apoio missionário e ao fortalecimento da visão evangelística da igreja.",
    descricao: [
      "Missões reforça o compromisso da AD Madureira Atibaia com a oração, a proclamação do Evangelho e o apoio à obra missionária.",
      "Por meio desse ministério, a igreja é incentivada a interceder, contribuir e participar da expansão do Reino de Deus com fé e responsabilidade.",
    ],
    lideranca: ["Informações detalhadas serão adicionadas pela liderança da igreja"],
    atividades: [
      "Mobilização missionária e intercessão",
      "Orientação sobre contribuição missionária",
      "Espaço para relatórios, campanhas e pedidos de oração",
    ],
    imagem: "/images/igreja/culto/adoracao.jpg",
  },
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
    imagem: "/ministerios/confadat.jpg",
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
    imagem: "/ministerios/umadat.jpg",
  },
  {
    slug: "rios-de-uncao",
    nome: "Rios de Unção — Mocidade",
    escopo: "Local",
    resumo:
      "Ministério de jovens da AD Madureira Atibaia, dedicado à comunhão, adoração, ensino da Palavra, serviço cristão e crescimento espiritual da juventude.",
    descricao: [
      "A Mocidade Rios de Unção reúne adolescentes e jovens em uma caminhada de fé, comunhão e compromisso com Deus.",
      "Por meio de ensaios, cultos, congressos, participações nos trabalhos da igreja e momentos de ensino e comunhão, o ministério busca fortalecer a juventude na Palavra, incentivar o desenvolvimento dos dons e formar jovens comprometidos com Cristo e com a obra do Senhor.",
      "Mais do que um grupo de jovens, o Rios de Unção é um espaço de crescimento espiritual, amizade, serviço e despertamento para uma geração que deseja viver o propósito de Deus.",
    ],
    lideranca: [
      "Liderança espiritual: Pr. Zacarias Bernardes Félix e Pra. Anna Alzira — Presidentes do Campo de Atibaia",
      "Direção local do congresso e liderança de jovens: Valéria Monsão e Wilson Wallace",
      "Regência: Rebeca Monsão e Wilson Wallace — apoio musical da mocidade",
    ],
    atividades: [
      "Ensaios da mocidade",
      "Participação nos cultos da igreja",
      "Congressos e eventos especiais",
      "Momentos de comunhão e integração",
      "Louvor, adoração e serviço cristão",
      "Apoio às programações da igreja",
      "Crescimento bíblico e espiritual dos jovens",
    ],
    destaque: {
      etiqueta: "Evento especial",
      titulo: congressoRiosDeUncao.titulo,
      descricao: `Nos dias ${congressoRiosDeUncao.data}, às ${congressoRiosDeUncao.horario}, a Mocidade Rios de Unção realizará o Congresso da Mocidade com o tema “${congressoRiosDeUncao.tema}” — ${congressoRiosDeUncao.baseBiblica}.`,
      href: congressoRiosDeUncao.path,
      ctaLabel: "Ver informações do Congresso",
      detalhes: [
        `Data: ${congressoRiosDeUncao.data}`,
        `Horário: ${congressoRiosDeUncao.horario}`,
        `Local: ${congressoRiosDeUncao.local}`,
        `Endereço: ${congressoRiosDeUncao.endereco}`,
      ],
    },
    imagem: "/ministerios/rios-de-uncao.webp",
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
    imagem: "/ministerios/baluarte-de-fe.webp",
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
    imagem: "/ministerios/infantil.png",
  },
];

export function getMinisterios() {
  return ministerios;
}

export function getMinisterioBySlug(slug: string) {
  return ministerios.find((ministerio) => ministerio.slug === slug) ?? null;
}
