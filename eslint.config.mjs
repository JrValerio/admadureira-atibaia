import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const HEX_ACCENT_MESSAGE =
  "Não use hex de accent literal em className. Use os utilitários semânticos: " +
  "text-text-accent (texto sobre claro), text-text-accent-on-dark (texto sobre " +
  "escuro/foto) ou text-brand-orange (ícones). Tokens em src/app/globals.css.";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      // Fecha a torneira do item 20/04 da varredura: nada de text-[#ffa726] /
      // text-[#8b5b18] novo. border-/bg-/decoration- com o hex seguem permitidos.
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/\\btext-\\[#(?:ffa726|8b5b18)\\]/i]",
          message: HEX_ACCENT_MESSAGE,
        },
        {
          selector:
            "TemplateElement[value.raw=/\\btext-\\[#(?:ffa726|8b5b18)\\]/i]",
          message: HEX_ACCENT_MESSAGE,
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Material de consulta (handoff de design), não faz parte do app.
    "docs/**",
  ]),
]);

export default eslintConfig;
