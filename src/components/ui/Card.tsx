import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type CardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  dark?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Card<T extends ElementType = "div">({
  as,
  children,
  dark = false,
  className = "",
  ...props
}: CardProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const baseClassName = dark ? "ui-card-dark" : "ui-card";
  const classes = [baseClassName, className].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
