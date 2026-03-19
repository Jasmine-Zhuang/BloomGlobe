import { Destination } from "@/lib/types";
import { FlowerArtwork } from "@/components/flower-artwork";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";

interface WishlistStripProps {
  wishlistDestinations: Destination[];
  selectedMonthLabel: string;
  isLoaded: boolean;
  onSelect: (destination: Destination) => void;
  onToggleWishlist: (destinationId: string) => void;
}

export function WishlistStrip({
  wishlistDestinations,
  selectedMonthLabel,
  isLoaded,
  onSelect,
  onToggleWishlist,
}: WishlistStripProps) {
  return (
    <section className="glass-card rounded-[1.85rem] border border-white/70 p-5 shadow-bloom sm:p-6">
      <SectionHeading
        eyebrow="Saved Trips"
        title="Your bloom shortlist"
        description={
          wishlistDestinations.length === 0
            ? `Nothing is saved yet for ${selectedMonthLabel}. Add destinations from the map or curated picks to keep a private shortlist in this browser.`
            : `${wishlistDestinations.length} destination${wishlistDestinations.length === 1 ? "" : "s"} saved for later.`
        }
      />

      {!isLoaded ? (
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[148px] animate-pulse rounded-[1.35rem] border border-[#eadbd3] bg-white/70"
            />
          ))}
        </div>
      ) : wishlistDestinations.length > 0 ? (
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {wishlistDestinations.map((destination) => (
            <div
              key={destination.id}
              className="min-w-[248px] overflow-hidden rounded-[1.45rem] border border-[#eadbd3] bg-white/80"
            >
              <button type="button" onClick={() => onSelect(destination)} className="block text-left">
                <div className="h-28 w-full overflow-hidden">
                  <FlowerArtwork
                    flowerType={destination.flowerType}
                    title={destination.name}
                    className="h-full w-full"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-rose/80">{destination.flowerType}</p>
                  <h3 className="mt-2 font-serif text-xl text-pine">{destination.name}</h3>
                  <p className="mt-1 text-sm text-pine/65">
                    {destination.country} • {destination.idealTripLength}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-pine/70">{destination.shortDescription}</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => onToggleWishlist(destination.id)}
                className="mx-4 mb-4 rounded-full border border-[#e6d7cf] px-4 py-2 text-sm text-pine transition hover:border-rose hover:text-rose"
              >
                Remove from wishlist
              </button>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-5"
          title="Save somewhere worth returning to"
          description={`Shortlist favorite bloom trips for ${selectedMonthLabel} and keep them handy between visits.`}
        />
      )}
    </section>
  );
}
