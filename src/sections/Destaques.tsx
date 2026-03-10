import { Card } from "@/components/ui/Card";
import { CardGrid } from "@/components/ui/CardGrid";
import { Section } from "@/components/ui/Section";

const destaques = [
  {
    titulo: "Culto ao Vivo",
    descricao: "Assista nossas transmissões ao vivo e pregações no YouTube.",
    icone: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    href: "https://www.youtube.com/@ADMadureiraAtibaia",
    iconColor: "text-[#ef5350]",
    borderColor: "border-[#ef5350]",
    label: "Assistir agora",
  },
  {
    titulo: "Pedido de Oração",
    descricao: "Envie seu pedido de oração e nossa equipe intercederá por você.",
    icone: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    href: "#oracao",
    iconColor: "text-[#ffa726]",
    borderColor: "border-[#ffa726]",
    label: "Enviar pedido",
  },
  {
    titulo: "Redes Sociais",
    descricao: "Siga-nos no Instagram e Facebook para notícias e conteúdo diário.",
    icone: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    href: "https://linktr.ee/admadureira_atibaia",
    iconColor: "text-[#ffd54f]",
    borderColor: "border-[#ffd54f]",
    label: "Seguir",
  },
];

export default function Destaques() {
  return (
    <Section className="bg-[#212121]">
      <CardGrid>
          {destaques.map((item) => (
            <Card
              key={item.titulo}
              as="div"
              dark
              className="group"
            >
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex h-full flex-col items-center text-center p-8"
              >
                <div className={`mb-4 transition-transform duration-300 group-hover:scale-110 ${item.iconColor}`}>
                  {item.icone}
                </div>
                <h3 className={`font-acme text-lg tracking-wide mb-2 ${item.iconColor}`}>
                  {item.titulo}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  {item.descricao}
                </p>
                <span className={`text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full border transition-colors duration-200 ${item.iconColor} ${item.borderColor}`}>
                  {item.label}
                </span>
              </a>
            </Card>
          ))}
      </CardGrid>
    </Section>
  );
}
