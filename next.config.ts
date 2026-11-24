import type { NextConfig } from "next";

// 'unsafe-inline' em script/style: o Next injeta scripts inline e o site não usa nonce.
// frame-src cobre os embeds existentes: YouTube, Google Maps e Spotify (podcast).
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://vercel.live",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.ytimg.com https://img.youtube.com",
  "font-src 'self' data:",
  "media-src 'self' https:",
  "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://open.spotify.com https://vercel.live",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "/*": ["./public/programacao/semanas/**/*"],
  },
  images: {
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1600, 1920, 2048],
    qualities: [68, 72, 74, 75, 78, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/agenda", destination: "/programacao", permanent: false },
      // Atalho da campanha (bio, stories e púlpito). Temporário: depois do
      // congresso o destino pode mudar sem cache de 308 nos navegadores.
      { source: "/confadat", destination: "/eventos/confadat-2026", permanent: false },
    ];
  },
};

export default nextConfig;
