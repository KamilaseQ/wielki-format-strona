"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import type { Map, Layer, Renderer } from "leaflet";

export type MapMarker = {
  id: string;
  lat: number;
  lng: number;
  color: string;
  label: string;
  selected?: boolean;
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
  const previousSelectedIdRef = useRef<string | null>(null);
  const previousAutoFitKeyRef = useRef<string | undefined>(undefined);
  const [mapReady, setMapReady] = useState(false);

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
      requestAnimationFrame(() => map.invalidateSize());
    }

    void init();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      leafletRef.current = null;
      rendererRef.current = null;
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
        renderer: rendererRef.current ?? undefined,
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

    // Only focus the map when a marker is explicitly selected.
    requestAnimationFrame(() => {
      map.invalidateSize();

      const sel = selectedId
        ? markers.find((m) => m.id === selectedId)
        : null;

      if (sel && previousSelectedIdRef.current !== selectedId) {
        map.flyTo([sel.lat, sel.lng], Math.max(map.getZoom(), 11), {
          animate: true,
          duration: 0.45,
        });
      }
    });

    previousSelectedIdRef.current = selectedId ?? null;
  }, [markers, selectedId, mapReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const points = markers.map((marker) => [marker.lat, marker.lng] as [number, number]);

    requestAnimationFrame(() => {
      map.invalidateSize();

      if (points.length === 0) {
        map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
        return;
      }

      if (points.length === 1) {
        map.setView(points[0], 11);
        return;
      }

      const shouldAutoFit =
        !initialBoundsFitDoneRef.current ||
        (typeof autoFitKey === "string" && autoFitKey !== previousAutoFitKeyRef.current);

      if (shouldAutoFit) {
        map.fitBounds(points, { padding: [48, 48], maxZoom: 10 });
        initialBoundsFitDoneRef.current = true;
        previousAutoFitKeyRef.current = autoFitKey;
      }
    });
  }, [autoFitKey, markers, mapReady]);

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
      className={`relative w-full h-full ${className}`}
      role="application"
      aria-label="Interaktywna mapa nośników reklamowych"
    />
  );
}
