import type {
  ClasseEBDInfo,
  DiagnosticoProntidaoEditorialLicaoEBD,
  ItemChecklistProntidaoEditorialEBD,
  LeituraDiariaItem,
  LeituraSemanalItem,
  LicaoEBD,
  LicaoEstruturaAdultos,
  LicaoEstruturaJovens,
  LicaoEstruturaPorClasse,
  ListaItem,
  TrimestreEBD,
} from "@/data/ebd";

function hasTextContent(value?: string | null) {
  return Boolean(value?.trim());
}

function hasValidLessonDate(value?: string | null) {
  if (typeof value !== "string") {
    return false;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue || !/^\d{4}-\d{2}-\d{2}$/.test(normalizedValue)) {
    return false;
  }

  return !Number.isNaN(new Date(`${normalizedValue}T12:00:00-03:00`).getTime());
}

function hasStringListContent(items?: string[] | null) {
  return Boolean(items?.some((item) => hasTextContent(item)));
}

function hasListaItemContent(items?: ListaItem[] | null) {
  return Boolean(
    items?.some(
      (item) => hasTextContent(item.titulo) || hasTextContent(item.conteudo)
    )
  );
}

function hasLeituraDiariaContent(items?: LeituraDiariaItem[] | null) {
  return Boolean(
    items?.some(
      (item) => hasTextContent(item.dia) && hasTextContent(item.referencia)
    )
  );
}

function hasLeituraSemanalContent(items?: LeituraSemanalItem[] | null) {
  return Boolean(
    items?.some(
      (item) => hasTextContent(item.dia) && hasTextContent(item.referencia)
    )
  );
}

function buildEditorialReadiness(
  checklist: ItemChecklistProntidaoEditorialEBD[]
): DiagnosticoProntidaoEditorialLicaoEBD {
  const pendencias = checklist
    .filter((item) => !item.concluido)
    .map((item) => item.label);

  return {
    pronta: pendencias.length === 0,
    checklist,
    pendencias,
  };
}

function topicosToListaItems(licao: LicaoEBD): ListaItem[] {
  return licao.topicos.map((topico) => ({
    titulo: topico.titulo,
    conteudo:
      topico.conteudo[0] ??
      "Desenvolva este tópico em aula com base bíblica e aplicação prática.",
  }));
}

function buildLessonHeader(
  classeInfo: ClasseEBDInfo,
  trimestre: Pick<TrimestreEBD, "rotulo">,
  licao: Pick<LicaoEBD, "numero" | "data" | "titulo">
) {
  return {
    numero: licao.numero,
    data: licao.data,
    titulo: licao.titulo,
    trimestre: trimestre.rotulo,
    classe: classeInfo.label,
    classeSlug: classeInfo.slug,
  } as const;
}

export function getAdultLessonStructure(
  classeInfo: ClasseEBDInfo,
  trimestre: Pick<TrimestreEBD, "rotulo">,
  licao: LicaoEBD
): LicaoEstruturaAdultos {
  const subsidio = licao.subsidioAdultos;

  return {
    tipo: "adultos",
    topo: buildLessonHeader(classeInfo, trimestre, licao),
    resumo: licao.resumo,
    aplicacao: licao.aplicacao,
    textoAureo: subsidio?.cabecalho.textoAureo ?? licao.textoChave,
    verdadePratica:
      subsidio?.cabecalho.verdadePratica ?? licao.verdadePratica ?? licao.resumo,
    leituraBiblicaEmClasse:
      subsidio?.cabecalho.leituraBiblicaEmClasse ?? licao.leituraBiblica,
    leituraDiaria: subsidio?.cabecalho.leituraDiaria ?? [],
    hinosSugeridos: subsidio?.cabecalho.hinosSugeridos ?? [],
    objetivos: subsidio?.visaoGeral.objetivos ?? licao.objetivos,
    apoioProfessor: licao.apoioProfessor ?? [],
    apoioAluno: licao.apoioAluno ?? [],
    esboco: licao.esboco?.length ? licao.esboco : topicosToListaItems(licao),
  };
}

export function getYoungLessonStructure(
  classeInfo: ClasseEBDInfo,
  trimestre: Pick<TrimestreEBD, "rotulo">,
  licao: LicaoEBD
): LicaoEstruturaJovens {
  const subsidio = licao.subsidioJovens;

  return {
    tipo: "jovens",
    topo: buildLessonHeader(classeInfo, trimestre, licao),
    resumo: licao.resumo,
    aplicacao: licao.aplicacao,
    textoPrincipal: subsidio?.cabecalho.textoPrincipal ?? licao.textoChave,
    resumoDaLicao:
      subsidio?.cabecalho.resumoDaLicao ?? licao.verdadePratica ?? licao.resumo,
    textoBiblico: licao.leituraBiblica,
    leituraSemanal: subsidio?.cabecalho.leituraSemanal ?? [],
    objetivos: subsidio?.arranquePedagogico.objetivos ?? licao.objetivos,
    interacao: subsidio?.arranquePedagogico.interacao,
    orientacaoPedagogica: subsidio?.arranquePedagogico.orientacaoPedagogica,
    horaDaRevisao: subsidio?.revisao?.horaDaRevisao ?? [],
    apoioProfessor: licao.apoioProfessor ?? [],
    apoioAluno: licao.apoioAluno ?? [],
    esboco: licao.esboco?.length ? licao.esboco : topicosToListaItems(licao),
  };
}

export function getLessonStructure(
  classeInfo: ClasseEBDInfo,
  trimestre: Pick<TrimestreEBD, "rotulo">,
  licao: LicaoEBD
): LicaoEstruturaPorClasse | null {
  if (classeInfo.slug === "adultos") {
    return getAdultLessonStructure(classeInfo, trimestre, licao);
  }

  if (classeInfo.slug === "jovens") {
    return getYoungLessonStructure(classeInfo, trimestre, licao);
  }

  return null;
}

export function getLessonPrimaryText(
  structure: LicaoEstruturaPorClasse | null
) {
  if (!structure) {
    return null;
  }

  return structure.tipo === "adultos"
    ? structure.textoAureo
    : structure.textoPrincipal;
}

export function getLessonHighlightText(
  structure: LicaoEstruturaPorClasse | null
) {
  if (!structure) {
    return null;
  }

  return structure.tipo === "adultos"
    ? structure.verdadePratica
    : structure.resumoDaLicao;
}

export function getLessonPrimaryReading(
  structure: LicaoEstruturaPorClasse | null
) {
  if (!structure) {
    return [];
  }

  return structure.tipo === "adultos"
    ? structure.leituraBiblicaEmClasse
    : structure.textoBiblico;
}

export function getLessonWeeklyReading(
  structure: LicaoEstruturaPorClasse | null
): LeituraDiariaItem[] | LeituraSemanalItem[] {
  if (!structure) {
    return [];
  }

  return structure.tipo === "adultos"
    ? structure.leituraDiaria
    : structure.leituraSemanal;
}

export function getLessonObjectives(
  structure: LicaoEstruturaPorClasse | null
) {
  return structure?.objetivos ?? [];
}

export function getAdultLessonEditorialReadiness(
  classeInfo: ClasseEBDInfo,
  trimestre: Pick<TrimestreEBD, "rotulo">,
  licao: LicaoEBD
): DiagnosticoProntidaoEditorialLicaoEBD {
  const structure = getAdultLessonStructure(classeInfo, trimestre, licao);
  const hasPedagogicalBlock =
    hasStringListContent(structure.objetivos) ||
    hasStringListContent(structure.apoioProfessor) ||
    hasStringListContent(structure.apoioAluno) ||
    hasListaItemContent(structure.esboco) ||
    Boolean(licao.subsidioAdultos?.desenvolvimento?.length);

  return buildEditorialReadiness([
    {
      key: "titulo",
      label: "Título da lição",
      concluido: hasTextContent(licao.titulo),
    },
    {
      key: "data",
      label: "Data da lição",
      concluido: hasValidLessonDate(licao.data),
    },
    {
      key: "resumo",
      label: "Resumo da lição",
      concluido: hasTextContent(structure.resumo),
    },
    {
      key: "texto-aureo",
      label: "Texto áureo ou equivalente",
      concluido: hasTextContent(structure.textoAureo),
    },
    {
      key: "verdade-pratica",
      label: "Verdade prática",
      concluido: hasTextContent(structure.verdadePratica),
    },
    {
      key: "leitura-diaria",
      label: "Leitura diária",
      concluido: hasLeituraDiariaContent(structure.leituraDiaria),
    },
    {
      key: "leitura-biblica-em-classe",
      label: "Leitura bíblica em classe",
      concluido: hasStringListContent(structure.leituraBiblicaEmClasse),
    },
    {
      key: "aplicacao",
      label: "Aplicação da lição",
      concluido: hasTextContent(structure.aplicacao),
    },
    {
      key: "bloco-pedagogico-util",
      label: "Bloco pedagógico útil",
      concluido: hasPedagogicalBlock,
    },
  ]);
}

export function getYoungLessonEditorialReadiness(
  classeInfo: ClasseEBDInfo,
  trimestre: Pick<TrimestreEBD, "rotulo">,
  licao: LicaoEBD
): DiagnosticoProntidaoEditorialLicaoEBD {
  const structure = getYoungLessonStructure(classeInfo, trimestre, licao);
  const hasPedagogicalBlock =
    hasStringListContent(structure.objetivos) ||
    hasTextContent(structure.interacao) ||
    hasTextContent(structure.orientacaoPedagogica) ||
    hasStringListContent(structure.horaDaRevisao) ||
    hasStringListContent(structure.apoioProfessor) ||
    hasStringListContent(structure.apoioAluno) ||
    hasListaItemContent(structure.esboco) ||
    Boolean(licao.subsidioJovens?.desenvolvimento?.length);

  return buildEditorialReadiness([
    {
      key: "titulo",
      label: "Título da lição",
      concluido: hasTextContent(licao.titulo),
    },
    {
      key: "data",
      label: "Data da lição",
      concluido: hasValidLessonDate(licao.data),
    },
    {
      key: "resumo",
      label: "Resumo da lição",
      concluido: hasTextContent(structure.resumo),
    },
    {
      key: "texto-principal",
      label: "Texto principal",
      concluido: hasTextContent(structure.textoPrincipal),
    },
    {
      key: "leitura-semanal",
      label: "Leitura semanal",
      concluido: hasLeituraSemanalContent(structure.leituraSemanal),
    },
    {
      key: "texto-biblico",
      label: "Texto bíblico",
      concluido: hasStringListContent(structure.textoBiblico),
    },
    {
      key: "bloco-pedagogico-util",
      label: "Bloco pedagógico útil",
      concluido: hasPedagogicalBlock,
    },
  ]);
}

export function hasRitmoSemana(structure: LicaoEstruturaPorClasse): boolean {
  return structure.tipo === "adultos"
    ? structure.leituraDiaria.length > 0 || structure.hinosSugeridos.length > 0
    : structure.leituraSemanal.length > 0;
}

export function hasPlanejamento(structure: LicaoEstruturaPorClasse): boolean {
  return structure.tipo === "adultos"
    ? structure.apoioProfessor.length > 0 ||
        structure.apoioAluno.length > 0 ||
        structure.esboco.length > 0
    : !!(structure.interacao) ||
        !!(structure.orientacaoPedagogica) ||
        structure.horaDaRevisao.length > 0 ||
        structure.apoioProfessor.length > 0 ||
        structure.apoioAluno.length > 0 ||
        structure.esboco.length > 0;
}

export type LicaoTocItem = {
  id: string;
  label: string;
};

export function getLicaoTocItems(
  structure: LicaoEstruturaPorClasse | null,
  licao: LicaoEBD,
  classe: string
): LicaoTocItem[] {
  if (!structure) return [];

  const items: LicaoTocItem[] = [{ id: "base-licao", label: "Base da lição" }];

  if (hasRitmoSemana(structure)) {
    items.push({ id: "ritmo-semana", label: "Ritmo da semana" });
  }

  if (hasPlanejamento(structure)) {
    items.push({ id: "planejamento-aula", label: "Planejamento da aula" });
  }

  const subsidio =
    classe === "adultos"
      ? licao.subsidioAdultos
      : classe === "jovens"
        ? licao.subsidioJovens
        : null;

  if (subsidio) {
    items.push({
      id: "subsidio-do-professor",
      label:
        classe === "adultos" ? "Subsídio do professor" : "Roteiro do professor",
    });
  }

  return items;
}

export function getLessonEditorialReadiness(
  classeInfo: ClasseEBDInfo,
  trimestre: Pick<TrimestreEBD, "rotulo">,
  licao: LicaoEBD
): DiagnosticoProntidaoEditorialLicaoEBD {
  if (classeInfo.slug === "adultos") {
    return getAdultLessonEditorialReadiness(classeInfo, trimestre, licao);
  }

  if (classeInfo.slug === "jovens") {
    return getYoungLessonEditorialReadiness(classeInfo, trimestre, licao);
  }

  return buildEditorialReadiness([
    {
      key: "classe-nao-configurada",
      label: "Classe sem checklist editorial configurado",
      concluido: false,
    },
  ]);
}
