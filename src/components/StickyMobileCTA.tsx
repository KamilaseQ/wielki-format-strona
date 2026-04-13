"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Show after 400px scroll AND when scrolling down
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

  return (
    <div className={`sticky-mobile-cta ${visible ? "visible" : ""}`}>
      <Link to="/kontakt">
        <Button variant="cta" className="w-full group" size="lg">
          <span className="flex items-center gap-2">
            Otrzymaj wycenę w 24h
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      </Link>
    </div>
  );
}
