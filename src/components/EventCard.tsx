import Image from "next/image";

interface EventCardProps {
  titulo: string;
  diaSemana: string;
  horario: string;
  banner?: string;
  tipo?: string;
}

const tipoCor: Record<string, string> = {
  culto: "bg-[#424242]",
  jovens: "bg-[#ef5350]",
  criancas: "bg-[#ffa726]",
  oracao: "bg-[#212121]",
  mulheres: "bg-[#ffa726]",
  homens: "bg-[#424242]",
  especial: "bg-[#ef5350]",
};

export default function EventCard({
  titulo,
  diaSemana,
  horario,
  banner,
  tipo = "culto",
}: EventCardProps) {
  const cor = tipoCor[tipo] ?? "bg-[#424242]";

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 hover:border-[#ffa726] hover:shadow-lg transition-all duration-200 group">
      {/* Banner / imagem do evento */}
      <div className="relative w-full aspect-square bg-[#f5f5f5]">
        {banner ? (
          <Image
            src={banner}
            alt={titulo}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          /* Placeholder quando não há banner */
          <div className={`w-full h-full flex flex-col items-center justify-center ${cor}`}>
            <span className="font-acme text-white text-2xl tracking-wide text-center px-4">
              {titulo}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-3 bg-white">
        <p className="font-acme text-[#212121] text-base tracking-wide leading-tight">
          {titulo}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[#ffa726] text-xs font-bold uppercase tracking-wider">
            {diaSemana}
          </span>
          <span className="text-[#757575] text-xs">{horario}</span>
        </div>
      </div>
    </div>
  );
}
