"use client";

import { useEffect, useMemo, useState } from "react";
import { BloomMap } from "@/components/bloom-map";
import { DestinationDetailPanel } from "@/components/destination-detail-panel";
import { FilterBar } from "@/components/filter-bar";
import { HeroSection } from "@/components/hero-section";
import { RecommendedSection } from "@/components/recommended-section";
import { WishlistStrip } from "@/components/wishlist-strip";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { DESTINATIONS, MONTHS } from "@/lib/mock-data";
import { Destination, FlowerType, Region } from "@/lib/types";
import { isDestinationInMonth, isPeakMonth } from "@/lib/utils";

export function BloomGlobeApp() {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedFlower, setSelectedFlower] = useState<FlowerType | "All">("All");
  const [selectedRegion, setSelectedRegion] = useState<Region | "All">("All");
  const [wishlistIds, setWishlistIds] = useLocalStorage<string[]>("bloom-globe-wishlist", []);

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
    return filteredDestinations.slice(0, 4);
  }, [filteredDestinations]);

  const wishlistDestinations = useMemo(() => {
    return DESTINATIONS.filter((destination) => wishlistIds.includes(destination.id));
  }, [wishlistIds]);

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(
    filteredDestinations[0] ?? DESTINATIONS[0],
  );

  useEffect(() => {
    if (!selectedDestination || !filteredDestinations.some((item) => item.id === selectedDestination.id)) {
      setSelectedDestination(filteredDestinations[0] ?? DESTINATIONS[0]);
    }
  }, [filteredDestinations, selectedDestination]);

  function toggleWishlist(destinationId: string) {
    setWishlistIds((current) =>
      current.includes(destinationId)
        ? current.filter((id) => id !== destinationId)
        : [...current, destinationId],
    );
  }

  return (
    <main className="bloom-shell">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-10 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <HeroSection
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
          count={filteredDestinations.length}
        />

        <WishlistStrip
          wishlistDestinations={wishlistDestinations}
          selectedMonthLabel={MONTHS[selectedMonth]}
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
          selectedMonthLabel={MONTHS[selectedMonth]}
          wishlistIds={wishlistIds}
          onSelectDestination={setSelectedDestination}
          onToggleWishlist={toggleWishlist}
        />
      </div>
    </main>
  );
}
