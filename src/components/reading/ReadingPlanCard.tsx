import Image from "next/image";
import Link from "next/link";
import type { ReadingPlan } from "@/data/plano-de-leitura";

type ReadingPlanCardProps = {
  plan: ReadingPlan;
};

export default function ReadingPlanCard({ plan }: ReadingPlanCardProps) {
  return (
    <Link
      href={`/espiritualidade/plano-de-leitura/${plan.slug}`}
      className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)]"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={plan.imagem}
          alt={plan.titulo}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
            {plan.destaque}
          </p>
          <h2 className="font-acme text-2xl md:text-3xl text-white tracking-wide">
            {plan.titulo}
          </h2>
        </div>
      </div>

      <div className="p-6 md:p-7">
        <p className="text-[#555] leading-relaxed mb-5">{plan.descricao}</p>
        <div className="flex flex-wrap gap-3 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#777]">
          <span className="rounded-full bg-[#fff8ee] px-3 py-2 text-[#8b5b18]">
            {plan.duracaoLabel}
          </span>
          <span className="rounded-full border border-black/10 px-3 py-2">
            {plan.versiculoBase}
          </span>
        </div>
        <p className="mt-5 text-[#ef5350] text-xs font-semibold tracking-widest uppercase">
          Abrir plano →
        </p>
      </div>
    </Link>
  );
}
