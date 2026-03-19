import { MONTHS } from "@/lib/mock-data";
import { Destination } from "@/lib/types";
import { isPeakMonth } from "@/lib/utils";

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
      <aside className="glass-card rounded-[1.9rem] border border-white/70 p-6 shadow-bloom">
        <p className="text-sm text-pine/70">No destinations match this month and filter combination.</p>
      </aside>
    );
  }

  const currentMonthIsPeak = isPeakMonth(destination, selectedMonth);

  return (
    <aside className="glass-card overflow-hidden rounded-[1.9rem] border border-white/70 shadow-bloom">
      <div
        className="h-48 w-full"
        style={{
          background: `linear-gradient(135deg, ${destination.image.from}, ${destination.image.to})`,
        }}
      />

      <div className="space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-rose/80">{destination.flowerType}</div>
            <h2 className="mt-2 font-serif text-3xl text-pine">{destination.name}</h2>
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
                ? "border-rose bg-rose text-white"
                : "border-[#e4d6d0] bg-white text-pine hover:border-rose hover:text-rose",
            ].join(" ")}
          >
            {isWishlisted ? "Saved" : "Save"}
          </button>
        </div>

        <p className="text-base leading-7 text-pine/80">{destination.longDescription}</p>

        <div className="grid gap-3 rounded-[1.5rem] bg-[#fffaf6] p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-pine/65">Best for</span>
            <span className="font-medium text-pine">{destination.signatureExperience}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-pine/65">{MONTHS[selectedMonth]} status</span>
            <span className="font-medium text-pine">
              {currentMonthIsPeak ? "Peak bloom" : "Good bloom window"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-pine/65">Travel note</span>
            <span className="max-w-[14rem] text-right font-medium text-pine">{destination.travelTip}</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-pine">Bloom calendar</p>
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
