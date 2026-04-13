"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import type { Map, CircleMarker } from "leaflet";

export type MapMarker = {
  id: string;
  lat: number;
  lng: number;
  color: string;
  label: string;
  selected?: boolean;
};

interface LeafletMapProps {
  markers: MapMarker[];
  selectedId?: string | null;
  onMarkerClick?: (id: string) => void;
  className?: string;
}

const DEFAULT_CENTER: [number, number] = [52.1, 19.4];
const DEFAULT_ZOOM = 6;

export function LeafletMap({
  markers,
  selectedId,
  onMarkerClick,
  className = "",
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const markersRef = useRef<CircleMarker[]>([]);
  const onMarkerClickRef = useRef(onMarkerClick);
  const [mapReady, setMapReady] = useState(false);

  // Keep callback ref updated without re-running effects
  useEffect(() => {
    onMarkerClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

  // Initialize map once
  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!containerRef.current || mapRef.current) return;

      // Import Leaflet and its CSS
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !containerRef.current) return;

      leafletRef.current = L;

      const map = L.map(containerRef.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: false,
      });

      // Dark CartoDB tiles
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 }
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

      mapRef.current = map;
      setMapReady(true);

      // Force resize after mount
      requestAnimationFrame(() => map.invalidateSize());
    }

    void init();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      leafletRef.current = null;
      markersRef.current = [];
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
      const isSelected = m.id === selectedId;
      const baseRadius = isSelected ? 12 : 7;
      const baseWeight = isSelected ? 3 : 2;
      const baseFillOpacity = isSelected ? 0.9 : 0.55;

      const marker = L.circleMarker([m.lat, m.lng], {
        radius: baseRadius,
        fillColor: m.color,
        color: m.color,
        weight: baseWeight,
        opacity: 0.9,
        fillOpacity: baseFillOpacity,
      }).addTo(map);

      marker.bindTooltip(m.label, {
        className: "leaflet-dark-tooltip",
        direction: "top",
        offset: [0, -10],
      });

      marker.on("click", () => {
        onMarkerClickRef.current?.(m.id);
      });

      // Add animated pulse ring for selected marker
      if (isSelected) {
        // Use divIcon to avoid SVG transform-origin issues with scale animations
        const pulse = L.marker([m.lat, m.lng], {
          icon: L.divIcon({
            className: "bg-transparent border-0",
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            html: `<div class="relative w-full h-full flex items-center justify-center">
                     <div class="absolute w-10 h-10 rounded-full opacity-30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" style="background-color: ${m.color}"></div>
                     <div class="absolute w-5 h-5 rounded-full opacity-60 animate-pulse" style="border: 2px solid ${m.color}"></div>
                   </div>`,
          }),
          interactive: false,
        }).addTo(map);
        markersRef.current.push(pulse);
      }

      markersRef.current.push(marker);
    });

    // Fit bounds / fly to selected
    requestAnimationFrame(() => {
      map.invalidateSize();

      const sel = selectedId
        ? markers.find((m) => m.id === selectedId)
        : null;

      if (sel) {
        map.flyTo([sel.lat, sel.lng], Math.max(map.getZoom(), 11), {
          animate: true,
          duration: 0.45,
        });
        return;
      }

      const points = markers.map(
        (m) => [m.lat, m.lng] as [number, number]
      );

      if (points.length === 0) {
        map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      } else if (points.length === 1) {
        map.setView(points[0], 11);
      } else {
        map.fitBounds(points, { padding: [48, 48], maxZoom: 10 });
      }
    });
  }, [markers, selectedId, mapReady]);

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

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      role="application"
      aria-label="Interaktywna mapa nośników reklamowych"
    />
  );
}
