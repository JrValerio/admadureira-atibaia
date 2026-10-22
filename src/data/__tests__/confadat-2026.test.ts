import { execSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import nextConfig from "../../../next.config";
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

  it("anuncia uma preletora por noite, como nas artes de 22/10", () => {
    expect(confadat.noites.map((noite) => noite.preletora)).toEqual([
      "Missionária Adriane Medeiros",
      "Missionária Erinete Teodoro",
    ]);
    expect(confadat.preletoras.map((preletora) => preletora.nome)).toEqual(
      confadat.noites.map((noite) => noite.preletora)
    );
    expect(
      getEventoBySlug("confadat-congresso-das-irmas-27-11-2026")?.descricao
    ).toContain("Nesta noite a Palavra será ministrada pela Missionária e cantora Adriane Medeiros");
    expect(
      getEventoBySlug("confadat-congresso-das-irmas-28-11-2026")?.descricao
    ).toContain("Nesta noite a Palavra será ministrada pela Missionária Erinete Teodoro");
  });

  it.each([
    "confadat-congresso-das-irmas-27-11-2026",
    "confadat-congresso-das-irmas-28-11-2026",
  ])("a data %s da agenda aponta para a página oficial", (slug) => {
    const evento = getEventoBySlug(slug);

    expect(evento?.recursos?.map((recurso) => recurso.href)).toContain(confadat.path);
    expect(evento?.imagem).toBe(confadat.artes.feed);
  });

  it("o atalho /confadat leva à página oficial", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];

    expect(redirects).toContainEqual({
      source: confadat.atalho,
      destination: confadat.path,
      permanent: false,
    });
  });

  describe("playlist", () => {
    const HOST_DA_PLATAFORMA = {
      YouTube: "www.youtube.com",
      "YouTube Music": "music.youtube.com",
      Spotify: "open.spotify.com",
      "Apple Music": "music.apple.com",
    } as const;
    // Links copiados do app de compartilhar chegam com rastreio (si, utm_source, pi).
    const RASTREIO = /^(si|pi|utm_.+|feature|igsh|fbclid)$/;

    it.each(confadat.playlist.plataformas.map((plataforma) => [plataforma.nome, plataforma.href]))(
      "abre a playlist no %s pelo domínio da plataforma, sem rastreio",
      (nome, href) => {
        const url = new URL(href);

        expect(url.protocol).toBe("https:");
        expect(url.host).toBe(HOST_DA_PLATAFORMA[nome as keyof typeof HOST_DA_PLATAFORMA]);
        expect([...url.searchParams.keys()].filter((chave) => RASTREIO.test(chave))).toEqual([]);
      }
    );

    it("YouTube e YouTube Music abrem a mesma playlist do canal", () => {
      const listas = confadat.playlist.plataformas
        .filter((plataforma) => plataforma.nome.startsWith("YouTube"))
        .map((plataforma) => new URL(plataforma.href).searchParams.get("list"));

      expect(listas).toHaveLength(2);
      expect(listas[0]).toBeTruthy();
      expect(listas[1]).toBe(listas[0]);
    });

    it("destaca uma única plataforma", () => {
      expect(confadat.playlist.plataformas.filter((plataforma) => plataforma.principal)).toHaveLength(1);
    });
  });
});
