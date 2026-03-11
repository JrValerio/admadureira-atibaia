import type { Metadata } from "next";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(
  /\/+$/,
  ""
);

export const SITE_URL =
  configuredSiteUrl || "https://admadureira-atibaia.vercel.app";

export const SITE_NAME = "AD Madureira Atibaia";
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
