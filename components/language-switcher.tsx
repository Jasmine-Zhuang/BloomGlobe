"use client";

import { cn } from "@/lib/utils";
import { useI18n, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-white/75 bg-white/82 p-1 shadow-sm backdrop-blur"
      aria-label={t("common.language.label")}
    >
      {(["en", "zh"] as const).map((nextLocale: Locale) => (
        <button
          key={nextLocale}
          type="button"
          onClick={() => setLocale(nextLocale)}
          className={cn(
            "rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] transition",
            locale === nextLocale ? "bg-rose text-white" : "text-pine/62 hover:text-pine",
          )}
        >
          {nextLocale === "en" ? t("common.language.english") : t("common.language.chinese")}
        </button>
      ))}
    </div>
  );
}
