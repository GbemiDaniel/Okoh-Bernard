import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 flex items-center flex-wrap gap-2 text-sm font-mono text-gray-500 dark:text-gray-400">
      <Link aria-label="Home" className="flex items-center hover:text-[#10B981] transition-colors duration-200 active:scale-95" href="/">
        <Home className="w-4 h-4"/>
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.href} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-white/20"/>
            {isLast ? (
              <span className="text-gray-900 dark:text-white font-semibold truncate max-w-50 sm:max-w-none" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link className="hover:text-[#10B981] transition-colors duration-200 active:scale-95" href={item.href}>
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
