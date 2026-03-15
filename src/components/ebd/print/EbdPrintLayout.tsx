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

    @page {
      size: A4;
      margin: 12mm 10mm 14mm;
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
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        margin: 0 auto !important;
        margin-bottom: 0 !important;
        width: 100% !important;
        max-width: none !important;
        min-height: calc(297mm - 26mm) !important;
        page-break-after: always;
        break-after: page;
      }

      .ebd-print-page:last-child {
        page-break-after: auto;
        break-after: auto;
      }

      .ebd-print-watermark {
        opacity: 0.06 !important;
      }

      .ebd-print-no-break {
        break-inside: avoid;
        page-break-inside: avoid;
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
      className="ebd-print-page relative mx-auto mb-8 overflow-hidden bg-white px-8 py-8 md:px-10 md:py-10"
      style={{ maxWidth: "210mm", minHeight: "297mm" }}
    >
      <div className="ebd-print-watermark pointer-events-none absolute inset-0 flex flex-col items-center justify-center opacity-[0.045]">
        <Image
          src={EBD_PRINT_BRANDING.logoSrc}
          alt=""
          width={180}
          height={180}
          aria-hidden="true"
          style={{ width: 180, height: 180 }}
        />
        <p
          aria-hidden="true"
          className="mt-4 font-script text-[3rem] leading-none text-[#212121]"
        >
          {EBD_PRINT_BRANDING.scriptName}
        </p>
        <p
          aria-hidden="true"
          className="mt-2 text-sm font-semibold uppercase tracking-[0.34em] text-[#212121]"
        >
          {EBD_PRINT_BRANDING.subtitle}
        </p>
      </div>

      <div className="relative z-[1] flex h-full min-h-full flex-col">
        <header className="border-b border-black/10 pb-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <Image
                src={EBD_PRINT_BRANDING.logoSrc}
                alt="Logo da igreja"
                width={56}
                height={56}
                style={{ width: 56, height: 56 }}
              />
              <div>
                <p className="font-script text-[1.75rem] leading-none text-[#212121]">
                  {EBD_PRINT_BRANDING.scriptName}
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#8b5b18]">
                  {EBD_PRINT_BRANDING.subtitle}
                </p>
                <p className="mt-3 text-[11px] leading-relaxed text-[#666]">
                  {EBD_PRINT_BRANDING.officialName}
                </p>
              </div>
            </div>

            <div className="self-start text-[10px] font-bold uppercase tracking-[0.24em] text-[#ef5350]">
              {modeLabel}
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#ef5350]">
                {classeInfo.label} · {trimestreLabel}
              </p>
              <h2 className="mt-2 font-acme text-[1.7rem] leading-tight tracking-wide text-[#212121]">
                Lição {licao.numero} · {licao.titulo}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b5b18]">
                Data da lição
              </p>
              <p className="mt-1 text-sm font-semibold text-[#212121]">
                {formatEbdDate(licao.data)}
              </p>
            </div>
          </div>
        </header>

        <div className="mt-5 flex-1 space-y-4">{children}</div>

        <footer className="mt-5 flex items-end justify-between gap-4 border-t border-black/10 pt-3 text-[10px] leading-relaxed text-[#666]">
          <div>
            <p>{EBD_PRINT_BRANDING.officialName}</p>
            <p>{EBD_PRINT_BRANDING.addressLine}</p>
            <p>{EBD_PRINT_BRANDING.phone}</p>
          </div>

          <div className="text-right">
            <p className="font-semibold uppercase tracking-[0.22em] text-[#8b5b18]">
              Material da lição
            </p>
            <p className="mt-1">
              Página {pageNumber} de {pageCount}
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
