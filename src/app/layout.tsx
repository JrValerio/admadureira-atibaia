import type { Metadata } from "next";
import { Acme } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const acme = Acme({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-acme",
});

const SITE_URL = "https://admadureira-atibaia.vercel.app";
const SITE_TITLE = "Assembleia de Deus Madureira Atibaia | Cultos e Programação";
const SITE_DESC =
  "Igreja Evangélica Assembleia de Deus Ministério Madureira – Atibaia/SP. Cultos às terças, quartas, quintas e domingos. Praça Pio XII, 122 – Centro.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  keywords:
    "igreja em atibaia, assembleia de deus madureira, igreja evangélica atibaia, culto em atibaia, AD Madureira Atibaia, programação igreja atibaia",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  // OpenGraph — aparece ao compartilhar no WhatsApp, Telegram, Facebook, Instagram
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "AD Madureira Atibaia",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [
      {
        url: `${SITE_URL}/fachada-da-igreja.jpg`,
        width: 1200,
        height: 630,
        alt: "Assembleia de Deus Madureira Atibaia",
      },
    ],
  },
  // Twitter Card (também usado pelo WhatsApp em alguns casos)
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [`${SITE_URL}/fachada-da-igreja.jpg`],
  },
};

// Schema.org JSON-LD — aparece nos resultados do Google
const churchSchema = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Assembleia de Deus Ministério Madureira – Atibaia",
  alternateName: "AD Madureira Atibaia",
  url: "https://admadureira-atibaia.vercel.app",
  logo: "https://admadureira-atibaia.vercel.app/logo.jpg",
  image: "https://admadureira-atibaia.vercel.app/fachada-da-igreja.jpg",
  telephone: "+55-11-91611-6102",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Praça Pio XII, 122",
    addressLocality: "Atibaia",
    addressRegion: "SP",
    postalCode: "12940-160",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -23.1171,
    longitude: -46.5567,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday",  opens: "19:30", closes: "21:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "11:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "15:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday",  opens: "19:30", closes: "21:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday",    opens: "09:00", closes: "11:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday",    opens: "18:30", closes: "20:30" },
  ],
  foundingDate: "1998",
  areaServed: {
    "@type": "City",
    name: "Atibaia",
  },
  sameAs: [
    "https://www.instagram.com/admadureira_atibaia/",
    "https://www.youtube.com/@ADMadureiraAtibaia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema) }}
        />
      </head>
      <body className={`${acme.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
