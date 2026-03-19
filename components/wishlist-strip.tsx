"use client";

import { Destination } from "@/lib/types";
import { DestinationImage } from "@/components/destination-image";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { getLocalizedDestinationCopy, getLocalizedDestinationName, localizeTripLength } from "@/lib/destination-localization";
import { useI18n } from "@/lib/i18n";

interface WishlistStripProps {
  wishlistDestinations: Destination[];
  selectedMonth: number;
  isLoaded: boolean;
  onSelect: (destination: Destination) => void;
  onToggleWishlist: (destinationId: string) => void;
}

export function WishlistStrip({
  wishlistDestinations,
  selectedMonth,
  isLoaded,
  onSelect,
  onToggleWishlist,
}: WishlistStripProps) {
  const { getCountryLabel, getFlowerLabel, getMonthLabel, locale, t } = useI18n();
  const selectedMonthLabel = getMonthLabel(selectedMonth, "editorial");

  return (
    <section className="glass-card rounded-[1.85rem] border border-white/70 p-5 shadow-bloom sm:p-6">
      <SectionHeading
        eyebrow={t("wishlist.eyebrow")}
        title={t("wishlist.title")}
        description={
          wishlistDestinations.length === 0
            ? t("wishlist.emptyDescription", { month: selectedMonthLabel })
            : t(wishlistDestinations.length === 1 ? "wishlist.savedCount" : "wishlist.savedCount_other", { count: wishlistDestinations.length })
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
                <div className="h-32 w-full overflow-hidden">
                  <DestinationImage destination={destination} className="h-full w-full" />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-rose/80">{getFlowerLabel(destination.flowerType)}</p>
                  <h3 className="mt-2 font-serif text-xl text-pine">{getLocalizedDestinationName(destination, locale)}</h3>
                  <p className="mt-1 text-sm text-pine/65">
                    {getCountryLabel(destination.country)} • {localizeTripLength(destination.bestTripLength, locale)}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-pine/70">{getLocalizedDestinationCopy(destination, locale).shortDescription}</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => onToggleWishlist(destination.id)}
                className="mx-4 mb-4 rounded-full border border-[#e6d7cf] px-4 py-2 text-sm text-pine transition hover:border-rose hover:text-rose"
              >
                {t("common.buttons.remove")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-5"
          eyebrow={t("wishlist.emptyEyebrow")}
          title={t("wishlist.emptyTitle")}
          description={t("wishlist.emptyBody", { month: selectedMonthLabel })}
        />
      )}
    </section>
  );
}
