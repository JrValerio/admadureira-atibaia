import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CULTO_ACOES_DE_GRACAS_05_09_2026 as culto } from "../culto-acoes-de-gracas-05-09-2026";

function resolvePublicAsset(assetPath: string) {
  return path.join(process.cwd(), "public", assetPath.replace(/^\/+/, ""));
}

function getPngDimensions(assetPath: string) {
  const buffer = readFileSync(resolvePublicAsset(assetPath));

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

describe("CULTO_ACOES_DE_GRACAS_05_09_2026", () => {
  it.each([
    ["arte", culto.imagem],
    ["banner", culto.banner],
    ["hero", culto.hero],
    ["imagem de compartilhamento", culto.heroShare],
    ["foto do pastor", culto.preletor.foto],
  ])("aponta para %s existente em public", (_label, assetPath) => {
    expect(existsSync(resolvePublicAsset(assetPath))).toBe(true);
  });

  it("usa a arte vertical e o banner horizontal corretos", () => {
    expect(getPngDimensions(culto.imagem)).toEqual({
      width: 1080,
      height: 1350,
    });
    expect(getPngDimensions(culto.banner)).toEqual({
      width: 2172,
      height: 724,
    });
  });
});
