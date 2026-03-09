const videosDestaque = [
  {
    id: "iXVuDQRxrlw",
    titulo: "Culto em Destaque",
  },
  {
    id: "TThk0ZEd3OU",
    titulo: "Transmissao em Destaque",
  },
];

const videos = [
  { id: "juq8QkL3urY", titulo: "Transmissao no YouTube" },
  { id: "l87g14Ei6lc", titulo: "Transmissao no YouTube" },
  { id: "_OJUyJQhoGQ", titulo: "Transmissao no YouTube" },
  { id: "m54-MeElqX8", titulo: "Transmissao no YouTube" },
  { id: "8olwOnn4_Zo", titulo: "Transmissao no YouTube" },
  { id: "wM6Uj5e-u6M", titulo: "Transmissao no YouTube" },
  { id: "ZcG3APU1RX8", titulo: "Transmissao no YouTube" },
  { id: "JGN1DXeCBaI", titulo: "Transmissao no YouTube" },
  { id: "oxSegJLl15Y", titulo: "Transmissao no YouTube" },
];

const CANAL_URL = "https://www.youtube.com/@ADMadureiraAtibaia";

function VideoCard({
  id,
  titulo,
  destaque = false,
}: {
  id: string;
  titulo: string;
  destaque?: boolean;
}) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white border border-black/5">
      <div className="aspect-video">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${id}`}
          title={titulo}
          loading={destaque ? undefined : "lazy"}
          className="border-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="px-4 py-3">
        {destaque && (
          <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mb-1">
            Destaque
          </p>
        )}
        <p className="font-acme text-[#212121] text-sm tracking-wide">{titulo}</p>
      </div>
    </div>
  );
}

export default function Videos() {
  return (
    <section id="videos" className="py-24 bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#ef5350] text-sm font-semibold tracking-widest uppercase mb-2">
            Canal no YouTube
          </p>
          <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide">
            Ultimos Cultos
          </h2>
          <div className="w-16 h-1 bg-[#ef5350] mx-auto mt-4" />
          <p className="text-[#757575] text-sm mt-4">
            Assista nossas pregacoes e transmissoes ao vivo.
          </p>
        </div>

        <div className="mb-14">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
            <div>
              <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mb-1">
                Selecoes da semana
              </p>
              <h3 className="font-acme text-2xl text-[#212121] tracking-wide">
                Videos em Destaque
              </h3>
            </div>
            <a
              href={CANAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#ef5350] hover:underline tracking-wide uppercase"
            >
              Ir para o canal -&gt;
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {videosDestaque.map((video) => (
              <VideoCard
                key={video.id}
                id={video.id}
                titulo={video.titulo}
                destaque
              />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
            <div>
              <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mb-1">
                Biblioteca
              </p>
              <h3 className="font-acme text-2xl text-[#212121] tracking-wide">
                Mais Transmissoes
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} id={video.id} titulo={video.titulo} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <a
            href={CANAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-acme bg-[#ef5350] hover:bg-[#c62828] text-white text-sm tracking-widest uppercase px-8 py-3 rounded-full transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Ver canal completo
          </a>
        </div>
      </div>
    </section>
  );
}
