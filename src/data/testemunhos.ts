import {
  buildYouTubeContentSlug,
  buildYouTubeStory,
  buildYouTubeSummary,
  getBrazilDateFromIso,
  getYouTubeVideoIdFromSlug,
  inferTestimonyParticipants,
} from "@/lib/youtube-content";
import {
  getYouTubeTestimoniesPlaylistVideos,
  getYouTubeThumbnailUrl,
  type YouTubeVideo,
} from "@/lib/youtube";

export interface Testemunho {
  slug: string;
  nome: string;
  titulo: string;
  resumo: string;
  historia: string;
  data: string;
  foto?: string;
  youtubeId?: string;
}

const testemunhoEditorialByVideoId: Record<
  string,
  Partial<Pick<Testemunho, "nome" | "titulo" | "resumo" | "historia" | "foto">>
> = {};

function toTestemunho(video: YouTubeVideo): Testemunho | null {
  const publishedDate = getBrazilDateFromIso(video.publishedAt);

  if (!publishedDate) {
    return null;
  }

  const editorial = testemunhoEditorialByVideoId[video.id] ?? {};

  return {
    slug: buildYouTubeContentSlug(video.title, video.id),
    nome:
      editorial.nome ??
      inferTestimonyParticipants(video.title) ??
      "Canal AD Madureira Atibaia",
    titulo: editorial.titulo ?? video.title,
    resumo:
      editorial.resumo ??
      buildYouTubeSummary(
        video.description,
        "Testemunho em vídeo publicado no canal da AD Madureira Atibaia."
      ),
    historia:
      editorial.historia ??
      buildYouTubeStory(
        video.description,
        "Testemunho em vídeo publicado no canal da AD Madureira Atibaia."
      ),
    data: publishedDate,
    foto: editorial.foto ?? video.thumbnail ?? getYouTubeThumbnailUrl(video.id),
    youtubeId: video.id,
  };
}

export async function getTestemunhos() {
  const { videos } = await getYouTubeTestimoniesPlaylistVideos();

  return videos
    .map(toTestemunho)
    .filter((testemunho): testemunho is Testemunho => testemunho !== null);
}

export async function getTestemunhoBySlug(slug: string) {
  const testemunhos = await getTestemunhos();
  const videoId = getYouTubeVideoIdFromSlug(slug);

  if (videoId) {
    return testemunhos.find((testemunho) => testemunho.youtubeId === videoId) ?? null;
  }

  return testemunhos.find((testemunho) => testemunho.slug === slug) ?? null;
}

export async function getTestemunhosRecentes(limit?: number) {
  const testemunhos = await getTestemunhos();
  const orderedTestemunhos = [...testemunhos].sort(
    (a, b) => Date.parse(b.data) - Date.parse(a.data)
  );

  return typeof limit === "number"
    ? orderedTestemunhos.slice(0, limit)
    : orderedTestemunhos;
}
