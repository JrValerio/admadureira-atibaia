import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getMinisterios } from "@/data/ministerios";

// Arquivo que existe no disco mas não foi versionado passa localmente e quebra
// em produção (já aconteceu com as artes da Vigília e da Entrevista). Com git
// disponível, a checagem é contra os arquivos versionados; sem git, contra o disco.
function versionados(): Set<string> | null {
  try {
    return new Set(execSync("git ls-files public", { encoding: "utf-8" }).split("\n").filter(Boolean));
  } catch {
    return null;
  }
}

describe("ministérios: imagens referenciadas existem em public/", () => {
  const git = versionados();
  const existe = (caminho: string) =>
    git ? git.has(`public${caminho}`) : existsSync(path.join(process.cwd(), "public", caminho));

  for (const ministerio of getMinisterios()) {
    it(`${ministerio.slug}: imagem e foto da liderança`, () => {
      const caminhos = [ministerio.imagem, ministerio.liderancaDestaque?.foto].filter(
        (caminho): caminho is string => Boolean(caminho)
      );
      for (const caminho of caminhos) {
        expect(existe(caminho), `${caminho} ${git ? "não versionado" : "não encontrado"}`).toBe(true);
      }
    });
  }
});
