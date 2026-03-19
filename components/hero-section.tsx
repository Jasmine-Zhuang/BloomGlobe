"use client";

import { MONTHS } from "@/lib/mock-data";
import { MonthSelector } from "@/components/month-selector";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
  count: number;
}

export function HeroSection({ selectedMonth, onMonthChange, count }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-[2.25rem] bg-hero-glow px-6 py-8 shadow-bloom sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.72),transparent_68%)] lg:block" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.2))]" />
      <div className="relative grid gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-start">
        <div className="max-w-2xl">
          <Badge className="mb-4">Bloom Globe</Badge>
          <h1 className="max-w-2xl font-serif text-4xl leading-[1.02] text-pine sm:text-5xl lg:text-[4.25rem]">
            Where the world is blooming this month.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-pine/74 sm:text-lg">
            Choose a month, scan the bloom map, and shortlist the trips that feel worth planning. Bloom Globe is designed as a seasonal travel editor, not a booking dashboard.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm text-pine/80">
            <Badge>{MONTHS[selectedMonth]} departures</Badge>
            <Badge>{count} bloom-ready destinations</Badge>
            <Badge>Curated seasonal picks</Badge>
          </div>
        </div>

        <div className="glass-card rounded-[1.9rem] border border-white/70 p-5 shadow-bloom sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-rose/80">Start With A Month</p>
              <h2 className="mt-2 font-serif text-[1.95rem] leading-tight text-pine">
                Pick your best viewing window
              </h2>
            </div>
            <Badge tone="soft" className="shrink-0">
              Seasonal planning
            </Badge>
          </div>
          <MonthSelector selectedMonth={selectedMonth} onMonthChange={onMonthChange} />
        </div>
      </div>
    </section>
  );
}
