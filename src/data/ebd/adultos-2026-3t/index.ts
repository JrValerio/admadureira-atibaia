import { editoriaisAdultos3TLicoes1a4 } from "./licoes-1-4";
import { editoriaisAdultos3TLicoes5a8 } from "./licoes-5-8";
import { editoriaisAdultos3TLicoes9a13 } from "./licoes-9-13";
import type { EditorialAdultos3T } from "../adultos-2026-3t-editorial";

const editoriais = [
  ...editoriaisAdultos3TLicoes1a4,
  ...editoriaisAdultos3TLicoes5a8,
  ...editoriaisAdultos3TLicoes9a13,
];

export const editoriaisAdultosTerceiroTrimestre = Object.fromEntries(
  editoriais.map((editorial) => [editorial.numero, editorial]),
) as Record<number, EditorialAdultos3T>;
