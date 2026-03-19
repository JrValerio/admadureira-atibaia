import type { ReactNode } from "react";

const bgMap = {
  white: "bg-white",
  gray: "bg-[#f5f5f5]",
  dark: "bg-[#212121]",
  cream: "bg-[#f7f6f2]",
} as const;

type SectionProps = {
  children: ReactNode;
  bg?: keyof typeof bgMap;
  className?: string;
  containerClassName?: string;
  containerWidth?: "default" | "narrow" | "wide";
  id?: string;
};

const containerWidthMap = {
  default: "",
  narrow: "ui-section-container--narrow",
  wide: "ui-section-container--wide",
} as const;

export function Section({
  children,
  bg,
  className = "",
  containerClassName = "",
  containerWidth = "default",
  id,
}: SectionProps) {
  const bgClass = bg ? bgMap[bg] : "";
  const sectionClassName = `ui-section ${bgClass} ${className}`.trim();
  const innerClassName = `ui-section-container ${containerWidthMap[containerWidth]} ${containerClassName}`.trim();

  return (
    <section id={id} className={sectionClassName}>
      <div className={innerClassName}>{children}</div>
    </section>
  );
}
