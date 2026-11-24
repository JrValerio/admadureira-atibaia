// Serializa JSON-LD para <script>: escapa "<" para que um texto com "</script>"
// (ex.: título vindo do YouTube) não feche a tag e injete HTML.
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
