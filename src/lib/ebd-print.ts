import type { ClasseEBD } from "@/data/ebd";
import {
  CHURCH_FIELD_NAME,
  CHURCH_OFFICIAL_NAME,
  CHURCH_SCRIPT_NAME,
  SEDE_ADDRESS_PRINT,
  SEDE_CONTACT,
} from "@/data/site";
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
  officialName: CHURCH_OFFICIAL_NAME,
  scriptName: CHURCH_SCRIPT_NAME,
  subtitle: `Ministério Madureira · ${CHURCH_FIELD_NAME}`,
  addressLine: SEDE_ADDRESS_PRINT,
  phone: SEDE_CONTACT.whatsappDisplay,
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
