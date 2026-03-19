import { MONTHS } from "@/lib/mock-data";
import { FlowerArtwork } from "@/components/flower-artwork";
import { DestinationBadgePill } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Destination } from "@/lib/types";
import { getDisplayBadges, getSeasonalStatus, isPeakMonth } from "@/lib/utils";

interface DestinationDetailPanelProps {
  destination: Destination | null;
  selectedMonth: number;
  isWishlisted: boolean;
  onToggleWishlist: (destinationId: string) => void;
}

export function DestinationDetailPanel({
  destination,
  selectedMonth,
  isWishlisted,
  onToggleWishlist,
}: DestinationDetailPanelProps) {
  if (!destination) {
    return (
      <aside className="glass-card rounded-[1.95rem] border border-white/70 p-6 shadow-bloom">
        <EmptyState
          title="No destination selected"
          description="Choose a marker or a recommendation card to see bloom timing, travel notes, and save options."
        />
      </aside>
    );
  }

  const currentMonthIsPeak = isPeakMonth(destination, selectedMonth);
  const badges = getDisplayBadges(destination, selectedMonth);

  return (
    <aside className="glass-card overflow-hidden rounded-[1.95rem] border border-white/70 shadow-bloom">
      <div
        className="relative h-52 w-full"
      >
        <FlowerArtwork
          flowerType={destination.flowerType}
          title={destination.name}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.86),transparent_32%),linear-gradient(180deg,transparent,rgba(55,68,60,0.18))]" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <DestinationBadgePill key={badge} badge={badge} />
          ))}
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-rose/80">{destination.flowerType}</div>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-pine">{destination.name}</h2>
            <p className="mt-1 text-sm text-pine/70">
              {destination.country} • {destination.region}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onToggleWishlist(destination.id)}
            className={[
              "rounded-full border px-4 py-2 text-sm transition",
              isWishlisted
                ? "border-rose bg-rose text-white shadow-[0_12px_24px_rgba(199,119,114,0.22)]"
                : "border-[#e4d6d0] bg-white text-pine hover:border-rose hover:text-rose",
            ].join(" ")}
          >
            {isWishlisted ? "Saved for later" : "Save for later"}
          </button>
        </div>

        <p className="text-base leading-7 text-pine/80">{destination.longDescription}</p>

        <div className="grid gap-3 rounded-[1.5rem] bg-[#fffaf6] p-4">
          <div className="flex items-start justify-between gap-4 text-sm">
            <span className="text-pine/65">Signature moment</span>
            <span className="max-w-[14rem] text-right font-medium text-pine">{destination.signatureExperience}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-pine/65">Best viewing window</span>
            <span className="font-medium text-pine">{getSeasonalStatus(destination, selectedMonth)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-pine/65">Trip length</span>
            <span className="font-medium text-pine">{destination.idealTripLength}</span>
          </div>
          <div className="flex items-start justify-between gap-4 text-sm">
            <span className="text-pine/65">Travel note</span>
            <span className="max-w-[14rem] text-right font-medium text-pine">{destination.travelTip}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-pine">Bloom calendar</p>
            <p className="text-sm text-pine/60">
              {currentMonthIsPeak ? `${MONTHS[selectedMonth]} is the prime bloom moment.` : `${MONTHS[selectedMonth]} still sits inside the bloom window.`}
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {MONTHS.map((month, index) => {
              const monthNumber = index + 1;
              const inBloom = destination.bloomMonths.includes(monthNumber);
              const isPeak = destination.peakMonths.includes(monthNumber);

              return (
                <span
                  key={month}
                  className={[
                    "rounded-full px-3 py-1 text-xs",
                    inBloom
                      ? isPeak
                        ? "bg-rose text-white"
                        : "bg-petal text-pine"
                      : "bg-[#f2ece7] text-pine/45",
                  ].join(" ")}
                >
                  {month.slice(0, 3)}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
