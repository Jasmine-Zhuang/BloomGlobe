"use client";

import { MONTHS } from "@/lib/mock-data";
import { MonthSelector } from "@/components/month-selector";

interface HeroSectionProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
  count: number;
}

export function HeroSection({ selectedMonth, onMonthChange, count }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-hero-glow px-6 py-8 shadow-bloom sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.65),transparent_68%)] lg:block" />
      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.95fr] lg:items-end">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/65 px-3 py-1 text-xs uppercase tracking-[0.28em] text-rose">
            Bloom Globe
          </div>
          <h1 className="max-w-xl font-serif text-4xl leading-tight text-pine sm:text-5xl lg:text-6xl">
            Travel by bloom calendar, not by booking funnel.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-pine/75 sm:text-lg">
            Choose a month first, then discover where the world is flowering beautifully right now. Bloom Globe is built for seasonal trips with soft timing, not generic city lists.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-pine/80">
            <div className="glass-card rounded-full border border-white/70 px-4 py-2">
              {MONTHS[selectedMonth]} focus
            </div>
            <div className="glass-card rounded-full border border-white/70 px-4 py-2">
              {count} bloom-ready destinations
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[1.75rem] border border-white/70 p-5 shadow-bloom sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-rose/80">Start With A Month</p>
              <h2 className="mt-2 font-serif text-2xl text-pine">When do you want to chase blooms?</h2>
            </div>
            <div className="rounded-full bg-white/80 px-3 py-1 text-sm text-pine/75">
              Seasonal planning
            </div>
          </div>
          <MonthSelector selectedMonth={selectedMonth} onMonthChange={onMonthChange} />
        </div>
      </div>
    </section>
  );
}
