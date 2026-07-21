import { editoriaisJovens3TLicoes1a4 } from "./licoes-1-4";
import { editoriaisJovens3TLicoes5a8 } from "./licoes-5-8";
import { editoriaisJovens3TLicoes9a13 } from "./licoes-9-13";
import type { EditorialJovens3T } from "../jovens-2026-3t-editorial";

const editoriais = [
  ...editoriaisJovens3TLicoes1a4,
  ...editoriaisJovens3TLicoes5a8,
  ...editoriaisJovens3TLicoes9a13,
];

export const editoriaisJovensTerceiroTrimestre = Object.fromEntries(
  editoriais.map((editorial) => [editorial.numero, editorial]),
) as Record<number, EditorialJovens3T>;
