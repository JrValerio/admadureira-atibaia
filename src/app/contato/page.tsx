import Contato from "@/sections/Contato";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Contato | AD Madureira Atibaia",
  description:
    "Entre em contato com a AD Madureira Atibaia. Praça Pio XII, 122 – Centro, Atibaia/SP. WhatsApp: (11) 91611-6102. Telefone: (11) 4411-6116.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <main>
      <Contato />
    </main>
  );
}
