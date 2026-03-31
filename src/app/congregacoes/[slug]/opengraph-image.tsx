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

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const congregacao = getCongregacaoBySlug(slug);

  if (!congregacao) {
    return new Response("Not found", { status: 404 });
  }

  const imgPath = path.join(process.cwd(), "public", congregacao.imagem);
  const imgBuffer = await readFile(imgPath);
  const ext = congregacao.imagem.endsWith(".png") ? "png" : "jpeg";
  const imgSrc = `data:image/${ext};base64,${imgBuffer.toString("base64")}`;

  const locationLabel = [
    congregacao.localizacao?.bairro,
    congregacao.localizacao?.cidade ?? congregacao.cidade,
  ]
    .filter(Boolean)
    .join(" · ");

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
