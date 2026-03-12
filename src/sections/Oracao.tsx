"use client";

import { useState } from "react";

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

    window.open(`https://wa.me/5511916116102?text=${mensagem}`, "_blank");
    setStatus("sent");
    setForm({ nome: "", email: "", telefone: "", pedido: "" });
  }

  return (
    <section id="oracao" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {showHeader ? (
          <div className="text-center mb-16">
            <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
              Estamos aqui por você
            </p>
            <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide">
              Pedido de Oração
            </h2>
            <div className="w-16 h-1 bg-[#ffa726] mx-auto mt-4" />
            <p className="text-[#757575] text-sm mt-4 max-w-md mx-auto leading-relaxed">
              Compartilhe seu pedido conosco. Nossa equipe de intercessão orará
              por você.
            </p>
          </div>
        ) : null}

        {/* Formulário */}
        <div className="bg-[#f5f5f5] rounded-2xl p-8 md:p-12 shadow-sm">
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
                className="font-acme text-xs tracking-widest uppercase px-6 py-2 rounded-full border border-[#ffa726] text-[#ffa726] hover:bg-[#ffa726] hover:text-white transition-colors duration-200"
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
                className="w-full font-acme bg-[#ffa726] hover:bg-[#e65100] text-white font-bold py-4 rounded-xl tracking-widest uppercase text-sm transition-colors duration-200 disabled:opacity-60"
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
      </div>
    </section>
  );
}
