import type { ReactNode } from "react";
import Link from "next/link";
import { extractBibleReferences } from "@/lib/bible-reference";

type BibleReferenceTextProps = {
  text: string;
  linkClassName?: string;
};

const defaultLinkClassName =
  "font-medium text-[#c62828] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]";

export default function BibleReferenceText({
  text,
  linkClassName = defaultLinkClassName,
}: BibleReferenceTextProps) {
  const references = extractBibleReferences(text);

  if (!references.length) {
    return <>{text}</>;
  }

  const parts: ReactNode[] = [];
  let cursor = 0;

  references.forEach((reference, index) => {
    if (reference.index > cursor) {
      parts.push(text.slice(cursor, reference.index));
    }

    parts.push(
      <Link
        key={`${reference.href}-${reference.index}-${index}`}
        href={reference.href}
        className={linkClassName}
        title={`Abrir ${reference.matchedText} na Bíblia`}
      >
        {reference.matchedText}
      </Link>
    );

    cursor = reference.index + reference.matchedText.length;
  });

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return <>{parts}</>;
}
