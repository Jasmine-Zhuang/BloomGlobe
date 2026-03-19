import { DestinationBadgePill } from "@/components/ui/badge";
import { FlowerArtwork } from "@/components/flower-artwork";
import { cn, getDisplayBadges, getRecommendationReason } from "@/lib/utils";
import { Destination } from "@/lib/types";

interface DestinationCardProps {
  destination: Destination;
  selectedMonth: number;
  isWishlisted: boolean;
  onSelect: (destination: Destination) => void;
  onToggleWishlist: (destinationId: string) => void;
  className?: string;
}

export function DestinationCard({
  destination,
  selectedMonth,
  isWishlisted,
  onSelect,
  onToggleWishlist,
  className,
}: DestinationCardProps) {
  const badges = getDisplayBadges(destination, selectedMonth);
  const reason = getRecommendationReason(destination, selectedMonth);

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[1.65rem] border border-[#eadbd3] bg-white/80 shadow-[0_16px_40px_rgba(115,74,59,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(115,74,59,0.14)]",
        className,
      )}
    >
      <button type="button" onClick={() => onSelect(destination)} className="block w-full text-left">
        <div
          className="relative h-40 w-full overflow-hidden"
        >
          <FlowerArtwork
            flowerType={destination.flowerType}
            title={destination.name}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_34%),linear-gradient(180deg,transparent,rgba(55,68,60,0.12))]" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {badges.slice(0, 2).map((badge) => (
              <DestinationBadgePill key={badge} badge={badge} />
            ))}
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-rose/80">{destination.flowerType}</p>
            <h3 className="mt-2 font-serif text-[1.7rem] leading-tight text-pine">{destination.name}</h3>
            <p className="mt-1 text-sm text-pine/60">
              {destination.country} • {destination.region}
            </p>
          </div>

          <p className="text-sm leading-6 text-pine/78">{destination.shortDescription}</p>

          <div className="rounded-[1.3rem] bg-[#fcf7f2] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-pine/45">Why it&apos;s recommended</p>
            <p className="mt-2 text-sm leading-6 text-pine/72">{reason}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {badges.slice(2).map((badge) => (
              <DestinationBadgePill key={badge} badge={badge} />
            ))}
          </div>
        </div>
      </button>

      <div className="px-5 pb-5">
        <button
          type="button"
          onClick={() => onToggleWishlist(destination.id)}
          className={cn(
            "w-full rounded-full border px-4 py-3 text-sm font-medium transition",
            isWishlisted
              ? "border-rose bg-rose text-white shadow-[0_12px_24px_rgba(199,119,114,0.22)]"
              : "border-[#e6d7cf] bg-[#fffaf6] text-pine hover:border-rose hover:text-rose",
          )}
        >
          {isWishlisted ? "Saved for later" : "Save for later"}
        </button>
      </div>
    </article>
  );
}
