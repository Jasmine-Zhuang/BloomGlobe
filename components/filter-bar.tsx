import { FLOWER_TYPES, REGIONS } from "@/lib/mock-data";
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
    <section className="glass-card rounded-[1.75rem] border border-white/70 p-5 shadow-bloom">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-rose/80">Bloom Filters</p>
          <h2 className="mt-2 font-serif text-2xl text-pine">Refine the season</h2>
        </div>
        <p className="max-w-lg text-sm text-pine/70">
          Keep the month fixed, then narrow by bloom type or region to find the trip that feels right.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-pine">Flower Type</span>
          <select
            value={selectedFlower}
            onChange={(event) => onFlowerChange(event.target.value as FlowerType | "All")}
            className="w-full rounded-2xl border border-[#e7d7d2] bg-white px-4 py-3 text-pine outline-none transition focus:border-rose"
          >
            <option value="All">All flower types</option>
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
            <option value="All">All regions</option>
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
