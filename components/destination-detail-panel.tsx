"use client";

import { MONTHS } from "@/lib/mock-data";
import { DestinationImage } from "@/components/destination-image";
import { DestinationBadgePill } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  getLocalizedDestinationCopy,
  getLocalizedDestinationName,
  localizeSeasonText,
  localizeTripLength,
} from "@/lib/destination-localization";
import { useI18n } from "@/lib/i18n";
import { Destination } from "@/lib/types";
import { getBloomWindowLabel, getDisplayBadges, getSeasonalStatus, isPeakMonth } from "@/lib/utils";

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
  const { getConfidenceLabel, getCountryLabel, getFlowerLabel, getMonthLabel, getRegionLabel, getTagLabel, locale, t } = useI18n();

  if (!destination) {
    return (
      <aside className="glass-card rounded-[1.95rem] border border-white/70 p-6 shadow-bloom">
        <EmptyState
          eyebrow={t("detail.emptyEyebrow")}
          title={t("detail.emptyTitle")}
          description={t("detail.emptyBody")}
        />
      </aside>
    );
  }

  const currentMonthIsPeak = isPeakMonth(destination, selectedMonth);
  const badges = getDisplayBadges(destination, selectedMonth);
  const copy = getLocalizedDestinationCopy(destination, locale);
  const selectedMonthLabel = getMonthLabel(selectedMonth, "editorial");

  return (
    <aside className="glass-card overflow-hidden rounded-[1.95rem] border border-white/70 shadow-bloom">
      <div className="relative h-64 w-full">
        <DestinationImage
          destination={destination}
          priority
          className="h-full w-full"
          overlayClassName="bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.78),transparent_30%),linear-gradient(180deg,transparent,rgba(47,53,47,0.24))]"
        />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <DestinationBadgePill key={badge} badge={badge} />
          ))}
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-rose/80">{getFlowerLabel(destination.flowerType)}</div>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-pine">{getLocalizedDestinationName(destination, locale)}</h2>
            <p className="mt-1 text-sm text-pine/70">
              {getCountryLabel(destination.country)} • {getRegionLabel(destination.region)}
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
            {isWishlisted ? t("common.buttons.saved") : t("common.buttons.save")}
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-base leading-7 text-pine/80">{copy.shortDescription}</p>
          <p className="text-sm leading-7 text-pine/72">{copy.whyVisit}</p>
        </div>

        <div className="grid gap-3 rounded-[1.5rem] bg-[#fffaf6] p-4">
          <div className="flex items-start justify-between gap-4 text-sm">
            <span className="text-pine/65">{t("detail.bestViewingWindow")}</span>
            <span className="max-w-[15rem] text-right font-medium text-pine">{getBloomWindowLabel(destination, locale)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-pine/65">{t("detail.seasonalStatus")}</span>
            <span className="font-medium text-pine">{getSeasonalStatus(destination, selectedMonth, { locale, monthLabel: selectedMonthLabel })}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-pine/65">{t("detail.tripLength")}</span>
            <span className="font-medium text-pine">{localizeTripLength(destination.bestTripLength, locale)}</span>
          </div>
          <div className="flex items-start justify-between gap-4 text-sm">
            <span className="text-pine/65">{t("detail.peakWindow")}</span>
            <span className="max-w-[15rem] text-right font-medium text-pine">{localizeSeasonText(destination.peakWindow, locale)}</span>
          </div>
          <div className="flex items-start justify-between gap-4 text-sm">
            <span className="text-pine/65">{t("detail.variabilityNote")}</span>
            <span className="max-w-[15rem] text-right font-medium text-pine">{copy.variabilityNote}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-pine/65">{t("detail.confidence")}</span>
            <span className="font-medium capitalize text-pine">{getConfidenceLabel(destination.confidence ?? "medium")}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {destination.travelTags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#eadbd3] bg-white/72 px-3 py-1 text-xs uppercase tracking-[0.16em] text-pine/56"
            >
              {getTagLabel(tag)}
            </span>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-pine">{t("detail.bloomCalendar")}</p>
            <p className="text-sm text-pine/60">
              {currentMonthIsPeak
                ? t("detail.calendarPeak", { month: selectedMonthLabel })
                : t("detail.calendarInWindow", { month: selectedMonthLabel })}
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
                  {getMonthLabel(index, "short")}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
