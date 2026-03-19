import type { ReactNode } from "react";

type SectionTitleProps = {
  title: string;
  titleAs?: "h1" | "h2" | "h3";
  eyebrow?: string;
  eyebrowVariant?: "accent" | "gold";
  center?: boolean;
  description?: ReactNode;
  descriptionWidth?: "narrow" | "default" | "wide";
  density?: "default" | "dense" | "spacious";
  divider?: boolean;
  width?: "default" | "narrow" | "wide";
  actions?: ReactNode;
  contentClassName?: string;
  actionsClassName?: string;
  titleClassName?: string;
  className?: string;
};

const widthClassMap = {
  default: "max-w-3xl",
  narrow: "max-w-2xl",
  wide: "max-w-4xl",
} as const;

const densityClassMap = {
  default: {
    wrapper: "mb-8 md:mb-14",
    title: "",
  },
  dense: {
    wrapper: "mb-6 md:mb-10",
    title: "ui-section-title--dense",
  },
  spacious: {
    wrapper: "mb-10 md:mb-16",
    title: "ui-section-title--spacious",
  },
} as const;

export function SectionTitle({
  title,
  titleAs = "h2",
  eyebrow,
  eyebrowVariant = "accent",
  center = true,
  description,
  descriptionWidth = "default",
  density = "default",
  divider = false,
  width = "default",
  actions,
  contentClassName = "",
  actionsClassName = "",
  titleClassName = "",
  className = "",
}: SectionTitleProps) {
  const TitleTag = titleAs;
  const densityClasses = densityClassMap[density];
  const wrapperClassName = `${actions ? "flex flex-wrap items-end justify-between gap-6" : ""} ${densityClasses.wrapper} ${className}`.trim();
  const resolvedContentClassName = `${widthClassMap[width]} ${center ? "mx-auto text-center" : ""} ${contentClassName}`.trim();
  const eyebrowClassName =
    eyebrowVariant === "gold"
      ? "ui-section-eyebrow ui-section-eyebrow--gold"
      : "ui-section-eyebrow";
  const descriptionClassName = `ui-section-description ui-section-description--${descriptionWidth} ${center ? "mx-auto" : ""}`.trim();

  return (
    <div className={wrapperClassName}>
      <div className={resolvedContentClassName}>
        {eyebrow ? <p className={eyebrowClassName}>{eyebrow}</p> : null}
        <TitleTag
          className={`ui-section-title ${densityClasses.title} ${titleClassName}`.trim()}
        >
          {title}
        </TitleTag>
        {divider ? (
          <div className={`mt-4 h-1 w-16 bg-[#ffa726] ${center ? "mx-auto" : ""}`.trim()} />
        ) : null}
        {description ? (
          <p className={descriptionClassName}>
            {description}
          </p>
        ) : null}
      </div>

      {actions ? <div className={actionsClassName}>{actions}</div> : null}
    </div>
  );
}
