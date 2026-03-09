export default function Videos() {
  return (
    <section id="videos" className="py-24 bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <p className="text-[#ef5350] text-sm font-semibold tracking-widest uppercase mb-2">
            Canal no YouTube
          </p>
          <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide">
            Últimos Cultos
          </h2>
          <div className="w-16 h-1 bg-[#ef5350] mx-auto mt-4" />
          <p className="text-[#757575] text-sm mt-4">
            Assista nossas pregações e transmissões ao vivo.
          </p>
        </div>

        {/* Player principal */}
        <div className="rounded-2xl overflow-hidden shadow-xl mb-8 aspect-video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed?listType=user_uploads&list=ADMadureiraAtibaia"
            title="Últimos cultos AD Madureira Atibaia"
            className="border-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Link para o canal */}
        <div className="text-center">
          <a
            href="https://www.youtube.com/@ADMadureiraAtibaia"
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
