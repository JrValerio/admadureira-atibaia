import type { ReactNode } from "react";

// gray e cream colapsam no mesmo creme neutro (--surface-soft). Os nomes de
// prop seguem aceitos para não mexer nas chamadas.
const bgMap = {
  white: "bg-surface-base",
  gray: "bg-surface-soft",
  dark: "bg-surface-dark",
  cream: "bg-surface-soft",
} as const;

type SectionProps = {
  children: ReactNode;
  bg?: keyof typeof bgMap;
  density?: "default" | "dense" | "spacious";
  className?: string;
  containerClassName?: string;
  containerWidth?: "default" | "narrow" | "wide";
  id?: string;
};

const densityClassMap = {
  default: "",
  dense: "ui-section--dense",
  spacious: "ui-section--spacious",
} as const;

const containerWidthMap = {
  default: "",
  narrow: "ui-section-container--narrow",
  wide: "ui-section-container--wide",
} as const;

export function Section({
  children,
  bg,
  density = "default",
  className = "",
  containerClassName = "",
  containerWidth = "default",
  id,
}: SectionProps) {
  const bgClass = bg ? bgMap[bg] : "";
  const sectionClassName = `ui-section ${densityClassMap[density]} ${bgClass} ${className}`.trim();
  const innerClassName = `ui-section-container ${containerWidthMap[containerWidth]} ${containerClassName}`.trim();

  return (
    <section id={id} className={sectionClassName}>
      <div className={innerClassName}>{children}</div>
    </section>
  );
}
