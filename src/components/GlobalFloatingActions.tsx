"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const WhatsAppButton = dynamic(
  () => import("@/components/WhatsAppButton").then((m) => m.WhatsAppButton),
  { ssr: false }
);

export function GlobalFloatingActions() {
  const pathname = usePathname();
  if (pathname?.startsWith("/nosniki")) return null;

  return <WhatsAppButton />;
}
