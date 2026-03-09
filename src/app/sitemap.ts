import type { MetadataRoute } from "next";
import { getEventosAgenda } from "@/lib/agenda-utils";

const SITE_URL = "https://admadureira-atibaia.vercel.app";

// Prioridade das páginas para o Google
// 1.0 = home | 0.9 = páginas principais | 0.7 = páginas secundárias
export default function sitemap(): MetadataRoute.Sitemap {
  const paginasBase: MetadataRoute.Sitemap = [
    { url: SITE_URL,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/programacao`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/eventos`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/sobre`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/ministerios`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/videos`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE_URL}/oracao`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contato`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const paginasEvento: MetadataRoute.Sitemap = getEventosAgenda().map((evento) => ({
    url: `${SITE_URL}/eventos/${evento.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: evento.destaque ? 0.9 : 0.8,
  }));

  return [...paginasBase, ...paginasEvento];
}
