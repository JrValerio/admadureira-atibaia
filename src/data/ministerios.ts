import type { ConteudoRelacionadoLink } from "@/data/agenda-types";

export interface MinisterioDestaque {
  etiqueta: string;
  titulo: string;
  descricao: string;
  href: string;
  ctaLabel: string;
  detalhes?: string[];
}

export interface MinisterioLiderancaDestaque {
  nome: string;
  cargo: string;
  /** Retrato em public/; o enquadramento fica no componente, sem editar o arquivo. */
  foto: string;
}

export interface MinisterioRecursos {
  titulo: string;
  itens: ConteudoRelacionadoLink[];
}

export interface Ministerio {
  slug: string;
  nome: string;
  /** Nome para espaços estreitos (card do grid e breadcrumb); o nome completo segue no H1, no title e no JSON-LD. */
  nomeCurto?: string;
  escopo: string;
  resumo: string;
  descricao: string[];
  lideranca?: string[];
  atividades?: string[];
  destaque?: MinisterioDestaque;
  imagem?: string;
  liderancaDestaque?: MinisterioLiderancaDestaque;
  recursos?: MinisterioRecursos;
  redes?: {
    instagram?: string;
  };
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
    imagem: "/ministerios/confadat/confadat-2025-youtube.png",
  },
  {
    slug: "umadat",
    nome: "UMADAT – União de Mocidade da Assembleia de Deus Madureira do Campo de Atibaia",
    nomeCurto: "UMADAT – Jovens Campo de Atibaia",
    escopo: "Campo de Atibaia",
    resumo:
      "A juventude das congregações do Campo de Atibaia unida em adoração, comunhão, discipulado e serviço, com o Congresso Geral anual na sede.",
    descricao: [
      "A UMADAT — União de Mocidade da Assembleia de Deus Madureira do Campo de Atibaia — reúne os jovens de todas as congregações do campo. Sob a cobertura pastoral do Pr. Zacarias Bernardes Félix e da Pra. Anna Alzira, presidentes do Campo de Atibaia, e com a direção do Pr. Mathias Nascimento, a mocidade caminha unida em adoração, comunhão e compromisso com a Palavra.",
      "Ao longo do ano, a UMADAT promove encontros entre as mocidades das congregações e realiza o Congresso Geral, que reúne a juventude do campo na sede, em Atibaia, para dias de louvor, ministração da Palavra e consagração.",
      "Mais do que eventos, a proposta é formar jovens firmes na fé, que conheçam a Palavra, sirvam na igreja local e testemunhem de Cristo onde estiverem.",
      "Em 2025, o Congresso Geral teve como tema “Atraídos pela Cruz”, com base em 1 Coríntios 1:18, nos dias 24 e 25 de outubro. A Palavra foi ministrada pelo Pb. Diogo Almeida e pelo Pr. Rafael Bello, com louvor de Renildo Tavares.",
    ],
    lideranca: [
      "Cobertura pastoral: Pr. Zacarias Bernardes Félix e Pra. Anna Alzira — Presidentes do Campo de Atibaia",
    ],
    liderancaDestaque: {
      nome: "Pr. Mathias Nascimento",
      cargo: "Presidente da UMADAT",
      foto: "/pastores/pr-mathias-nascimento.jpg",
    },
    atividades: [
      "Congressos e encontros de juventude",
      "Comunhão entre jovens das congregações",
      "Atividades de discipulado e serviço cristão",
    ],
    destaque: {
      etiqueta: "Congresso UMADAT 2026",
      titulo: "O que darei eu ao Senhor?",
      descricao:
        "A identidade da UMADAT 2026 nasce da pergunta do salmista: “Que darei eu ao Senhor por todos os benefícios que me tem feito?” (Salmos 116:12). As mãos abertas da arte oficial expressam os dois lados dessa pergunta: recebemos de Deus a graça, os dons, as oportunidades e a própria vida, e somos chamados a responder com gratidão, adoração, disponibilidade e entrega. Depois de tudo o que Deus fez por mim, qual será a minha resposta?",
      detalhes: [
        "23 e 24 de outubro de 2026",
        "Sexta às 19h30 e sábado às 19h",
        "Igreja Sede — Praça Pio XII, 122 — Centro — Atibaia/SP",
        "Base bíblica: Salmos 116:12-14",
      ],
      href: "/eventos/congresso-geral-umadat-jovem-23-10-2026",
      ctaLabel: "Ver programação do congresso",
    },
    recursos: {
      titulo: "Assista ao Congresso 2025",
      itens: [
        {
          label: "Congresso UMADAT 2025 — 1ª noite",
          href: "https://www.youtube.com/live/10U_dsUWXZU",
          descricao: "Palavra com o Pb. Diogo Almeida.",
        },
        {
          label: "Congresso UMADAT 2025 — 2ª noite",
          href: "https://www.youtube.com/live/NUOkvhMBoy4",
          descricao: "Palavra com o Pr. Rafael Bello.",
        },
      ],
    },
    redes: {
      instagram: "https://www.instagram.com/umadat_atibaia/",
    },
    imagem: "/ministerios/umadat/umadat-2026-youtube.png",
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
    imagem: "/ministerios/rios-de-uncao/rios-de-uncao-2026-youtube.png",
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
    imagem: "/ministerios/baluarte-da-fe/baluarte-da-fe-2026-youtube.png",
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
    imagem: "/ministerios/infantil/infantil-2026-youtube.png",
  },
];

export function getMinisterios() {
  return ministerios;
}

export function getMinisterioBySlug(slug: string) {
  return ministerios.find((ministerio) => ministerio.slug === slug) ?? null;
}
