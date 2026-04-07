import Link from "next/link";

export type EbdBreadcrumbItem = {
  label: string;
  href?: string;
};

type EbdBreadcrumbProps = {
  items: EbdBreadcrumbItem[];
};

export default function EbdBreadcrumb({ items }: EbdBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#777]"
    >
      <Link href="/" className="transition-colors hover:text-[#212121]">
        Início
      </Link>
      {items.map((item, index) => (
        <span key={item.href ?? `item-${index}`} className="contents">
          <span>›</span>
          {item.href ? (
            <Link
              href={item.href}
              className="transition-colors hover:text-[#212121]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-[#212121]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
