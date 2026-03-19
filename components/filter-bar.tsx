"use client";

import { FLOWER_TYPES, REGIONS } from "@/lib/mock-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/lib/i18n";
import { FlowerType, Region } from "@/lib/types";

interface FilterBarProps {
  selectedFlower: FlowerType | "All";
  selectedRegion: Region | "All";
  onFlowerChange: (flower: FlowerType | "All") => void;
  onRegionChange: (region: Region | "All") => void;
}

export function FilterBar({
  selectedFlower,
  selectedRegion,
  onFlowerChange,
  onRegionChange,
}: FilterBarProps) {
  const { getFlowerLabel, getRegionLabel, t } = useI18n();

  return (
    <section className="glass-card rounded-[1.85rem] border border-white/70 p-5 shadow-bloom sm:p-6">
      <SectionHeading
        eyebrow={t("filters.eyebrow")}
        title={t("filters.title")}
        description={t("filters.description")}
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-pine">{t("filters.flowerLabel")}</span>
          <select
            value={selectedFlower}
            onChange={(event) => onFlowerChange(event.target.value as FlowerType | "All")}
            className="w-full rounded-2xl border border-[#e7d7d2] bg-white px-4 py-3 text-pine outline-none transition focus:border-rose"
          >
            <option value="All">{t("filters.flowerAll")}</option>
            {FLOWER_TYPES.map((flowerType) => (
              <option key={flowerType} value={flowerType}>
                {getFlowerLabel(flowerType)}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-pine">{t("filters.regionLabel")}</span>
          <select
            value={selectedRegion}
            onChange={(event) => onRegionChange(event.target.value as Region | "All")}
            className="w-full rounded-2xl border border-[#e7d7d2] bg-white px-4 py-3 text-pine outline-none transition focus:border-rose"
          >
            <option value="All">{t("filters.regionAll")}</option>
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {getRegionLabel(region)}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
