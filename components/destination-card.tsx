"use client";

import { DestinationBadgePill } from "@/components/ui/badge";
import { DestinationImage } from "@/components/destination-image";
import {
  getLocalizedDestinationCopy,
  getLocalizedDestinationName,
  localizeSeasonText,
  localizeTripLength,
} from "@/lib/destination-localization";
import { useI18n } from "@/lib/i18n";
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
  const { getCountryLabel, getFlowerLabel, getMonthLabel, getRegionLabel, locale, t } = useI18n();
  const badges = getDisplayBadges(destination, selectedMonth);
  const copy = getLocalizedDestinationCopy(destination, locale);
  const reason = getRecommendationReason(destination, selectedMonth, {
    locale,
    monthLabel: getMonthLabel(selectedMonth, "editorial"),
    flowerLabel: getFlowerLabel(destination.flowerType),
    tripLengthLabel: localizeTripLength(destination.idealTripLength, locale),
  });

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[1.65rem] border border-[#eadbd3] bg-white/80 shadow-[0_16px_40px_rgba(115,74,59,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(115,74,59,0.14)]",
        className,
      )}
    >
      <button type="button" onClick={() => onSelect(destination)} className="block w-full text-left">
        <div className="relative h-44 w-full overflow-hidden">
          <DestinationImage destination={destination} className="h-full w-full" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {badges.slice(0, 2).map((badge) => (
              <DestinationBadgePill key={badge} badge={badge} />
            ))}
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-rose/80">{getFlowerLabel(destination.flowerType)}</p>
            <h3 className="mt-2 font-serif text-[1.7rem] leading-tight text-pine">{getLocalizedDestinationName(destination, locale)}</h3>
            <p className="mt-1 text-sm text-pine/60">
              {getCountryLabel(destination.country)} • {getRegionLabel(destination.region)}
            </p>
          </div>

          <p className="text-sm leading-6 text-pine/78">{copy.shortDescription}</p>

          <div className="rounded-[1.3rem] bg-[#fcf7f2] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-pine/45">{t("recommendations.whyRecommended")}</p>
            <p className="mt-2 text-sm leading-6 text-pine/72">{reason}</p>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-[1.1rem] border border-[#efe1d9] bg-[#fffaf7] px-4 py-3 text-sm text-pine/68">
            <span>{localizeSeasonText(destination.bestViewingText, locale)}</span>
            <span>{localizeTripLength(destination.bestTripLength, locale)}</span>
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
          {isWishlisted ? t("common.buttons.saved") : t("common.buttons.save")}
        </button>
      </div>
    </article>
  );
}
