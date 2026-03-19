import { clsx, type ClassValue } from "clsx";
import { MONTHS } from "@/lib/mock-data";
import { Destination, DestinationBadge } from "@/lib/types";
import { localizeSeasonText, type SupportedLocale } from "@/lib/destination-localization";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function projectCoordinates(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 520;
  return { x, y };
}

export function isDestinationInMonth(destination: Destination, monthIndex: number) {
  return destination.bloomMonths.includes(monthIndex + 1);
}

export function isPeakMonth(destination: Destination, monthIndex: number) {
  return destination.peakMonths.includes(monthIndex + 1);
}

export function getSeasonalStatus(
  destination: Destination,
  monthIndex: number,
  options?: {
    locale?: SupportedLocale;
    monthLabel?: string;
  },
) {
  const monthLabel = MONTHS[monthIndex];
  const locale = options?.locale ?? "en";
  const localizedMonth = options?.monthLabel ?? monthLabel;

  if (isPeakMonth(destination, monthIndex)) {
    return locale === "zh" ? `${localizedMonth}接近盛放期` : `Peak bloom likely in ${localizedMonth}`;
  }

  return locale === "zh" ? `${localizedMonth}仍适合观赏` : `Blooming well through ${localizedMonth}`;
}

export function getBloomWindowLabel(destination: Destination, locale: SupportedLocale = "en") {
  return `${localizeSeasonText(destination.bestViewingText, locale)} · ${localizeSeasonText(destination.peakWindow, locale)}`;
}

export function getRecommendationReason(
  destination: Destination,
  monthIndex: number,
  options?: {
    locale?: SupportedLocale;
    monthLabel?: string;
    flowerLabel?: string;
    tripLengthLabel?: string;
  },
) {
  const monthLabel = MONTHS[monthIndex];
  const locale = options?.locale ?? "en";
  const localizedMonth = options?.monthLabel ?? monthLabel;
  const flowerLabel = options?.flowerLabel ?? destination.flowerType.toLowerCase();
  const tripLengthLabel = options?.tripLengthLabel ?? destination.idealTripLength.toLowerCase();

  if (locale === "zh") {
    if (isPeakMonth(destination, monthIndex)) {
      return `${localizedMonth}最值得出发，正是捕捉${flowerLabel}最佳状态的好时机。`;
    }

    if (destination.badges.includes("Best 3-5 Day Trip")) {
      return `这是一趟适合${tripLengthLabel}的小旅行，花期清晰、成行也轻松。`;
    }

    if (destination.badges.includes("Romantic")) {
      return `更适合慢慢走、慢慢看，光线与氛围都带着一点浪漫滤镜。`;
    }

    if (destination.badges.includes("City Escape")) {
      return `花景、街区与用餐节奏可以自然串起来，很适合做一趟城市花旅。`;
    }

    return `这是${localizedMonth}里很有辨识度的一站，花期可信，目的地气质也足够鲜明。`;
  }

  if (isPeakMonth(destination, monthIndex)) {
    return `${localizedMonth} is the strongest moment to go, with the clearest chance of seeing ${flowerLabel} at their most photogenic.`;
  }

  if (destination.badges.includes("Best 3-5 Day Trip")) {
    return `An easy ${tripLengthLabel} bloom escape with straightforward timing, a clear signature scene, and minimal planning friction.`;
  }

  if (destination.badges.includes("Romantic")) {
    return `Especially strong for slower, more atmospheric travel with scenic walks, soft light, and a more romantic editorial mood.`;
  }

  if (destination.badges.includes("City Escape")) {
    return `A polished city-based bloom trip for travelers who want flowers, neighborhoods, and dining in one compact itinerary.`;
  }

  return `A curated ${localizedMonth} pick with credible bloom timing and a destination brief that feels distinct rather than interchangeable.`;
}

export function getRecommendedDestinations(destinations: Destination[], monthIndex: number) {
  return [...destinations]
    .sort((a, b) => {
      const peakDelta = Number(isPeakMonth(b, monthIndex)) - Number(isPeakMonth(a, monthIndex));
      if (peakDelta !== 0) {
        return peakDelta;
      }

      const iconicDelta =
        Number(b.badges.includes("Iconic")) - Number(a.badges.includes("Iconic"));
      if (iconicDelta !== 0) {
        return iconicDelta;
      }

      const shortTripDelta =
        Number(b.badges.includes("Best 3-5 Day Trip")) -
        Number(a.badges.includes("Best 3-5 Day Trip"));
      if (shortTripDelta !== 0) {
        return shortTripDelta;
      }

      const confidenceDelta =
        Number(b.confidence === "high") -
        Number(a.confidence === "high");
      if (confidenceDelta !== 0) {
        return confidenceDelta;
      }

      return a.destination.localeCompare(b.destination);
    })
    .slice(0, 4);
}

export function getDisplayBadges(destination: Destination, monthIndex: number): DestinationBadge[] {
  const badges = [...destination.badges];

  if (isPeakMonth(destination, monthIndex) && !badges.includes("Peak Bloom")) {
    badges.unshift("Peak Bloom");
  }

  return badges.slice(0, 4);
}
