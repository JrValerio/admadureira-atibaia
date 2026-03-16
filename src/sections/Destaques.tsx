import Link from "next/link";
import { Card, Section } from "@/components/ui";

const destaques = [
  {
    titulo: "Culto ao Vivo",
    descricao: "Assista nossas transmissões no YouTube e acompanhe os cultos da igreja.",
    href: "https://www.youtube.com/@ADMadureiraAtibaia",
    label: "Assistir agora →",
    external: true,
    icone: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    titulo: "Pedido de Oração",
    descricao: "Envie seu pedido e nossa equipe de intercessão orará com você.",
    href: "/oracao",
    label: "Fazer pedido →",
    external: false,
    icone: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    titulo: "Redes Sociais",
    descricao: "Encontre nossos canais, endereço e formas de contato da igreja.",
    href: "/contato",
    label: "Ver contatos →",
    external: false,
    icone: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Destaques() {
  return (
    <Section className="bg-[#151515]">
      <div className="-mx-4 flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:snap-none">
        {destaques.map((item) => {
          const cardContent = (
            <Card
              dark
              className="group h-full border border-white/10 bg-[#1a1a1a] p-4 md:p-6 lg:p-8 text-center transition hover:border-[#ffa726]/70"
            >
              <div className="mb-2 md:mb-4 flex justify-center text-[#ffa726] transition-transform duration-300 group-hover:scale-110">
                {item.icone}
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-white">{item.titulo}</h3>
              <p className="mt-1 md:mt-2 text-xs md:text-sm leading-relaxed text-white/60">{item.descricao}</p>
              <span className="mt-3 md:mt-5 inline-block text-xs md:text-sm font-medium text-[#ffa726] group-hover:underline">
                {item.label}
              </span>
            </Card>
          );

          return item.external ? (
            <a
              key={item.titulo}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block min-w-[78%] shrink-0 snap-center md:min-w-0"
            >
              {cardContent}
            </a>
          ) : (
            <Link key={item.titulo} href={item.href} className="block min-w-[78%] shrink-0 snap-center md:min-w-0">
              {cardContent}
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
