const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const YOUTUBE_CHANNEL_HANDLE =
  process.env.YOUTUBE_CHANNEL_HANDLE ?? "@ADMadureiraAtibaia";

export interface YouTubeVideo {
  id: string;
  title: string;
  isLive?: boolean;
}

interface SearchListResponse {
  items?: Array<{
    id?: {
      videoId?: string;
    };
    snippet?: {
      title?: string;
    };
  }>;
}

interface ChannelListResponse {
  items?: Array<{
    id?: string;
  }>;
}

const fallbackRecentVideos: YouTubeVideo[] = [
  { id: "juq8QkL3urY", title: "Transmissao no YouTube" },
  { id: "l87g14Ei6lc", title: "Transmissao no YouTube" },
  { id: "_OJUyJQhoGQ", title: "Transmissao no YouTube" },
  { id: "m54-MeElqX8", title: "Transmissao no YouTube" },
  { id: "8olwOnn4_Zo", title: "Transmissao no YouTube" },
  { id: "wM6Uj5e-u6M", title: "Transmissao no YouTube" },
  { id: "ZcG3APU1RX8", title: "Transmissao no YouTube" },
  { id: "JGN1DXeCBaI", title: "Transmissao no YouTube" },
  { id: "oxSegJLl15Y", title: "Transmissao no YouTube" },
  { id: "iXVuDQRxrlw", title: "Culto em Destaque" },
  { id: "TThk0ZEd3OU", title: "Transmissao em Destaque" },
];

async function fetchYouTubeJson<T>(url: URL): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function getChannelId(): Promise<string | null> {
  if (YOUTUBE_CHANNEL_ID) {
    return YOUTUBE_CHANNEL_ID;
  }

  if (!YOUTUBE_API_KEY) {
    return null;
  }

  const url = new URL(`${YOUTUBE_API_BASE}/channels`);
  url.searchParams.set("part", "id");
  url.searchParams.set("forHandle", YOUTUBE_CHANNEL_HANDLE);
  url.searchParams.set("key", YOUTUBE_API_KEY);

  const data = await fetchYouTubeJson<ChannelListResponse>(url);
  return data?.items?.[0]?.id ?? null;
}

async function searchChannelVideos(
  channelId: string,
  params: Record<string, string>
): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    return [];
  }

  const url = new URL(`${YOUTUBE_API_BASE}/search`);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("channelId", channelId);
  url.searchParams.set("type", "video");
  url.searchParams.set("key", YOUTUBE_API_KEY);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const data = await fetchYouTubeJson<SearchListResponse>(url);

  return (
    data?.items
      ?.map((item) => {
        const id = item.id?.videoId;
        const title = item.snippet?.title;

        if (!id || !title) {
          return null;
        }

        return { id, title };
      })
      .filter((item): item is YouTubeVideo => item !== null) ?? []
  );
}

export async function getYouTubeFeed() {
  const channelId = await getChannelId();

  if (!channelId) {
    return {
      liveNow: null as YouTubeVideo | null,
      recentVideos: fallbackRecentVideos,
      usingFallback: true,
    };
  }

  const [liveVideos, completedVideos] = await Promise.all([
    searchChannelVideos(channelId, {
      eventType: "live",
      maxResults: "1",
    }),
    searchChannelVideos(channelId, {
      eventType: "completed",
      order: "date",
      maxResults: "12",
    }),
  ]);

  const liveNow = liveVideos[0]
    ? { ...liveVideos[0], isLive: true }
    : null;

  const recentVideos = completedVideos.filter(
    (video) => video.id !== liveNow?.id
  );

  return {
    liveNow,
    recentVideos:
      recentVideos.length > 0 ? recentVideos : fallbackRecentVideos,
    usingFallback: false,
  };
}
