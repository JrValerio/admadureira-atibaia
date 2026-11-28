// /ministerios/confadat mostra a página completa do congresso. O canonical
// continua em /eventos/confadat-2026, para o Google não ver conteúdo duplicado.
export { default, metadata } from "@/app/eventos/confadat-2026/page";

// Segment config precisa ser literal (o Next não segue re-export).
export const revalidate = 3600;
