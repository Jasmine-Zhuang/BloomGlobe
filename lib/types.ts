export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type Region =
  | "North America"
  | "South America"
  | "Europe"
  | "Asia"
  | "Africa"
  | "Oceania";

export type FlowerType =
  | "Cherry Blossom"
  | "Tulip"
  | "Lavender"
  | "Sunflower"
  | "Rapeseed"
  | "Rose"
  | "Jacaranda"
  | "Plum Blossom"
  | "Cosmos"
  | "Wildflower"
  | "Wisteria"
  | "Hydrangea"
  | "Lotus"
  | "Canola"
  | "Protea";

export type ConfidenceLevel = "high" | "medium" | "low";

export type DestinationBadge =
  | "Peak Bloom"
  | "Best 3-5 Day Trip"
  | "Romantic"
  | "Iconic"
  | "City Escape"
  | "Nature Escape";

export interface Destination {
  id: string;
  destination: string;
  name: string;
  country: string;
  region: Region;
  flowerType: FlowerType;
  latitude: number;
  longitude: number;
  bloomStartMonth: number;
  bloomEndMonth: number;
  bestViewingMonth: number;
  bloomStartText: string;
  bloomEndText: string;
  bestViewingText: string;
  peakWindow: string;
  bloomMonths: number[];
  peakMonths: number[];
  coordinates: {
    lat: number;
    lng: number;
  };
  shortDescription: string;
  whyVisit: string;
  longDescription: string;
  signatureExperience: string;
  travelTip: string;
  travelTags: string[];
  idealTripLength: string;
  bestTripLength: string;
  badges: DestinationBadge[];
  confidence?: ConfidenceLevel;
  variabilityNote?: string;
  imageUrl?: string;
  imageHint?: string;
  image: {
    from: string;
    to: string;
  };
}
