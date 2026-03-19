"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { BloomMap } from "@/components/bloom-map";
import { DestinationDetailPanel } from "@/components/destination-detail-panel";
import { FilterBar } from "@/components/filter-bar";
import { HeroSection } from "@/components/hero-section";
import { RecommendedSection } from "@/components/recommended-section";
import { WishlistStrip } from "@/components/wishlist-strip";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { DESTINATIONS } from "@/lib/mock-data";
import { getLocalizedDestinationName } from "@/lib/destination-localization";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { Destination, FlowerType, Region } from "@/lib/types";
import { getRecommendedDestinations, isDestinationInMonth, isPeakMonth } from "@/lib/utils";

function BloomGlobeAppContent() {
  const { locale, t } = useI18n();
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedFlower, setSelectedFlower] = useState<FlowerType | "All">("All");
  const [selectedRegion, setSelectedRegion] = useState<Region | "All">("All");
  const [wishlistIds, setWishlistIds, isWishlistLoaded] = useLocalStorage<string[]>("bloom-globe-wishlist", []);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((destination) => {
      const matchesMonth = isDestinationInMonth(destination, selectedMonth);
      const matchesFlower = selectedFlower === "All" || destination.flowerType === selectedFlower;
      const matchesRegion = selectedRegion === "All" || destination.region === selectedRegion;

      return matchesMonth && matchesFlower && matchesRegion;
    }).sort((a, b) => {
      const aPeak = isPeakMonth(a, selectedMonth) ? 1 : 0;
      const bPeak = isPeakMonth(b, selectedMonth) ? 1 : 0;
      return bPeak - aPeak;
    });
  }, [selectedFlower, selectedMonth, selectedRegion]);

  const recommendedDestinations = useMemo(() => {
    return getRecommendedDestinations(filteredDestinations, selectedMonth);
  }, [filteredDestinations, selectedMonth]);

  const wishlistDestinations = useMemo(() => {
    return DESTINATIONS.filter((destination) => wishlistIds.includes(destination.id));
  }, [wishlistIds]);

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(
    filteredDestinations[0] ?? DESTINATIONS[0],
  );

  useEffect(() => {
    if (!selectedDestination || !filteredDestinations.some((item) => item.id === selectedDestination.id)) {
      setSelectedDestination(filteredDestinations[0] ?? null);
    }
  }, [filteredDestinations, selectedDestination]);

  useEffect(() => {
    if (!isRefreshing) {
      return;
    }

    const timeout = window.setTimeout(() => setIsRefreshing(false), 380);
    return () => window.clearTimeout(timeout);
  }, [isRefreshing]);

  useEffect(() => {
    if (!saveFeedback) {
      return;
    }

    const timeout = window.setTimeout(() => setSaveFeedback(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [saveFeedback]);

  function handleMonthChange(month: number) {
    if (month === selectedMonth) {
      return;
    }

    setIsRefreshing(true);
    startTransition(() => {
      setSelectedMonth(month);
    });
  }

  function toggleWishlist(destinationId: string) {
    const destination = DESTINATIONS.find((item) => item.id === destinationId);

    setWishlistIds((current) =>
      current.includes(destinationId)
        ? current.filter((id) => id !== destinationId)
        : [...current, destinationId],
    );

    if (destination && !wishlistIds.includes(destinationId)) {
      setSaveFeedback(
        t("feedback.saved", {
          destination: getLocalizedDestinationName(destination, locale),
        }),
      );
    }
  }

  return (
    <main className="bloom-shell">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-8 px-4 pb-16 pt-6 sm:gap-10 sm:px-6 lg:px-8">
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>

        <HeroSection
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
          count={filteredDestinations.length}
        />

        <WishlistStrip
          wishlistDestinations={wishlistDestinations}
          selectedMonth={selectedMonth}
          isLoaded={isWishlistLoaded}
          onSelect={setSelectedDestination}
          onToggleWishlist={toggleWishlist}
        />

        <FilterBar
          selectedFlower={selectedFlower}
          selectedRegion={selectedRegion}
          onFlowerChange={setSelectedFlower}
          onRegionChange={setSelectedRegion}
        />

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <BloomMap
            destinations={filteredDestinations}
            selectedDestinationId={selectedDestination?.id ?? null}
            selectedMonth={selectedMonth}
            wishlistIds={wishlistIds}
            isRefreshing={isRefreshing}
            onSelectDestination={setSelectedDestination}
          />

          <DestinationDetailPanel
            destination={selectedDestination}
            selectedMonth={selectedMonth}
            isWishlisted={selectedDestination ? wishlistIds.includes(selectedDestination.id) : false}
            onToggleWishlist={toggleWishlist}
          />
        </section>

        <RecommendedSection
          destinations={recommendedDestinations}
          selectedMonth={selectedMonth}
          wishlistIds={wishlistIds}
          isRefreshing={isRefreshing}
          onSelectDestination={setSelectedDestination}
          onToggleWishlist={toggleWishlist}
        />
      </div>

      <div
        className={[
          "pointer-events-none fixed bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/80 bg-white/88 px-4 py-3 text-sm text-pine shadow-bloom backdrop-blur transition-all duration-300",
          saveFeedback ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        ].join(" ")}
        aria-live="polite"
      >
        {saveFeedback ?? t("feedback.savedFallback")}
      </div>
    </main>
  );
}

export function BloomGlobeApp() {
  return (
    <I18nProvider>
      <BloomGlobeAppContent />
    </I18nProvider>
  );
}
