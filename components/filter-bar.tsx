import { FLOWER_TYPES, REGIONS } from "@/lib/mock-data";
import { SectionHeading } from "@/components/ui/section-heading";
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
  return (
    <section className="glass-card rounded-[1.85rem] border border-white/70 p-5 shadow-bloom sm:p-6">
      <SectionHeading
        eyebrow="Refine The Season"
        title="Narrow the bloom mood"
        description="Keep the month fixed, then filter by flower type or region to find the trip shape that fits."
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-pine">Flower type</span>
          <select
            value={selectedFlower}
            onChange={(event) => onFlowerChange(event.target.value as FlowerType | "All")}
            className="w-full rounded-2xl border border-[#e7d7d2] bg-white px-4 py-3 text-pine outline-none transition focus:border-rose"
          >
            <option value="All">All flower styles</option>
            {FLOWER_TYPES.map((flowerType) => (
              <option key={flowerType} value={flowerType}>
                {flowerType}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-pine">Region</span>
          <select
            value={selectedRegion}
            onChange={(event) => onRegionChange(event.target.value as Region | "All")}
            className="w-full rounded-2xl border border-[#e7d7d2] bg-white px-4 py-3 text-pine outline-none transition focus:border-rose"
          >
            <option value="All">Anywhere in bloom</option>
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
