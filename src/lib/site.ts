import type { Metadata } from "next";
import { CHURCH_SHORT_NAME } from "@/data/site";
import { env } from "@/lib/env";

const OFFICIAL_SITE_URL = "https://www.admadureiraatibaia.com.br";

function normalizeSiteUrl(value?: string) {
  return value?.trim().replace(/\/+$/, "") ?? "";
}

function isPreviewHost(value: string) {
  try {
    return new URL(value).hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

const configuredSiteUrl = normalizeSiteUrl(env.NEXT_PUBLIC_SITE_URL);

export const SITE_URL =
  configuredSiteUrl && !isPreviewHost(configuredSiteUrl)
    ? configuredSiteUrl
    : OFFICIAL_SITE_URL;

export const SITE_NAME = CHURCH_SHORT_NAME;
export const SITE_DEFAULT_SHARE_IMAGE = "/opengraph-image";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: Metadata["keywords"];
};

export function resolveSiteUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  if (!path) {
    return SITE_URL;
  }

  return path.startsWith("/") ? `${SITE_URL}${path}` : `${SITE_URL}/${path}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = SITE_DEFAULT_SHARE_IMAGE,
  keywords,
}: BuildPageMetadataInput): Metadata {
  const canonicalUrl = resolveSiteUrl(path);
  const shareImageUrl = resolveSiteUrl(image);

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: shareImageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImageUrl],
    },
  };
}
