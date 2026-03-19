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
  name: string;
  country: string;
  region: Region;
  flowerType: FlowerType;
  bloomMonths: number[];
  peakMonths: number[];
  coordinates: {
    lat: number;
    lng: number;
  };
  shortDescription: string;
  longDescription: string;
  signatureExperience: string;
  travelTip: string;
  idealTripLength: string;
  badges: DestinationBadge[];
  confidence?: ConfidenceLevel;
  variabilityNote?: string;
  imageHint?: string;
  image: {
    from: string;
    to: string;
  };
}
