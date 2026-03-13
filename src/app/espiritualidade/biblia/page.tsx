import BibleRedirectClient from "@/components/biblia/BibleRedirectClient";

type PageProps = {
  searchParams: Promise<{
    livro?: string;
    capitulo?: string;
  }>;
};

export default async function BibliaRedirectPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <BibleRedirectClient
      livro={typeof params.livro === "string" ? params.livro : undefined}
      capitulo={typeof params.capitulo === "string" ? params.capitulo : undefined}
    />
  );
}
