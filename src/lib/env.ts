import { z } from "zod";

const optionalNonEmptyString = z.string().trim().min(1).optional();

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().trim().url().optional(),
  YOUTUBE_API_KEY: optionalNonEmptyString,
  YOUTUBE_CHANNEL_ID: optionalNonEmptyString,
  YOUTUBE_CHANNEL_HANDLE: optionalNonEmptyString,
  YOUTUBE_MESSAGES_PLAYLIST_ID: optionalNonEmptyString,
  YOUTUBE_TESTIMONIALS_PLAYLIST_ID: optionalNonEmptyString,
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID,
  YOUTUBE_CHANNEL_HANDLE: process.env.YOUTUBE_CHANNEL_HANDLE,
  YOUTUBE_MESSAGES_PLAYLIST_ID: process.env.YOUTUBE_MESSAGES_PLAYLIST_ID,
  YOUTUBE_TESTIMONIALS_PLAYLIST_ID: process.env.YOUTUBE_TESTIMONIALS_PLAYLIST_ID,
});
