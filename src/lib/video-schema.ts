import {
  getMensagemThumbnailUrl,
  type Mensagem,
  MENSAGENS_SERIES_DESCRIPTION,
  MENSAGENS_SERIES_NAME,
} from "@/data/mensagens";
import { resolveSiteUrl, SITE_URL } from "@/lib/site";

const VIDEO_SERIES_URL = resolveSiteUrl("/mensagens");
const VIDEO_SERIES_ID = `${VIDEO_SERIES_URL}#series`;
const VIDEO_PUBLISHER = {
  "@type": "Organization",
  name: "AD Madureira Atibaia",
  url: SITE_URL,
} as const;

export function getVideoPageUrl(mensagem: Mensagem) {
  return resolveSiteUrl(`/mensagens/${mensagem.slug}`);
}

export function getVideoEmbedUrl(mensagem: Mensagem) {
  return `https://www.youtube.com/embed/${mensagem.youtubeId}`;
}

export function getVideoContentUrl(mensagem: Mensagem) {
  return `https://www.youtube.com/watch?v=${mensagem.youtubeId}`;
}

export function getVideoThumbnailUrls(mensagem: Mensagem) {
  const thumbnails = [
    resolveSiteUrl(mensagem.capa ?? getMensagemThumbnailUrl(mensagem.youtubeId)),
    getMensagemThumbnailUrl(mensagem.youtubeId),
  ];

  return [...new Set(thumbnails)];
}

function buildVideoEntity(mensagem: Mensagem) {
  const url = getVideoPageUrl(mensagem);

  return {
    "@type": "VideoObject",
    "@id": `${url}#video`,
    name: mensagem.titulo,
    description: mensagem.resumo,
    inLanguage: "pt-BR",
    uploadDate: mensagem.data,
    embedUrl: getVideoEmbedUrl(mensagem),
    contentUrl: getVideoContentUrl(mensagem),
    isFamilyFriendly: true,
    url,
    thumbnailUrl: getVideoThumbnailUrls(mensagem),
    publisher: VIDEO_PUBLISHER,
    isPartOf: {
      "@type": "CreativeWorkSeries",
      "@id": VIDEO_SERIES_ID,
      name: MENSAGENS_SERIES_NAME,
      url: VIDEO_SERIES_URL,
    },
    ...(mensagem.pregador
      ? {
          creator: {
            "@type": "Person",
            name: mensagem.pregador,
          },
        }
      : {}),
    ...(mensagem.versiculo
      ? {
          about: {
            "@type": "CreativeWork",
            name: mensagem.versiculo,
          },
        }
      : {}),
  };
}

export function buildVideoJsonLd(mensagem: Mensagem) {
  return {
    "@context": "https://schema.org",
    ...buildVideoEntity(mensagem),
  };
}

export function buildVideoListJsonLd(mensagens: Mensagem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: MENSAGENS_SERIES_NAME,
    description: MENSAGENS_SERIES_DESCRIPTION,
    url: VIDEO_SERIES_URL,
    numberOfItems: mensagens.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: mensagens.map((mensagem, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getVideoPageUrl(mensagem),
      item: buildVideoEntity(mensagem),
    })),
  };
}

export function buildVideoSeriesJsonLd(mensagens?: Mensagem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    "@id": VIDEO_SERIES_ID,
    name: MENSAGENS_SERIES_NAME,
    description: MENSAGENS_SERIES_DESCRIPTION,
    inLanguage: "pt-BR",
    genre: "Sermons",
    url: VIDEO_SERIES_URL,
    publisher: VIDEO_PUBLISHER,
    ...(mensagens
      ? {
          hasPart: mensagens.map((mensagem) => ({
            "@id": `${getVideoPageUrl(mensagem)}#video`,
          })),
        }
      : {}),
  };
}
