import Link from "next/link";
import type { MinisterioRecursos } from "@/data/ministerios";

type Props = {
  recursos?: MinisterioRecursos;
};

// Mesma apresentação dos recursos da página de eventos, com título próprio.
export default function RecursosMinisterio({ recursos }: Props) {
  if (!recursos?.itens.length) return null;

  return (
    <div className="mt-8 rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-5">
      <h2 className="ui-card-eyebrow mb-3">{recursos.titulo}</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {recursos.itens.map((item) => (
          <Link
            key={`${item.label}-${item.href}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-[#ffa726]/20 bg-white px-4 py-3 transition-colors hover:border-[#ffa726]/35"
          >
            <p className="font-semibold text-[#212121]">{item.label}</p>
            {item.descricao ? (
              <p className="mt-1 text-sm leading-relaxed text-[#666]">{item.descricao}</p>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
