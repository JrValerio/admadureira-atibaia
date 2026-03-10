import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
};

export function Section({
  children,
  className = "",
  containerClassName = "",
  id,
}: SectionProps) {
  const sectionClassName = `ui-section ${className}`.trim();
  const innerClassName = `ui-section-container ${containerClassName}`.trim();

  return (
    <section id={id} className={sectionClassName}>
      <div className={innerClassName}>{children}</div>
    </section>
  );
}
