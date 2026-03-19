"use client";

import { DestinationCard } from "@/components/destination-card";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Destination } from "@/lib/types";

interface RecommendedSectionProps {
  destinations: Destination[];
  selectedMonth: number;
  wishlistIds: string[];
  isRefreshing: boolean;
  onSelectDestination: (destination: Destination) => void;
  onToggleWishlist: (destinationId: string) => void;
}

export function RecommendedSection({
  destinations,
  selectedMonth,
  wishlistIds,
  isRefreshing,
  onSelectDestination,
  onToggleWishlist,
}: RecommendedSectionProps) {
  const { getMonthLabel, t } = useI18n();
  const selectedMonthLabel = getMonthLabel(selectedMonth, "editorial");

  return (
    <section className="glass-card rounded-[1.95rem] border border-white/70 p-5 shadow-bloom sm:p-6">
      <SectionHeading
        eyebrow={t("recommendations.eyebrow")}
        title={t("recommendations.title", { month: selectedMonthLabel })}
        description={t("recommendations.description")}
      />

      {destinations.length > 0 ? (
        <div
          className={cn(
            "mt-6 grid gap-4 lg:grid-cols-2 2xl:grid-cols-4",
            isRefreshing && "pointer-events-none opacity-70",
          )}
        >
          {destinations.map((destination, index) => (
            <div
              key={`${selectedMonth}-${destination.id}`}
              className="animate-[card-rise_500ms_ease-out_both]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <DestinationCard
                destination={destination}
                selectedMonth={selectedMonth}
                isWishlisted={wishlistIds.includes(destination.id)}
                onSelect={onSelectDestination}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-6"
          eyebrow={t("recommendations.emptyEyebrow")}
          title={t("recommendations.emptyTitle")}
          description={t("recommendations.emptyBody", { month: selectedMonthLabel })}
        />
      )}
    </section>
  );
}
