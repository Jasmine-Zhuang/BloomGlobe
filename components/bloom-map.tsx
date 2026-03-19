"use client";

import { useMemo, useState } from "react";
import { getLocalizedDestinationName, localizeSeasonText } from "@/lib/destination-localization";
import { useI18n } from "@/lib/i18n";
import { Destination } from "@/lib/types";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn, getSeasonalStatus, isPeakMonth } from "@/lib/utils";
import {
  createMapProjection,
  getMapGeometry,
  projectWorldCoordinatesWithProjection,
  type GlobeCenter,
  type MapMode,
  WORLD_MAP_DIMENSIONS,
} from "@/lib/world-map";

interface BloomMapProps {
  destinations: Destination[];
  selectedDestinationId: string | null;
  selectedMonth: number;
  wishlistIds: string[];
  isRefreshing: boolean;
  onSelectDestination: (destination: Destination) => void;
}

type MarkerWithLayout = {
  destination: Destination;
  x: number;
  y: number;
  isActive: boolean;
  isPeak: boolean;
  isWishlisted: boolean;
  zIndex: number;
  markerSize: number;
  tooltip: {
    x: number;
    y: number;
    placement: "left" | "right" | "top";
  };
};

const REGION_LABELS = [
  { label: "North America" as const, x: 188, y: 156 },
  { label: "South America" as const, x: 282, y: 340 },
  { label: "Europe" as const, x: 494, y: 136 },
  { label: "Africa" as const, x: 520, y: 264 },
  { label: "Asia" as const, x: 686, y: 164 },
  { label: "Oceania" as const, x: 822, y: 330 },
];

const TOOLTIP_WIDTH = 212;
const TOOLTIP_HEIGHT = 92;
const TOOLTIP_OFFSET = 16;
const EDGE_PADDING = 14;
const COLLISION_RADIUS = 18;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getTooltipPlacement(x: number, y: number) {
  const width = WORLD_MAP_DIMENSIONS.width;
  const height = WORLD_MAP_DIMENSIONS.height;

  let placement: "left" | "right" | "top" = "top";
  let tooltipX = x - TOOLTIP_WIDTH / 2;
  let tooltipY = y - TOOLTIP_HEIGHT - TOOLTIP_OFFSET;

  if (x > width - TOOLTIP_WIDTH - 40) {
    placement = "left";
    tooltipX = x - TOOLTIP_WIDTH - TOOLTIP_OFFSET;
    tooltipY = y - TOOLTIP_HEIGHT / 2;
  } else if (x < TOOLTIP_WIDTH / 2 + 40) {
    placement = "right";
    tooltipX = x + TOOLTIP_OFFSET;
    tooltipY = y - TOOLTIP_HEIGHT / 2;
  } else if (y < TOOLTIP_HEIGHT + 30) {
    placement = "right";
    tooltipX = x + TOOLTIP_OFFSET;
    tooltipY = y - TOOLTIP_HEIGHT / 2;
  }

  return {
    placement,
    x: clamp(tooltipX, EDGE_PADDING, width - TOOLTIP_WIDTH - EDGE_PADDING),
    y: clamp(tooltipY, EDGE_PADDING, height - TOOLTIP_HEIGHT - EDGE_PADDING),
  };
}

function resolveMarkerCollisions(
  points: Array<{ destination: Destination; x: number; y: number; priority: number }>,
) {
  const positioned: Array<{ destination: Destination; x: number; y: number; priority: number }> = [];

  points.forEach((point) => {
    const neighbors = positioned.filter((existing) => {
      const distance = Math.hypot(existing.x - point.x, existing.y - point.y);
      return distance < COLLISION_RADIUS;
    });

    if (neighbors.length === 0) {
      positioned.push(point);
      return;
    }

    const angle = (Math.PI * 2 * neighbors.length) / Math.max(neighbors.length + 1, 4);
    const radius = 10 + neighbors.length * 2;

    positioned.push({
      ...point,
      x: clamp(point.x + Math.cos(angle) * radius, EDGE_PADDING, WORLD_MAP_DIMENSIONS.width - EDGE_PADDING),
      y: clamp(point.y + Math.sin(angle) * radius, EDGE_PADDING, WORLD_MAP_DIMENSIONS.height - EDGE_PADDING),
    });
  });

  return positioned;
}

export function BloomMap({
  destinations,
  selectedDestinationId,
  selectedMonth,
  wishlistIds,
  isRefreshing,
  onSelectDestination,
}: BloomMapProps) {
  const { getCountryLabel, getFlowerLabel, getMonthLabel, getRegionLabel, locale, t } = useI18n();
  const [hoveredDestinationId, setHoveredDestinationId] = useState<string | null>(null);
  const [mapMode, setMapMode] = useState<MapMode>("map");

  const focusDestination = useMemo(
    () => destinations.find((destination) => destination.id === selectedDestinationId) ?? null,
    [destinations, selectedDestinationId],
  );

  const globeCenter: GlobeCenter | undefined =
    mapMode === "globe" && focusDestination
      ? {
          lat: focusDestination.latitude,
          lng: focusDestination.longitude,
        }
      : undefined;

  const geometry = useMemo(() => getMapGeometry(mapMode, globeCenter), [globeCenter, mapMode]);
  const projection = useMemo(() => createMapProjection(mapMode, globeCenter), [globeCenter, mapMode]);

  const visibleDestinations = useMemo(() => {
    const projected = destinations
      .map((destination) => {
        const point = projectWorldCoordinatesWithProjection(
          projection,
          destination.coordinates.lat,
          destination.coordinates.lng,
          mapMode,
          globeCenter,
        );

        return {
          destination,
          x: point.x,
          y: point.y,
          visible: point.visible,
          priority:
            (destination.id === selectedDestinationId ? 100 : 0) +
            (destination.id === hoveredDestinationId ? 50 : 0) +
            (isPeakMonth(destination, selectedMonth) ? 10 : 0),
        };
      })
      .filter((destination) => destination.visible)
      .sort((a, b) => a.priority - b.priority || a.destination.destination.localeCompare(b.destination.destination));

    return resolveMarkerCollisions(projected).map((item) => {
      const isActive = item.destination.id === selectedDestinationId;
      const isPeak = isPeakMonth(item.destination, selectedMonth);
      const isWishlisted = wishlistIds.includes(item.destination.id);
      const markerSize = isActive ? 18 : isPeak ? 16 : 14;

      return {
        destination: item.destination,
        x: item.x,
        y: item.y,
        isActive,
        isPeak,
        isWishlisted,
        markerSize,
        zIndex: item.priority + (isActive ? 20 : 0),
        tooltip: getTooltipPlacement(item.x, item.y),
      };
    });
  }, [destinations, globeCenter, hoveredDestinationId, mapMode, projection, selectedDestinationId, selectedMonth, wishlistIds]);

  return (
    <section className="glass-card overflow-hidden rounded-[1.95rem] border border-white/70 shadow-bloom">
      <div className="border-b border-[#eadbd3] px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <SectionHeading
            eyebrow={t("map.eyebrow")}
            title={t("map.title")}
            description={t("map.description")}
            aside={t(visibleDestinations.length === 1 ? "map.visibleMarkers" : "map.visibleMarkers_other", {
              count: visibleDestinations.length,
            })}
          />
          <div className="flex rounded-full border border-[#eadbd3] bg-white/78 p-1 text-xs uppercase tracking-[0.18em] text-pine/60">
            {(["map", "globe"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setMapMode(mode)}
                className={cn(
                  "rounded-full px-3 py-2 transition",
                  mapMode === mode ? "bg-rose text-white shadow-sm" : "text-pine/58 hover:text-pine",
                )}
              >
                {mode === "map" ? t("common.buttons.mapView") : t("common.buttons.globeView")}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-pine/60">
          <span className="rounded-full border border-[#eadbd3] bg-white/76 px-3 py-1.5 uppercase tracking-[0.18em]">
            {t("map.liveMonthView")}
          </span>
          <span className="rounded-full border border-[#eadbd3] bg-white/76 px-3 py-1.5 uppercase tracking-[0.18em]">
            {t("map.clickMarkers")}
          </span>
          {mapMode === "globe" ? (
            <span className="rounded-full border border-[#eadbd3] bg-white/76 px-3 py-1.5 uppercase tracking-[0.18em]">
              {t("map.globeHint")}
            </span>
          ) : null}
        </div>
      </div>

      <div className="map-grid relative aspect-[16/9] w-full overflow-hidden bg-[radial-gradient(circle_at_top,#fbf2eb,transparent_45%),linear-gradient(180deg,#fcfaf7_0%,#f3ece5_100%)]">
        <svg
          viewBox={`0 0 ${WORLD_MAP_DIMENSIONS.width} ${WORLD_MAP_DIMENSIONS.height}`}
          className="absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ocean-fill" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#fffaf5" />
              <stop offset="100%" stopColor="#f4ede5" />
            </linearGradient>
            <linearGradient id="land-fill" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#dde8db" />
              <stop offset="100%" stopColor="#cfdcc9" />
            </linearGradient>
            <radialGradient id="globe-shade" cx="40%" cy="32%" r="72%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="100%" stopColor="rgba(118,132,111,0.14)" />
            </radialGradient>
          </defs>

          <rect x="0" y="0" width={WORLD_MAP_DIMENSIONS.width} height={WORLD_MAP_DIMENSIONS.height} fill="url(#ocean-fill)" />

          {mapMode === "globe" ? (
            <>
              <circle cx="500" cy="260" r="220" fill="rgba(255,255,255,0.42)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <circle cx="500" cy="260" r="220" fill="url(#globe-shade)" />
            </>
          ) : null}

          <path d={geometry.graticulePath} stroke="rgba(151,163,139,0.16)" strokeWidth="1" />
          <g opacity="0.98">
            {geometry.countries.map((country) => (
              <path key={country.id} d={country.d} fill="url(#land-fill)" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" />
            ))}
          </g>
          <path d={geometry.bordersPath} stroke="rgba(118,132,111,0.36)" strokeWidth="0.8" />
          {mapMode === "map" ? (
            <g>
              {REGION_LABELS.map((region) => (
                <text
                  key={region.label}
                  x={region.x}
                  y={region.y}
                  textAnchor="middle"
                  fill="rgba(55,68,60,0.42)"
                  fontSize="14"
                  letterSpacing="0.24em"
                  className="font-sans uppercase"
                >
                  {getRegionLabel(region.label)}
                </text>
              ))}
            </g>
          ) : null}
        </svg>

        <div className={cn("absolute inset-0 transition-opacity duration-300", isRefreshing && "opacity-45")}>
          {visibleDestinations.map((marker) => {
            const isHovered = marker.destination.id === hoveredDestinationId;

            return (
              <button
                key={marker.destination.id}
                type="button"
                onClick={() => onSelectDestination(marker.destination)}
                onMouseEnter={() => setHoveredDestinationId(marker.destination.id)}
                onMouseLeave={() => setHoveredDestinationId(null)}
                onFocus={() => setHoveredDestinationId(marker.destination.id)}
                onBlur={() => setHoveredDestinationId((current) => (current === marker.destination.id ? null : current))}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: marker.x, top: marker.y, zIndex: marker.zIndex }}
                aria-label={`View ${marker.destination.destination}`}
              >
                <span
                  className={cn(
                    "relative flex items-center justify-center rounded-full border-2 border-white transition-all duration-200",
                    marker.isActive
                      ? "scale-125 bg-rose shadow-[0_0_0_10px_rgba(199,119,114,0.18)]"
                      : marker.isPeak
                        ? "bg-[#ddb45d] shadow-[0_0_0_8px_rgba(255,255,255,0.26)] group-hover:scale-110"
                        : "bg-pine/85 shadow-[0_0_0_8px_rgba(255,255,255,0.24)] group-hover:scale-110",
                  )}
                  style={{ width: marker.markerSize, height: marker.markerSize }}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      marker.isPeak ? "bg-[#fde68a]" : marker.isWishlisted ? "bg-[#ffd5e1]" : "bg-white",
                    )}
                  />
                </span>

                <span
                  className={cn(
                    "pointer-events-none absolute rounded-full border border-rose/35 opacity-0 transition duration-300",
                    marker.isActive && "animate-ping opacity-100",
                  )}
                  style={{
                    width: marker.markerSize + 18,
                    height: marker.markerSize + 18,
                    left: -(marker.markerSize + 18) / 2 + marker.markerSize / 2,
                    top: -(marker.markerSize + 18) / 2 + marker.markerSize / 2,
                  }}
                />

                <span
                  className={cn(
                    "pointer-events-none absolute h-3 w-3 rotate-45 border-r border-b border-white/80 bg-pine opacity-0 transition duration-200",
                    (marker.isActive || isHovered) && "opacity-100",
                  )}
                  style={{
                    left:
                      marker.tooltip.placement === "left"
                        ? -TOOLTIP_OFFSET / 2
                        : marker.tooltip.placement === "right"
                          ? TOOLTIP_OFFSET / 2
                          : 0,
                    top: marker.tooltip.placement === "top" ? -TOOLTIP_OFFSET / 2 : 0,
                    transform:
                      marker.tooltip.placement === "left"
                        ? "translate(-100%, -50%) rotate(45deg)"
                        : marker.tooltip.placement === "right"
                          ? "translate(100%, -50%) rotate(45deg)"
                          : "translate(-50%, -100%) rotate(45deg)",
                  }}
                />

                <span
                  className={cn(
                    "pointer-events-none absolute w-[212px] rounded-[1rem] border border-white/80 bg-pine px-3 py-3 text-left text-xs text-white shadow-xl transition duration-200",
                    marker.isActive || isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  )}
                  style={{
                    left: marker.tooltip.x - marker.x,
                    top: marker.tooltip.y - marker.y,
                  }}
                >
                  <span className="block text-[11px] uppercase tracking-[0.22em] opacity-65">
                    {getFlowerLabel(marker.destination.flowerType)}
                  </span>
                  <span className="mt-1 block text-sm font-medium">
                    {getLocalizedDestinationName(marker.destination, locale)}, {getCountryLabel(marker.destination.country)}
                  </span>
                  <span className="mt-1 block text-[11px] opacity-75">
                    {getSeasonalStatus(marker.destination, selectedMonth, {
                      locale,
                      monthLabel: getMonthLabel(selectedMonth, "editorial"),
                    })}
                  </span>
                  <span className="mt-1 block text-[11px] opacity-75">
                    {localizeSeasonText(marker.destination.bestViewingText, locale)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {visibleDestinations.length > 0 ? (
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 rounded-2xl bg-white/72 p-3 text-xs text-pine/75 backdrop-blur md:right-auto">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-pine/85" />
              {t("map.legendBlooming")}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose" />
              {t("map.legendSelected")}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#fde68a]" />
              {t("map.legendPeak")}
            </span>
          </div>
        ) : (
          <div className="absolute inset-x-6 bottom-6">
            <EmptyState
              eyebrow={t("map.emptyEyebrow")}
              title={t("map.emptyTitle")}
              description={
                mapMode === "globe"
                  ? t("map.emptyBodyGlobe")
                  : t("map.emptyBody")
              }
            />
          </div>
        )}

        {isRefreshing ? (
          <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/85 px-4 py-2 text-xs uppercase tracking-[0.2em] text-pine/60 shadow-sm">
            {t("common.status.refreshingMap")}
          </div>
        ) : null}
      </div>
    </section>
  );
}
