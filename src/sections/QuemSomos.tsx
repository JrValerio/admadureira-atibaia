import Link from "next/link";
import { Section } from "@/components/ui";

export default function QuemSomos() {
  return (
    <Section bg="white">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
          Nossa Igreja
        </p>
        <h2 className="mb-5 font-acme text-3xl md:text-4xl text-[#212121]">
          Uma comunidade em Atibaia
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-[#555]">
          Igreja Assembleia de Deus Ministério Madureira no Campo de Atibaia —
          comprometida com a pregação do Evangelho, o cuidado das famílias e a
          formação espiritual de cada membro.
        </p>
        <Link href="/sobre" className="ui-btn-primary">
          Conhecer a Igreja
        </Link>
      </div>
    </Section>
  );
}
