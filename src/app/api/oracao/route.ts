import {
  assuntoOracao,
  corpoHtml,
  corpoTexto,
  pedidoOracaoSchema,
} from "@/lib/pedido-oracao";

/**
 * POST /api/oracao
 *
 * Recebe o pedido de oração do site e entrega por e-mail.
 *
 * Variáveis de ambiente (Vercel):
 *   RESEND_API_KEY     chave da API do Resend
 *   ORACAO_EMAIL       destino (ex.: assdedeusmadureiraatibaia@gmail.com)
 *   ORACAO_REMETENTE   remetente verificado (ex.: site@admadureiraatibaia.com.br)
 *
 * Sem as variáveis a rota responde 503 e o formulário mostra recado honesto,
 * em vez de fingir que enviou.
 */

export const runtime = "nodejs";

/** Resposta JSON simples — sem depender de `next/server`, o que também
 *  permite testar a rota fora do Next. */
function json(corpo: unknown, init?: { status?: number }): Response {
  return new Response(JSON.stringify(corpo), {
    status: init?.status ?? 200,
    headers: { "Content-Type": "application/json" },
  });
}

// limite simples em memória: 5 pedidos por IP a cada 10 minutos.
// Em várias instâncias o limite é por instância — serve para conter rajada,
// não é garantia global.
const JANELA_MS = 10 * 60 * 1000;
const LIMITE = 5;
const registros = new Map<string, number[]>();

function excedeuLimite(ip: string): boolean {
  const agora = Date.now();
  const antigos = (registros.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  if (antigos.length >= LIMITE) {
    registros.set(ip, antigos);
    return true;
  }
  antigos.push(agora);
  registros.set(ip, antigos);
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "desconhecido";

  if (excedeuLimite(ip)) {
    return json(
      { ok: false, erro: "Muitos pedidos em pouco tempo. Tente mais tarde." },
      { status: 429 }
    );
  }

  let dados: unknown;
  try {
    dados = await request.json();
  } catch {
    return json(
      { ok: false, erro: "Pedido inválido." },
      { status: 400 }
    );
  }

  const parsed = pedidoOracaoSchema.safeParse(dados);
  if (!parsed.success) {
    const primeiro = parsed.error.issues[0];
    return json(
      { ok: false, erro: primeiro?.message ?? "Verifique os dados." },
      { status: 422 }
    );
  }

  const pedido = parsed.data;

  // campo-armadilha preenchido = robô. Responde 200 sem enviar nada.
  if (pedido.website && pedido.website.length > 0) {
    return json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.ORACAO_EMAIL;
  const remetente = process.env.ORACAO_REMETENTE;

  if (!apiKey || !destino || !remetente) {
    console.error("[oracao] variáveis de ambiente ausentes", {
      temChave: Boolean(apiKey),
      temDestino: Boolean(destino),
      temRemetente: Boolean(remetente),
    });
    return json(
      {
        ok: false,
        erro: "O envio ainda não está configurado. Tente pelo WhatsApp.",
      },
      { status: 503 }
    );
  }

  const quando = new Date();

  try {
    const urlResend =
      process.env.RESEND_URL_OVERRIDE ?? "https://api.resend.com/emails";
    const resposta = await fetch(urlResend, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: remetente,
        to: [destino],
        reply_to: pedido.email,
        subject: assuntoOracao(pedido),
        text: corpoTexto(pedido, quando),
        html: corpoHtml(pedido, quando),
      }),
    });

    if (!resposta.ok) {
      const detalhe = await resposta.text();
      console.error("[oracao] Resend recusou", resposta.status, detalhe);
      return json(
        {
          ok: false,
          erro: "Não conseguimos registrar seu pedido agora. Tente novamente.",
        },
        { status: 502 }
      );
    }
  } catch (erro) {
    console.error("[oracao] falha de rede ao enviar", erro);
    return json(
      {
        ok: false,
        erro: "Não conseguimos registrar seu pedido agora. Tente novamente.",
      },
      { status: 502 }
    );
  }

  return json({ ok: true });
}
