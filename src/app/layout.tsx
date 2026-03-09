import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AD Madureira Atibaia | Assembleia de Deus",
  description:
    "Igreja Assembleia de Deus Ministério Madureira – Campo de Atibaia. Praça Pio XII, 122 – Centro. Cultos aos domingos e quartas-feiras.",
  keywords: "assembleia de deus, madureira, atibaia, igreja, culto, evangélica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
