import type { MetadataRoute } from "next";
import { getEventosAgenda } from "@/lib/agenda-utils";
import { getCongregacoes } from "@/data/congregacoes";
import { getMensagens } from "@/data/mensagens";
import { getMinisterios } from "@/data/ministerios";
import { getPastores } from "@/data/pastores";
import { getTestemunhos } from "@/data/testemunhos";
import { SITE_URL } from "@/lib/site";

// Prioridade das páginas para o Google
// 1.0 = home | 0.9 = páginas principais | 0.7 = páginas secundárias
export default function sitemap(): MetadataRoute.Sitemap {
  const paginasBase: MetadataRoute.Sitemap = [
    { url: SITE_URL,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/programacao`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/eventos`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/sobre`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/historia`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/congregacoes`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/pastores`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/ministerios`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/mensagens`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/testemunhos`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
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

  const paginasPastores: MetadataRoute.Sitemap = getPastores().map((pastor) => ({
    url: `${SITE_URL}/pastores/${pastor.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const paginasCongregacoes: MetadataRoute.Sitemap = getCongregacoes().map(
    (congregacao) => ({
      url: `${SITE_URL}/congregacoes/${congregacao.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const paginasMinisterios: MetadataRoute.Sitemap = getMinisterios().map(
    (ministerio) => ({
      url: `${SITE_URL}/ministerios/${ministerio.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const paginasMensagens: MetadataRoute.Sitemap = getMensagens().map(
    (mensagem) => ({
      url: `${SITE_URL}/mensagens/${mensagem.slug}`,
      lastModified: new Date(mensagem.data),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const paginasTestemunhos: MetadataRoute.Sitemap = getTestemunhos().map(
    (testemunho) => ({
      url: `${SITE_URL}/testemunhos/${testemunho.slug}`,
      lastModified: new Date(testemunho.data),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [
    ...paginasBase,
    ...paginasEvento,
    ...paginasPastores,
    ...paginasCongregacoes,
    ...paginasMinisterios,
    ...paginasMensagens,
    ...paginasTestemunhos,
  ];
}
