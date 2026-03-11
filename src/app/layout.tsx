import type { Metadata } from "next";
import { Acme, Alex_Brush } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  SITE_DEFAULT_SHARE_IMAGE,
  SITE_NAME,
  SITE_URL,
  resolveSiteUrl,
} from "@/lib/site";
import "./globals.css";

const acme = Acme({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-acme",
});

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-script",
});

const SITE_TITLE = "Assembleia de Deus Madureira Atibaia | Cultos e Programação";
const SITE_DESC =
  "Igreja Evangélica Assembleia de Deus Ministério Madureira – Atibaia/SP. Cultos às terças, quartas, quintas e domingos. Praça Pio XII, 122 – Centro.";
const SHARE_IMAGE_URL = resolveSiteUrl(SITE_DEFAULT_SHARE_IMAGE);

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
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [
      {
        url: SHARE_IMAGE_URL,
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
    images: [SHARE_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// Schema.org JSON-LD — aparece nos resultados do Google
const churchSchema = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Assembleia de Deus Ministério Madureira – Atibaia",
  alternateName: "AD Madureira Atibaia",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
  image: `${SITE_URL}/fachada-da-igreja.jpg`,
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
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema) }}
        />
      </head>
      <body className={`${acme.variable} ${alexBrush.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
