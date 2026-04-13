"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 400 && y > lastY) {
        setVisible(true);
      } else if (y < lastY - 10) {
        setVisible(false);
      }
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  // Point 59: Hide when CookieConsent is visible
  useEffect(() => {
    const check = () => {
      const accepted = localStorage.getItem("cookie-consent");
      setCookieVisible(!accepted);
    };
    check();
    // Re-check periodically in case consent changes
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, []);

  // Don't render if cookie consent is active
  if (cookieVisible) return null;

  return (
    <div className={`sticky-mobile-cta ${visible ? "visible" : ""}`}>
      <Link href="/kontakt">
        <Button variant="cta" className="w-full group min-h-[44px]" size="lg">
          <span className="flex items-center gap-2">
            Otrzymaj wycenę w 24h
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      </Link>
    </div>
  );
}
