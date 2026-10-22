import { execSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getEventoBySlug } from "@/lib/agenda-utils";
import { CONFADAT_2026 as confadat } from "../confadat-2026";

function resolvePublicAsset(assetPath: string) {
  return path.join(process.cwd(), "public", assetPath.replace(/^\/+/, ""));
}

// Arquivo que existe no disco mas não foi versionado passa localmente e quebra
// em produção. Com git disponível, a checagem é contra os arquivos versionados.
function versionados(): Set<string> | null {
  try {
    return new Set(
      execSync("git ls-files public", { encoding: "utf-8" }).split("\n").filter(Boolean)
    );
  } catch {
    return null;
  }
}

function getPngDimensions(assetPath: string) {
  const buffer = readFileSync(resolvePublicAsset(assetPath));

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

describe("CONFADAT_2026", () => {
  const git = versionados();

  it.each([
    ["arte do feed", confadat.artes.feed],
    ["imagem de compartilhamento", confadat.artes.og],
    ["banner da home", confadat.artes.banner],
  ])("versiona em public o arquivo de %s", (_label, assetPath) => {
    const existe = git
      ? git.has(`public${assetPath}`)
      : existsSync(resolvePublicAsset(assetPath));

    expect(existe, `${assetPath} ${git ? "não versionado" : "não encontrado"}`).toBe(true);
  });

  it("usa o feed 4:5 e a faixa 3:1 nas medidas do carrossel", () => {
    expect(getPngDimensions(confadat.artes.feed)).toEqual({ width: 1080, height: 1350 });
    expect(getPngDimensions(confadat.artes.banner)).toEqual({ width: 2172, height: 724 });
  });

  it("mantém a imagem de compartilhamento leve para a prévia do WhatsApp", () => {
    expect(statSync(resolvePublicAsset(confadat.artes.og)).size).toBeLessThan(200 * 1024);
  });

  it("cobre as duas noites entre o início e o fim do congresso", () => {
    const [primeira, segunda] = confadat.noites;

    expect(confadat.noites).toHaveLength(2);
    expect(primeira.inicioIso).toBe(confadat.inicioIso);
    expect(segunda.fimIso).toBe(confadat.fimIso);
    expect(Date.parse(primeira.fimIso)).toBeLessThan(Date.parse(segunda.inicioIso));
  });

  it.each([
    "confadat-congresso-das-irmas-27-11-2026",
    "confadat-congresso-das-irmas-28-11-2026",
  ])("a data %s da agenda aponta para a página oficial", (slug) => {
    const evento = getEventoBySlug(slug);

    expect(evento?.recursos?.map((recurso) => recurso.href)).toContain(confadat.path);
    expect(evento?.imagem).toBe(confadat.artes.feed);
  });
});
