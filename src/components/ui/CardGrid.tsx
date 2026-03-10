import type { ReactNode } from "react";

type CardGridProps = {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  breakpoint?: "lg" | "xl";
  className?: string;
};

export function CardGrid({
  children,
  columns = 3,
  breakpoint = "xl",
  className = "",
}: CardGridProps) {
  const modifier =
    columns === 4
      ? breakpoint === "lg"
        ? "ui-card-grid--4lg"
        : "ui-card-grid--4xl"
      : "";

  return <div className={`ui-card-grid ${modifier} ${className}`.trim()}>{children}</div>;
}
