"use client";

import { useEffect, useMemo, useState } from "react";

type BibleShareVerseButtonProps = {
  reference: string;
  text: string;
  url: string;
};

type ShareState = "idle" | "copied" | "downloaded" | "error";

type BackgroundOption = {
  id: string;
  label: string;
  className: string;
  colors: [string, string];
  accent: string;
  textColor: string;
  secondaryTextColor: string;
};

const BACKGROUND_OPTIONS: BackgroundOption[] = [
  {
    id: "dourado",
    label: "Dourado",
    className: "bg-gradient-to-br from-[#2b2418] via-[#8f5b14] to-[#f0c067]",
    colors: ["#2b2418", "#f0c067"],
    accent: "#ffca68",
    textColor: "#fffaf0",
    secondaryTextColor: "#f4e0bc",
  },
  {
    id: "amanhecer",
    label: "Amanhecer",
    className: "bg-gradient-to-br from-[#4b2d3b] via-[#a34b6c] to-[#f7b267]",
    colors: ["#4b2d3b", "#f7b267"],
    accent: "#ffd8a8",
    textColor: "#fff8f0",
    secondaryTextColor: "#ffe2c8",
  },
  {
    id: "noturno",
    label: "Noturno",
    className: "bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#2563eb]",
    colors: ["#0f172a", "#2563eb"],
    accent: "#93c5fd",
    textColor: "#eff6ff",
    secondaryTextColor: "#bfdbfe",
  },
  {
    id: "papel",
    label: "Papel",
    className: "bg-gradient-to-br from-[#f7f0e1] via-[#f1e3c5] to-[#e7d2ac]",
    colors: ["#f7f0e1", "#e7d2ac"],
    accent: "#b7791f",
    textColor: "#2d2518",
    secondaryTextColor: "#6d4c1e",
  },
];

function slugifyReference(reference: string) {
  return reference
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (context.measureText(nextLine).width <= maxWidth) {
      currentLine = nextLine;
      return;
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    currentLine = word;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

async function canvasToFile(
  canvas: HTMLCanvasElement,
  fileName: string
): Promise<File | null> {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/png");
  });

  if (!blob) {
    return null;
  }

  return new File([blob], fileName, { type: "image/png" });
}

async function loadImage(src: string) {
  const image = new Image();
  image.src = src;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error(`Erro ao carregar imagem: ${src}`));
  });

  return image;
}

async function generateVerseImage(
  verseText: string,
  reference: string,
  background: BackgroundOption
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const gradient = context.createLinearGradient(0, 0, 1080, 1080);
  gradient.addColorStop(0, background.colors[0]);
  gradient.addColorStop(1, background.colors[1]);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 1080, 1080);

  context.globalAlpha = 0.16;
  context.fillStyle = background.accent;
  context.beginPath();
  context.arc(920, 160, 220, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.arc(180, 920, 260, 0, Math.PI * 2);
  context.fill();
  context.globalAlpha = 1;

  context.strokeStyle = background.accent;
  context.lineWidth = 6;
  context.beginPath();
  context.moveTo(140, 152);
  context.lineTo(280, 152);
  context.stroke();

  await document.fonts.ready;

  try {
    await Promise.all([
      document.fonts.load('600 58px Georgia'),
      document.fonts.load('400 44px "Alex Brush"'),
      document.fonts.load('400 24px Acme'),
      document.fonts.load('600 24px system-ui'),
    ]);
  } catch {
    // If a custom font fails to load, the browser will use fallback fonts.
  }

  const verseFontSize = verseText.length > 190 ? 44 : verseText.length > 110 ? 50 : 58;
  context.textAlign = "center";
  context.fillStyle = background.textColor;
  context.font = `600 ${verseFontSize}px Georgia, serif`;

  const lines = wrapText(context, `“${verseText}”`, 760);
  const lineHeight = verseFontSize * 1.45;
  const blockHeight = lines.length * lineHeight;
  let cursorY = 450 - blockHeight / 2;

  lines.forEach((line) => {
    context.fillText(line, 540, cursorY);
    cursorY += lineHeight;
  });

  context.fillStyle = background.secondaryTextColor;
  context.font = "700 34px system-ui, sans-serif";
  context.fillText(reference, 540, 760);

  const logo = await loadImage("/logo-transparent.png").catch(() => null);

  if (logo) {
    const logoSize = 118;
    const logoX = (1080 - logoSize) / 2;
    const logoY = 804;

    context.save();
    context.globalAlpha = 0.17;
    context.drawImage(logo, logoX, logoY, logoSize, logoSize);
    context.restore();
  }

  context.fillStyle = background.textColor;
  context.font = '400 52px "Alex Brush", cursive';
  context.fillText("Assembleia de Deus", 540, 946);

  context.fillStyle = background.secondaryTextColor;
  context.font = "400 22px Acme, system-ui, sans-serif";
  context.fillText("Ministério Madureira · Campo de Atibaia", 540, 990);

  return canvasToFile(canvas, `${slugifyReference(reference)}.png`);
}

export default function BibleShareVerseButton({
  reference,
  text,
  url,
}: BibleShareVerseButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [shareState, setShareState] = useState<ShareState>("idle");
  const [selectedBackgroundId, setSelectedBackgroundId] = useState(
    BACKGROUND_OPTIONS[0].id
  );

  const selectedBackground = useMemo(
    () =>
      BACKGROUND_OPTIONS.find((option) => option.id === selectedBackgroundId) ??
      BACKGROUND_OPTIONS[0],
    [selectedBackgroundId]
  );

  useEffect(() => {
    if (shareState === "idle") {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShareState("idle");
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [shareState]);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(`${reference}\n\n"${text}"\n\n${url}`);
      setShareState("copied");
    } catch {
      setShareState("error");
    }
  };

  const handleShare = async () => {
    setIsBusy(true);

    try {
      const file = await generateVerseImage(text, reference, selectedBackground);

      if (!file) {
        setShareState("error");
        return;
      }

      const sharePayload = {
        title: reference,
        text: `${reference}\n\n"${text}"\n\n${url}`,
        url,
        files: [file],
      };

      if (
        navigator.share &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share(sharePayload);
        setIsOpen(false);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = file.name;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(
          `${reference}\n\n"${text}"\n\n${url}`
        );
      }

      setShareState("downloaded");
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setIsOpen(false);
        return;
      }

      setShareState("error");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Compartilhar ${reference}`}
        className="shrink-0 text-xs text-[#777] opacity-100 transition md:opacity-0 md:group-hover:opacity-100 hover:text-[#ef5350]"
      >
        📤
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
          <div className="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                  Compartilhar versículo
                </p>
                <h3 className="font-acme text-3xl text-[#212121] tracking-wide">
                  {reference}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-black/10 px-3 py-1 text-xs font-bold tracking-widest uppercase text-[#555] transition-colors hover:border-[#ef5350] hover:text-[#ef5350]"
              >
                Fechar
              </button>
            </div>

            <p className="text-sm leading-7 text-[#555] mb-6">
              Escolha um fundo para gerar a imagem do versículo e compartilhar em
              WhatsApp, Instagram ou Status.
            </p>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {BACKGROUND_OPTIONS.map((option) => {
                const isActive = option.id === selectedBackgroundId;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedBackgroundId(option.id)}
                    className={`rounded-2xl border p-2 text-left transition ${
                      isActive
                        ? "border-[#ffa726] ring-2 ring-[#ffa726]/35"
                        : "border-black/10"
                    }`}
                  >
                    <div className={`h-24 rounded-xl ${option.className}`} />
                    <p className="mt-2 text-xs font-bold tracking-widest uppercase text-[#212121]">
                      {option.label}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl border border-black/5 bg-[#f8f8f8] p-5">
              <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Prévia do conteúdo
              </p>
              <p className="text-sm leading-7 text-[#555]">
                &quot;{text}&quot;
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleShare}
                disabled={isBusy}
                className="inline-flex items-center justify-center rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isBusy ? "Gerando imagem..." : "Compartilhar imagem"}
              </button>
              <button
                type="button"
                onClick={handleCopyText}
                className="inline-flex items-center justify-center rounded-full border border-[#212121] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#212121] hover:text-white"
              >
                Copiar referência
              </button>
            </div>

            {shareState === "copied" ? (
              <p className="mt-4 text-xs font-semibold text-green-700">
                Referência copiada para compartilhar.
              </p>
            ) : null}
            {shareState === "downloaded" ? (
              <p className="mt-4 text-xs font-semibold text-green-700">
                Imagem gerada e baixada com sucesso.
              </p>
            ) : null}
            {shareState === "error" ? (
              <p className="mt-4 text-xs font-semibold text-[#ef5350]">
                Não foi possível compartilhar este versículo agora.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
