import Link from "next/link";
import CardMedia from "@/components/media/CardMedia";
import { getEventosDestaque, getEventosFuturos } from "@/lib/agenda-utils";

function getEventosHome() {
  const destaquePrincipal = getEventosDestaque(1, false)[0] ?? null;
  const destaqueSecundario = getEventosDestaque(4)
    .filter((evento) => evento.slug !== destaquePrincipal?.slug)
    .slice(0, 3);

  if (destaqueSecundario.length >= 3) {
    return destaqueSecundario;
  }

  const complementares = getEventosFuturos(8).filter(
    (evento) =>
      evento.slug !== destaquePrincipal?.slug &&
      !destaqueSecundario.some((item) => item.slug === evento.slug)
  );

  return [...destaqueSecundario, ...complementares].slice(0, 3);
}

export default function HeroEventos() {
  const eventos = getEventosHome();

  if (eventos.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffa726]">
              Agenda especial
            </p>
            <h2 className="font-acme text-3xl tracking-wide text-[#212121] md:text-4xl">
              Próximos eventos da igreja
            </h2>
            <p className="mt-4 leading-relaxed text-[#5f5f5f]">
              Congressos, batismos, campanhas e celebrações especiais ficam
              reunidos aqui, sem misturar a agenda especial com a programação
              semanal da igreja.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/eventos" className="ui-btn-primary">
              Ver agenda completa
            </Link>
            <Link href="/programacao" className="ui-btn-secondary">
              Ver programação semanal
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {eventos.map((evento, index) => (
            <Link
              key={evento.slug}
              href={`/eventos/${evento.slug}`}
              className="ui-card group overflow-hidden rounded-[1.8rem]"
            >
              <CardMedia
                src={evento.imagem ?? evento.banner}
                alt={evento.titulo}
                variant="event"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                zoomOnHover
                imageClassName="group-hover:scale-[1.02]"
                className="rounded-none"
              />

              <div className="p-5 md:p-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#ffa726]">
                  {evento.data} · {evento.mes}
                  {evento.horario ? ` · ${evento.horario}` : ""}
                </p>
                <h3 className="font-acme text-2xl tracking-wide leading-tight text-[#212121] transition-colors group-hover:text-[#ef5350]">
                  {evento.titulo}
                </h3>
                {evento.local ? (
                  <p className="mt-3 text-xs leading-relaxed text-[#8a8a8a]">
                    {evento.local}
                  </p>
                ) : null}
                <p className="mt-5 inline-flex text-sm font-semibold text-[#ef5350] transition-colors group-hover:text-[#c62828]">
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
