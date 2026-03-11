/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { ImageResponse } from "next/og";

export const alt = "AD Madureira Atibaia";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "nodejs";

async function assetToDataUrl(path: string, mimeType: string) {
  const asset = await readFile(new URL(path, import.meta.url));

  return `data:${mimeType};base64,${Buffer.from(asset).toString("base64")}`;
}

export default async function OpenGraphImage() {
  const [logoSrc, heroSrc] = await Promise.all([
    assetToDataUrl("../../public/logo-transparent.png", "image/png"),
    assetToDataUrl("../../public/fachada-da-igreja.jpg", "image/jpeg"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #120d08 0%, #1c140d 45%, #2a2017 100%)",
          color: "#ffffff",
        }}
      >
        <img
          src={heroSrc}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.32,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(12, 8, 5, 0.96) 0%, rgba(12, 8, 5, 0.82) 58%, rgba(12, 8, 5, 0.52) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "52px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "64%",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "104px",
                  height: "104px",
                  borderRadius: "28px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                }}
              >
                <img
                  src={logoSrc}
                  alt=""
                  style={{
                    width: "74px",
                    height: "74px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    letterSpacing: "0.34em",
                    textTransform: "uppercase",
                    color: "#ffb74d",
                  }}
                >
                  Campo de Atibaia
                </span>
                <span
                  style={{
                    fontSize: "34px",
                    fontWeight: 700,
                  }}
                >
                  AD Madureira
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                maxWidth: "720px",
              }}
            >
              <span
                style={{
                  fontSize: "78px",
                  lineHeight: 1,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                Assembleia de Deus Madureira Atibaia
              </span>
              <span
                style={{
                  fontSize: "27px",
                  lineHeight: 1.35,
                  color: "rgba(255, 255, 255, 0.82)",
                }}
              >
                Cultos, eventos, mensagens e programacao da igreja em Atibaia,
                SP.
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              {["Praca Pio XII, 122", "Centro", "Atibaia/SP"].map((label) => (
                <span
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "14px 22px",
                    borderRadius: "999px",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    fontSize: "22px",
                    color: "#fff6e8",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              width: "30%",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                width: "290px",
                height: "430px",
                overflow: "hidden",
                borderRadius: "34px",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                boxShadow: "0 24px 80px rgba(0, 0, 0, 0.28)",
                background: "#111111",
              }}
            >
              <img
                src={heroSrc}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.56) 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
