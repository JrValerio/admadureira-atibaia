import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type SpiritualBreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function SpiritualBreadcrumb({
  items,
}: SpiritualBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#777]"
    >
      <Link href="/" className="hover:underline">
        Início
      </Link>
      {items.map((item) => (
        <span key={`${item.label}-${item.href ?? "current"}`} className="contents">
          <span>›</span>
          {item.href ? (
            <Link href={item.href} className="hover:underline">
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
