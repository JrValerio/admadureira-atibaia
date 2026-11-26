"use client";

import { useState } from "react";
import { Section, SectionTitle } from "@/components/ui";
import { SEDE_WHATSAPP_URL } from "@/data/site";
import { validateForm, type FieldRule } from "@/lib/form-validation";

/**
 * Formulário de pedido de oração.
 *
 * ANTES: só abria o WhatsApp (`wa.me`). Nada era gravado e, se a pessoa não
 * apertasse enviar naquela conversa, o pedido desaparecia — e o número usado
 * era o mesmo cuja API não estava entregando.
 *
 * AGORA: envia para `/api/oracao`, que registra e entrega por e-mail à equipe
 * de intercessão. O WhatsApp continua disponível como alternativa, mas deixa
 * de ser o único caminho.
 */

type FieldErrors = Partial<Record<"nome" | "email" | "pedido", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const vazio = { nome: "", email: "", telefone: "", pedido: "", website: "" };

// Mesmas regras e mensagens do schema do servidor (src/lib/pedido-oracao.ts).
const regras: Partial<Record<keyof typeof vazio, FieldRule>> = {
  nome: { minLength: 2, message: "Informe seu nome" },
  email: { email: true, message: "Informe um e-mail válido" },
  pedido: { minLength: 10, message: "Escreva o pedido com pelo menos 10 caracteres" },
};

function valida(form: typeof vazio): FieldErrors {
  const aparado = { ...form, nome: form.nome.trim(), email: form.email.trim(), pedido: form.pedido.trim() };
  return validateForm(aparado, regras) as FieldErrors;
}

export default function Oracao({ showHeader = true }: { showHeader?: boolean }) {
  const [form, setForm] = useState(vazio);
  const [status, setStatus] = useState<Status>("idle");
  const [erros, setErros] = useState<FieldErrors>({});
  const [recado, setRecado] = useState("");

  function aoDigitar(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (erros[name as keyof FieldErrors]) {
      setErros((x) => ({ ...x, [name]: undefined }));
    }
  }

  async function aoEnviar(e: React.FormEvent) {
    e.preventDefault();

    const encontrados = valida(form);
    if (Object.keys(encontrados).length > 0) {
      setErros(encontrados);
      return;
    }

    setStatus("sending");
    setRecado("");

    try {
      const resposta = await fetch("/api/oracao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok || !dados.ok) {
        setStatus("error");
        setRecado(
          dados.erro ??
            "Não conseguimos registrar seu pedido agora. Você pode enviar pelo WhatsApp."
        );
        return;
      }

      setStatus("sent");
      setForm(vazio);
    } catch {
      setStatus("error");
      setRecado(
        "Sem conexão no momento. Você pode enviar pelo WhatsApp enquanto isso."
      );
    }
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

      <div className="bg-[#f5f5f5] rounded-2xl p-5 md:p-8 lg:p-12 shadow-sm">
        {status === "sent" ? (
          <div className="text-center py-8">
            <div className="w-14 h-1 rounded-full bg-[#ffa726] mx-auto mb-5" />
            <h3 className="font-acme text-xl text-[#212121] mb-2 tracking-wide">
              Seu pedido foi recebido
            </h3>
            <p className="text-[#757575] text-sm mb-6">
              A equipe de intercessão vai orar por você. Se quiser falar com
              alguém agora, o WhatsApp da igreja está aberto.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="ui-btn-ghost"
              >
                Enviar outro pedido
              </button>
              <a
                href={SEDE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-btn-primary"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={aoEnviar} className="space-y-5" noValidate>
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
                  value={form.nome}
                  onChange={aoDigitar}
                  placeholder="Seu nome completo"
                  aria-invalid={!!erros.nome}
                  className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#212121] placeholder-gray-400 focus:outline-none transition-colors ${
                    erros.nome
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-200 focus:border-[#ffa726]"
                  }`}
                />
                {erros.nome && (
                  <p className="mt-1 text-xs text-red-500">{erros.nome}</p>
                )}
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
                  value={form.email}
                  onChange={aoDigitar}
                  placeholder="seu@email.com"
                  aria-invalid={!!erros.email}
                  className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#212121] placeholder-gray-400 focus:outline-none transition-colors ${
                    erros.email
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-200 focus:border-[#ffa726]"
                  }`}
                />
                {erros.email && (
                  <p className="mt-1 text-xs text-red-500">{erros.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="telefone"
                className="block text-[#424242] text-sm font-semibold mb-1"
              >
                Telefone / WhatsApp{" "}
                <span className="font-normal text-[#9e9e9e]">(opcional)</span>
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                value={form.telefone}
                onChange={aoDigitar}
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
                rows={5}
                value={form.pedido}
                onChange={aoDigitar}
                placeholder="Escreva aqui o seu pedido de oração..."
                aria-invalid={!!erros.pedido}
                className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#212121] placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                  erros.pedido
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-200 focus:border-[#ffa726]"
                }`}
              />
              {erros.pedido && (
                <p className="mt-1 text-xs text-red-500">{erros.pedido}</p>
              )}
            </div>

            {/* campo-armadilha: invisível para pessoas, preenchido por robôs */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Não preencha</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={aoDigitar}
              />
            </div>

            <p className="text-xs text-[#9e9e9e] leading-relaxed">
              Seus dados são usados apenas para que a equipe de intercessão ore
              por você. Não compartilhamos com ninguém.
            </p>

            {status === "error" && recado && (
              <div
                role="alert"
                className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
              >
                {recado}{" "}
                <a
                  href={SEDE_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold"
                >
                  Enviar pelo WhatsApp
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="ui-btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Enviando..." : "Enviar pedido de oração"}
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}
