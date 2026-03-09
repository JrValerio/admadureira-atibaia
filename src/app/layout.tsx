import type { Metadata } from "next";
import { Acme } from "next/font/google";
import "./globals.css";

const acme = Acme({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-acme",
});

export const metadata: Metadata = {
  title: "Assembleia de Deus Madureira | Campo de Atibaia",
  description:
    "Igreja Evangélica Assembleia de Deus Ministério Madureira – Campo de Atibaia/SP. Cultos às terças, quartas, quintas e domingos. Praça Pio XII, 122 – Centro.",
  keywords:
    "igreja em atibaia, assembleia de deus madureira, igreja evangélica atibaia, culto em atibaia, AD Madureira Atibaia",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${acme.variable} antialiased`}>{children}</body>
    </html>
  );
}
