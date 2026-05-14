"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import type { LeafletMouseEvent, Map, Layer, Renderer } from "leaflet";
import { PersonStanding, X } from "lucide-react";

export type MapMarker = {
  id: string;
  lat: number;
  lng: number;
  color: string;
  label: string;
  selected?: boolean;
  count?: number;
};

export type MapPoint = {
  lat: number;
  lng: number;
};

export type MapViewport = {
  zoom: number;
  center: { lat: number; lng: number };
  bounds: { north: number; south: number; east: number; west: number };
};

interface LeafletMapProps {
  markers: MapMarker[];
  selectedId?: string | null;
  onMarkerClick?: (id: string) => void;
  onViewportChange?: (viewport: MapViewport) => void;
  autoFitKey?: string;
  fitPoints?: MapPoint[];
  locateSignal?: number;
  className?: string;
}

const DEFAULT_CENTER: [number, number] = [52.1, 19.4];
const DEFAULT_ZOOM = 6;

export function LeafletMap({
  markers,
  selectedId,
  onMarkerClick,
  onViewportChange,
  autoFitKey,
  fitPoints,
  locateSignal = 0,
  className = "",
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const markersRef = useRef<Layer[]>([]);
  const onMarkerClickRef = useRef(onMarkerClick);
  const onViewportChangeRef = useRef(onViewportChange);
  const initialBoundsFitDoneRef = useRef(false);
  const previousAutoFitKeyRef = useRef<string | undefined>(undefined);
  const markersDataRef = useRef<MapMarker[]>(markers);
  const fitPointsRef = useRef<MapPoint[]>(fitPoints ?? []);
  const userLocationRef = useRef<Layer | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [streetViewArmed, setStreetViewArmed] = useState(false);
  const [locateMessage, setLocateMessage] = useState<string | null>(null);

  // Keep a ref to the latest markers so effects that shouldn't re-run on
  // marker updates can still read current positions when they fire.
  useEffect(() => {
    markersDataRef.current = markers;
  }, [markers]);

  useEffect(() => {
    fitPointsRef.current = fitPoints ?? [];
  }, [fitPoints]);

  // Keep callback ref updated without re-running effects
  useEffect(() => {
    onMarkerClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

  useEffect(() => {
    onViewportChangeRef.current = onViewportChange;
  }, [onViewportChange]);

  // Initialize map once
  useEffect(() => {
    let cancelled = false;
    const resizeTimers: number[] = [];

    async function init() {
      if (!containerRef.current || mapRef.current) return;

      // CSS is imported by the route. Only load the Leaflet runtime here.
      const L = await import("leaflet");

      if (cancelled || !containerRef.current) return;

      leafletRef.current = L;
      rendererRef.current = L.canvas({ padding: 0.5 });

      const map = L.map(containerRef.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: false,
        preferCanvas: true,
        renderer: rendererRef.current,
      });

      // CartoDB Voyager tiles - light, clear, multilingual
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      ).addTo(map);

      // Zoom control bottom-right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Attribution bottom-left (minimal)
      L.control
        .attribution({ position: "bottomleft", prefix: false })
        .addAttribution(
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        )
        .addTo(map);

      const emitViewport = () => {
        const center = map.getCenter();
        const bounds = map.getBounds();
        onViewportChangeRef.current?.({
          zoom: map.getZoom(),
          center: { lat: center.lat, lng: center.lng },
          bounds: {
            north: bounds.getNorth(),
            south: bounds.getSouth(),
            east: bounds.getEast(),
            west: bounds.getWest(),
          },
        });
      };

      map.on("moveend zoomend", emitViewport);
      map.whenReady(emitViewport);

      mapRef.current = map;
      setMapReady(true);

      // Force resize after mount
      requestAnimationFrame(() => {
        if (!cancelled && mapRef.current) mapRef.current.invalidateSize();
      });
      [120, 360, 900].forEach((delay) => {
        const timer = window.setTimeout(() => {
          if (!cancelled && mapRef.current) mapRef.current.invalidateSize();
        }, delay);
        resizeTimers.push(timer);
      });
    }

    void init();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      leafletRef.current = null;
      rendererRef.current = null;
      markersRef.current = [];
      userLocationRef.current?.remove();
      userLocationRef.current = null;
      resizeTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  // Update markers when data changes
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!map || !L || !mapReady) return;

    // Clear old
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    markers.forEach((m) => {
      if (m.count && m.count > 1) {
        const size = Math.min(36, Math.max(24, 22 + Math.log(m.count) * 3.5));
        const cluster = L.marker([m.lat, m.lng], {
          icon: L.divIcon({
            className: "bg-transparent border-0",
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
            html: `<div style="
              width:${size}px;
              height:${size}px;
              border-radius:9999px;
              display:flex;
              align-items:center;
              justify-content:center;
              color:#fff;
              font-weight:800;
              font-size:11px;
              border:2px solid rgba(255,255,255,0.92);
              background:${m.color};
              box-shadow:0 6px 12px ${m.color}3a, 0 0 0 4px ${m.color}1a;
            ">${m.count}</div>`,
          }),
        }).addTo(map);

        cluster.bindTooltip(m.label, {
          className: "leaflet-dark-tooltip",
          direction: "top",
          offset: [0, -18],
        });
        cluster.on("click", () => {
          map.flyTo([m.lat, m.lng], Math.min(map.getZoom() + 2, 14), {
            animate: true,
            duration: 0.45,
          });
        });

        markersRef.current.push(cluster);
        return;
      }

      const isSelected = m.id === selectedId;
      // Larger, higher-contrast pin: outer ring + inner solid dot
      const outerRadius = isSelected ? 15 : 10;
      const innerRadius = isSelected ? 7 : 4.5;

      const ring = L.circleMarker([m.lat, m.lng], {
        radius: outerRadius,
        fillColor: "#ffffff",
        color: m.color,
        weight: isSelected ? 4 : 3,
        opacity: 1,
        fillOpacity: 1,
        renderer: rendererRef.current ?? undefined,
      }).addTo(map);

      const dot = L.circleMarker([m.lat, m.lng], {
        radius: innerRadius,
        fillColor: m.color,
        color: m.color,
        weight: 0,
        opacity: 1,
        fillOpacity: 1,
        renderer: rendererRef.current ?? undefined,
      }).addTo(map);

      ring.bindTooltip(m.label, {
        className: "leaflet-dark-tooltip",
        direction: "top",
        offset: [0, -12],
      });

      ring.on("click", () => {
        onMarkerClickRef.current?.(m.id);
      });
      dot.on("click", () => {
        onMarkerClickRef.current?.(m.id);
      });
      ring.on("mouseover", () => {
        ring.setRadius(outerRadius + 4);
        dot.setRadius(innerRadius + 2);
      });
      ring.on("mouseout", () => {
        ring.setRadius(outerRadius);
        dot.setRadius(innerRadius);
      });
      dot.on("mouseover", () => {
        ring.setRadius(outerRadius + 4);
        dot.setRadius(innerRadius + 2);
      });
      dot.on("mouseout", () => {
        ring.setRadius(outerRadius);
        dot.setRadius(innerRadius);
      });

      // Animated pulse ring for selected marker
      if (isSelected) {
        const pulse = L.marker([m.lat, m.lng], {
          icon: L.divIcon({
            className: "bg-transparent border-0",
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            html: `<div class="relative w-full h-full flex items-center justify-center">
                     <div class="absolute w-12 h-12 rounded-full opacity-35 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" style="background-color: ${m.color}"></div>
                     <div class="absolute w-7 h-7 rounded-full opacity-70" style="border: 2px solid ${m.color}; box-shadow: 0 2px 12px ${m.color}80"></div>
                   </div>`,
          }),
          interactive: false,
        }).addTo(map);
        markersRef.current.push(pulse);
      }

      markersRef.current.push(ring);
      markersRef.current.push(dot);
    });

    const rafId = requestAnimationFrame(() => {
      if (mapRef.current) mapRef.current.invalidateSize();
    });
    const resizeTimer = window.setTimeout(() => {
      if (mapRef.current) mapRef.current.invalidateSize();
    }, 180);
    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
    };
  }, [markers, selectedId, mapReady]);

  // Fly to selected carrier — runs ONLY when selectedId changes.
  // Deselect is intentionally a no-op (Google Maps-like: closing the card
  // leaves the map where the user is).
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || !selectedId) return;

    const sel = markersDataRef.current.find((m) => m.id === selectedId);
    if (!sel) return;

    const targetZoom = Math.max(map.getZoom(), 16);
    map.flyTo([sel.lat, sel.lng], targetZoom, {
      animate: true,
      duration: 0.6,
    });
  }, [selectedId, mapReady]);

  // Fit to the filtered set — runs ONLY on initial load or when autoFitKey
  // changes (i.e. filters/search changed). Panning/zooming or marker-set
  // reshuffles from viewport-driven budgeting do NOT trigger a re-fit.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const needsFit =
      !initialBoundsFitDoneRef.current ||
      autoFitKey !== previousAutoFitKeyRef.current;
    if (!needsFit) return;

    const sourcePoints =
      fitPointsRef.current.length > 0 ? fitPointsRef.current : markersDataRef.current;
    const points = sourcePoints.map((point) => [point.lat, point.lng] as [number, number]);

    const rafId = requestAnimationFrame(() => {
      const current = mapRef.current;
      if (!current) return;
      current.invalidateSize();
      if (points.length === 0) {
        current.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      } else if (points.length === 1) {
        current.setView(points[0], 13);
      } else {
        current.fitBounds(points, { padding: [48, 48], maxZoom: 10 });
      }
      initialBoundsFitDoneRef.current = true;
      previousAutoFitKeyRef.current = autoFitKey;
    });
    return () => cancelAnimationFrame(rafId);
  }, [autoFitKey, mapReady, markers]);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!map || !L || !mapReady || locateSignal <= 0) return;

    if (!("geolocation" in navigator)) {
      setLocateMessage("Ta przeglądarka nie obsługuje lokalizacji.");
      window.setTimeout(() => setLocateMessage(null), 2600);
      return;
    }

    setLocateMessage("Ustalanie lokalizacji...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latlng: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        userLocationRef.current?.remove();
        userLocationRef.current = L.circleMarker(latlng, {
          radius: 9,
          fillColor: "#10b981",
          color: "#ffffff",
          weight: 3,
          opacity: 1,
          fillOpacity: 0.95,
          renderer: rendererRef.current ?? undefined,
        }).addTo(map);

        map.flyTo(latlng, Math.max(map.getZoom(), 13), {
          animate: true,
          duration: 0.55,
        });
        setLocateMessage("Pokazano Twoją lokalizację.");
        window.setTimeout(() => setLocateMessage(null), 2200);
      },
      () => {
        setLocateMessage("Nie udało się pobrać lokalizacji.");
        window.setTimeout(() => setLocateMessage(null), 2600);
      },
      { enableHighAccuracy: true, timeout: 7000, maximumAge: 60000 }
    );
  }, [locateSignal, mapReady]);

  // Re-invalidate on container resize
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    resizeObserverRef.current = new ResizeObserver(() => {
      mapRef.current?.invalidateSize();
    });
    resizeObserverRef.current.observe(el);

    return () => resizeObserverRef.current?.disconnect();
  }, []);

  // Street View "pegman" mode: when armed, the next click on the map
  // opens Google Street View at that point in a new tab. Esc or clicking
  // the button again cancels the mode.
  useEffect(() => {
    const map = mapRef.current;
    const container = containerRef.current;
    if (!map || !container || !mapReady) return;

    if (!streetViewArmed) {
      container.classList.remove("streetview-armed");
      return;
    }

    container.classList.add("streetview-armed");

    const handleClick = (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;
      window.open(url, "_blank", "noopener,noreferrer");
      setStreetViewArmed(false);
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setStreetViewArmed(false);
    };

    map.on("click", handleClick);
    window.addEventListener("keydown", handleKey);

    return () => {
      map.off("click", handleClick);
      window.removeEventListener("keydown", handleKey);
      container.classList.remove("streetview-armed");
    };
  }, [streetViewArmed, mapReady]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className={`absolute inset-0 ${className}`}
        role="region"
        aria-label="Interaktywna mapa nośników reklamowych"
      />

      <button
        type="button"
        onClick={() => setStreetViewArmed((value) => !value)}
        className={`absolute top-3 right-3 z-[1000] glass rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors cursor-pointer ${
          streetViewArmed
            ? "bg-primary/20 text-primary ring-1 ring-primary/40"
            : "text-muted-foreground hover:text-primary"
        }`}
        title={
          streetViewArmed
            ? "Kliknij miejsce na mapie, aby otworzyć Street View (Esc aby anulować)"
            : "Street View - kliknij, potem wybierz punkt na mapie"
        }
        aria-label="Tryb Street View"
        aria-pressed={streetViewArmed}
      >
        <PersonStanding className="w-5 h-5" />
      </button>

      {streetViewArmed && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] glass rounded-lg px-3 py-2 flex items-center gap-2 text-xs text-foreground shadow-lg">
          <PersonStanding className="w-4 h-4 text-primary" />
          <span>Kliknij na mapie, aby otworzyć Street View</span>
          <button
            type="button"
            onClick={() => setStreetViewArmed(false)}
            className="ml-1 text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Wyjdź z trybu Street View"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {locateMessage && (
        <div className="absolute bottom-16 right-3 z-[1000] max-w-[220px] rounded-lg border border-border bg-card/95 px-3 py-2 text-xs text-foreground shadow-lg backdrop-blur-md">
          {locateMessage}
        </div>
      )}
    </div>
  );
}
