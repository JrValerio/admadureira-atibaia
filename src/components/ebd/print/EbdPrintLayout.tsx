import type { ReactNode } from "react";
import Image from "next/image";
import type { ClasseEBDInfo, LicaoEBD } from "@/data/ebd";
import { formatEbdDate } from "@/lib/ebd-utils";
import { EBD_PRINT_BRANDING } from "@/lib/ebd-print";
import EbdPrintControls from "./EbdPrintControls";

type EbdPrintDocumentLayoutProps = {
  title: string;
  subtitle: string;
  backHref: string;
  alternateHref: string;
  alternateLabel: string;
  children: ReactNode;
};

type EbdPrintPageProps = {
  modeLabel: string;
  classeInfo: ClasseEBDInfo;
  trimestreLabel: string;
  licao: LicaoEBD;
  pageNumber: number;
  pageCount: number;
  children: ReactNode;
};

export function EbdPrintDocumentLayout({
  title,
  subtitle,
  backHref,
  alternateHref,
  alternateLabel,
  children,
}: EbdPrintDocumentLayoutProps) {
  const printStyles = `
    @page {
      size: A4;
      margin: 10mm 9mm 11mm;
    }

    html,
    body {
      background: #ffffff;
    }

    body.ebd-print-mode,
    body:has(.ebd-print-root) {
      background: #efeae2;
    }

    body.ebd-print-mode > header,
    body.ebd-print-mode > footer,
    body.ebd-print-mode > a[aria-label*="WhatsApp"],
    body:has(.ebd-print-root) > header,
    body:has(.ebd-print-root) > footer,
    body:has(.ebd-print-root) > a[aria-label*="WhatsApp"] {
      display: none !important;
    }

    .ebd-print-flow section {
      break-inside: auto;
      page-break-inside: auto;
    }

    .ebd-print-flow h2,
    .ebd-print-flow h3,
    .ebd-print-flow .keep-with-next {
      break-after: avoid;
      page-break-after: avoid;
    }

    .ebd-print-flow p,
    .ebd-print-flow li {
      orphans: 2;
      widows: 2;
    }

    @media print {
      html,
      body {
        background: #ffffff !important;
      }

      .ebd-print-controls {
        display: none !important;
      }

      .ebd-print-root {
        background: #ffffff !important;
        padding: 0 !important;
      }

      .ebd-print-page {
        box-sizing: border-box !important;
        width: 190mm !important;
        max-width: 190mm !important;
        height: 276mm !important;
        min-height: 276mm !important;
        max-height: 276mm !important;
        margin: 0 auto !important;
        margin-bottom: 0 !important;
        border: none !important;
        box-shadow: none !important;
        overflow: hidden !important;
        page-break-after: always;
        break-after: page;
      }

      .ebd-print-shell {
        height: 100% !important;
      }

      .ebd-print-flow {
        min-height: 0 !important;
        overflow: hidden !important;
      }

      .ebd-print-footer {
        margin-top: auto !important;
      }

      .ebd-print-page:last-child {
        page-break-after: auto;
        break-after: auto;
      }

      .ebd-print-watermark {
        opacity: 0.05 !important;
      }

      a {
        color: inherit !important;
        text-decoration: none !important;
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <main className="ebd-print-root min-h-screen bg-[#efeae2] px-4 py-6 md:px-6 md:py-10">
        <EbdPrintControls
          title={title}
          subtitle={subtitle}
          backHref={backHref}
          alternateHref={alternateHref}
          alternateLabel={alternateLabel}
        />
        {children}
      </main>
    </>
  );
}

export function EbdPrintPage({
  modeLabel,
  classeInfo,
  trimestreLabel,
  licao,
  pageNumber,
  pageCount,
  children,
}: EbdPrintPageProps) {
  return (
    <section
      className="ebd-print-page relative mx-auto mb-8 bg-white px-5 py-5 text-[#333] shadow-[0_18px_48px_rgba(0,0,0,0.08)]"
      style={{
        maxWidth: "190mm",
        height: "276mm",
        minHeight: "276mm",
        maxHeight: "276mm",
      }}
    >
      <div className="ebd-print-watermark pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.038]">
        <div className="text-center">
          <Image
            src={EBD_PRINT_BRANDING.logoSrc}
            alt=""
            width={132}
            height={132}
            aria-hidden="true"
            style={{ width: 132, height: 132 }}
          />
          <p
            aria-hidden="true"
            className="mt-2.5 font-script text-[1.95rem] leading-none text-[#212121]"
          >
            {EBD_PRINT_BRANDING.scriptName}
          </p>
          <p
            aria-hidden="true"
            className="mt-2 text-[9px] font-semibold uppercase tracking-[0.26em] text-[#212121]"
          >
            {EBD_PRINT_BRANDING.subtitle}
          </p>
        </div>
      </div>

      <div className="ebd-print-shell relative z-[1] flex h-full flex-col">
        <header className="shrink-0 border-b border-black/10 pb-2.5">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-2.5">
              <Image
                src={EBD_PRINT_BRANDING.logoSrc}
                alt="Logo da igreja"
                width={42}
                height={42}
                style={{ width: 42, height: 42 }}
              />
              <div>
                <p className="font-script text-[1.42rem] leading-none text-[#212121]">
                  {EBD_PRINT_BRANDING.scriptName}
                </p>
                <p className="mt-1 text-[8.5px] font-semibold uppercase tracking-[0.22em] text-[#8b5b18]">
                  {EBD_PRINT_BRANDING.subtitle}
                </p>
                <p className="mt-1 text-[9px] leading-relaxed text-[#666]">
                  {EBD_PRINT_BRANDING.officialName}
                </p>
              </div>
            </div>

            <div className="self-start text-[8.5px] font-bold uppercase tracking-[0.22em] text-[#ef5350]">
              {modeLabel}
            </div>
          </div>

          <div className="mt-2.5 grid gap-2 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-[8.5px] font-bold uppercase tracking-[0.24em] text-[#ef5350]">
                {classeInfo.label} · {trimestreLabel}
              </p>
              <h2 className="mt-1 font-acme text-[1.32rem] leading-tight tracking-wide text-[#212121]">
                Lição {licao.numero} · {licao.titulo}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#8b5b18]">
                Data da lição
              </p>
              <p className="mt-0.5 text-[10px] font-semibold text-[#212121]">
                {formatEbdDate(licao.data)}
              </p>
            </div>
          </div>
        </header>

        <main className="ebd-print-flow mt-3 min-h-0 flex-1 overflow-hidden">
          {children}
        </main>

        <footer className="ebd-print-footer mt-auto shrink-0 border-t border-black/10 pt-2 text-[8px] leading-relaxed text-[#666]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p>{EBD_PRINT_BRANDING.officialName}</p>
              <p>{EBD_PRINT_BRANDING.addressLine}</p>
              <p>{EBD_PRINT_BRANDING.phone}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Material da lição
              </p>
              <p className="mt-1">
                Página {pageNumber} de {pageCount}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
