import {
  buildYouTubeContentSlug,
  buildYouTubeSummary,
  getBrazilDateFromIso,
  getYouTubeVideoIdFromSlug,
  inferSpeakerFromTitle,
} from "@/lib/youtube-content";
import {
  getYouTubeMessagesPlaylistVideos,
  getYouTubeThumbnailUrl,
  type YouTubeVideo,
} from "@/lib/youtube";

export interface Mensagem {
  slug: string;
  titulo: string;
  pregador?: string;
  data: string;
  resumo: string;
  versiculo?: string;
  youtubeId: string;
  capa?: string;
}

export const MENSAGENS_SERIES_NAME = "Mensagens da AD Madureira Atibaia";
export const MENSAGENS_SERIES_DESCRIPTION =
  "Série de mensagens e pregações bíblicas ministradas nos cultos da Igreja Assembleia de Deus Ministério Madureira em Atibaia.";

const mensagemEditorialByVideoId: Record<
  string,
  Partial<Pick<Mensagem, "titulo" | "pregador" | "resumo" | "versiculo" | "capa">>
> = {};

function toMensagem(video: YouTubeVideo): Mensagem | null {
  const publishedDate = getBrazilDateFromIso(video.publishedAt);

  if (!publishedDate) {
    return null;
  }

  const editorial = mensagemEditorialByVideoId[video.id] ?? {};

  return {
    slug: buildYouTubeContentSlug(video.title, video.id),
    titulo: editorial.titulo ?? video.title,
    pregador: editorial.pregador ?? inferSpeakerFromTitle(video.title),
    data: publishedDate,
    resumo:
      editorial.resumo ??
      buildYouTubeSummary(
        video.description,
        "Mensagem em vídeo publicada no canal da AD Madureira Atibaia."
      ),
    versiculo: editorial.versiculo,
    youtubeId: video.id,
    capa: editorial.capa ?? video.thumbnail ?? getMensagemThumbnailUrl(video.id),
  };
}

export async function getMensagens() {
  const { videos } = await getYouTubeMessagesPlaylistVideos();

  return videos
    .map(toMensagem)
    .filter((mensagem): mensagem is Mensagem => mensagem !== null);
}

export async function getMensagemBySlug(slug: string) {
  const mensagens = await getMensagens();
  const videoId = getYouTubeVideoIdFromSlug(slug);

  if (videoId) {
    return mensagens.find((mensagem) => mensagem.youtubeId === videoId) ?? null;
  }

  return mensagens.find((mensagem) => mensagem.slug === slug) ?? null;
}

export async function getMensagensRecentes(limit?: number) {
  const mensagens = await getMensagens();
  const orderedMensagens = [...mensagens].sort(
    (a, b) => Date.parse(b.data) - Date.parse(a.data)
  );

  return typeof limit === "number"
    ? orderedMensagens.slice(0, limit)
    : orderedMensagens;
}

export function getMensagemThumbnailUrl(videoId: string) {
  return getYouTubeThumbnailUrl(videoId);
}
