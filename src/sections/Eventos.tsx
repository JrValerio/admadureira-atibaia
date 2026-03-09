import Image from "next/image";
import Link from "next/link";
import { getEventosFuturos } from "@/lib/agenda-utils";

export default function Eventos() {
  const eventos = getEventosFuturos(12);

  return (
    <section id="eventos" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
            Agenda
          </p>
          <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide">
            Próximos Eventos
          </h2>
          <div className="w-16 h-1 bg-[#ffa726] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento) => (
            <Link
              key={evento.slug}
              href={`/eventos/${evento.slug}`}
              className="rounded-2xl overflow-hidden border border-gray-100 hover:border-[#ffa726] hover:shadow-md transition-all duration-200 bg-white group"
            >
              <div className="relative w-full aspect-video bg-[#f5f5f5]">
                <Image
                  src={evento.imagem ?? evento.banner ?? "/fachada-da-igreja.jpg"}
                  alt={evento.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                  {evento.data} · {evento.mes}
                </p>
                <h3 className="font-acme text-[#212121] text-lg tracking-wide leading-tight mb-2">
                  {evento.titulo}
                </h3>
                {evento.horario && (
                  <p className="text-[#757575] text-sm mb-1">{evento.horario}</p>
                )}
                {evento.local && (
                  <p className="text-[#9e9e9e] text-xs leading-relaxed">
                    {evento.local}
                  </p>
                )}
                <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mt-4">
                  Ver evento →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
