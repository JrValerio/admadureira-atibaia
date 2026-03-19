import Link from "next/link";
import { programacaoSemanal, type ItemSemanal } from "@/data/agenda";
import { Card, Section, SectionTitle } from "@/components/ui";

type GrupoCulto = {
  dia: string;
  horarios: Array<{ hora: string; nome: string; slug?: string }>;
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

const DIAS_DESTAQUE = ["Segunda a Sexta", "Terça-feira", "Quinta-feira", "Domingo"];

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
      slug: item.slug,
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

const eventosEspeciais = [
  { nome: "Reunião de Ministério", detalhe: "1ª segunda do mês" },
  { nome: "Santa Ceia", detalhe: "2º sábado do mês" },
  { nome: "Reunião de Obreiros", detalhe: "3º sábado do mês" },
  { nome: "Culto com a Mocidade", detalhe: "4º sábado do mês" },
];

export default function Cultos() {
  const cultos = agruparCultosPorDia(programacaoSemanal);
  const cultosDestaque = cultos.filter((c) => DIAS_DESTAQUE.includes(c.dia));

  return (
    <Section id="cultos" bg="cream">
      <SectionTitle
        eyebrow="Programação"
        eyebrowVariant="gold"
        title="Horários de Culto"
        divider
        description="Programação semanal dos cultos realizados na sede da igreja. Consulte os dias e horários e participe conosco dos momentos de oração, ensino e adoração."
      />

      <div className="mb-8 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:mb-10 md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
        {cultosDestaque.map((culto) => (
          <Card
            key={culto.dia}
            className="h-full border border-black/5 bg-white p-4 md:p-5"
          >
            <h3 className="mb-2 font-acme text-[15px] tracking-wide text-[#212121] md:mb-4 md:text-xl">
              {culto.dia}
            </h3>
            <ul className="space-y-2.5">
              {culto.horarios.map((horario) => (
                <li key={`${culto.dia}-${horario.hora}`} className="border-t border-black/5 pt-2 first:border-t-0 first:pt-0">
                  {horario.slug ? (
                    <Link
                      href={`/programacao/${horario.slug}`}
                      className="block rounded-lg transition-colors hover:text-[#ffa726] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffa726] focus-visible:ring-offset-1"
                    >
                      <p className="text-[11px] font-semibold tracking-wide text-[#212121] md:text-xs">
                        {horario.hora}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-[#5f5f5f] md:text-xs">
                        {horario.nome}
                      </p>
                    </Link>
                  ) : (
                    <>
                      <p className="text-[11px] font-semibold tracking-wide text-[#212121] md:text-xs">
                        {horario.hora}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-[#5f5f5f] md:text-xs">
                        {horario.nome}
                      </p>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <p className="ui-section-eyebrow ui-section-eyebrow--gold mb-4 text-center">
          Eventos Mensais
        </p>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:justify-center sm:gap-8">
          {eventosEspeciais.map((evento) => (
            <div key={evento.nome} className="text-center">
              <p className="text-sm font-semibold text-[#212121]">
                {evento.nome}
              </p>
              <p className="mt-1 text-sm text-[#6c6c6c]">{evento.detalhe}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link href="/programacao" className="ui-btn-primary">
          Ver programação completa
        </Link>
      </div>
    </Section>
  );
}
