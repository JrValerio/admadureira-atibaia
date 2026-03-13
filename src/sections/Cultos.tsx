import { Card, Section, SectionTitle } from "@/components/ui";

const cultos = [
  {
    dia: "Segunda a Sexta",
    horarios: [{ hora: "06:00 – 07:00", nome: "Oração Matinal" }],
  },
  {
    dia: "Segunda-feira",
    horarios: [{ hora: "19:30", nome: "Curso de Teologia" }],
  },
  {
    dia: "Terça-feira",
    horarios: [{ hora: "19:30", nome: "Culto de Ensino" }],
  },
  {
    dia: "Quarta-feira",
    horarios: [
      { hora: "09:00", nome: "Consagração" },
      { hora: "15:00", nome: "Círculo de Oração" },
      { hora: "19:00", nome: "Ensaio das Irmãs" },
    ],
  },
  {
    dia: "Quinta-feira",
    horarios: [{ hora: "19:30", nome: "Quinta da Vitória · Jejum e Oração" }],
  },
  {
    dia: "Sexta-feira",
    horarios: [{ hora: "14:30", nome: "Tarde de Libertação" }],
  },
  {
    dia: "Domingo",
    horarios: [
      { hora: "08:00", nome: "Oração Matinal" },
      { hora: "09:00", nome: "Escola Bíblica Dominical (EBD)" },
      { hora: "11:00", nome: "Ensaio Jovens Rios de Unção" },
      { hora: "18:30", nome: "Culto da Família" },
    ],
  },
];

const eventosEspeciais = [
  { nome: "Reunião de Ministério", detalhe: "1ª segunda do mês" },
  { nome: "Santa Ceia", detalhe: "2º sábado do mês" },
  { nome: "Reunião de Obreiros", detalhe: "3º sábado do mês" },
  { nome: "Culto com a Mocidade", detalhe: "4º sábado do mês" },
];

export default function Cultos() {
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

      <Card className="mx-auto max-w-2xl border border-[#ffa726]/20 bg-white p-7 text-center">
        <p className="ui-section-eyebrow ui-section-eyebrow--gold mb-4">
          Eventos Mensais
        </p>
        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          {eventosEspeciais.map((e) => (
            <div key={e.nome}>
              <p className="text-sm font-semibold text-[#212121]">{e.nome}</p>
              <p className="mt-1 text-sm text-[#6c6c6c]">{e.detalhe}</p>
            </div>
          ))}
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
