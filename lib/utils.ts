import { clsx, type ClassValue } from "clsx";
import { MONTHS } from "@/lib/mock-data";
import { Destination, DestinationBadge } from "@/lib/types";

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

export function getSeasonalStatus(destination: Destination, monthIndex: number) {
  return isPeakMonth(destination, monthIndex) ? "Peak bloom likely" : "Strong viewing window";
}

export function getRecommendationReason(destination: Destination, monthIndex: number) {
  if (isPeakMonth(destination, monthIndex)) {
    return `Peak bloom is most likely in ${MONTHS[monthIndex]}, making this one of the strongest seasonal picks right now.`;
  }

  if (destination.badges.includes("Best 3-5 Day Trip")) {
    return `An easy ${destination.idealTripLength.toLowerCase()} bloom escape with a clear signature experience and minimal planning friction.`;
  }

  if (destination.badges.includes("Romantic")) {
    return `Especially strong for slower, more atmospheric travel with scenic walks, soft light, and an editorial feel.`;
  }

  if (destination.badges.includes("City Escape")) {
    return `A polished city-based bloom trip for travelers who want flowers, neighborhoods, and dining in one compact itinerary.`;
  }

  return `A seasonal pick for ${MONTHS[monthIndex]} with reliable bloom timing and a distinct sense of place.`;
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

      return a.name.localeCompare(b.name);
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
