import type { ReactNode } from "react";

export default function EspiritualidadeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main className="bg-[#f5f5f5] min-h-screen">{children}</main>;
}
