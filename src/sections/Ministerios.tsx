import Image from "next/image";
import Link from "next/link";
import { Card, CardGrid, Section, SectionTitle } from "@/components/ui";
import { getMinisterios } from "@/data/ministerios";

export default function Ministerios() {
  const ministerios = getMinisterios();

  return (
    <Section id="ministerios" className="bg-white">
      <SectionTitle
        eyebrow="Departamentos"
        eyebrowVariant="gold"
        title="Ministérios"
        divider
        description={
          <>
            Conheça os ministérios que servem a igreja por meio do discipulado,
            da adoração, da oração e da formação cristã.
          </>
        }
      />

      <CardGrid columns={4}>
          {ministerios.map((min) => (
            <Card
              key={min.slug}
              as={Link}
              href={`/ministerios/${min.slug}`}
              className="group overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-[#111] overflow-hidden">
                <Image
                  src={min.imagem ?? "/fachada-da-igreja.jpg"}
                  alt={min.nome}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              </div>

              <div className="p-5">
                <div className="text-3xl mb-3">{min.icone}</div>
                <p className="text-[#ef5350] text-[11px] font-semibold tracking-widest uppercase mb-2">
                  {min.escopo}
                </p>
                <h3 className="font-acme text-[#212121] text-xl mb-2 group-hover:text-[#ffa726] transition-colors tracking-wide">
                  {min.nome}
                </h3>
                <p className="text-[#757575] text-sm leading-relaxed line-clamp-3">
                  {min.resumo}
                </p>
                <p className="ui-link-accent mt-4">
                  Ver ministério →
                </p>
              </div>
            </Card>
          ))}
      </CardGrid>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
        <Link
          href="/historia"
          className="ui-btn-secondary"
        >
          Ver história da igreja
        </Link>
        <Link
          href="/congregacoes"
          className="ui-btn-primary"
        >
          Ver congregações
        </Link>
      </div>
    </Section>
  );
}
