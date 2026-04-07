import type { StatusEditorialEBD } from "@/data/ebd";

type QuarterStatusMetaOptions = {
  draftSubject?: "trimestre" | "edição";
};

export function getQuarterStatusMeta(
  status: StatusEditorialEBD,
  options: QuarterStatusMetaOptions = {}
) {
  const { draftSubject = "trimestre" } = options;
  const draftArticle = draftSubject === "edição" ? "Esta" : "Este";
  const draftSuffix = draftSubject === "edição" ? "a" : "o";

  if (status === "draft") {
    return {
      label: "Em preparação",
      badgeClassName: "border-black/10 bg-white text-[#666]",
      description: `${draftArticle} ${draftSubject} está sendo preparad${draftSuffix} e as lições serão disponibilizadas no tempo certo.`,
    };
  }

  if (status === "partial") {
    return {
      label: "Em publicação",
      badgeClassName: "border-[#ffa726]/25 bg-[#fff8ee] text-[#8b5b18]",
      description:
        "Este trimestre já começou e novas lições serão disponibilizadas ao longo do período.",
    };
  }

  return {
    label: "Publicado",
    badgeClassName: "border-[#ef5350]/12 bg-[#fff3f2] text-[#b0453f]",
    description:
      "Este trimestre já está disponível para acompanhamento contínuo da classe e consulta das lições publicadas.",
  };
}
