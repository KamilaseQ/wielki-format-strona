"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const lastYRef = useRef(0);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    if (y > 400 && y > lastYRef.current) {
      setVisible(true);
    } else if (y < lastYRef.current - 10) {
      setVisible(false);
    }
    lastYRef.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Point 59: Hide when CookieConsent is visible - check once on mount
  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    setCookieVisible(!accepted);

    // Listen for storage changes (cookie consent accepted in same tab)
    const onStorage = () => {
      const accepted = localStorage.getItem("cookie-consent");
      setCookieVisible(!accepted);
    };
    window.addEventListener("storage", onStorage);
    
    // Also listen for custom event dispatched by CookieConsent
    const onConsent = () => setCookieVisible(false);
    window.addEventListener("cookie-consent-accepted", onConsent);
    
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cookie-consent-accepted", onConsent);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    // Hide CTA when footer is within 120px of viewport bottom
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px 120px 0px", threshold: 0 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Don't render if cookie consent is active
  if (cookieVisible || footerVisible) return null;

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
