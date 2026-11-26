/**
 * Testa a rota POST /api/oracao contra um servidor falso do Resend.
 *
 * É um SCRIPT, não um teste do vitest: o vitest coleta todo arquivo
 * *.test.* e não aceita process.exit aqui. Rodar separado:
 *
 *   npx tsx scripts/test-oracao.mjs
 *
 * (usa o tsconfig.json do projeto para resolver o alias "@/")
 *
 * Verifica:
 *  - pedido válido -> 200 e um e-mail de fato enviado
 *  - dados inválidos -> 422, sem enviar
 *  - robô (campo-armadilha) -> 200, sem enviar
 *  - Resend fora do ar -> 502 (não finge sucesso)
 *  - sem variáveis de ambiente -> 503 (não finge sucesso)
 */
import http from "node:http";

const chamadas = [];
let respostaFalsa = 200;
let corpoFalso = '{"id":"abc"}';

const servidor = http.createServer((req, res) => {
  let corpo = "";
  req.on("data", (c) => (corpo += c));
  req.on("end", () => {
    chamadas.push({ url: req.url, auth: req.headers.authorization, corpo });
    res.writeHead(respostaFalsa, { "Content-Type": "application/json" });
    res.end(corpoFalso);
  });
});

await new Promise((r) => servidor.listen(0, r));
const porta = servidor.address().port;
process.env.RESEND_URL_OVERRIDE = `http://127.0.0.1:${porta}`;

// importa a rota depois de apontar o override
const { POST } = await import("../src/app/api/oracao/route.ts");

function req(corpo, ip = "1.2.3.4") {
  return new Request("http://localhost/api/oracao", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(corpo),
  });
}

const valido = {
  nome: "Maria da Silva",
  email: "maria@exemplo.com",
  telefone: "(11) 91234-5678",
  pedido: "Peço oração pela saúde da minha mãe.",
};

let falhas = 0;
function checa(nome, cond) {
  console.log(`  ${cond ? "ok  " : "FALHA"}  ${nome}`);
  if (!cond) falhas++;
}

// --- sem configuração ------------------------------------------------
delete process.env.RESEND_API_KEY;
let r = await POST(req(valido, "10.0.0.1"));
checa("sem chave de API -> 503", r.status === 503);

process.env.RESEND_API_KEY = "chave-falsa";
process.env.ORACAO_EMAIL = "intercessao@exemplo.com";
process.env.ORACAO_REMETENTE = "site@exemplo.com";

// --- pedido válido ---------------------------------------------------
chamadas.length = 0;
r = await POST(req(valido, "10.0.0.2"));
checa("pedido válido -> 200", r.status === 200);
checa("um e-mail enviado", chamadas.length === 1);
const enviado = JSON.parse(chamadas[0]?.corpo ?? "{}");
checa("destinatário correto", enviado.to?.[0] === "intercessao@exemplo.com");
checa("reply-to é o e-mail de quem pediu", enviado.reply_to === "maria@exemplo.com");
checa("assunto identifica o pedido", /Pedido de oração/.test(enviado.subject ?? ""));
checa("corpo tem o texto do pedido", /saúde da minha mãe/.test(enviado.text ?? ""));
checa("usa Authorization", /^Bearer /.test(chamadas[0]?.auth ?? ""));

// --- dados inválidos -------------------------------------------------
chamadas.length = 0;
r = await POST(req({ ...valido, email: "nao-e-email" }, "10.0.0.3"));
checa("e-mail inválido -> 422", r.status === 422);
checa("não envia nada", chamadas.length === 0);

// --- robô ------------------------------------------------------------
chamadas.length = 0;
r = await POST(req({ ...valido, website: "http://spam" }, "10.0.0.4"));
checa("robô (armadilha) -> 200", r.status === 200);
checa("robô não envia", chamadas.length === 0);

// --- Resend fora do ar ----------------------------------------------
respostaFalsa = 500;
corpoFalso = '{"error":"interno"}';
r = await POST(req(valido, "10.0.0.5"));
checa("Resend 500 -> 502", r.status === 502);
const j = await r.json();
checa("erro é honesto", /Não conseguimos/.test(j.erro ?? ""));

// --- limite por IP ---------------------------------------------------
respostaFalsa = 200;
let bloqueado = false;
for (let i = 0; i < 8; i++) {
  const rr = await POST(req(valido, "10.9.9.9"));
  if (rr.status === 429) { bloqueado = true; break; }
}
checa("rajada do mesmo IP -> 429", bloqueado);

servidor.close();
console.log(falhas === 0 ? "\nTUDO OK" : `\n${falhas} FALHA(S)`);

// Não chamamos process.exit: se este arquivo for carregado por engano no
// vitest, o teste falharia com "process.exit unexpectedly called".
// Quem roda como script confere o código pelo log acima.
export const resultado = { falhas };
