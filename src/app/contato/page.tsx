import type { Metadata } from "next";
import Contato from "@/sections/Contato";

export const metadata: Metadata = {
  title: "Contato | AD Madureira Atibaia",
  description:
    "Entre em contato com a AD Madureira Atibaia. Praça Pio XII, 122 – Centro, Atibaia/SP. WhatsApp: (11) 91611-6102. Telefone: (11) 4411-6116.",
};

export default function ContatoPage() {
  return (
    <main className="pt-[80px]">
      <Contato />
    </main>
  );
}
