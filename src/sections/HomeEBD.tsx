import Link from "next/link";
import {
  formatEbdDate,
  getClasseEbdInfo,
  getLicaoDaSemana,
} from "@/lib/ebd-utils";

const slideClass =
  "min-w-[84vw] max-w-[21rem] shrink-0 snap-center sm:min-w-0 sm:max-w-none";

export default function HomeEBD() {
  const classeAdultos = getClasseEbdInfo("adultos");
  const licaoAdultos = getLicaoDaSemana("adultos");
  const classeJovens = getClasseEbdInfo("jovens");
  const licaoJovens = getLicaoDaSemana("jovens");

  return (
    <section className="bg-[#f5f5f5] pt-4 pb-12 md:pt-6 md:pb-16 [content-visibility:auto] [contain-intrinsic-size:48rem]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="-mx-4 flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none">
          {/* Adultos */}
          <div className={slideClass}>
            <article className="ui-panel ui-panel-pad w-full">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Escola Bíblica Dominical
              </p>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[#8b5b18]">
                  {classeAdultos.horarioLabel}
                </p>
                <span className="inline-flex rounded-full border border-[#ffa726]/20 bg-[#fff8ee] px-3 py-1 text-[11px] font-bold tracking-[0.14em] uppercase text-[#ef5350]">
                  {classeAdultos.label}
                </span>
              </div>

              {licaoAdultos ? (
                <>
                  <p className="mb-3 text-sm text-[#666]">
                    Lição {licaoAdultos.licao.numero} •{" "}
                    {formatEbdDate(licaoAdultos.licao.data)}
                  </p>
                  <h2 className="mb-4 font-acme text-2xl tracking-wide text-[#212121]">
                    {licaoAdultos.licao.titulo}
                  </h2>
                  <p className="mb-6 leading-relaxed text-[#555]">
                    {licaoAdultos.licao.resumo}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="mb-4 font-acme text-2xl tracking-wide text-[#212121]">
                    Ensino bíblico para seguir a semana com direção
                  </h2>
                  <p className="mb-6 leading-relaxed text-[#555]">
                    Acompanhe a EBD da igreja com acesso rápido à classe, ao
                    trimestre e ao estudo publicado para o domingo.
                  </p>
                </>
              )}

              <div className="flex flex-wrap gap-3">
                {licaoAdultos ? (
                  <Link
                    href={`/ebd/adultos/${licaoAdultos.trimestre.slug}/${licaoAdultos.licao.slug}`}
                    className="ui-btn-primary"
                  >
                    Ver lição
                  </Link>
                ) : null}
                <Link href="/ebd/adultos" className="ui-btn-secondary">
                  Ver classe
                </Link>
              </div>
            </article>
          </div>

          {/* Jovens */}
          <div className={slideClass}>
            <article className="ui-panel-accent ui-panel-pad w-full">
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Escola Bíblica Dominical
              </p>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[#8b5b18]">
                  {classeJovens.horarioLabel}
                </p>
                <span className="inline-flex rounded-full border border-[#ffa726]/20 bg-white/70 px-3 py-1 text-[11px] font-bold tracking-[0.14em] uppercase text-[#ef5350]">
                  {classeJovens.label}
                </span>
              </div>

              {licaoJovens ? (
                <>
                  <p className="mb-3 text-sm text-[#666]">
                    Lição {licaoJovens.licao.numero} •{" "}
                    {formatEbdDate(licaoJovens.licao.data)}
                  </p>
                  <h2 className="mb-4 font-acme text-2xl tracking-wide text-[#212121]">
                    {licaoJovens.licao.titulo}
                  </h2>
                  <p className="mb-6 leading-relaxed text-[#555]">
                    {licaoJovens.licao.resumo}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="mb-4 font-acme text-2xl tracking-wide text-[#212121]">
                    Formação espiritual para jovens
                  </h2>
                  <p className="mb-6 leading-relaxed text-[#555]">
                    Temas ligados à identidade, propósito e maturidade cristã,
                    com lição publicada todo domingo.
                  </p>
                </>
              )}

              <div className="flex flex-wrap gap-3">
                {licaoJovens ? (
                  <Link
                    href={`/ebd/jovens/${licaoJovens.trimestre.slug}/${licaoJovens.licao.slug}`}
                    className="ui-btn-primary"
                  >
                    Ver lição
                  </Link>
                ) : null}
                <Link href="/ebd/jovens" className="ui-btn-secondary">
                  Ver classe
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
