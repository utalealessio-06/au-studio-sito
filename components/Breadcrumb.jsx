import Link from "next/link";

// L'ultimo elemento è la pagina corrente e non ha link.
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-fg-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {isLast || !item.href ? (
                <span aria-current={isLast ? "page" : undefined} className="font-medium text-fg">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-fg-subtle">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
