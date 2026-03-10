import type { ReactNode } from "react";

type SectionTitleProps = {
  title: string;
  eyebrow?: string;
  eyebrowVariant?: "accent" | "gold";
  center?: boolean;
  description?: ReactNode;
  divider?: boolean;
  className?: string;
};

export function SectionTitle({
  title,
  eyebrow,
  eyebrowVariant = "accent",
  center = true,
  description,
  divider = false,
  className = "",
}: SectionTitleProps) {
  const wrapperClassName = `${center ? "text-center" : ""} mb-16 ${className}`.trim();
  const eyebrowClassName =
    eyebrowVariant === "gold"
      ? "ui-section-eyebrow ui-section-eyebrow--gold"
      : "ui-section-eyebrow";

  return (
    <div className={wrapperClassName}>
      {eyebrow ? <p className={eyebrowClassName}>{eyebrow}</p> : null}
      <h2 className="ui-section-title">{title}</h2>
      {divider ? (
        <div className={`w-16 h-1 bg-[#ffa726] mt-4 ${center ? "mx-auto" : ""}`.trim()} />
      ) : null}
      {description ? (
        <p className={`text-[#5f5f5f] text-sm md:text-base max-w-3xl mt-4 leading-relaxed ${center ? "mx-auto" : ""}`.trim()}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
