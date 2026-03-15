import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EbdLessonFullPrintDocument } from "@/components/ebd/print/EbdPrintDocuments";
import {
  getEbdPrintStaticParams,
  getPublishedEbdPrintLesson,
} from "@/lib/ebd-print";
import { buildPageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{
    classe: string;
    edicao: string;
    licao: string;
  }>;
};

export const revalidate = 3600;

export function generateStaticParams() {
  return getEbdPrintStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { classe, edicao, licao } = await params;
  const lessonContext = getPublishedEbdPrintLesson(classe, edicao, licao);

  if (!lessonContext) {
    return {
      title: "Subsídio completo | EBD",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    ...buildPageMetadata({
      title: `Subsídio completo da lição ${lessonContext.licao.numero} | ${lessonContext.licao.titulo}`,
      description: `Versão completa para impressão da lição ${lessonContext.licao.numero} da EBD ${lessonContext.classe.label}.`,
      path: `/ebd/${classe}/${edicao}/${licao}/pdf-completo`,
      image: lessonContext.licao.imagem ?? lessonContext.trimestre.imagem,
    }),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function EbdLessonFullPrintPage({ params }: PageProps) {
  const { classe, edicao, licao } = await params;
  const lessonContext = getPublishedEbdPrintLesson(classe, edicao, licao);

  if (!lessonContext) {
    notFound();
  }

  return (
    <EbdLessonFullPrintDocument
      classeInfo={lessonContext.classe}
      trimestre={lessonContext.trimestre}
      licao={lessonContext.licao}
    />
  );
}
