"use client";

import { MONTHS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface MonthSelectorProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

export function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
  const canGoBackward = selectedMonth > 0;
  const canGoForward = selectedMonth < MONTHS.length - 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-pine/45">Bloom timeline</p>
          <p className="mt-1 text-sm text-pine/68">Choose a month and watch the bloom map update in place.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onMonthChange(selectedMonth - 1)}
            disabled={!canGoBackward}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg text-pine transition",
              canGoBackward ? "hover:border-rose hover:text-rose" : "cursor-not-allowed opacity-35",
            )}
            aria-label="Previous month"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => onMonthChange(selectedMonth + 1)}
            disabled={!canGoForward}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg text-pine transition",
              canGoForward ? "hover:border-rose hover:text-rose" : "cursor-not-allowed opacity-35",
            )}
            aria-label="Next month"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {MONTHS.map((month, index) => {
          const isActive = index === selectedMonth;

          return (
            <button
              key={month}
              type="button"
              onClick={() => onMonthChange(index)}
              className={cn(
                "group relative rounded-[1.4rem] border px-4 py-4 text-left transition-all duration-300",
                isActive
                  ? "border-rose bg-rose text-white shadow-[0_18px_36px_rgba(199,119,114,0.26)]"
                  : "border-white/70 bg-white/72 text-pine hover:border-rose/40 hover:bg-white",
              )}
            >
              <span
                className={cn(
                  "mb-3 block h-1.5 rounded-full transition-all duration-300",
                  isActive ? "bg-white/95" : "bg-[#ead8d1] group-hover:bg-rose/35",
                )}
              />
              <span className="block text-base font-medium">{month}</span>
              <span className={cn("mt-1 block text-xs", isActive ? "text-white/82" : "text-pine/48")}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
