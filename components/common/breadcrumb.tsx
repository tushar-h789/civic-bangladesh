import * as React from "react";
import Link from "next/link";

import {
  Breadcrumb as BaseBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbTrailItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbTrailItem[];
  className?: string;
  tone?: "default" | "onPrimary";
}

function Breadcrumb({ items, className, tone = "default" }: BreadcrumbProps) {
  const onPrimary = tone === "onPrimary";

  return (
    <BaseBreadcrumb className={className}>
      <BreadcrumbList className={onPrimary ? "text-white/75" : undefined}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage
                    className={onPrimary ? "text-white" : undefined}
                  >
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href}
                      className={
                        onPrimary ? "text-white/75 hover:text-white" : undefined
                      }
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator
                  className={onPrimary ? "text-white/50" : undefined}
                />
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BaseBreadcrumb>
  );
}

export { Breadcrumb };
