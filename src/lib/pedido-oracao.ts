import { z } from "zod";

/**
 * Formulário de pedido de oração.
 *
 * O problema que este módulo resolve: antes, o formulário do site apenas abria
 * uma conversa de WhatsApp via `wa.me`. Nada era gravado e nada era enviado —
 * se a pessoa não apertasse "enviar" naquela conversa, o pedido desaparecia.
 *
 * Aqui o pedido é validado no servidor e entregue por e-mail (Resend), com
 * cópia opcional em planilha. Se a entrega falhar, a rota devolve erro e a
 * pessoa vê uma mensagem honesta — em vez de um "enviado" que não enviou.
 */

export const pedidoOracaoSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe seu nome")
    .max(120, "Nome muito longo"),
  email: z.string().trim().email("Informe um e-mail válido").max(200),
  telefone: z
    .string()
    .trim()
    .max(40, "Telefone muito longo")
    .optional()
    .or(z.literal("")),
  pedido: z
    .string()
    .trim()
    .min(10, "Escreva o pedido com pelo menos 10 caracteres")
    .max(4000, "O pedido é muito longo"),
  // campo-armadilha: humano não preenche, robô preenche.
  // Aceito na validação para poder responder 200 ao robô (ele não aprende
  // qual regra quebrou); a rota descarta o pedido sem enviar nada.
  website: z.string().max(200).optional(),
});

export type PedidoOracao = z.infer<typeof pedidoOracaoSchema>;

/** Escapa o texto para inserir em HTML de e-mail sem risco de injeção. */
export function escapaHtml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Data e hora em São Paulo, legível, para o e-mail de notificação. */
export function dataHoraSaoPaulo(data: Date = new Date()): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(data);
}

/** Monta o assunto do e-mail de notificação. */
export function assuntoOracao(p: Pick<PedidoOracao, "nome">): string {
  return `Pedido de oração — ${p.nome}`;
}

/** Corpo em texto puro (para quem lê no celular). */
export function corpoTexto(p: PedidoOracao, quando = new Date()): string {
  const linhas = [
    "NOVO PEDIDO DE ORAÇÃO",
    `Recebido em ${dataHoraSaoPaulo(quando)}`,
    "",
    `Nome: ${p.nome}`,
    `E-mail: ${p.email}`,
    `Telefone: ${p.telefone && p.telefone.length > 0 ? p.telefone : "não informado"}`,
    "",
    "Pedido:",
    p.pedido,
    "",
    "—",
    "Enviado pelo site admadureiraatibaia.com.br",
  ];
  return linhas.join("\n");
}

/** Corpo em HTML, simples e legível. */
export function corpoHtml(p: PedidoOracao, quando = new Date()): string {
  const e = escapaHtml;
  return `<!doctype html>
<html lang="pt-BR"><body style="margin:0;padding:24px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden">
    <div style="background:#ffa726;padding:20px 24px">
      <h1 style="margin:0;font-size:18px;color:#212121;letter-spacing:.08em">NOVO PEDIDO DE ORAÇÃO</h1>
      <p style="margin:6px 0 0;font-size:13px;color:#424242">Recebido em ${e(dataHoraSaoPaulo(quando))}</p>
    </div>
    <div style="padding:24px">
      <table style="width:100%;font-size:14px;color:#212121;border-collapse:collapse">
        <tr><td style="padding:6px 0;color:#757575;width:110px">Nome</td><td style="padding:6px 0"><strong>${e(p.nome)}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#757575">E-mail</td><td style="padding:6px 0">${e(p.email)}</td></tr>
        <tr><td style="padding:6px 0;color:#757575">Telefone</td><td style="padding:6px 0">${e(p.telefone && p.telefone.length > 0 ? p.telefone : "não informado")}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
      <p style="margin:0 0 8px;font-size:13px;color:#757575;text-transform:uppercase;letter-spacing:.06em">Pedido</p>
      <p style="margin:0;font-size:15px;line-height:1.6;color:#212121;white-space:pre-wrap">${e(p.pedido)}</p>
    </div>
    <div style="padding:16px 24px;background:#fafafa;font-size:12px;color:#9e9e9e">
      Enviado pelo site admadureiraatibaia.com.br
    </div>
  </div>
</body></html>`;
}
