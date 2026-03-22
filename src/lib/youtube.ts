const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_WEB_BASE = "https://www.youtube.com";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY?.trim();
const YOUTUBE_DEFAULT_CHANNEL_ID = "UC7o7BFyJojlnaNGpjqwW5bA";
const YOUTUBE_DEFAULT_CHANNEL_HANDLE = "@ADMadureiraAtibaia";
const YOUTUBE_DEFAULT_CHANNEL_TITLE =
  "Assembleia de Deus - Min. Madureira | Atibaia-SP";

export const YOUTUBE_REVALIDATE_SECONDS = 120;
export const YOUTUBE_CHANNEL = {
  id: process.env.YOUTUBE_CHANNEL_ID?.trim() || YOUTUBE_DEFAULT_CHANNEL_ID,
  handle:
    process.env.YOUTUBE_CHANNEL_HANDLE?.trim() || YOUTUBE_DEFAULT_CHANNEL_HANDLE,
} as const;
export const YOUTUBE_PLAYLIST_IDS = {
  messages:
    process.env.YOUTUBE_MESSAGES_PLAYLIST_ID?.trim() ||
    "PLKt3M45XusTgcIPf06ppWcvTS93Zh4ArV",
  testimonies:
    process.env.YOUTUBE_TESTIMONIALS_PLAYLIST_ID?.trim() ||
    "PLKt3M45XusTi7YQ5vydmMTu7JQV5nj0zd",
} as const;
export const YOUTUBE_LIMITS = {
  generalFeed: 12,
  messagePlaylist: 24,
  testimonyPlaylist: 24,
  liveProbeCandidates: 4,
} as const;

type YouTubeDataSource = "api" | "rss" | "html" | "fallback";

export interface YouTubeVideo {
  id: string;
  title: string;
  description?: string;
  publishedAt?: string;
  thumbnail?: string;
  url: string;
  channelId?: string;
  channelTitle?: string;
  isLive?: boolean;
  isUpcoming?: boolean;
  scheduledStartTime?: string;
  actualStartTime?: string;
  actualEndTime?: string;
  source: YouTubeDataSource;
}

interface YouTubeVideoCollection {
  videos: YouTubeVideo[];
  source: YouTubeDataSource;
  usingFallback: boolean;
}

interface YouTubeLiveState {
  liveNow: YouTubeVideo | null;
  upcomingLive: YouTubeVideo | null;
  source: YouTubeDataSource;
  usingFallback: boolean;
}

interface SearchListResponse {
  items?: Array<{
    id?: {
      videoId?: string;
    };
  }>;
}

interface ChannelListResponse {
  items?: Array<{
    id?: string;
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
  }>;
}

interface PlaylistItemsResponse {
  items?: Array<{
    contentDetails?: {
      videoId?: string;
      videoPublishedAt?: string;
    };
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      channelId?: string;
      channelTitle?: string;
      resourceId?: {
        videoId?: string;
      };
      thumbnails?: ThumbnailMap;
    };
  }>;
}

interface VideosListResponse {
  items?: Array<{
    id?: string;
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      channelId?: string;
      channelTitle?: string;
      liveBroadcastContent?: string;
      thumbnails?: ThumbnailMap;
    };
    liveStreamingDetails?: {
      scheduledStartTime?: string;
      actualStartTime?: string;
      actualEndTime?: string;
    };
  }>;
}

type ThumbnailMap = Partial<
  Record<
    "maxres" | "standard" | "high" | "medium" | "default",
    {
      url?: string;
    }
  >
>;

function getYouTubeWatchUrl(videoId: string) {
  return `${YOUTUBE_WEB_BASE}/watch?v=${videoId}`;
}

export function getYouTubeThumbnailUrl(
  videoId: string,
  quality: "maxresdefault" | "hqdefault" = "hqdefault"
) {
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}

function createFallbackVideo(
  id: string,
  title: string,
  publishedAt: string,
  description: string
): YouTubeVideo {
  return {
    id,
    title,
    description,
    publishedAt,
    thumbnail: getYouTubeThumbnailUrl(id),
    url: getYouTubeWatchUrl(id),
    channelId: YOUTUBE_CHANNEL.id,
    channelTitle: YOUTUBE_DEFAULT_CHANNEL_TITLE,
    source: "fallback",
  };
}

const fallbackMessagesPlaylist: YouTubeVideo[] = [
  createFallbackVideo(
    "gn1q7mfAtGw",
    "NÃO SE PRECIPITE: Deus Vai Cumprir a Promessa no Tempo Certo | Pr. Zacarias",
    "2026-03-21T01:22:09+00:00",
    "Mensagem em vídeo publicada na playlist oficial de Mensagens da AD Madureira Atibaia."
  ),
];

const fallbackTestimoniesPlaylist: YouTubeVideo[] = [
  createFallbackVideo(
    "nD8ww-uzRgg",
    "Entrevista Especial – Pr. Zacarias Bernardes Félix & Pra. Anna Alzira",
    "2025-09-13T22:34:35+00:00",
    "Testemunho em vídeo publicado na playlist oficial de Testemunhos da AD Madureira Atibaia."
  ),
];

const fallbackRecentVideos: YouTubeVideo[] = [
  createFallbackVideo(
    "LWX6A7T-PZI",
    "Culto e Reunião de Obreiros | Hoje às 19h | Toda a Igreja Está Convidada",
    "2026-03-21T00:57:18+00:00",
    "Transmissão recente publicada no canal da AD Madureira Atibaia."
  ),
  createFallbackVideo(
    "HCL1a6rQ8ic",
    "Assembleia de Deus - Min. Madureira | Atibaia-SP está ao vivo!",
    "2026-03-21T01:25:45+00:00",
    "Transmissão recente publicada no canal da AD Madureira Atibaia."
  ),
  createFallbackVideo(
    "gn1q7mfAtGw",
    "NÃO SE PRECIPITE: Deus Vai Cumprir a Promessa no Tempo Certo | Pr. Zacarias",
    "2026-03-21T01:22:09+00:00",
    "Mensagem recente publicada no canal da AD Madureira Atibaia."
  ),
  createFallbackVideo(
    "1b-_PbSMPJs",
    "AO VIVO | Campanha Jejum e Oração | Ministração com Pastor Isaías",
    "2026-03-20T12:18:20+00:00",
    "Transmissão recente publicada no canal da AD Madureira Atibaia."
  ),
  createFallbackVideo(
    "1uyhDvu53no",
    "AO VIVO | Culto da Família | Participação Pr. Otton de Paula | AD Madureira Atibaia",
    "2026-03-16T11:55:13+00:00",
    "Transmissão recente publicada no canal da AD Madureira Atibaia."
  ),
  createFallbackVideo(
    "cbJQKtdNeFc",
    "AO VIVO | Culto de Santa Ceia do Senhor | 14 de Março – 19h",
    "2026-03-15T12:29:53+00:00",
    "Transmissão recente publicada no canal da AD Madureira Atibaia."
  ),
];

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtmlTags(value: string) {
  return value.replace(/<[^>]+>/g, "").trim();
}

function readMetaContent(html: string, pattern: RegExp) {
  const value = html.match(pattern)?.[1] ?? null;
  return value ? decodeHtmlEntities(value) : null;
}

function parsePublishedAtFromHtml(value?: string | null) {
  if (!value) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return parseIsoDate(`${value}T12:00:00Z`);
  }

  return parseIsoDate(value);
}

function pickThumbnail(
  thumbnails?: ThumbnailMap,
  videoId?: string
) {
  return (
    thumbnails?.maxres?.url ||
    thumbnails?.standard?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url ||
    (videoId ? getYouTubeThumbnailUrl(videoId) : undefined)
  );
}

function parseIsoDate(value?: string | null) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function dedupeVideos(videos: YouTubeVideo[]) {
  const seen = new Set<string>();

  return videos.filter((video) => {
    if (seen.has(video.id)) {
      return false;
    }

    seen.add(video.id);
    return true;
  });
}

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function extractInitialDataJson(html: string) {
  const marker = "var ytInitialData = ";
  const start = html.indexOf(marker);
  const end = html.indexOf(";</script>", start);

  if (start === -1 || end === -1) {
    return null;
  }

  try {
    return JSON.parse(html.slice(start + marker.length, end)) as unknown;
  } catch {
    return null;
  }
}

async function fetchYouTubeJson<T>(url: URL): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: YOUTUBE_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function fetchYouTubeText(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: YOUTUBE_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    return await response.text();
  } catch {
    return null;
  }
}

async function resolveChannelIdWithApi() {
  if (process.env.YOUTUBE_CHANNEL_ID?.trim()) {
    return process.env.YOUTUBE_CHANNEL_ID.trim();
  }

  if (!YOUTUBE_API_KEY) {
    return YOUTUBE_CHANNEL.id;
  }

  const url = new URL(`${YOUTUBE_API_BASE}/channels`);
  url.searchParams.set("part", "id");
  url.searchParams.set("forHandle", YOUTUBE_CHANNEL.handle);
  url.searchParams.set("key", YOUTUBE_API_KEY);

  const data = await fetchYouTubeJson<ChannelListResponse>(url);
  return data?.items?.[0]?.id ?? YOUTUBE_CHANNEL.id;
}

async function getUploadsPlaylistIdWithApi(channelId: string) {
  if (!YOUTUBE_API_KEY) {
    return null;
  }

  const url = new URL(`${YOUTUBE_API_BASE}/channels`);
  url.searchParams.set("part", "contentDetails");
  url.searchParams.set("id", channelId);
  url.searchParams.set("key", YOUTUBE_API_KEY);

  const data = await fetchYouTubeJson<ChannelListResponse>(url);
  return data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
}

async function getVideosByIdsWithApi(videoIds: string[]) {
  if (!YOUTUBE_API_KEY || videoIds.length === 0) {
    return [] as YouTubeVideo[];
  }

  const url = new URL(`${YOUTUBE_API_BASE}/videos`);
  url.searchParams.set("part", "snippet,liveStreamingDetails");
  url.searchParams.set("id", videoIds.join(","));
  url.searchParams.set("key", YOUTUBE_API_KEY);

  const data = await fetchYouTubeJson<VideosListResponse>(url);

  return (
    data?.items
      ?.map((item) => {
        const id = item.id;
        const title = item.snippet?.title;

        if (!id || !title) {
          return null;
        }

        const scheduledStartTime = parseIsoDate(
          item.liveStreamingDetails?.scheduledStartTime
        );
        const actualStartTime = parseIsoDate(
          item.liveStreamingDetails?.actualStartTime
        );
        const actualEndTime = parseIsoDate(
          item.liveStreamingDetails?.actualEndTime
        );
        const liveBroadcastContent = item.snippet?.liveBroadcastContent;
        const isLive = liveBroadcastContent === "live" && !actualEndTime;
        const isUpcoming =
          liveBroadcastContent === "upcoming" && !actualStartTime && !actualEndTime;

        return {
          id,
          title,
          description: item.snippet?.description,
          publishedAt: parseIsoDate(item.snippet?.publishedAt) ?? undefined,
          thumbnail: pickThumbnail(item.snippet?.thumbnails, id),
          url: getYouTubeWatchUrl(id),
          channelId: item.snippet?.channelId,
          channelTitle: item.snippet?.channelTitle,
          isLive,
          isUpcoming,
          scheduledStartTime: scheduledStartTime ?? undefined,
          actualStartTime: actualStartTime ?? undefined,
          actualEndTime: actualEndTime ?? undefined,
          source: "api" as const,
        } satisfies YouTubeVideo;
      })
      .filter(isDefined) ?? []
  );
}

async function getPlaylistVideosWithApi(
  playlistId: string,
  limit: number
): Promise<YouTubeVideo[] | null> {
  if (!YOUTUBE_API_KEY) {
    return null;
  }

  const url = new URL(`${YOUTUBE_API_BASE}/playlistItems`);
  url.searchParams.set("part", "snippet,contentDetails");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("maxResults", String(Math.min(limit, 50)));
  url.searchParams.set("key", YOUTUBE_API_KEY);

  const data = await fetchYouTubeJson<PlaylistItemsResponse>(url);
  const videos =
    data?.items
      ?.map((item) => {
        const id =
          item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
        const title = item.snippet?.title;

        if (!id || !title || title === "Deleted video" || title === "Private video") {
          return null;
        }

        return {
          id,
          title,
          description: item.snippet?.description,
          publishedAt:
            parseIsoDate(item.contentDetails?.videoPublishedAt) ||
            parseIsoDate(item.snippet?.publishedAt) ||
            undefined,
          thumbnail: pickThumbnail(item.snippet?.thumbnails, id),
          url: getYouTubeWatchUrl(id),
          channelId: item.snippet?.channelId,
          channelTitle: item.snippet?.channelTitle,
          source: "api" as const,
        } satisfies YouTubeVideo;
      })
      .filter(isDefined) ?? [];

  return dedupeVideos(videos).slice(0, limit);
}

function parseRssFeed(xml: string): YouTubeVideo[] {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

  return entries
    .map((match) => {
      const entry = match[1];
      const pick = (pattern: RegExp) => entry.match(pattern)?.[1] ?? null;
      const id = pick(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const title = pick(/<title>([\s\S]*?)<\/title>/);

      if (!id || !title) {
        return null;
      }

      const description = pick(
        /<media:description>([\s\S]*?)<\/media:description>/
      );
      const publishedAt = pick(/<published>([^<]+)<\/published>/);
      const channelId = pick(/<yt:channelId>([^<]+)<\/yt:channelId>/);
      const channelTitle = pick(/<author>[\s\S]*?<name>([\s\S]*?)<\/name>/);
      const thumbnail = pick(/<media:thumbnail url="([^"]+)"/);

      return {
        id,
        title: decodeHtmlEntities(stripHtmlTags(title)),
        description: description
          ? decodeHtmlEntities(stripHtmlTags(description))
          : undefined,
        publishedAt: parseIsoDate(publishedAt) ?? undefined,
        thumbnail: thumbnail ?? getYouTubeThumbnailUrl(id),
        url: getYouTubeWatchUrl(id),
        channelId: channelId ?? undefined,
        channelTitle: channelTitle
          ? decodeHtmlEntities(stripHtmlTags(channelTitle))
          : undefined,
        source: "rss" as const,
      } satisfies YouTubeVideo;
    })
    .filter(isDefined);
}

async function getPlaylistVideosWithRss(
  playlistId: string,
  limit: number
): Promise<YouTubeVideo[] | null> {
  const xml = await fetchYouTubeText(
    `${YOUTUBE_WEB_BASE}/feeds/videos.xml?playlist_id=${playlistId}`
  );

  if (!xml) {
    return null;
  }

  return parseRssFeed(xml).slice(0, limit);
}

async function getChannelVideosWithRss(
  channelId: string,
  limit: number
): Promise<YouTubeVideo[] | null> {
  const xml = await fetchYouTubeText(
    `${YOUTUBE_WEB_BASE}/feeds/videos.xml?channel_id=${channelId}`
  );

  if (!xml) {
    return null;
  }

  return parseRssFeed(xml).slice(0, limit);
}

async function searchLiveVideosWithApi(
  channelId: string,
  eventType: "live" | "upcoming"
) {
  if (!YOUTUBE_API_KEY) {
    return [] as YouTubeVideo[];
  }

  const url = new URL(`${YOUTUBE_API_BASE}/search`);
  url.searchParams.set("part", "id");
  url.searchParams.set("channelId", channelId);
  url.searchParams.set("type", "video");
  url.searchParams.set("eventType", eventType);
  url.searchParams.set("maxResults", "1");
  url.searchParams.set("order", "date");
  url.searchParams.set("key", YOUTUBE_API_KEY);

  const data = await fetchYouTubeJson<SearchListResponse>(url);
  const ids =
    data?.items
      ?.map((item) => item.id?.videoId)
      .filter((videoId): videoId is string => Boolean(videoId)) ?? [];

  return getVideosByIdsWithApi(ids);
}

function readSimpleText(value: unknown): string | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const simpleText = (value as { simpleText?: string }).simpleText;

  if (typeof simpleText === "string") {
    return simpleText;
  }

  const runs = (value as { runs?: Array<{ text?: string }> }).runs;
  if (!Array.isArray(runs)) {
    return undefined;
  }

  return runs.map((run) => run.text ?? "").join("").trim() || undefined;
}

function walkVideoRenderers(node: unknown, results: Record<string, unknown>[] = []) {
  if (!node || typeof node !== "object") {
    return results;
  }

  const record = node as Record<string, unknown>;
  const videoRenderer = record.videoRenderer;

  if (videoRenderer && typeof videoRenderer === "object") {
    results.push(videoRenderer as Record<string, unknown>);
  }

  for (const value of Object.values(record)) {
    if (Array.isArray(value)) {
      value.forEach((item) => walkVideoRenderers(item, results));
      continue;
    }

    walkVideoRenderers(value, results);
  }

  return results;
}

function walkPlaylistVideoRenderers(
  node: unknown,
  results: Record<string, unknown>[] = []
) {
  if (!node || typeof node !== "object") {
    return results;
  }

  const record = node as Record<string, unknown>;
  const playlistVideoRenderer = record.playlistVideoRenderer;

  if (playlistVideoRenderer && typeof playlistVideoRenderer === "object") {
    results.push(playlistVideoRenderer as Record<string, unknown>);
  }

  for (const value of Object.values(record)) {
    if (Array.isArray(value)) {
      value.forEach((item) => walkPlaylistVideoRenderers(item, results));
      continue;
    }

    walkPlaylistVideoRenderers(value, results);
  }

  return results;
}

function getThumbnailUrlFromRenderer(renderer: Record<string, unknown>) {
  const thumbnails = (renderer.thumbnail as { thumbnails?: Array<{ url?: string }> })
    ?.thumbnails;
  return thumbnails?.[thumbnails.length - 1]?.url;
}

function getVideoFromStreamRenderer(
  renderer: Record<string, unknown>
): YouTubeVideo | null {
  const id = typeof renderer.videoId === "string" ? renderer.videoId : null;
  const title = readSimpleText(renderer.title);

  if (!id || !title) {
    return null;
  }

  const overlayStatus = Array.isArray(renderer.thumbnailOverlays)
    ? (renderer.thumbnailOverlays as Array<Record<string, unknown>>).find(
        (overlay) => overlay.thumbnailOverlayTimeStatusRenderer
      )
    : null;
  const overlayStyle =
    (overlayStatus?.thumbnailOverlayTimeStatusRenderer as { style?: string })?.style ??
    undefined;
  const upcomingStartTime =
    (renderer.upcomingEventData as { startTime?: string })?.startTime ?? undefined;
  const viewCountText = readSimpleText(renderer.viewCountText);
  const badges = Array.isArray(renderer.badges)
    ? (renderer.badges as Array<Record<string, unknown>>)
        .map((badge) =>
          readSimpleText(
            (badge.metadataBadgeRenderer as { label?: string; accessibilityLabel?: string })
              ?.label
              ? { simpleText: (badge.metadataBadgeRenderer as { label?: string }).label }
              : undefined
          )
        )
        .filter((badge): badge is string => Boolean(badge))
    : [];
  const isLive =
    overlayStyle === "LIVE" ||
    /assistindo/i.test(viewCountText ?? "") ||
    badges.some((badge) => /ao vivo/i.test(badge));
  const isUpcoming = Boolean(upcomingStartTime);

  return {
    id,
    title,
    description:
      readSimpleText(
        (renderer.detailedMetadataSnippets as Array<Record<string, unknown>>)?.[0]?.snippetText
      ) ?? undefined,
    publishedAt: undefined,
    thumbnail: getThumbnailUrlFromRenderer(renderer) ?? getYouTubeThumbnailUrl(id),
    url: getYouTubeWatchUrl(id),
    channelId: YOUTUBE_CHANNEL.id,
    channelTitle: YOUTUBE_DEFAULT_CHANNEL_TITLE,
    isLive,
    isUpcoming,
    scheduledStartTime: upcomingStartTime
      ? new Date(Number(upcomingStartTime) * 1000).toISOString()
      : undefined,
    source: "html",
  };
}

async function getVideoFromWatchPage(
  videoId: string,
  fallback?: Partial<Pick<YouTubeVideo, "title" | "description" | "thumbnail">>
): Promise<YouTubeVideo | null> {
  const html = await fetchYouTubeText(getYouTubeWatchUrl(videoId));

  if (!html) {
    return fallback?.title
      ? {
          id: videoId,
          title: fallback.title,
          description: fallback.description,
          publishedAt: undefined,
          thumbnail: fallback.thumbnail ?? getYouTubeThumbnailUrl(videoId),
          url: getYouTubeWatchUrl(videoId),
          channelId: YOUTUBE_CHANNEL.id,
          channelTitle: YOUTUBE_DEFAULT_CHANNEL_TITLE,
          source: "html",
        }
      : null;
  }

  const title =
    readMetaContent(html, /<meta property="og:title" content="([^"]+)"/) ??
    fallback?.title;

  if (!title) {
    return null;
  }

  const publishedAt = parsePublishedAtFromHtml(
    readMetaContent(html, /<meta itemprop="datePublished" content="([^"]+)"/) ??
      html.match(/"publishDate":"([^"]+)"/)?.[1] ??
      null
  );
  const actualStartTime = parseIsoDate(
    html.match(/"startTimestamp":"([^"]+)"/)?.[1] ?? null
  );
  const actualEndTime = parseIsoDate(
    html.match(/"endTimestamp":"([^"]+)"/)?.[1] ?? null
  );
  const isLive = /"isLive":true/.test(html) && !actualEndTime;
  const isUpcoming =
    /"isUpcoming":true/.test(html) && !actualStartTime && !actualEndTime;

  return {
    id: videoId,
    title,
    description:
      readMetaContent(html, /<meta name="description" content="([^"]*)"/) ??
      fallback?.description,
    publishedAt: publishedAt ?? undefined,
    thumbnail:
      readMetaContent(html, /<meta property="og:image" content="([^"]+)"/) ??
      fallback?.thumbnail ??
      getYouTubeThumbnailUrl(videoId),
    url: getYouTubeWatchUrl(videoId),
    channelId:
      html.match(/"channelId":"([^"]+)"/)?.[1] ?? YOUTUBE_CHANNEL.id,
    channelTitle:
      readMetaContent(html, /<meta itemprop="author" content="([^"]+)"/) ??
      YOUTUBE_DEFAULT_CHANNEL_TITLE,
    isLive,
    isUpcoming,
    actualStartTime: actualStartTime ?? undefined,
    actualEndTime: actualEndTime ?? undefined,
    source: "html",
  };
}

async function getLiveStateFromHtml(): Promise<YouTubeLiveState | null> {
  const html = await fetchYouTubeText(
    `${YOUTUBE_WEB_BASE}/${YOUTUBE_CHANNEL.handle}/streams`
  );

  if (!html) {
    return null;
  }

  const data = extractInitialDataJson(html);

  if (!data) {
    return null;
  }

  const videos = walkVideoRenderers(data)
    .slice(0, YOUTUBE_LIMITS.liveProbeCandidates)
    .map(getVideoFromStreamRenderer)
    .filter(isDefined);

  return {
    liveNow: videos.find((video) => video.isLive) ?? null,
    upcomingLive: videos.find((video) => video.isUpcoming) ?? null,
    source: "html",
    usingFallback: false,
  };
}

async function getPlaylistVideosWithHtml(
  playlistId: string,
  limit: number
): Promise<YouTubeVideo[] | null> {
  const html = await fetchYouTubeText(
    `${YOUTUBE_WEB_BASE}/playlist?list=${playlistId}`
  );

  if (!html) {
    return null;
  }

  const data = extractInitialDataJson(html);

  if (!data) {
    return null;
  }

  const playlistVideos = walkPlaylistVideoRenderers(data)
    .map((renderer) => {
      const id = typeof renderer.videoId === "string" ? renderer.videoId : null;
      const title = readSimpleText(renderer.title);

      if (!id || !title) {
        return null;
      }

      return {
        id,
        title,
        thumbnail: getThumbnailUrlFromRenderer(renderer) ?? getYouTubeThumbnailUrl(id),
      };
    })
    .filter(isDefined)
    .slice(0, limit);

  if (playlistVideos.length === 0) {
    return null;
  }

  const hydratedVideos = await Promise.all(
    playlistVideos.map((video) =>
      getVideoFromWatchPage(video.id, {
        title: video.title,
        thumbnail: video.thumbnail,
      })
    )
  );

  return dedupeVideos(hydratedVideos.filter(isDefined)).slice(0, limit);
}

async function getChannelLiveState(channelId: string): Promise<YouTubeLiveState> {
  const apiLiveState = YOUTUBE_API_KEY
    ? await (async () => {
        const [liveVideos, upcomingVideos] = await Promise.all([
          searchLiveVideosWithApi(channelId, "live"),
          searchLiveVideosWithApi(channelId, "upcoming"),
        ]);

        return {
          liveNow: liveVideos.find((video) => video.isLive) ?? null,
          upcomingLive:
            upcomingVideos.find((video) => video.isUpcoming) ?? upcomingVideos[0] ?? null,
          source: "api" as const,
          usingFallback: false,
        } satisfies YouTubeLiveState;
      })()
    : null;

  if (apiLiveState?.liveNow || apiLiveState?.upcomingLive) {
    return apiLiveState;
  }

  const htmlState = await getLiveStateFromHtml();
  if (htmlState) {
    return htmlState;
  }

  return {
    liveNow: null,
    upcomingLive: null,
    source: "fallback",
    usingFallback: true,
  };
}

async function getPlaylistVideos(
  playlistId: string,
  limit: number,
  fallbackVideos: YouTubeVideo[]
): Promise<YouTubeVideoCollection> {
  const apiVideos = await getPlaylistVideosWithApi(playlistId, limit);
  if (apiVideos?.length) {
    return {
      videos: apiVideos,
      source: "api",
      usingFallback: false,
    };
  }

  const rssVideos = await getPlaylistVideosWithRss(playlistId, limit);
  if (rssVideos?.length) {
    return {
      videos: rssVideos,
      source: "rss",
      usingFallback: false,
    };
  }

  const htmlVideos = await getPlaylistVideosWithHtml(playlistId, limit);
  if (htmlVideos?.length) {
    return {
      videos: htmlVideos,
      source: "html",
      usingFallback: false,
    };
  }

  return {
    videos: fallbackVideos.slice(0, limit),
    source: "fallback",
    usingFallback: true,
  };
}

export async function getYouTubeMessagesPlaylistVideos(
  limit = YOUTUBE_LIMITS.messagePlaylist
) {
  // /mensagens = curadoria da playlist oficial de pregações e ministrações.
  return getPlaylistVideos(
    YOUTUBE_PLAYLIST_IDS.messages,
    limit,
    fallbackMessagesPlaylist
  );
}

export async function getYouTubeTestimoniesPlaylistVideos(
  limit = YOUTUBE_LIMITS.testimonyPlaylist
) {
  // /testemunhos = curadoria da playlist oficial de testemunhos.
  return getPlaylistVideos(
    YOUTUBE_PLAYLIST_IDS.testimonies,
    limit,
    fallbackTestimoniesPlaylist
  );
}

export async function getYouTubeChannelVideos(
  limit = YOUTUBE_LIMITS.generalFeed
): Promise<YouTubeVideoCollection> {
  // /videos = feed geral mais recente do canal, sem a curadoria temática das playlists.
  const channelId = await resolveChannelIdWithApi();
  const uploadsPlaylistId = await getUploadsPlaylistIdWithApi(channelId);

  if (uploadsPlaylistId) {
    const apiVideos = await getPlaylistVideosWithApi(uploadsPlaylistId, limit);

    if (apiVideos?.length) {
      return {
        videos: apiVideos,
        source: "api",
        usingFallback: false,
      };
    }
  }

  const rssVideos = await getChannelVideosWithRss(channelId, limit);
  if (rssVideos?.length) {
    return {
      videos: rssVideos,
      source: "rss",
      usingFallback: false,
    };
  }

  return {
    videos: fallbackRecentVideos.slice(0, limit),
    source: "fallback",
    usingFallback: true,
  };
}

export async function getYouTubeFeed() {
  const channelId = await resolveChannelIdWithApi();
  const [liveState, channelVideos] = await Promise.all([
    getChannelLiveState(channelId),
    getYouTubeChannelVideos(YOUTUBE_LIMITS.generalFeed),
  ]);

  // A Home prioriza apenas live ativa; agendamentos continuam como apoio em /videos.
  const recentVideos = dedupeVideos(channelVideos.videos).filter(
    (video) => video.id !== liveState.liveNow?.id
  );

  return {
    liveNow: liveState.liveNow,
    upcomingLive: liveState.upcomingLive,
    recentVideos,
    usingFallback: liveState.usingFallback || channelVideos.usingFallback,
    sources: {
      live: liveState.source,
      videos: channelVideos.source,
    },
  };
}
