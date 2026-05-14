"use client";

import { useEffect, useMemo, useState } from "react";
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
  if (/^(https?:|data:|blob:)/i.test(image)) return image;
  return `/${image.replace(/^\/+/, "").replace(/^public\//, "")}`;
}

export function CarrierImage({
  carrier,
  className = "",
  imageClassName = "",
  priority = false,
  compact = false,
}: CarrierImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const src = useMemo(() => resolveImageSrc(carrier.image), [carrier.image]);
  const showImage = Boolean(src) && !failed;

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden bg-secondary ${className}`}
      data-has-image={showImage ? "true" : "false"}
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
          src={src ?? undefined}
          alt=""
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={(event) => {
            event.currentTarget.style.display = "none";
            setFailed(true);
          }}
          className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-200 ${
            loaded ? "opacity-100" : "opacity-0"
          } ${imageClassName}`}
        />
      )}
    </div>
  );
}
