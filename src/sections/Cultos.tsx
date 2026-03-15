import Link from "next/link";
import { programacaoSemanal, type ItemSemanal } from "@/data/agenda";
import { Card, Section, SectionTitle } from "@/components/ui";

type GrupoCulto = {
  dia: string;
  horarios: Array<{ hora: string; nome: string }>;
};

const ordemCultos = [
  "Segunda a Sexta",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Domingo",
] as const;

function agruparCultosPorDia(itens: ReadonlyArray<ItemSemanal>): GrupoCulto[] {
  const grupos = new Map<string, GrupoCulto["horarios"]>();

  itens.forEach((item) => {
    if (
      process.env.NODE_ENV === "development" &&
      !ordemCultos.includes(item.dia as (typeof ordemCultos)[number])
    ) {
      console.warn(`[Cultos] dia nao mapeado em ordemCultos: "${item.dia}"`);
    }

    const atuais = grupos.get(item.dia) ?? [];
    atuais.push({
      hora: item.horario ?? "Horário a confirmar",
      nome: item.titulo,
    });
    grupos.set(item.dia, atuais);
  });

  return ordemCultos.reduce<GrupoCulto[]>((resultado, dia) => {
    const horarios = grupos.get(dia);
    if (!horarios?.length) return resultado;

    resultado.push({ dia, horarios });
    return resultado;
  }, []);
}

export default function Cultos() {
  const cultos = agruparCultosPorDia(programacaoSemanal);

  return (
    <Section id="cultos" className="bg-[#f7f6f2]">
      <SectionTitle
        eyebrow="Programação"
        eyebrowVariant="gold"
        title="Horários de Culto"
        divider
        description="Programação semanal dos cultos realizados na sede da igreja. Consulte os dias e horários e participe conosco dos momentos de oração, ensino e adoração."
      />

      <div className="mb-12 -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-6 md:px-0 md:overflow-visible md:pb-0">
        {cultos.map((culto) => (
          <Card
            key={culto.dia}
            className="min-w-[260px] snap-start border border-black/5 bg-white p-6 md:min-w-0 md:p-7"
          >
            <h3 className="mb-4 font-acme text-xl tracking-wide text-[#212121]">
              {culto.dia}
            </h3>
            <ul className="space-y-3">
              {culto.horarios.map((horario) => (
                <li key={`${culto.dia}-${horario.hora}`} className="border-t border-black/5 pt-3 first:border-t-0 first:pt-0">
                  <p className="text-sm font-semibold tracking-wide text-[#212121]">
                    {horario.hora}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#5f5f5f]">
                    {horario.nome}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card className="mx-auto max-w-3xl border border-[#ffa726]/20 bg-white p-7 text-center">
        <p className="ui-section-eyebrow ui-section-eyebrow--gold mb-4">
          Agenda especial
        </p>
        <h3 className="font-acme text-3xl tracking-wide text-[#212121]">
          Eventos especiais ficam na agenda da igreja
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6c6c6c]">
          Santa Ceia, batismos, congressos, campanhas e encontros mensais
          ficam reunidos na página de eventos, separando a rotina semanal da
          agenda especial da igreja com mais clareza.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/eventos" className="ui-btn-primary">
            Ver agenda de eventos
          </Link>
          <Link href="/contato" className="ui-btn-secondary">
            Falar com a igreja
          </Link>
        </div>
      </Card>

      <p className="mt-8 text-center text-sm text-[#7a7a7a]">
        Acompanhe também pelo nosso canal no{" "}
        <a
          href="https://www.youtube.com/@ADMadureiraAtibaia"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#ef5350] hover:underline font-semibold"
        >
          YouTube
        </a>
      </p>
    </Section>
  );
}
