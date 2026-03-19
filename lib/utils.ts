import { Destination } from "@/lib/types";

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
