"use client";

import { useEffect, useRef } from "react";
import { MONTHS } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface MonthSelectorProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

export function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
  const { getMonthLabel, t } = useI18n();
  const canGoBackward = selectedMonth > 0;
  const canGoForward = selectedMonth < MONTHS.length - 1;
  const mobileScrollerRef = useRef<HTMLDivElement>(null);
  const monthRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeMonth = monthRefs.current[selectedMonth];

    if (!activeMonth || window.innerWidth >= 768) {
      return;
    }

    activeMonth.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedMonth]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-pine/45">{t("monthSelector.timelineEyebrow")}</p>
          <p className="mt-1 text-sm text-pine/68">{t("monthSelector.timelineDescription")}</p>
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
            aria-label={t("common.buttons.previousMonth")}
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
            aria-label={t("common.buttons.nextMonth")}
          >
            ›
          </button>
        </div>
      </div>

      <div className="rounded-[1.55rem] border border-white/70 bg-white/58 p-4">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-pine/42">{t("monthSelector.nowBrowsing")}</p>
            <p className="mt-1 font-serif text-3xl leading-none text-pine">{getMonthLabel(selectedMonth, "editorial")}</p>
          </div>
          <p className="max-w-[12rem] text-left text-xs leading-5 text-pine/52 sm:text-right">
            {t("monthSelector.summary")}
          </p>
        </div>

        <div
          ref={mobileScrollerRef}
          className="month-timeline -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 md:hidden"
          aria-label="Months"
        >
          {MONTHS.map((month, index) => {
            const isActive = index === selectedMonth;
            const monthLabel = getMonthLabel(index, "editorial");

            return (
              <button
                key={month}
                ref={(node) => {
                  monthRefs.current[index] = node;
                }}
                type="button"
                onClick={() => onMonthChange(index)}
                className={cn(
                  "min-w-[132px] snap-center rounded-[1.25rem] border px-4 py-4 text-left transition-all duration-300",
                  isActive
                    ? "border-rose bg-rose text-white shadow-[0_18px_36px_rgba(199,119,114,0.24)]"
                    : "border-white/70 bg-white/82 text-pine",
                )}
                aria-pressed={isActive}
              >
                <span className={cn("text-xs uppercase tracking-[0.2em]", isActive ? "text-white/78" : "text-pine/42")}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 block text-lg font-medium">{monthLabel}</span>
                <span className={cn("mt-3 block h-1.5 rounded-full", isActive ? "bg-white/95" : "bg-[#ead8d1]")} />
              </button>
            );
          })}
        </div>

        <div className="hidden gap-3 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {MONTHS.map((month, index) => {
            const isActive = index === selectedMonth;
            const monthLabel = getMonthLabel(index, "editorial");

            return (
              <button
                key={month}
                type="button"
                onClick={() => onMonthChange(index)}
                className={cn(
                  "group min-w-0 min-h-[126px] w-full overflow-hidden rounded-[1.3rem] border px-4 py-4 text-left transition-all duration-300",
                  isActive
                    ? "border-rose bg-rose text-white shadow-[0_18px_36px_rgba(199,119,114,0.26)]"
                    : "border-white/70 bg-white/78 text-pine hover:border-rose/40 hover:bg-white",
                )}
                aria-pressed={isActive}
              >
                <span className={cn("text-xs uppercase tracking-[0.2em]", isActive ? "text-white/78" : "text-pine/42")}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 block text-[1.02rem] font-medium leading-tight [overflow-wrap:anywhere]">{monthLabel}</span>
                <span
                  className={cn(
                    "mt-4 block h-1.5 rounded-full transition-all duration-300",
                    isActive ? "bg-white/95" : "bg-[#ead8d1] group-hover:bg-rose/35",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
