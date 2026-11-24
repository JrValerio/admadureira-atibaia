// Validação dos formulários client (contato e oração) sem Zod, para não levar a biblioteca ao navegador.

export type FieldRule = { minLength: number; message: string } | { email: true; message: string };

// Mesmo padrão de e-mail do Zod 4 (z.email()).
export const EMAIL_PATTERN =
  /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;

export function validateForm<K extends string>(
  values: Record<K, string>,
  rules: Partial<Record<K, FieldRule>>
): Partial<Record<K, string>> {
  const errors: Partial<Record<K, string>> = {};
  for (const field of Object.keys(rules) as K[]) {
    const rule = rules[field];
    const value = values[field] ?? "";
    if (!rule) continue;
    const invalid = "email" in rule ? !EMAIL_PATTERN.test(value) : Array.from(value).length < rule.minLength; // conta code points, como o Zod (emoji = 1)
    if (invalid) errors[field] = rule.message;
  }
  return errors;
}
