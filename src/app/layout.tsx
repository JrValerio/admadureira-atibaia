import type { Metadata } from "next";
import { Acme, Alex_Brush } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { programacaoSemanal } from "@/data/agenda";
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
const diaDaSemanaSchema: Record<string, string[]> = {
  "Segunda a Sexta": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "Segunda-feira": ["Monday"],
  "Terça-feira": ["Tuesday"],
  "Quarta-feira": ["Wednesday"],
  "Quinta-feira": ["Thursday"],
  "Sexta-feira": ["Friday"],
  Domingo: ["Sunday"],
};

function formatTime(value: number) {
  return String(value).padStart(2, "0");
}

function parseHorario(horario?: string) {
  if (!horario) {
    return null;
  }

  const match = horario.match(
    /(\d{1,2})h(\d{2})?(?:\s*[–-]\s*(\d{1,2})h(\d{2})?)?/
  );

  if (!match) {
    return null;
  }

  return {
    startHour: parseInt(match[1], 10),
    startMinute: match[2] ? parseInt(match[2], 10) : 0,
    endHour: match[3] ? parseInt(match[3], 10) : undefined,
    endMinute: match[4] ? parseInt(match[4], 10) : 0,
  };
}

function addMinutes(hour: number, minute: number, minutesToAdd: number) {
  const totalMinutes = hour * 60 + minute + minutesToAdd;

  return {
    hour: Math.floor(totalMinutes / 60),
    minute: totalMinutes % 60,
  };
}

function getDuracaoPadraoMinutos(titulo: string) {
  if (titulo === "Oração Matinal") {
    return 60;
  }

  return 120;
}

function buildOpeningHoursSpecification() {
  // A programação pública informa o horário exato de início e, quando não há
  // faixa explícita, mantemos uma janela padrão para refletir a agenda semanal
  // publicada no site sem deixar o schema incompleto.
  return programacaoSemanal.flatMap((item) => {
    const dias = diaDaSemanaSchema[item.dia] ?? [];
    const horario = parseHorario(item.horario);

    if (!horario) {
      return [];
    }

    const endTime =
      typeof horario.endHour === "number"
        ? {
            hour: horario.endHour,
            minute: horario.endMinute ?? 0,
          }
        : addMinutes(
            horario.startHour,
            horario.startMinute,
            getDuracaoPadraoMinutos(item.titulo)
          );

    return dias.map((dayOfWeek) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek,
      opens: `${formatTime(horario.startHour)}:${formatTime(horario.startMinute)}`,
      closes: `${formatTime(endTime.hour)}:${formatTime(endTime.minute)}`,
    }));
  });
}

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
    latitude: -23.1136683,
    longitude: -46.5603364,
  },
  openingHoursSpecification: buildOpeningHoursSpecification(),
  foundingDate: "1977",
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
        <meta name="format-detection" content="telephone=no,date=no,address=no,email=no" />
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
