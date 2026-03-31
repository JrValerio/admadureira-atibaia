import { readFile } from "fs/promises";
import { ImageResponse } from "next/og";
import path from "path";
import { getCongregacaoBySlug, getCongregacoes } from "@/data/congregacoes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getCongregacoes().map((c) => ({ slug: c.slug }));
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
  const congregacao = getCongregacaoBySlug(slug);

  if (!congregacao) {
    return new Response("Not found", { status: 404 });
  }

  const imgSrc = await loadImage(
    path.join(process.cwd(), "public", congregacao.imagem)
  );

  const logoSrc = await loadImage(
    path.join(process.cwd(), "public/logo-transparent.png")
  );

  const locationLabel = [
    congregacao.localizacao?.bairro,
    congregacao.localizacao?.cidade ?? congregacao.cidade,
  ]
    .filter(Boolean)
    .join(" · ");

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

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span
                style={{
                  color: "#ffa726",
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Campo de Atibaia
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
                {congregacao.igreja}
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: 26,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {locationLabel}
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
              Assembleia de Deus Ministério Madureira
            </span>
          </div>

          {/* Right panel — logo */}
          {logoSrc ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 340,
                flexShrink: 0,
                padding: "56px 48px",
                opacity: 0.15,
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
          position: "relative",
          background: "#111111",
          overflow: "hidden",
        }}
      >
        {/* Background photo */}
        <img
          src={imgSrc}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.88) 100%)",
          }}
        />

        {/* Top-left branding */}
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 56,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 6,
              height: 32,
              background: "#ffa726",
              borderRadius: 3,
            }}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            AD Madureira Atibaia
          </span>
        </div>

        {/* Bottom content */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0 56px 48px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <span
            style={{
              color: "#ffa726",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Campo de Atibaia
          </span>
          <h1
            style={{
              color: "#ffffff",
              fontSize: 58,
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            {congregacao.igreja}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 26,
              margin: 0,
              fontWeight: 400,
            }}
          >
            {locationLabel}
          </p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
