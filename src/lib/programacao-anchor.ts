type ProgramacaoAnchorInput = {
  dia: string;
  titulo: string;
};

function normalizeAnchorText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProgramacaoAnchorId({
  dia,
  titulo,
}: ProgramacaoAnchorInput) {
  return normalizeAnchorText(`${dia}-${titulo}`);
}

export function getProgramacaoHref(input: ProgramacaoAnchorInput) {
  return `/programacao#${getProgramacaoAnchorId(input)}`;
}
