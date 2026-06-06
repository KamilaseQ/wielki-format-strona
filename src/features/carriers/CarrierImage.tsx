"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ImageOff, MapPin } from "lucide-react";
import type { Carrier } from "@/features/carriers/data";

interface CarrierImageProps {
  carrier: Carrier;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  compact?: boolean;
}

function resolveImageSrc(image: string | null): string | null {
  if (!image) return null;
  if (/^https?:/i.test(image)) {
    try {
      const url = new URL(image);
      if (
        url.hostname.toLowerCase() === "billboard.wielkiformat.pl" &&
        url.pathname.startsWith("/billboards/")
      ) {
        return `/api/carrier-image?path=${encodeURIComponent(`${url.pathname}${url.search}`)}`;
      }
    } catch {
      return image;
    }
    return image;
  }
  if (/^(data:|blob:)/i.test(image)) return image;
  return `/${image.replace(/^\/+/, "").replace(/^public\//, "")}`;
}

function withRetry(src: string | null, retryCount: number): string | null {
  if (!src || retryCount === 0) return src;
  return `${src}${src.includes("?") ? "&" : "?"}retry=${retryCount}`;
}

export function CarrierImage({
  carrier,
  className = "",
  imageClassName = "",
  priority = false,
  compact = false,
}: CarrierImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const retryTimerRef = useRef<number | null>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [shouldRequest, setShouldRequest] = useState(priority);
  const src = useMemo(() => resolveImageSrc(carrier.image), [carrier.image]);
  const requestSrc = withRetry(src, retryCount);
  const showImage = Boolean(requestSrc) && !failed && shouldRequest;

  useEffect(() => {
    if (retryTimerRef.current !== null) {
      window.clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
    setFailed(false);
    setLoaded(false);
    setRetryCount(0);
    setShouldRequest(priority);
  }, [priority, src]);

  useEffect(() => {
    if (priority || shouldRequest || !src) return;
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") {
      setShouldRequest(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRequest(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [priority, shouldRequest, src]);

  useEffect(
    () => () => {
      if (retryTimerRef.current !== null) {
        window.clearTimeout(retryTimerRef.current);
      }
    },
    []
  );

  useEffect(() => {
    const image = imageRef.current;
    if (!showImage || !image) return;

    const syncLoadedState = () => {
      if (image.complete && image.naturalWidth > 0) {
        setLoaded(true);
      }
    };

    syncLoadedState();
    image.addEventListener("load", syncLoadedState);
    return () => image.removeEventListener("load", syncLoadedState);
  }, [requestSrc, showImage]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-secondary ${className}`}
      data-has-image={showImage ? "true" : "false"}
      data-image-state={failed ? "failed" : loaded ? "loaded" : "placeholder"}
      aria-label={`Zdjęcie nośnika ${carrier.code}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_15%,var(--accent),transparent_42%),linear-gradient(135deg,var(--surface),var(--secondary))] px-3 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card/80 text-primary shadow-sm">
          <ImageOff className="h-5 w-5" />
        </div>
        {!compact && (
          <div>
            <div className="text-xs font-heading font-bold text-foreground">
              Zdjęcie w przygotowaniu
            </div>
            <div className="mt-0.5 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{carrier.city}</span>
            </div>
          </div>
        )}
      </div>

      {showImage && (
        <img
          ref={imageRef}
          src={requestSrc ?? undefined}
          alt=""
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          onLoad={() => {
            setLoaded(true);
          }}
          onError={() => {
            setLoaded(false);
            if (retryCount >= 1) {
              setFailed(true);
              return;
            }
            if (retryTimerRef.current !== null) return;
            retryTimerRef.current = window.setTimeout(() => {
              retryTimerRef.current = null;
              setRetryCount((current) => current + 1);
            }, 600);
          }}
          className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-200 ${
            loaded ? "opacity-100" : "opacity-0"
          } ${imageClassName}`}
        />
      )}
    </div>
  );
}
