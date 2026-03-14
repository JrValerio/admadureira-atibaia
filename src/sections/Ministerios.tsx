import Link from "next/link";
import CardMedia from "@/components/media/CardMedia";
import { Card, CardGrid, Section, SectionTitle } from "@/components/ui";
import { getMinisterios } from "@/data/ministerios";

type MinisteriosProps = {
  showHeader?: boolean;
};

export default function Ministerios({ showHeader = true }: MinisteriosProps) {
  const ministerios = getMinisterios();

  return (
    <Section id="ministerios" className="bg-white">
      {showHeader ? (
        <SectionTitle
          eyebrow="Departamentos"
          eyebrowVariant="gold"
          title="Ministérios"
          divider
          description={
            <>
              Conheça os ministérios que servem a igreja por meio do
              discipulado, da adoração, da oração e da formação cristã.
            </>
          }
        />
      ) : null}

      <CardGrid columns={4}>
        {ministerios.map((min) => (
          <Card
            key={min.slug}
            as={Link}
            href={`/ministerios/${min.slug}`}
            className="group overflow-hidden"
          >
            <CardMedia
              src={min.imagem}
              alt={min.nome}
              variant="institutional"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              imageClassName="group-hover:scale-105"
              className="rounded-none"
            />

            <div className="p-5">
              <p className="text-[#ef5350] text-[11px] font-semibold tracking-widest uppercase mb-2">
                {min.escopo}
              </p>
              <h3 className="font-acme text-[#212121] text-xl mb-2 group-hover:text-[#ffa726] transition-colors tracking-wide">
                {min.nome}
              </h3>
              <p className="text-[#757575] text-sm leading-relaxed line-clamp-3">
                {min.resumo}
              </p>
              <p className="ui-link-accent mt-4 inline-flex">
                Ver ministério →
              </p>
            </div>
          </Card>
        ))}
      </CardGrid>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
        <Link href="/historia" className="ui-btn-secondary">
          Ver história da igreja
        </Link>
        <Link href="/congregacoes" className="ui-btn-primary">
          Ver congregações
        </Link>
      </div>
    </Section>
  );
}
