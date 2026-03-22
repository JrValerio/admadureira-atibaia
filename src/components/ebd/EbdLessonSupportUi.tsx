import type { ReactNode } from "react";
import BibleReferenceText from "@/components/biblia/BibleReferenceText";
import type { ListaItem } from "@/data/ebd";

export type EbdSupportPanelTone = "white" | "accent" | "soft" | "dark";
export type EbdSupportLabelTone = "accent" | "danger" | "earth";
export type EbdSupportMarkerTone = "accent" | "danger" | "earth";

export type EbdSupportScheduleItem = {
  key: string;
  day: string;
  reference: string;
  note?: string;
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getLabelToneClassName(tone: EbdSupportLabelTone) {
  switch (tone) {
    case "danger":
      return "text-[#ef5350]";
    case "earth":
      return "text-[#8b5b18]";
    case "accent":
    default:
      return "text-[#ffa726]";
  }
}

function getMarkerToneClassName(tone: EbdSupportMarkerTone) {
  switch (tone) {
    case "accent":
      return "bg-[#ffa726]";
    case "earth":
      return "bg-[#8b5b18]";
    case "danger":
    default:
      return "bg-[#ef5350]";
  }
}

function getPanelToneClassName(tone: EbdSupportPanelTone) {
  switch (tone) {
    case "accent":
      return "border border-[#ffa726]/20 bg-[#fff8ee]";
    case "soft":
      return "border border-black/5 bg-[#fafafa]";
    case "dark":
      return "bg-[#212121] text-white";
    case "white":
    default:
      return "border border-black/5 bg-white";
  }
}

function getPanelLinkClassName(tone: EbdSupportPanelTone) {
  return tone === "dark"
    ? "font-medium text-white underline decoration-[#ffa726]/70 underline-offset-4 transition-colors hover:text-[#ffe0b2]"
    : "font-medium text-[#212121] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]";
}

export function EbdSupportSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-black/5 bg-[#fafafa] p-5 md:p-6">
      <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
        {eyebrow}
      </p>
      <h3 className="mb-4 font-acme text-2xl tracking-wide text-[#212121]">
        {title}
      </h3>
      {children}
    </section>
  );
}

export function EbdSupportPanel({
  title,
  tone = "white",
  labelTone = "accent",
  className,
  contentClassName,
  children,
}: {
  title: string;
  tone?: EbdSupportPanelTone;
  labelTone?: EbdSupportLabelTone;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={joinClasses(
        "rounded-2xl p-4",
        getPanelToneClassName(tone),
        className
      )}
    >
      <p
        className={joinClasses(
          "mb-2 text-xs font-bold tracking-widest uppercase",
          getLabelToneClassName(labelTone)
        )}
      >
        {title}
      </p>
      <div
        className={joinClasses(
          "leading-relaxed",
          tone === "dark" ? "text-white/85" : "text-[#555]",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function EbdSupportList({
  items,
  markerTone = "danger",
  tone = "white",
}: {
  items: string[];
  markerTone?: EbdSupportMarkerTone;
  tone?: EbdSupportPanelTone;
}) {
  return (
    <ul className="space-y-3 leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={joinClasses(
              "mt-[7px] h-1.5 w-1.5 rounded-full",
              getMarkerToneClassName(markerTone)
            )}
          />
          <span>
            <BibleReferenceText
              text={item}
              linkClassName={getPanelLinkClassName(tone)}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function EbdSupportListPanel({
  title,
  items,
  tone = "white",
  labelTone = "accent",
  markerTone = "danger",
  className,
}: {
  title: string;
  items?: string[] | null;
  tone?: EbdSupportPanelTone;
  labelTone?: EbdSupportLabelTone;
  markerTone?: EbdSupportMarkerTone;
  className?: string;
}) {
  if (!items?.length) {
    return null;
  }

  return (
    <EbdSupportPanel
      title={title}
      tone={tone}
      labelTone={labelTone}
      className={className}
    >
      <EbdSupportList items={items} markerTone={markerTone} tone={tone} />
    </EbdSupportPanel>
  );
}

export function EbdSupportListaPanel({
  title,
  items,
  tone = "white",
  labelTone = "accent",
  markerTone = "danger",
  className,
}: {
  title: string;
  items?: ListaItem[] | null;
  tone?: EbdSupportPanelTone;
  labelTone?: EbdSupportLabelTone;
  markerTone?: EbdSupportMarkerTone;
  className?: string;
}) {
  if (!items?.length) {
    return null;
  }

  return (
    <EbdSupportPanel
      title={title}
      tone={tone}
      labelTone={labelTone}
      className={className}
    >
      <ul className="space-y-3 leading-relaxed">
        {items.map((item) => (
          <li
            key={`${item.titulo ?? "item"}-${item.conteudo}`}
            className="flex items-start gap-3"
          >
            <span
              className={joinClasses(
                "mt-[7px] h-1.5 w-1.5 rounded-full",
                getMarkerToneClassName(markerTone)
              )}
            />
            <span>
              {item.titulo ? (
                <span className="font-semibold text-[#212121]">{item.titulo}: </span>
              ) : null}
              <BibleReferenceText
                text={item.conteudo}
                linkClassName={getPanelLinkClassName(tone)}
              />
            </span>
          </li>
        ))}
      </ul>
    </EbdSupportPanel>
  );
}

export function EbdSupportTextPanel({
  title,
  text,
  tone = "white",
  labelTone = "accent",
  className,
  textClassName,
}: {
  title: string;
  text?: string | null;
  tone?: EbdSupportPanelTone;
  labelTone?: EbdSupportLabelTone;
  className?: string;
  textClassName?: string;
}) {
  if (!text) {
    return null;
  }

  return (
    <EbdSupportPanel
      title={title}
      tone={tone}
      labelTone={labelTone}
      className={className}
      contentClassName={textClassName}
    >
      <p>
        <BibleReferenceText text={text} linkClassName={getPanelLinkClassName(tone)} />
      </p>
    </EbdSupportPanel>
  );
}

export function EbdSupportSchedulePanel({
  title,
  items,
  tone = "white",
  labelTone = "danger",
  className,
  itemsClassName,
}: {
  title: string;
  items?: EbdSupportScheduleItem[] | null;
  tone?: EbdSupportPanelTone;
  labelTone?: EbdSupportLabelTone;
  className?: string;
  itemsClassName?: string;
}) {
  if (!items?.length) {
    return null;
  }

  const itemClassName =
    tone === "dark"
      ? "border border-white/10 bg-white/5"
      : tone === "accent"
        ? "border border-[#ffa726]/15 bg-white/80"
        : "border border-black/5 bg-white";

  return (
    <EbdSupportPanel
      title={title}
      tone={tone}
      labelTone={labelTone}
      className={className}
    >
      <div className={itemsClassName ?? "space-y-3"}>
        {items.map((item) => (
          <div key={item.key} className={joinClasses("rounded-2xl p-4", itemClassName)}>
            <p className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
              {item.day}
            </p>
            <p
              className={joinClasses(
                "mt-1 font-semibold",
                tone === "dark" ? "text-white" : "text-[#212121]"
              )}
            >
              <BibleReferenceText
                text={item.reference}
                linkClassName={getPanelLinkClassName(tone)}
              />
            </p>
            {item.note ? (
              <p className="mt-2 text-sm leading-relaxed">
                <BibleReferenceText
                  text={item.note}
                  linkClassName={getPanelLinkClassName(tone)}
                />
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </EbdSupportPanel>
  );
}

export function EbdSupportOutlinePanel({
  title,
  items,
  tone = "accent",
  labelTone = "danger",
  className,
}: {
  title: string;
  items?: ListaItem[] | null;
  tone?: EbdSupportPanelTone;
  labelTone?: EbdSupportLabelTone;
  className?: string;
}) {
  if (!items?.length) {
    return null;
  }

  return (
    <EbdSupportPanel
      title={title}
      tone={tone}
      labelTone={labelTone}
      className={className}
    >
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.titulo ?? "esboco"}-${item.conteudo}`}
            className="rounded-2xl border border-white/70 bg-white/85 p-4"
          >
            {item.titulo ? (
              <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                {item.titulo}
              </p>
            ) : null}
            <p className="text-sm leading-relaxed text-[#555]">
              <BibleReferenceText text={item.conteudo} />
            </p>
          </div>
        ))}
      </div>
    </EbdSupportPanel>
  );
}
