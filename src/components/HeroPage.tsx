import Image from "next/image";

type HeroPageProps = {
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  variant?: "card" | "full";
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
  priority?: boolean;
};

export default function HeroPage({
  label,
  title,
  description,
  image,
  imageAlt,
  variant = "card",
  className = "",
  imageClassName = "",
  objectPosition,
  priority = true,
}: HeroPageProps) {
  const isFull = variant === "full";
  const rootClassName = [
    "relative overflow-hidden text-white",
    isFull
      ? "bg-[#111] h-[30svh] min-h-[15rem] sm:h-[34svh] sm:min-h-[17rem] md:h-[38svh] md:min-h-[19rem] lg:h-[44svh] lg:min-h-[22rem] xl:h-[50svh]"
      : "rounded-[1.75rem] bg-[#212121]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const heroImageClassName = ["object-cover", imageClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName}>
      <div className={`absolute inset-0 ${isFull ? "" : "opacity-30"}`.trim()}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes={
            isFull
              ? "100vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          }
          className={heroImageClassName}
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
      <div
        className={`absolute inset-0 ${
          isFull
            ? "bg-linear-to-b from-black/70 via-black/45 to-black/78"
            : "bg-linear-to-b from-black/78 via-black/55 to-black/82"
        }`.trim()}
      />

      {isFull ? (
        <div className="relative z-10 ui-page-container py-8 sm:py-10 md:py-12 lg:py-16">
          <div className="max-w-2xl lg:max-w-3xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.24em] text-[#ffa726] uppercase sm:text-sm">
              {label}
            </p>
            <h1 className="mb-4 font-acme text-xl tracking-tight leading-tight sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
              {description}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative z-10 max-w-3xl px-5 py-6 sm:px-7 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-14">
          <p className="mb-3 text-xs font-semibold tracking-[0.24em] text-[#ffa726] uppercase sm:text-sm">
            {label}
          </p>
          <h1 className="mb-4 font-acme text-lg tracking-tight leading-tight sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
