import type { NextConfig } from "next";

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
