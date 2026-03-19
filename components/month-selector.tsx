import { MONTHS } from "@/lib/mock-data";

interface MonthSelectorProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

export function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {MONTHS.map((month, index) => {
        const isActive = index === selectedMonth;

        return (
          <button
            key={month}
            type="button"
            onClick={() => onMonthChange(index)}
            className={[
              "rounded-2xl px-4 py-3 text-left text-sm transition sm:text-base",
              isActive
                ? "bg-rose text-white shadow-lg shadow-rose/20"
                : "bg-white/70 text-pine hover:bg-white",
            ].join(" ")}
          >
            <span className="block font-medium">{month}</span>
            <span className="mt-1 block text-xs opacity-80">{index + 1}</span>
          </button>
        );
      })}
    </div>
  );
}
