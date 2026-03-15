import type { ClasseEBD } from "@/data/ebd";
import {
  getClassesEbdPublicadas,
  getLicao,
  getTrimestresEbdPublicos,
  isClasseEbd,
  isLicaoPublished,
  isTrimestreDraft,
} from "@/lib/ebd-utils";

export type EbdPrintMode = "pdf-resumo" | "pdf-completo";

export const EBD_PRINT_BRANDING = {
  officialName: "Igreja Assembleia de Deus - Ministério Madureira",
  scriptName: "Assembleia de Deus",
  subtitle: "Ministério Madureira · Campo de Atibaia",
  addressLine: "Praça Pio XII, 122 · Centro · Atibaia/SP · CEP 12940-160",
  phone: "(11) 91611-6102",
  logoSrc: "/logo-transparent.png",
};

export function getEbdPrintRoute(
  classe: ClasseEBD,
  edicao: string,
  licao: string,
  mode: EbdPrintMode
) {
  return `/ebd/${classe}/${edicao}/${licao}/${mode}`;
}

export function getEbdPrintStaticParams() {
  return getClassesEbdPublicadas().flatMap((classe) =>
    getTrimestresEbdPublicos(classe.slug).flatMap((trimestre) =>
      trimestre.licoes
        .filter((licao) => isLicaoPublished(licao))
        .map((licao) => ({
          classe: classe.slug,
          edicao: trimestre.slug,
          licao: licao.slug,
        }))
    )
  );
}

export function getPublishedEbdPrintLesson(
  classe: string,
  edicao: string,
  licaoSlug: string
) {
  if (!isClasseEbd(classe)) {
    return null;
  }

  const lessonContext = getLicao(classe, edicao, licaoSlug);

  if (
    !lessonContext ||
    isTrimestreDraft(lessonContext.trimestre) ||
    !isLicaoPublished(lessonContext.licao)
  ) {
    return null;
  }

  return lessonContext;
}
