"use client";

import LinkNext from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ActiveProps = {
  className?: string;
};

type ActiveOptions = {
  exact?: boolean;
};

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  children: ReactNode;
  activeProps?: ActiveProps;
  activeOptions?: ActiveOptions;
};

export function createFileRoute(_path: string) {
  return function defineRoute<T>(config: T): T {
    return config;
  };
}

export function useLocation() {
  const pathname = usePathname();
  return { pathname };
}

export function Link({
  to,
  className,
  activeProps,
  activeOptions,
  children,
  ...props
}: LinkProps) {
  const pathname = usePathname();
  const exact = activeOptions?.exact ?? false;
  const isActive = exact ? pathname === to : to === "/" ? pathname === "/" : pathname.startsWith(to);
  const mergedClassName = [className, isActive ? activeProps?.className : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <LinkNext href={to} className={mergedClassName || undefined} {...props}>
      {children}
    </LinkNext>
  );
}
