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

// Lê largura e altura do marcador SOF (C0–CF, exceto DHT/JPG/DAC) de um JPEG.
function getJpegDimensions(assetPath: string) {
  const buffer = readFileSync(resolvePublicAsset(assetPath));
  let offset = 2;

  while (offset + 9 < buffer.length) {
    const marker = buffer[offset + 1];
    const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);

    if (isSof) {
      return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
    }
    offset += 2 + buffer.readUInt16BE(offset + 2);
  }

  throw new Error(`${assetPath}: marcador SOF não encontrado`);
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

  const artesDaPagina = [
    ["faixa 3:1 (hero-desktop)", confadat.artes.banner],
    ["arte do celular (hero-mobile)", confadat.artes.heroMobile],
    ["capa 16:9 (youtube-geral)", confadat.artes.youtube],
    ["imagem de compartilhamento", confadat.artes.og],
    ...confadat.convidadas.map((convidada) => [convidada.nome, convidada.arte]),
    ...confadat.liderancas.map((lideranca) => [lideranca.nome, lideranca.arte]),
  ];

  it.each(artesDaPagina)("versiona em public a arte: %s", (_label, assetPath) => {
    const existe = git
      ? git.has(`public${assetPath}`)
      : existsSync(resolvePublicAsset(assetPath));

    expect(existe, `${assetPath} ${git ? "não versionado" : "não encontrado"}`).toBe(true);
  });

  it("mantém as proporções das artes do kit", () => {
    expect(getPngDimensions(confadat.artes.banner)).toEqual({ width: 2172, height: 724 });
    expect(getJpegDimensions(confadat.artes.heroMobile)).toEqual({ width: 1080, height: 1350 });
    expect(getPngDimensions(confadat.artes.youtube)).toEqual({ width: 1280, height: 720 });
    expect(getJpegDimensions(confadat.artes.og)).toEqual({ width: 1200, height: 675 });
    for (const pessoa of [...confadat.convidadas, ...confadat.liderancas]) {
      expect(getJpegDimensions(pessoa.arte), pessoa.nome).toEqual({ width: 1080, height: 1350 });
    }
  });

  it("mantém a imagem de compartilhamento leve para a prévia do WhatsApp", () => {
    expect(statSync(resolvePublicAsset(confadat.artes.og)).size).toBeLessThan(200 * 1024);
  });

  it("abre o congresso na sexta, 27/11, às 19h de São Paulo", () => {
    const [primeira, segunda] = confadat.noites;

    expect(confadat.noites).toHaveLength(2);
    expect(confadat.inicioIso).toBe("2026-11-27T19:00:00-03:00");
    expect(new Date(confadat.inicioIso).toISOString()).toBe("2026-11-27T22:00:00.000Z");
    expect(primeira.inicioIso).toBe(confadat.inicioIso);
    expect(segunda.inicioIso).toBe("2026-11-28T19:00:00-03:00");
  });

  it("segue a programação do kit de 23/10: Erinete e Anne Reis na sexta, Adriane no sábado", () => {
    expect(
      confadat.noites.map((noite) => noite.participantes.map((participante) => participante.nome))
    ).toEqual([
      ["Missionária Erinete Teodoro", "Cantora Anne Reis"],
      ["Missionária e cantora Adriane Medeiros"],
    ]);
    expect(
      getEventoBySlug("confadat-congresso-das-irmas-27-11-2026")?.descricao
    ).toContain("Nesta noite a Palavra será ministrada pela Missionária Erinete Teodoro, com a participação da cantora Anne Reis no louvor");
    expect(
      getEventoBySlug("confadat-congresso-das-irmas-28-11-2026")?.descricao
    ).toContain("Nesta noite a Missionária e cantora Adriane Medeiros ministra na pregação e no louvor");
  });

  it("não inventa Instagram para Anne Reis", () => {
    const anne = confadat.convidadas.find((convidada) => convidada.nome.includes("Anne Reis"));

    expect(anne).toBeDefined();
    expect(anne?.instagram).toBeNull();
  });

  it("identifica a liderança pela função confirmada", () => {
    expect(confadat.liderancas.map((lideranca) => [lideranca.nome, lideranca.papel])).toEqual([
      ["Pr. Zacarias Bernardes Félix", "Presidente do Campo de Atibaia"],
      ["Pra. Anna Alzira Félix", "Presidente da CONFADAT"],
    ]);
  });

  it.each([
    "confadat-congresso-das-irmas-27-11-2026",
    "confadat-congresso-das-irmas-28-11-2026",
  ])("a data %s da agenda aponta para a página oficial, com artes sem corte", (slug) => {
    const evento = getEventoBySlug(slug);

    expect(evento?.recursos?.map((recurso) => recurso.href)).toContain(confadat.path);
    expect(evento?.imagem).toBe(confadat.artes.heroMobile);
    // O topo da página do evento é 16:9: a capa youtube-geral entra inteira.
    expect(evento?.hero).toBe(confadat.artes.youtube);
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

  describe("paleta", () => {
    it("tem as cinco cores da arte, com nome único e código hexadecimal", () => {
      const { cores } = confadat.paleta;

      expect(cores).toHaveLength(5);
      expect(new Set(cores.map((cor) => cor.nome)).size).toBe(cores.length);
      cores.forEach((cor) => expect(cor.hex).toMatch(/^#[0-9A-F]{6}$/));
    });

    it.each(confadat.paleta.looks.map((look) => [look.src]))(
      "versiona o look %s em JPG 4:5 leve",
      (src) => {
        const existe = git ? git.has(`public${src}`) : existsSync(resolvePublicAsset(src));

        expect(existe, `${src} ${git ? "não versionado" : "não encontrado"}`).toBe(true);
        expect(getJpegDimensions(src)).toEqual({ width: 1080, height: 1350 });
        expect(statSync(resolvePublicAsset(src)).size).toBeLessThan(350 * 1024);
      }
    );
  });
});
