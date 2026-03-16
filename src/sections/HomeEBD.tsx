import Link from "next/link";
import {
  formatEbdDate,
  getClasseEbdInfo,
  getLicaoDaSemana,
} from "@/lib/ebd-utils";

export default function HomeEBD() {
  const classePrincipal = getClasseEbdInfo("adultos");
  const licaoPrincipal = getLicaoDaSemana("adultos");

  return (
    <section className="bg-[#f5f5f5] pt-4 pb-12 md:pt-6 md:pb-16">
      <div className="mx-auto max-w-6xl px-4">
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
              <p className="mb-6 max-w-3xl leading-relaxed text-[#555]">
                {licaoPrincipal.licao.resumo}
              </p>
            </>
          ) : (
            <>
              <h2 className="mb-4 font-acme text-2xl tracking-wide text-[#212121] md:text-4xl">
                Ensino bíblico para seguir a semana com direção
              </h2>
              <p className="mb-6 leading-relaxed text-[#555]">
                Acompanhe a EBD da igreja com acesso rápido à classe, ao
                trimestre e ao estudo publicado para o domingo.
              </p>
            </>
          )}

          <div className="flex flex-wrap gap-3">
            {licaoPrincipal ? (
              <Link
                href={`/ebd/adultos/${licaoPrincipal.trimestre.slug}/${licaoPrincipal.licao.slug}`}
                className="ui-btn-primary"
              >
                Ver lição
              </Link>
            ) : null}
            <Link href="/ebd" className="ui-btn-secondary">
              Ver todas as classes
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
