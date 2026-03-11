import type { MetadataRoute } from "next";
import { getEventosFuturos } from "@/lib/agenda-utils";
import { getCongregacoes } from "@/data/congregacoes";
import { getMensagens } from "@/data/mensagens";
import { getMinisterios } from "@/data/ministerios";
import { getPastores } from "@/data/pastores";
import { getTestemunhos } from "@/data/testemunhos";
import { resolveSiteUrl } from "@/lib/site";

function parseContentDate(date: string) {
  return new Date(`${date}T12:00:00-03:00`);
}

function getLatestDate(dates: Date[], fallback: Date) {
  if (dates.length === 0) {
    return fallback;
  }

  return new Date(Math.max(...dates.map((date) => date.getTime())));
}

// Prioridade das páginas para o Google
// 1.0 = home | 0.9 = páginas principais | 0.7 = páginas secundárias
export default function sitemap(): MetadataRoute.Sitemap {
  const generatedAt = new Date();
  const mensagens = getMensagens();
  const testemunhos = getTestemunhos();
  const eventosFuturos = getEventosFuturos();

  const latestMensagemDate = getLatestDate(
    mensagens.map((mensagem) => parseContentDate(mensagem.data)),
    generatedAt
  );
  const latestTestemunhoDate = getLatestDate(
    testemunhos.map((testemunho) => parseContentDate(testemunho.data)),
    generatedAt
  );

  const paginasBase: MetadataRoute.Sitemap = [
    {
      url: resolveSiteUrl(""),
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: resolveSiteUrl("/programacao"),
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: resolveSiteUrl("/eventos"),
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: resolveSiteUrl("/sobre"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/historia"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/congregacoes"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/pastores"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/ministerios"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/mensagens"),
      lastModified: latestMensagemDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/testemunhos"),
      lastModified: latestTestemunhoDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/videos"),
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: resolveSiteUrl("/oracao"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: resolveSiteUrl("/contato"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: resolveSiteUrl("/oferta"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const paginasEvento: MetadataRoute.Sitemap = eventosFuturos.map((evento) => ({
    url: resolveSiteUrl(`/eventos/${evento.slug}`),
    // A data do evento não representa a data de modificação do conteúdo.
    lastModified: generatedAt,
    changeFrequency: "weekly",
    priority: evento.destaque ? 0.9 : 0.8,
  }));

  const paginasPastores: MetadataRoute.Sitemap = getPastores().map((pastor) => ({
    url: resolveSiteUrl(`/pastores/${pastor.slug}`),
    lastModified: generatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const paginasCongregacoes: MetadataRoute.Sitemap = getCongregacoes().map(
    (congregacao) => ({
      url: resolveSiteUrl(`/congregacoes/${congregacao.slug}`),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const paginasMinisterios: MetadataRoute.Sitemap = getMinisterios().map(
    (ministerio) => ({
      url: resolveSiteUrl(`/ministerios/${ministerio.slug}`),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const paginasMensagens: MetadataRoute.Sitemap = mensagens.map(
    (mensagem) => ({
      url: resolveSiteUrl(`/mensagens/${mensagem.slug}`),
      lastModified: parseContentDate(mensagem.data),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const paginasTestemunhos: MetadataRoute.Sitemap = testemunhos.map(
    (testemunho) => ({
      url: resolveSiteUrl(`/testemunhos/${testemunho.slug}`),
      lastModified: parseContentDate(testemunho.data),
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
