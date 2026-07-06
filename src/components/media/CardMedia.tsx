import Image from "next/image";
import { type ReactNode, type ReactEventHandler } from "react";
import { mediaPresets, type MediaVariant } from "@/lib/media-presets";

type CardMediaProps = {
  src?: string;
  alt: string;
  variant: MediaVariant;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string | false;
  zoomOnHover?: boolean;
  onError?: ReactEventHandler<HTMLImageElement>;
  children?: ReactNode;
};

export default function CardMedia({
  src,
  alt,
  variant,
  sizes,
  priority = false,
  className = "",
  imageClassName = "",
  overlayClassName,
  zoomOnHover = true,
  onError,
  children,
}: CardMediaProps) {
  const preset = mediaPresets[variant];
  const resolvedSrc = src || preset.fallback;

  const wrapperClassName = [preset.aspect, preset.containerClass, "relative", className]
    .filter(Boolean)
    .join(" ");

  const resolvedOverlayClassName =
    overlayClassName === false ? "" : overlayClassName ?? preset.overlayClass;

  const resolvedImageClassName = [
    preset.imageClass,
    zoomOnHover ? "transition-transform duration-300 group-hover:scale-[1.03]" : "",
    imageClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName}>
      {preset.blurredBackdrop ? (
        <Image
          src={resolvedSrc}
          alt=""
          aria-hidden="true"
          fill
          sizes={sizes}
          className="scale-110 object-cover object-center opacity-70 blur-2xl"
        />
      ) : null}
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={resolvedImageClassName}
        onError={onError}
      />
      {resolvedOverlayClassName ? (
        <div className={`absolute inset-0 ${resolvedOverlayClassName}`.trim()} />
      ) : null}
      {children}
    </div>
  );
}
