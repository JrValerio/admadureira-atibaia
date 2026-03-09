import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventoBySlug, getEventosAgenda } from "@/lib/agenda-utils";
import { SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getEventosAgenda().map((evento) => ({
    slug: evento.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const evento = getEventoBySlug(slug);

  if (!evento) {
    return {
      title: "Evento não encontrado | AD Madureira Atibaia",
    };
  }

  return {
    title: `${evento.titulo} | AD Madureira Atibaia`,
    description:
      evento.descricao ??
      `${evento.titulo} na AD Madureira Atibaia em ${evento.data}.`,
    alternates: {
      canonical: `${SITE_URL}/eventos/${evento.slug}`,
    },
    openGraph: {
      url: `${SITE_URL}/eventos/${evento.slug}`,
      title: `${evento.titulo} | AD Madureira Atibaia`,
      description:
        evento.descricao ??
        `${evento.titulo} na AD Madureira Atibaia em ${evento.data}.`,
      images: [
        `${SITE_URL}${evento.imagem ?? evento.banner ?? "/fachada-da-igreja.jpg"}`,
      ],
    },
  };
}

export default async function EventoPage({ params }: PageProps) {
  const { slug } = await params;
  const evento = getEventoBySlug(slug);

  if (!evento) {
    notFound();
  }

  return (
    <main className="pt-[80px] bg-[#f5f5f5] min-h-screen">
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            href="/eventos"
            className="inline-block text-[#ef5350] text-xs font-semibold tracking-widest uppercase hover:underline mb-6"
          >
            ← Voltar para eventos
          </Link>

          <div className="rounded-3xl overflow-hidden bg-white shadow-lg border border-black/5">
            <div className="relative w-full aspect-[16/9] bg-[#111]">
              <Image
                src={evento.imagem ?? evento.banner ?? "/fachada-da-igreja.jpg"}
                alt={evento.titulo}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
            </div>

            <div className="p-6 md:p-10">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                {evento.data}
                {evento.horario && ` · ${evento.horario}`}
              </p>

              <h1 className="font-acme text-3xl md:text-5xl text-[#212121] tracking-wide mb-6">
                {evento.titulo}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Data
                  </p>
                  <p className="text-[#212121] text-sm">{evento.data}</p>
                </div>
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Horário
                  </p>
                  <p className="text-[#212121] text-sm">
                    {evento.horario ?? "A confirmar"}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Local
                  </p>
                  <p className="text-[#212121] text-sm">
                    {evento.local ?? "AD Madureira Atibaia"}
                  </p>
                </div>
              </div>

              <div className="max-w-3xl">
                <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-3">
                  Sobre o evento
                </h2>
                <p className="text-[#555] leading-relaxed">
                  {evento.descricao ??
                    "Participe deste evento especial na AD Madureira Atibaia e acompanhe nossa programação para mais detalhes."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                >
                  Como chegar
                </Link>
                <Link
                  href="/programacao"
                  className="inline-flex items-center justify-center border border-[#ef5350] text-[#ef5350] hover:bg-[#ef5350] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                >
                  Ver programação completa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
