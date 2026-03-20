"use client";

import { useState } from "react";
import { Section, SectionTitle } from "@/components/ui";
import { SEDE_WHATSAPP_URL } from "@/data/site";

type FormState = "idle" | "sending" | "sent" | "error";

type OracaoProps = {
  showHeader?: boolean;
};

export default function Oracao({ showHeader = true }: OracaoProps) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    pedido: "",
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

    // Abre WhatsApp com o pedido formatado
    const mensagem = encodeURIComponent(
      `*Pedido de Oração*\n\n` +
        `Nome: ${form.nome}\n` +
        `E-mail: ${form.email}\n` +
        `Telefone: ${form.telefone || "Não informado"}\n\n` +
        `*Pedido:*\n${form.pedido}`
    );

    window.open(`${SEDE_WHATSAPP_URL}?text=${mensagem}`, "_blank");
    setStatus("sent");
    setForm({ nome: "", email: "", telefone: "", pedido: "" });
  }

  return (
    <Section
      id="oracao"
      bg="white"
      className="py-12 md:py-24"
      containerWidth="narrow"
    >
        {showHeader ? (
          <SectionTitle
            eyebrow="Estamos aqui por você"
            eyebrowVariant="gold"
            title="Pedido de Oração"
            divider
            width="narrow"
            description="Compartilhe seu pedido conosco. Nossa equipe de intercessão orará por você."
          />
        ) : null}

        {/* Formulário */}
        <div className="bg-[#f5f5f5] rounded-2xl p-5 md:p-8 lg:p-12 shadow-sm">
          {status === "sent" ? (
            <div className="text-center py-8">
              <div className="w-14 h-1 rounded-full bg-[#ffa726] mx-auto mb-5" />
              <h3 className="font-acme text-xl text-[#212121] mb-2 tracking-wide">
                Conversa aberta no WhatsApp
              </h3>
              <p className="text-[#757575] text-sm mb-6">
                Seu pedido foi preparado para envio. Envie a mensagem na
                conversa aberta para que a equipe de intercessão receba seu
                pedido.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="ui-btn-ghost"
              >
                Enviar outro pedido
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-[#424242] text-sm font-semibold mb-1"
                  >
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
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#212121] placeholder-gray-400 focus:outline-none focus:border-[#ffa726] transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#424242] text-sm font-semibold mb-1"
                  >
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
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#212121] placeholder-gray-400 focus:outline-none focus:border-[#ffa726] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="block text-[#424242] text-sm font-semibold mb-1"
                >
                  Telefone / WhatsApp
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  value={form.telefone}
                  onChange={handleChange}
                  placeholder="(11) 9xxxx-xxxx"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#212121] placeholder-gray-400 focus:outline-none focus:border-[#ffa726] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="pedido"
                  className="block text-[#424242] text-sm font-semibold mb-1"
                >
                  Seu Pedido *
                </label>
                <textarea
                  id="pedido"
                  name="pedido"
                  required
                  rows={5}
                  value={form.pedido}
                  onChange={handleChange}
                  placeholder="Escreva aqui o seu pedido de oração..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#212121] placeholder-gray-400 focus:outline-none focus:border-[#ffa726] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="ui-btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Enviando..." : "Enviar Pedido via WhatsApp"}
              </button>

              <p className="text-center text-[#9e9e9e] text-xs">
                Seu pedido será preparado para envio no WhatsApp oficial da
                igreja.
              </p>
            </form>
          )}
        </div>
    </Section>
  );
}
