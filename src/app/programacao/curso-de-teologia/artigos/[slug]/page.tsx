// src/app/programacao/curso-de-teologia/artigos/[slug]/page.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import { getArtigo, artigosTeologicos, type Bloco } from "@/data/curso-teologia-artigos"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return artigosTeologicos.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const artigo = getArtigo(slug)
  if (!artigo) return {}
  return {
    title: `${artigo.titulo} | Pr. Eliel Sobrinho — Curso de Teologia`,
    description: artigo.resumo,
  }
}

function RenderBloco({ bloco }: { bloco: Bloco }) {
  switch (bloco.tipo) {
    case "titulo":
      return (
        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3 border-b border-orange-200 pb-2">
          {bloco.texto}
        </h2>
      )
    case "subtitulo":
      return (
        <h3 className="text-base font-semibold text-orange-700 mt-5 mb-2">
          {bloco.texto}
        </h3>
      )
    case "paragrafo":
      return (
        <p className="text-gray-700 leading-relaxed mb-4 text-[15px]">
          {bloco.texto}
        </p>
      )
    case "versiculo":
      return (
        <blockquote className="border-l-4 border-orange-400 pl-4 my-5 bg-orange-50 py-3 pr-3 rounded-r-md">
          <p className="text-gray-800 italic leading-relaxed text-[15px]">{bloco.texto}</p>
          {bloco.referencia && (
            <cite className="block mt-1 text-sm text-orange-700 font-medium not-italic">
              — {bloco.referencia}
            </cite>
          )}
        </blockquote>
      )
    case "citacao":
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 my-5 bg-gray-50 py-3 pr-3 rounded-r-md">
          <p className="text-gray-700 italic leading-relaxed text-[15px]">
            &ldquo;{bloco.texto}&rdquo;
          </p>
          {bloco.referencia && (
            <cite className="block mt-1 text-sm text-gray-600 font-medium not-italic">
              — {bloco.referencia}
            </cite>
          )}
        </blockquote>
      )
    case "destaque":
      return (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 my-5">
          <p className="text-amber-900 leading-relaxed text-[15px] font-medium">
            {bloco.texto}
          </p>
        </div>
      )
    case "lista":
      return (
        <ul className="my-4 space-y-2 pl-1">
          {bloco.itens.map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-700 text-[15px] leading-relaxed">
              <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case "bibliography":
      return (
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Referências bibliográficas
          </h4>
          <ul className="space-y-1">
            {bloco.itens.map((item, i) => (
              <li key={i} className="text-sm text-gray-600 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )
    default:
      return null
  }
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params
  const artigo = getArtigo(slug)
  if (!artigo) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artigo.titulo,
    description: artigo.resumo,
    author: {
      "@type": "Person",
      name: "Pr. Eliel Sobrinho",
    },
    datePublished: artigo.dataISO,
    isPartOf: {
      "@type": "Course",
      name: "Curso de Teologia — AD Madureira Atibaia",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* ── Breadcrumb ───────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="bg-gray-50 border-b border-gray-100"
        >
          <div className="max-w-3xl mx-auto px-4 py-3">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-orange-600 transition-colors">
                  Início
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/programacao" className="hover:text-orange-600 transition-colors">
                  Programação
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href="/programacao/curso-de-teologia"
                  className="hover:text-orange-600 transition-colors"
                >
                  Curso de Teologia
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-gray-700 font-medium truncate max-w-[180px] sm:max-w-none">
                {artigo.titulo}
              </li>
            </ol>
          </div>
        </nav>

        {/* ── Header ───────────────────────────────────── */}
        <header className="bg-white border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 pt-10 pb-8">
            <p className="text-sm font-medium text-orange-600 uppercase tracking-wider mb-2">
              Artigo teológico · {artigo.data}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
              {artigo.titulo}
            </h1>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              {artigo.resumo}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-orange-700 font-bold text-xs">ES</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Pr. Eliel Sobrinho</p>
                <p className="text-xs text-gray-500">
                  Ministro da Palavra · Professor de Teologia
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ── Conteúdo ─────────────────────────────────── */}
        <article className="max-w-3xl mx-auto px-4 py-10">
          {artigo.blocos.map((bloco, i) => (
            <RenderBloco key={i} bloco={bloco} />
          ))}
        </article>

        {/* ── Rodapé de navegação ──────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 pb-16">
          <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/programacao/curso-de-teologia"
              className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              ← Voltar ao Curso de Teologia
            </Link>
            <p className="text-xs text-gray-400">
              Conteúdo publicado com autorização do autor.{" "}
              <a
                href="http://prelielsobrinho.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-600 transition-colors"
              >
                Ver blog original
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
