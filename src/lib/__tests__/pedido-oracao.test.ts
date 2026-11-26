import { describe, expect, it } from "vitest";
import {
  assuntoOracao,
  corpoHtml,
  corpoTexto,
  dataHoraSaoPaulo,
  escapaHtml,
  pedidoOracaoSchema,
} from "../pedido-oracao";

const valido = {
  nome: "Maria da Silva",
  email: "maria@exemplo.com",
  telefone: "(11) 91234-5678",
  pedido: "Peço oração pela saúde da minha mãe, que está internada.",
};

describe("pedidoOracaoSchema", () => {
  it("aceita um pedido completo", () => {
    const r = pedidoOracaoSchema.safeParse(valido);
    expect(r.success).toBe(true);
  });

  it("aceita pedido sem telefone", () => {
    const { telefone: _ignorado, ...semTelefone } = valido;
    expect(pedidoOracaoSchema.safeParse(semTelefone).success).toBe(true);
  });

  it("aceita telefone vazio", () => {
    expect(
      pedidoOracaoSchema.safeParse({ ...valido, telefone: "" }).success
    ).toBe(true);
  });

  it("recusa e-mail inválido", () => {
    const r = pedidoOracaoSchema.safeParse({ ...valido, email: "nao-e-email" });
    expect(r.success).toBe(false);
  });

  it("recusa pedido curto", () => {
    const r = pedidoOracaoSchema.safeParse({ ...valido, pedido: "orar" });
    expect(r.success).toBe(false);
  });

  it("recusa nome vazio", () => {
    expect(pedidoOracaoSchema.safeParse({ ...valido, nome: " " }).success).toBe(
      false
    );
  });

  it("aceita campo-armadilha na validação (a rota descarta sem enviar)", () => {
    // Não recusamos aqui de propósito: responder erro ao robô ensina qual
    // regra ele quebrou. A rota valida, vê o campo preenchido, responde 200
    // e descarta o pedido sem enviar nada.
    const r = pedidoOracaoSchema.safeParse({ ...valido, website: "spam" });
    expect(r.success).toBe(true);
  });

  it("recusa pedido acima de 4000 caracteres", () => {
    const r = pedidoOracaoSchema.safeParse({
      ...valido,
      pedido: "a".repeat(4001),
    });
    expect(r.success).toBe(false);
  });
});

describe("escapaHtml", () => {
  it("neutraliza tags e aspas", () => {
    expect(escapaHtml('<script>alert("x")</script>')).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"
    );
  });

  it("neutraliza o E comercial antes de tudo", () => {
    expect(escapaHtml("a & b")).toBe("a &amp; b");
  });
});

describe("corpoTexto", () => {
  it("inclui os dados do pedido", () => {
    const t = corpoTexto(valido, new Date("2026-11-26T12:00:00-03:00"));
    expect(t).toContain("Maria da Silva");
    expect(t).toContain("maria@exemplo.com");
    expect(t).toContain("(11) 91234-5678");
    expect(t).toContain("Peço oração pela saúde");
  });

  it("marca telefone ausente", () => {
    const t = corpoTexto({ ...valido, telefone: "" });
    expect(t).toContain("Telefone: não informado");
  });
});

describe("corpoHtml", () => {
  it("escapa conteúdo malicioso no pedido", () => {
    const h = corpoHtml({
      ...valido,
      pedido: "<img src=x onerror=alert(1)> peço oração",
    });
    expect(h).not.toContain("<img src=x");
    expect(h).toContain("&lt;img src=x");
  });

  it("não deixa escapar o e-mail como HTML", () => {
    const h = corpoHtml(valido);
    expect(h).toContain("maria@exemplo.com");
  });
});

describe("assuntoOracao", () => {
  it("identifica o pedido pelo nome", () => {
    expect(assuntoOracao({ nome: "João" })).toBe("Pedido de oração — João");
  });
});

describe("dataHoraSaoPaulo", () => {
  it("formata no fuso de São Paulo", () => {
    const s = dataHoraSaoPaulo(new Date("2026-11-26T02:00:00Z"));
    expect(s).toMatch(/25\/11\/2026/); // 02:00 UTC = 23:00 de 25/11 em SP
  });
});
