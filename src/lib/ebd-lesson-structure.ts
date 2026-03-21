import type {
  ClasseEBDInfo,
  LeituraDiariaItem,
  LeituraSemanalItem,
  LicaoEBD,
  LicaoEstruturaAdultos,
  LicaoEstruturaJovens,
  LicaoEstruturaPorClasse,
  ListaItem,
  TrimestreEBD,
} from "@/data/ebd";

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
