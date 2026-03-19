import { Destination } from "@/lib/types";
import { isPeakMonth, projectCoordinates } from "@/lib/utils";

interface BloomMapProps {
  destinations: Destination[];
  selectedDestinationId: string | null;
  selectedMonth: number;
  wishlistIds: string[];
  onSelectDestination: (destination: Destination) => void;
}

export function BloomMap({
  destinations,
  selectedDestinationId,
  selectedMonth,
  wishlistIds,
  onSelectDestination,
}: BloomMapProps) {
  return (
    <section className="glass-card overflow-hidden rounded-[1.9rem] border border-white/70 shadow-bloom">
      <div className="border-b border-[#eadbd3] px-5 py-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-rose/80">Explore The Globe</p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-serif text-2xl text-pine">Where blooms are unfolding</h2>
          <p className="text-sm text-pine/70">{destinations.length} visible markers</p>
        </div>
      </div>

      <div className="map-grid relative aspect-[16/9] w-full bg-[radial-gradient(circle_at_top,#fbf2eb,transparent_45%),linear-gradient(180deg,#fcfaf7_0%,#f3ece5_100%)]">
        <svg
          viewBox="0 0 1000 520"
          className="absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <g opacity="0.78">
            <path
              d="M100 144c37-44 88-68 155-74 46 5 75 17 90 38 19 27 35 38 62 42 25 3 46 13 62 31 27 28 30 54 8 80-27 32-27 57 4 75 26 16 32 33 22 55-17 35-63 54-136 57-77 4-129-7-157-33-25-24-32-47-21-68 8-14 7-31-4-52-18-36-47-61-87-76-28-10-43-29-45-58-3-20 13-46 47-77Z"
              fill="#dfe5d7"
            />
            <path
              d="M500 129c36-21 74-28 116-19 38 9 72 31 102 67 22 25 54 45 98 60 43 14 74 35 90 63 14 24 10 50-13 76-18 21-41 34-69 39-41 7-71 20-89 39-18 18-42 29-72 34-38 6-70 1-94-16-23-17-54-27-93-30-62-5-93-33-91-84 1-22 11-42 29-59 21-19 29-40 24-63-8-35 11-70 62-107Z"
              fill="#d8e1d2"
            />
            <path
              d="M787 324c28 2 56 14 82 37 22 21 29 43 18 68-11 25-30 41-59 47-35 7-68 0-101-24-30-21-39-45-29-74 8-25 22-42 42-50 14-4 30-6 47-4Z"
              fill="#dfe7d9"
            />
            <path
              d="M266 338c21-14 46-18 73-12 29 6 50 22 62 48 11 23 13 45 6 66-7 21-24 34-49 41-35 8-66 0-93-24-23-21-33-42-31-65 2-21 13-39 32-54Z"
              fill="#e8eee2"
            />
          </g>
        </svg>

        <div className="absolute inset-0">
          {destinations.map((destination) => {
            const { x, y } = projectCoordinates(destination.coordinates.lat, destination.coordinates.lng);
            const isActive = destination.id === selectedDestinationId;
            const isPeak = isPeakMonth(destination, selectedMonth);
            const isWishlisted = wishlistIds.includes(destination.id);

            return (
              <button
                key={destination.id}
                type="button"
                onClick={() => onSelectDestination(destination)}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x / 10}%`, top: `${y / 5.2}%` }}
                aria-label={`View ${destination.name}`}
              >
                <span
                  className={[
                    "flex h-4 w-4 items-center justify-center rounded-full border-2 border-white transition-all",
                    isActive ? "scale-125 bg-rose shadow-lg shadow-rose/25" : "bg-pine/85 group-hover:scale-110",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "h-1.5 w-1.5 rounded-full",
                      isPeak ? "bg-[#fde68a]" : isWishlisted ? "bg-[#ffd5e1]" : "bg-white",
                    ].join(" ")}
                  />
                </span>
                <span
                  className={[
                    "pointer-events-none absolute left-1/2 top-6 min-w-max -translate-x-1/2 rounded-full px-3 py-1 text-xs transition",
                    isActive
                      ? "bg-pine text-white opacity-100"
                      : "bg-white/90 text-pine opacity-0 shadow-md group-hover:opacity-100",
                  ].join(" ")}
                >
                  {destination.name}
                </span>
              </button>
            );
          })}
        </div>

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
            Peak month
          </span>
        </div>
      </div>
    </section>
  );
}
