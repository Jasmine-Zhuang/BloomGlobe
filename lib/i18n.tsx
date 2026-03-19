"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import en from "@/locales/en.json";
import zh from "@/locales/zh.json";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { ConfidenceLevel, DestinationBadge, FlowerType, Region } from "@/lib/types";

export type Locale = "en" | "zh";

type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, zh };

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  getMonthLabel: (index: number, style?: "editorial" | "short" | "numeric") => string;
  getRegionLabel: (region: Region) => string;
  getFlowerLabel: (flower: FlowerType) => string;
  getBadgeLabel: (badge: DestinationBadge) => string;
  getConfidenceLabel: (confidence: ConfidenceLevel) => string;
  getCountryLabel: (country: string) => string;
  getTagLabel: (tag: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedValue(dictionary: Dictionary, path: string) {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }

    return undefined;
  }, dictionary);
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) {
    return template;
  }

  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(vars[key] ?? ""));
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useLocalStorage<Locale>("bloom-globe-locale", "en");
  const dictionary = dictionaries[locale];

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-Hans" : "en";
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: string, vars?: Record<string, string | number>) => {
      const resolved = getNestedValue(dictionary, key);

      if (typeof resolved !== "string") {
        return key;
      }

      return interpolate(resolved, vars);
    };

    return {
      locale,
      setLocale,
      t,
      getMonthLabel: (index, style = "editorial") => dictionary.months[style][index] ?? "",
      getRegionLabel: (region) => dictionary.regions[region] ?? region,
      getFlowerLabel: (flower) => dictionary.flowers[flower] ?? flower,
      getBadgeLabel: (badge) => dictionary.badges[badge] ?? badge,
      getConfidenceLabel: (confidence) => dictionary.confidence[confidence] ?? confidence,
      getCountryLabel: (country) => dictionary.countries[country as keyof typeof dictionary.countries] ?? country,
      getTagLabel: (tag) => dictionary.tags[tag as keyof typeof dictionary.tags] ?? tag,
    };
  }, [dictionary, locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}
