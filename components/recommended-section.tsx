import { Destination } from "@/lib/types";

interface RecommendedSectionProps {
  destinations: Destination[];
  selectedMonthLabel: string;
  wishlistIds: string[];
  onSelectDestination: (destination: Destination) => void;
  onToggleWishlist: (destinationId: string) => void;
}

export function RecommendedSection({
  destinations,
  selectedMonthLabel,
  wishlistIds,
  onSelectDestination,
  onToggleWishlist,
}: RecommendedSectionProps) {
  return (
    <section className="glass-card rounded-[1.9rem] border border-white/70 p-5 shadow-bloom sm:p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-rose/80">Recommended This Month</p>
          <h2 className="mt-2 font-serif text-2xl text-pine">{selectedMonthLabel} bloom escapes</h2>
        </div>
        <p className="max-w-xl text-sm text-pine/70">
          Shortlisted from the current bloom window so you can move from browsing to trip decisions faster.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {destinations.map((destination) => {
          const isWishlisted = wishlistIds.includes(destination.id);

          return (
            <article
              key={destination.id}
              className="overflow-hidden rounded-[1.5rem] border border-[#eadbd3] bg-white/75"
            >
              <button
                type="button"
                onClick={() => onSelectDestination(destination)}
                className="block w-full text-left"
              >
                <div
                  className="h-36 w-full"
                  style={{
                    background: `linear-gradient(135deg, ${destination.image.from}, ${destination.image.to})`,
                  }}
                />
                <div className="space-y-3 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-rose/80">{destination.flowerType}</p>
                    <h3 className="mt-2 font-serif text-xl text-pine">{destination.name}</h3>
                    <p className="text-sm text-pine/65">
                      {destination.country} • {destination.region}
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-pine/75">{destination.shortDescription}</p>
                </div>
              </button>
              <div className="px-4 pb-4">
                <button
                  type="button"
                  onClick={() => onToggleWishlist(destination.id)}
                  className={[
                    "w-full rounded-full border px-4 py-2 text-sm transition",
                    isWishlisted
                      ? "border-rose bg-rose text-white"
                      : "border-[#e6d7cf] bg-[#fffaf6] text-pine hover:border-rose hover:text-rose",
                  ].join(" ")}
                >
                  {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
