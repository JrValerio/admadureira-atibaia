"use client";

import { useState } from "react";
import { Card, Section, SectionTitle } from "@/components/ui";

type FormState = "idle" | "sending" | "sent";

const WHATSAPP_NUMBER = "5511916116102";
const WHATSAPP_DISPLAY = "(11) 91611-6102";
const PHONE_DISPLAY = "(11) 4411-6116";
const MAPS_URL =
  "https://maps.google.com/?q=Pra%C3%A7a+Pio+XII,+122,+Centro,+Atibaia,+SP";

const horarios = [
  "Segunda a Sexta · 06:00 – 07:00 · Oração Matinal",
  "Terça · 19:30 – Culto de Ensino",
  "Quarta · 09:00 – Consagração",
  "Quarta · 15:00 – Círculo de Oração",
  "Quinta · 19:30 – Culto Público",
  "Sexta · 14:30 – Culto de Libertação",
  "Domingo · 09:00 – Escola Bíblica",
  "Domingo · 18:30 – Culto da Família",
];

const redes = [
  {
    nome: "TikTok",
    href: "https://www.tiktok.com/@midia.ad.madureira",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.5 3c.27 1.58 1.26 3 2.66 3.92A6.6 6.6 0 0 0 21 8v2.72a9.48 9.48 0 0 1-4.5-1.1v5.7a6.12 6.12 0 1 1-6.12-6.12c.32 0 .64.03.95.08v2.8a3.44 3.44 0 1 0 2.17 3.24V3h1z" />
      </svg>
    ),
  },
  {
    nome: "Instagram",
    href: "https://www.instagram.com/admadureira_atibaia/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    nome: "YouTube",
    href: "https://www.youtube.com/@ADMadureiraAtibaia",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    nome: "Facebook Sede",
    href: "https://www.facebook.com/ADMadureiraSedeAtibaia/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

type ContatoProps = {
  showHeader?: boolean;
};

export default function Contato({ showHeader = true }: ContatoProps) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });
  const [status, setStatus] = useState<FormState>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const mensagem = encodeURIComponent(
      `*Contato pelo site*\n\n` +
        `Nome: ${form.nome}\n` +
        `E-mail: ${form.email}\n` +
        `Telefone: ${form.telefone || "Não informado"}\n` +
        `Assunto: ${form.assunto}\n\n` +
        `*Mensagem:*\n${form.mensagem}`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensagem}`, "_blank");
    setStatus("sent");
    setForm({
      nome: "",
      email: "",
      telefone: "",
      assunto: "",
      mensagem: "",
    });
  }

  return (
    <Section id="contato" className="bg-[#f5f5f5]">
      {showHeader ? (
        <SectionTitle
          eyebrow="Venha nos visitar"
          eyebrowVariant="gold"
          title="Como Chegar"
          divider
          description="Encontre a sede da igreja, consulte nossos horários e utilize os canais oficiais para falar conosco."
        />
      ) : null}

      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffa726]">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-[#212121]">Endereço</h4>
              <p className="mb-3 text-sm leading-relaxed text-[#424242]">
                Praça Pio XII, 122
                <br />
                Centro – Atibaia/SP
                <br />
                CEP 12940-160
              </p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#ffa726] uppercase hover:underline"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Abrir no Google Maps
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffa726]">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-[#212121]">Telefone / WhatsApp</h4>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#424242] transition-colors hover:text-[#ffa726]"
              >
                WhatsApp: {WHATSAPP_DISPLAY}
              </a>
              <a
                href="tel:+551144116116"
                className="block text-sm text-[#424242] transition-colors hover:text-[#ffa726]"
              >
                Telefone: {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffa726]">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-[#212121]">Horários</h4>
              <ul className="space-y-1 text-sm text-[#424242]">
                {horarios.map((horario) => (
                  <li key={horario}>{horario}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-gray-200 shadow-md h-80">
          <iframe
            title="Localização AD Madureira Atibaia"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.3!2d-46.5567!3d-23.1171!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef8a6b1234567%3A0x1234567890abcdef!2sPra%C3%A7a%20Pio%20XII%2C%20122%20-%20Centro%2C%20Atibaia%20-%20SP%2C%2012940-160!5e0!3m2!1spt-BR!2sbr!4v1"
            width="100%"
            height="100%"
            loading="lazy"
            className="border-0"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-8 md:p-10">
          <div className="mb-8">
            <p className="ui-section-eyebrow ui-section-eyebrow--gold">
              Formulário de contato
            </p>
            <h3 className="font-acme text-2xl tracking-wide text-[#212121]">
              Fale Conosco
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5f5f5f]">
              Envie sua mensagem e ela será encaminhada para a igreja via WhatsApp.
              Use este canal para dúvidas, informações sobre cultos e contato geral.
            </p>
          </div>

          {status === "sent" ? (
            <div className="py-8 text-center">
              <h4 className="font-acme text-xl tracking-wide text-[#212121]">
                Conversa aberta no WhatsApp
              </h4>
              <p className="mt-3 text-sm text-[#757575]">
                Sua mensagem foi preparada para envio no WhatsApp da igreja.
                Revise o texto e conclua o envio na conversa aberta.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="ui-btn-secondary mt-6"
              >
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="nome" className="mb-1 block text-sm font-semibold text-[#424242]">
                    Nome *
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#212121] placeholder-gray-400 transition-colors focus:border-[#ffa726] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-semibold text-[#424242]">
                    E-mail *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#212121] placeholder-gray-400 transition-colors focus:border-[#ffa726] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="telefone" className="mb-1 block text-sm font-semibold text-[#424242]">
                    Telefone / WhatsApp
                  </label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="(11) 9xxxx-xxxx"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#212121] placeholder-gray-400 transition-colors focus:border-[#ffa726] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="assunto" className="mb-1 block text-sm font-semibold text-[#424242]">
                    Assunto *
                  </label>
                  <input
                    id="assunto"
                    name="assunto"
                    type="text"
                    required
                    value={form.assunto}
                    onChange={handleChange}
                    placeholder="Sobre o que deseja falar?"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#212121] placeholder-gray-400 transition-colors focus:border-[#ffa726] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mensagem" className="mb-1 block text-sm font-semibold text-[#424242]">
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  rows={6}
                  value={form.mensagem}
                  onChange={handleChange}
                  placeholder="Escreva aqui sua mensagem..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#212121] placeholder-gray-400 transition-colors focus:border-[#ffa726] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="ui-btn-primary w-full disabled:opacity-60"
              >
                {status === "sending" ? "Enviando..." : "Enviar mensagem via WhatsApp"}
              </button>

              <p className="text-center text-xs text-[#9e9e9e]">
                Sua mensagem será preparada para envio no WhatsApp oficial da
                igreja.
              </p>
            </form>
          )}
        </Card>

        <div>
          <Card className="h-full p-8">
            <p className="ui-section-eyebrow ui-section-eyebrow--gold">
              Redes da igreja
            </p>
            <h3 className="font-acme text-2xl tracking-wide text-[#212121]">
              Nossas Redes Sociais
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f]">
              Acompanhe a igreja nas redes sociais para cultos, avisos, transmissões
              e conteúdos publicados durante a semana.
            </p>

            <div className="mt-6 space-y-3">
              {redes.map((rede) => (
                <a
                  key={rede.nome}
                  href={rede.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-black/6 bg-[#faf8f3] px-4 py-3 text-sm text-[#424242] transition-colors hover:border-[#ffa726]/40 hover:text-[#212121]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-white transition-colors group-hover:bg-[#ffa726] group-hover:text-[#111]">
                    {rede.icon}
                  </span>
                  <span className="font-medium">{rede.nome}</span>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
