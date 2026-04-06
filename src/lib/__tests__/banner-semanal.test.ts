import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { tmpdir } from "os";
import { getBannerSemanal } from "../banner-semanal";

const ORIGINAL_CWD = process.cwd();

let tempDir = "";

function createWeeklyFile(relativePath: string) {
  const target = join(
    tempDir,
    "public",
    "programacao",
    "semanas",
    "2026-04-06",
    relativePath
  );

  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, "banner");
}

describe("getBannerSemanal", () => {
  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), "banner-semanal-"));
    process.chdir(tempDir);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    process.chdir(ORIGINAL_CWD);
    rmSync(tempDir, { recursive: true, force: true });
  });

  it("usa a segunda-feira da semana atual para resolver o banner semanal", () => {
    vi.setSystemTime(new Date("2026-04-12T15:00:00.000Z"));
    createWeeklyFile("culto-de-ensino.png");

    expect(getBannerSemanal("/programacao/culto-de-terca.png")).toBe(
      "/programacao/semanas/2026-04-06/culto-de-ensino.png"
    );
  });

  it("resolve arquivos com o mesmo nome padrão dentro da pasta semanal", () => {
    vi.setSystemTime(new Date("2026-04-06T15:00:00.000Z"));
    createWeeklyFile("reuniao-ministerial.png");

    expect(getBannerSemanal("/programacao/reuniao-ministerial.png")).toBe(
      "/programacao/semanas/2026-04-06/reuniao-ministerial.png"
    );
  });

  it("mantem o fallback padrao quando a arte da semana nao existe", () => {
    vi.setSystemTime(new Date("2026-04-06T15:00:00.000Z"));

    expect(getBannerSemanal("/programacao/curso-teologia.png")).toBe(
      "/programacao/curso-teologia.png"
    );
  });
});
