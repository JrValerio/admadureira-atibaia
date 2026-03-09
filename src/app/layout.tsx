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

export const metadata: Metadata = {
  metadataBase: new URL("https://admadureira-atibaia.vercel.app"),
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
