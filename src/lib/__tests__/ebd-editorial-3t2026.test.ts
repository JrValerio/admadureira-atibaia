import { describe, expect, it } from "vitest";
import { trimestresEBDPorClasse } from "@/data/ebd";
import {
  getDiagnosticoProntidaoEditorialLicao,
  getEstadoProgressaoLicao,
} from "../ebd-utils";

describe("prontidao editorial do 3T2026", () => {
  for (const classe of ["jovens", "adultos"] as const) {
    it(`mantem todas as licoes de ${classe} completas e publicadas editorialmente`, () => {
      const trimestre = trimestresEBDPorClasse[classe].find(
        (item) => item.slug === "2026-3t"
      );

      expect(trimestre).toBeDefined();
      expect(trimestre?.statusEditorial).toBe("published");
      expect(trimestre?.licoes).toHaveLength(13);

      for (const licao of trimestre?.licoes ?? []) {
        const diagnostico = getDiagnosticoProntidaoEditorialLicao(
          trimestre!,
          licao
        );

        expect(licao.statusEditorial, licao.id).toBe("published");
        expect(diagnostico.pendencias, licao.id).toEqual([]);
        expect(diagnostico.pronta, licao.id).toBe(true);
      }
    });

    it(`preserva a janela publica das licoes futuras de ${classe}`, () => {
      const trimestre = trimestresEBDPorClasse[classe].find(
        (item) => item.slug === "2026-3t"
      )!;
      const licao5 = trimestre.licoes.find((licao) => licao.numero === 5)!;

      expect(
        getEstadoProgressaoLicao(
          trimestre,
          licao5,
          new Date("2026-07-21T12:00:00-03:00")
        )
      ).toBe("em-breve");
    });
  }
});
