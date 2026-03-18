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
  priority = true,
}: HeroPageProps) {
  const isFull = variant === "full";
  const rootClassName = [
    "relative overflow-hidden text-white",
    isFull ? "bg-[#111] min-h-[420px]" : "rounded-[2rem] bg-[#212121]",
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
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-18 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-3">
              {label}
            </p>
            <h1 className="font-acme text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-5">
              {title}
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative z-10 px-6 py-8 md:px-10 md:py-14 lg:px-14 lg:py-18 max-w-4xl">
          <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-3">
            {label}
          </p>
          <h1 className="font-acme text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-5">
            {title}
          </h1>
          <p className="text-white/80 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
