import { Destination } from "@/lib/types";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn, getSeasonalStatus, isPeakMonth } from "@/lib/utils";
import {
  WORLD_BORDERS_PATH,
  WORLD_COUNTRY_PATHS,
  WORLD_GRATICULE_PATH,
  projectWorldCoordinates,
} from "@/lib/world-map";

interface BloomMapProps {
  destinations: Destination[];
  selectedDestinationId: string | null;
  selectedMonth: number;
  wishlistIds: string[];
  isRefreshing: boolean;
  onSelectDestination: (destination: Destination) => void;
}

const REGION_LABELS = [
  { label: "North America", x: 188, y: 156 },
  { label: "South America", x: 282, y: 340 },
  { label: "Europe", x: 494, y: 136 },
  { label: "Africa", x: 520, y: 264 },
  { label: "Asia", x: 686, y: 164 },
  { label: "Oceania", x: 822, y: 330 },
];

export function BloomMap({
  destinations,
  selectedDestinationId,
  selectedMonth,
  wishlistIds,
  isRefreshing,
  onSelectDestination,
}: BloomMapProps) {
  const visibleDestinations = [...destinations].sort((a, b) => {
    if (a.id === selectedDestinationId) {
      return 1;
    }

    if (b.id === selectedDestinationId) {
      return -1;
    }

    return a.name.localeCompare(b.name);
  });

  return (
    <section className="glass-card overflow-hidden rounded-[1.95rem] border border-white/70 shadow-bloom">
      <div className="border-b border-[#eadbd3] px-5 py-5 sm:px-6">
        <SectionHeading
          eyebrow="Explore The Globe"
          title="Where blooms are unfolding"
          description="Open a destination to compare bloom timing, signature scenery, and whether it deserves a place on your wishlist."
          aside={`${destinations.length} visible marker${destinations.length === 1 ? "" : "s"}`}
        />
      </div>

      <div className="map-grid relative aspect-[16/9] w-full bg-[radial-gradient(circle_at_top,#fbf2eb,transparent_45%),linear-gradient(180deg,#fcfaf7_0%,#f3ece5_100%)]">
        <svg
          viewBox="0 0 1000 520"
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
          </defs>

          <rect x="0" y="0" width="1000" height="520" fill="url(#ocean-fill)" />
          <path d={WORLD_GRATICULE_PATH} stroke="rgba(151,163,139,0.16)" strokeWidth="1" />
          <g opacity="0.98">
            {WORLD_COUNTRY_PATHS.map((country) => (
              <path key={country.id} d={country.d} fill="url(#land-fill)" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" />
            ))}
          </g>
          <path d={WORLD_BORDERS_PATH} stroke="rgba(118,132,111,0.36)" strokeWidth="0.8" />
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
                {region.label}
              </text>
            ))}
          </g>
        </svg>

        <div className={cn("absolute inset-0 transition-opacity duration-300", isRefreshing && "opacity-45")}>
          {visibleDestinations.map((destination) => {
            const { x, y } = projectWorldCoordinates(destination.coordinates.lat, destination.coordinates.lng);
            const isActive = destination.id === selectedDestinationId;
            const isPeak = isPeakMonth(destination, selectedMonth);
            const isWishlisted = wishlistIds.includes(destination.id);
            const markerSize = isActive ? 18 : isPeak ? 16 : 14;
            const previewAnchorClass =
              x > 760
                ? "right-3 translate-x-0"
                : x < 240
                  ? "left-3 translate-x-0"
                  : "left-1/2 -translate-x-1/2";

            return (
              <button
                key={destination.id}
                type="button"
                onClick={() => onSelectDestination(destination)}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: x, top: y }}
                aria-label={`View ${destination.name}`}
              >
                <span
                  className={[
                    "relative flex items-center justify-center rounded-full border-2 border-white transition-all",
                    isActive
                      ? "scale-125 bg-rose shadow-[0_0_0_10px_rgba(199,119,114,0.18)]"
                      : "bg-pine/85 shadow-[0_0_0_8px_rgba(255,255,255,0.24)] group-hover:scale-110",
                  ].join(" ")}
                  style={{ width: markerSize, height: markerSize }}
                >
                  <span
                    className={[
                      "h-1.5 w-1.5 rounded-full",
                      isPeak ? "bg-[#fde68a]" : isWishlisted ? "bg-[#ffd5e1]" : "bg-white",
                    ].join(" ")}
                  />
                </span>
                <span
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-full border border-rose/35 opacity-0 transition duration-300",
                    isActive && "animate-ping opacity-100",
                  )}
                  style={{ width: markerSize + 18, height: markerSize + 18, left: -(markerSize + 18) / 2 + markerSize / 2, top: -(markerSize + 18) / 2 + markerSize / 2 }}
                />
                <span
                  className={[
                    "pointer-events-none absolute top-7 min-w-[176px] max-w-[220px] rounded-[1rem] border border-white/80 px-3 py-3 text-left text-xs transition",
                    previewAnchorClass,
                    isActive
                      ? "bg-pine text-white opacity-100 shadow-xl"
                      : "bg-white/95 text-pine opacity-0 shadow-md group-hover:opacity-100",
                  ].join(" ")}
                >
                  <span className="block text-[11px] uppercase tracking-[0.22em] opacity-65">
                    {destination.flowerType}
                  </span>
                  <span className="mt-1 block text-sm font-medium">
                    {destination.name}, {destination.country}
                  </span>
                  <span className="mt-1 block text-[11px] opacity-75">
                    {getSeasonalStatus(destination, selectedMonth)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {destinations.length > 0 ? (
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 rounded-2xl bg-white/72 p-3 text-xs text-pine/75 backdrop-blur md:right-auto">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-pine/85" />
              Blooming now
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose" />
              Selected
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#fde68a]" />
              Peak bloom likely
            </span>
          </div>
        ) : (
          <div className="absolute inset-x-6 bottom-6">
            <EmptyState
              title="No bloom destinations match this view"
              description="Try a different month or broaden your filters to bring more destinations back onto the map."
            />
          </div>
        )}

        {isRefreshing ? (
          <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/85 px-4 py-2 text-xs uppercase tracking-[0.2em] text-pine/60 shadow-sm">
            Refreshing bloom map
          </div>
        ) : null}
      </div>
    </section>
  );
}
