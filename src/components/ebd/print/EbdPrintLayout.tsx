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
        width: 100% !important;
        max-width: none !important;
        min-height: 0 !important;
        margin: 0 auto !important;
        margin-bottom: 0 !important;
        border: none !important;
        box-shadow: none !important;
        page-break-after: always;
        break-after: page;
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
      className="ebd-print-page relative mx-auto mb-8 bg-white px-6 py-6 text-[#333] shadow-[0_18px_48px_rgba(0,0,0,0.08)] md:px-7 md:py-7"
      style={{ maxWidth: "190mm", minHeight: "276mm" }}
    >
      <div className="ebd-print-watermark pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.038]">
        <div className="text-center">
          <Image
            src={EBD_PRINT_BRANDING.logoSrc}
            alt=""
            width={140}
            height={140}
            aria-hidden="true"
            style={{ width: 140, height: 140 }}
          />
          <p
            aria-hidden="true"
            className="mt-3 font-script text-[2.1rem] leading-none text-[#212121]"
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

      <div className="relative z-[1] flex min-h-full flex-col">
        <header className="shrink-0 border-b border-black/10 pb-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-3">
              <Image
                src={EBD_PRINT_BRANDING.logoSrc}
                alt="Logo da igreja"
                width={48}
                height={48}
                style={{ width: 48, height: 48 }}
              />
              <div>
                <p className="font-script text-[1.55rem] leading-none text-[#212121]">
                  {EBD_PRINT_BRANDING.scriptName}
                </p>
                <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8b5b18]">
                  {EBD_PRINT_BRANDING.subtitle}
                </p>
                <p className="mt-1.5 text-[10px] leading-relaxed text-[#666]">
                  {EBD_PRINT_BRANDING.officialName}
                </p>
              </div>
            </div>

            <div className="self-start text-[9px] font-bold uppercase tracking-[0.22em] text-[#ef5350]">
              {modeLabel}
            </div>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#ef5350]">
                {classeInfo.label} · {trimestreLabel}
              </p>
              <h2 className="mt-1.5 font-acme text-[1.45rem] leading-tight tracking-wide text-[#212121]">
                Lição {licao.numero} · {licao.titulo}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8b5b18]">
                Data da lição
              </p>
              <p className="mt-1 text-[11px] font-semibold text-[#212121]">
                {formatEbdDate(licao.data)}
              </p>
            </div>
          </div>
        </header>

        <div className="ebd-print-flow mt-4 flex-1">{children}</div>

        <footer className="mt-4 shrink-0 border-t border-black/10 pt-3 text-[9px] leading-relaxed text-[#666]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p>{EBD_PRINT_BRANDING.officialName}</p>
              <p>{EBD_PRINT_BRANDING.addressLine}</p>
              <p>{EBD_PRINT_BRANDING.phone}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold uppercase tracking-[0.2em] text-[#8b5b18]">
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
