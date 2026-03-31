import { readFile } from "fs/promises";
import { ImageResponse } from "next/og";
import path from "path";
import { getPastorBySlug, getPastores } from "@/data/pastores";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPastores().map((p) => ({ slug: p.slug }));
}

async function loadImage(filePath: string): Promise<string | null> {
  try {
    const buffer = await readFile(filePath);
    const ext = filePath.endsWith(".png") ? "png" : "jpeg";
    return `data:image/${ext};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const pastor = getPastorBySlug(slug);

  if (!pastor) {
    return new Response("Not found", { status: 404 });
  }

  const imgSrc = await loadImage(
    path.join(process.cwd(), "public", pastor.foto)
  );

  const logoSrc = await loadImage(
    path.join(process.cwd(), "public/logo-transparent.png")
  );

  const funcaoLabel = pastor.ministerioInfo?.funcao ?? pastor.cargo;
  const igrejaLabel =
    pastor.ministerioInfo?.igreja ?? "Assembleia de Deus Ministério Madureira";

  // ── Fallback: no photo available ────────────────────────────────────────────
  if (!imgSrc) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: 1200,
            height: 630,
            background: "#212121",
            overflow: "hidden",
          }}
        >
          {/* Left accent bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 8,
              height: "100%",
              background: "#ffa726",
            }}
          />

          {/* Left panel — text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "56px 48px 56px 72px",
              flex: 1,
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              AD Madureira Atibaia
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <span
                style={{
                  color: "#ffa726",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                }}
              >
                {funcaoLabel}
              </span>
              <h1
                style={{
                  color: "#ffffff",
                  fontSize: 56,
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                }}
              >
                {pastor.nome}
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 22,
                  margin: 0,
                  lineHeight: 1.4,
                  fontWeight: 400,
                }}
              >
                {igrejaLabel}
              </p>
            </div>

            <span
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: 15,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Campo de Atibaia
            </span>
          </div>

          {/* Right panel — logo watermark */}
          {logoSrc ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 340,
                flexShrink: 0,
                padding: "56px 48px",
                opacity: 0.12,
              }}
            >
              <img
                src={logoSrc}
                style={{ width: 220, height: 220, objectFit: "contain" }}
              />
            </div>
          ) : null}
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  // ── Default: photo available ─────────────────────────────────────────────────
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: 1200,
          height: 630,
          background: "#212121",
          overflow: "hidden",
        }}
      >
        {/* Left panel — text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 52px 52px 56px",
            width: 580,
            flexShrink: 0,
            zIndex: 2,
          }}
        >
          {/* Branding top */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 5,
                height: 28,
                background: "#ffa726",
                borderRadius: 3,
              }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              AD Madureira Atibaia
            </span>
          </div>

          {/* Main info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <span
              style={{
                color: "#ffa726",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
              }}
            >
              {funcaoLabel}
            </span>
            <h1
              style={{
                color: "#ffffff",
                fontSize: 50,
                fontWeight: 800,
                margin: 0,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
              }}
            >
              {pastor.nome}
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 20,
                margin: 0,
                lineHeight: 1.4,
                fontWeight: 400,
              }}
            >
              {igrejaLabel}
            </p>
          </div>

          {/* Footer tag */}
          <span
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 15,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Campo de Atibaia
          </span>
        </div>

        {/* Right panel — photo */}
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* Gradient bridge from left panel */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 120,
              height: "100%",
              background:
                "linear-gradient(to right, #212121 0%, transparent 100%)",
              zIndex: 1,
            }}
          />
          <img
            src={imgSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
