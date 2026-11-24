import { describe, expect, it } from "vitest";
import { z } from "zod";
import { validateForm, type FieldRule } from "@/lib/form-validation";

type Campos = "nome" | "email" | "telefone" | "pedido";

const rules: Partial<Record<Campos, FieldRule>> = {
  nome: { minLength: 2, message: "N" },
  email: { email: true, message: "E" },
  pedido: { minLength: 10, message: "P" },
};

// Schema que os formulários usavam antes: o resultado tem de ser o mesmo.
const zodSchema = z.object({
  nome: z.string().min(2, "N"),
  email: z.email("E"),
  telefone: z.string().optional(),
  pedido: z.string().min(10, "P"),
});

function viaZod(values: Record<Campos, string>) {
  const result = zodSchema.safeParse(values);
  const errors: Partial<Record<Campos, string>> = {};
  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as Campos;
      if (!errors[field]) errors[field] = issue.message;
    }
  }
  return errors;
}

const casos: Record<Campos, string>[] = [
  { nome: "Ana", email: "ana@igreja.com.br", telefone: "", pedido: "Oração pela família" },
  { nome: "", email: "", telefone: "", pedido: "" },
  { nome: "A", email: "x", telefone: "11 9999-9999", pedido: "curto" },
  { nome: "Zé", email: "a@b", telefone: "", pedido: "0123456789" },
  { nome: "Jo", email: ".jo@igreja.com", telefone: "", pedido: "0123456789" },
  { nome: "Jo", email: "jo..silva@igreja.com", telefone: "", pedido: "0123456789" },
  { nome: "Jo", email: "jo+ebd@gmail.com", telefone: "", pedido: "0123456789" },
  { nome: "Jo", email: "jo@sub.igreja.org", telefone: "", pedido: "😀😀😀😀😀" },
];

describe("validateForm", () => {
  it.each(casos)("dá o mesmo resultado que o Zod para %o", (valores) => {
    expect(validateForm(valores, rules)).toEqual(viaZod(valores));
  });

  it("aceita um formulário válido", () => {
    expect(validateForm(casos[0], rules)).toEqual({});
  });
});
