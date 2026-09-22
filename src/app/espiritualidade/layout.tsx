import type { ReactNode } from "react";

export default function EspiritualidadeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main className="bg-surface-soft min-h-screen">{children}</main>;
}
