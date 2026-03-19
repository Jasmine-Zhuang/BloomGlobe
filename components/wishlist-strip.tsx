import { Destination } from "@/lib/types";

interface WishlistStripProps {
  wishlistDestinations: Destination[];
  selectedMonthLabel: string;
  onSelect: (destination: Destination) => void;
  onToggleWishlist: (destinationId: string) => void;
}

export function WishlistStrip({
  wishlistDestinations,
  selectedMonthLabel,
  onSelect,
  onToggleWishlist,
}: WishlistStripProps) {
  return (
    <section className="glass-card rounded-[1.75rem] border border-white/70 p-5 shadow-bloom">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-rose/80">Wishlist</p>
          <h2 className="mt-2 font-serif text-2xl text-pine">Saved bloom trips</h2>
        </div>
        <p className="text-sm text-pine/70">
          {wishlistDestinations.length === 0
            ? `Nothing saved yet for your ${selectedMonthLabel} planning.`
            : `${wishlistDestinations.length} destinations saved locally in this browser.`}
        </p>
      </div>

      {wishlistDestinations.length > 0 ? (
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {wishlistDestinations.map((destination) => (
            <div
              key={destination.id}
              className="min-w-[240px] rounded-[1.35rem] border border-[#eadbd3] bg-white/80 p-4"
            >
              <button type="button" onClick={() => onSelect(destination)} className="block text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-rose/80">{destination.flowerType}</p>
                <h3 className="mt-2 font-serif text-xl text-pine">{destination.name}</h3>
                <p className="mt-1 text-sm text-pine/65">{destination.country}</p>
              </button>
              <button
                type="button"
                onClick={() => onToggleWishlist(destination.id)}
                className="mt-4 rounded-full border border-[#e6d7cf] px-4 py-2 text-sm text-pine transition hover:border-rose hover:text-rose"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[1.35rem] border border-dashed border-[#e7d8d2] bg-white/60 px-4 py-6 text-sm text-pine/65">
          Save destinations from the map or recommendations to keep a private shortlist between sessions.
        </div>
      )}
    </section>
  );
}
