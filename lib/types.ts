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
  | "Wildflower"
  | "Wisteria"
  | "Hydrangea"
  | "Lotus"
  | "Canola"
  | "Protea";

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
  image: {
    from: string;
    to: string;
  };
}
