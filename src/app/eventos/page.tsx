import Eventos from "@/sections/Eventos";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Eventos e Agenda | AD Madureira Atibaia",
  description:
    "Confira os próximos eventos da AD Madureira Atibaia: congressos, vigílias, encontros e cultos especiais.",
  path: "/eventos",
});

export default function EventosPage() {
  return (
    <main>
      <Eventos />
    </main>
  );
}
