import Link from "next/link";
import {
  formatEbdDate,
  getClasseEbdInfo,
  getClassesEbdPublicadas,
  getLicaoDaSemana,
} from "@/lib/ebd-utils";

export default function HomeEBD() {
  const classePrincipal = getClasseEbdInfo("adultos");
  const licaoPrincipal = getLicaoDaSemana("adultos");
  const classes = getClassesEbdPublicadas().map((classe) => ({
    classe,
    licaoDaSemana: getLicaoDaSemana(classe.slug),
  }));

  if (!licaoPrincipal && classes.every((item) => !item.licaoDaSemana)) {
    return null;
  }

  return (
    <section className="bg-[#f5f5f5] pt-4 pb-12 md:pt-6 md:pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <article className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:p-8">
            <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
              Escola Bíblica Dominical
            </p>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[#8b5b18]">
                {classePrincipal.horarioLabel}
              </p>
              <span className="inline-flex rounded-full border border-[#ffa726]/20 bg-[#fff8ee] px-3 py-1 text-[11px] font-bold tracking-[0.14em] uppercase text-[#ef5350]">
                {classePrincipal.label}
              </span>
            </div>

            {licaoPrincipal ? (
              <>
                <p className="mb-3 text-sm text-[#666]">
                  Lição {licaoPrincipal.licao.numero} •{" "}
                  {formatEbdDate(licaoPrincipal.licao.data)}
                </p>
                <h2 className="mb-4 font-acme text-2xl tracking-wide text-[#212121] md:text-4xl">
                  {licaoPrincipal.licao.titulo}
                </h2>
                <p className="mb-5 max-w-3xl leading-relaxed text-[#555]">
                  {licaoPrincipal.licao.resumo}
                </p>
                <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-5">
                  <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                    {classePrincipal.resumoDestaqueLabel}
                  </p>
                  <p className="leading-relaxed text-[#555]">
                    {licaoPrincipal.licao.verdadePratica ??
                      licaoPrincipal.licao.textoChave ??
                      "Acompanhe a lição desta semana e participe da EBD com mais clareza ao longo dos dias."}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/ebd/adultos/${licaoPrincipal.trimestre.slug}/${licaoPrincipal.licao.slug}`}
                    className="ui-btn-primary"
                  >
                    Ver lição
                  </Link>
                  <Link href="/ebd" className="ui-btn-secondary">
                    Ver todas as classes
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="mb-4 font-acme text-2xl tracking-wide text-[#212121] md:text-4xl">
                  Ensino bíblico para seguir a semana com direção
                </h2>
                <p className="leading-relaxed text-[#555]">
                  Acompanhe a EBD da igreja com acesso rápido à classe, ao
                  trimestre e ao estudo publicado para o domingo.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/ebd" className="ui-btn-primary">
                    Ver classes
                  </Link>
                </div>
              </>
            )}
          </article>

          <aside className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:p-8">
            <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
              Classes da semana
            </p>
            <h2 className="mb-3 font-acme text-2xl md:text-3xl tracking-wide text-[#212121]">
              Classes publicadas
            </h2>
            <p className="mb-4 md:mb-6 leading-relaxed text-[#555]">
              A EBD acontece todo domingo às 09h, com trilhas publicadas para
              acompanhar a lição da semana e continuar o estudo ao longo dos
              dias.
            </p>

            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-2 xl:flex-col xl:overflow-visible xl:mx-0 xl:px-0 xl:pb-0 xl:space-y-3">
              {classes.map(({ classe, licaoDaSemana }) => (
                <Link
                  key={classe.slug}
                  href={`/ebd/${classe.slug}`}
                  className="group block min-w-[82%] shrink-0 snap-center xl:min-w-0 rounded-2xl border border-white/70 bg-white/80 p-4 transition-colors hover:border-[#ffa726]/25 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                        {classe.label}
                      </p>
                      <h3 className="font-acme text-xl md:text-2xl tracking-wide text-[#212121]">
                        {licaoDaSemana?.licao.titulo ?? classe.horarioLabel}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#555]">
                        {licaoDaSemana
                          ? `Lição ${licaoDaSemana.licao.numero} • ${formatEbdDate(licaoDaSemana.licao.data)}`
                          : classe.descricao}
                      </p>
                    </div>
                    <span className="shrink-0 pt-1 text-xs font-semibold tracking-widest uppercase text-[#ef5350] transition-transform group-hover:translate-x-0.5">
                      Abrir
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
