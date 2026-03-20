import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import Contato from "@/sections/Contato";
import { buildPageMetadata } from "@/lib/site";

const WHATSAPP_NUMBER = "5511916116102";
const MAPS_URL =
  "https://www.google.com/maps/place/Assembleia+de+Deus+Ministerio+do+Madureira+Campo+de+Atibaia/@-23.1138703,-46.5602967,3a,75y,354.67h,95.37t/data=!3m7!1e1!3m5!1s72i0JDXKPIfhEeF7ZyK18Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.3700000000000045%26panoid%3D72i0JDXKPIfhEeF7ZyK18Q%26yaw%3D354.67!7i16384!8i8192!4m7!3m6!1s0x94cec17bc3bbfe13:0x7d8b6d61fad55210!8m2!3d-23.1136683!4d-46.5603364!10e5!16s%2Fg%2F11j833c2dh?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D";

export const metadata = buildPageMetadata({
  title: "Contato | AD Madureira Atibaia",
  description:
    "Entre em contato com a AD Madureira Atibaia. Praça Pio XII, 122 – Centro, Atibaia/SP. WhatsApp: (11) 91611-6102. Telefone: (11) 4411-6116.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <HeroPage
        variant="full"
        label="Venha nos visitar"
        title="Contato e localização"
        description="Encontre a sede da AD Madureira Atibaia, consulte os canais oficiais e fale com a igreja por WhatsApp, telefone ou redes sociais."
        image={igrejaHeroMedia.contato}
        imageAlt="Fachada da AD Madureira Atibaia"
        imageClassName="object-[center_34%]"
      />
      <section className="border-b border-black/5 bg-white/90">
        <div className="ui-page-container py-5 md:py-6">
          <div className="ui-panel ui-panel-pad-sm">
            <p className="ui-section-eyebrow ui-section-eyebrow--gold">
              Próximo passo
            </p>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="font-acme text-xl tracking-wide text-[#212121] md:text-2xl">
                  Escolha o canal mais rápido para falar com a igreja
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                  Abra conversa no WhatsApp, trace sua rota até a sede ou volte
                  para a programação da semana antes de nos visitar.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn-primary"
                >
                  Chamar no WhatsApp
                </a>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn-secondary"
                >
                  Abrir rota no mapa
                </a>
                <Link href="/programacao" className="ui-btn-secondary">
                  Ver programação
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Contato showHeader={false} />
    </main>
  );
}
