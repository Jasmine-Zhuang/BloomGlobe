import { geoGraticule10, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import countriesAtlas from "world-atlas/countries-110m.json";

const atlas = countriesAtlas as {
  objects: { countries: object };
};

const countriesFeatureCollection = feature(atlas as never, atlas.objects.countries as never);
const projection = geoNaturalEarth1().fitExtent(
  [
    [28, 28],
    [972, 492],
  ],
  countriesFeatureCollection as never,
);

const pathGenerator = geoPath(projection);

type WorldCountryPath = {
  id: string;
  d: string;
};

export const WORLD_COUNTRY_PATHS: WorldCountryPath[] = (
  countriesFeatureCollection as unknown as GeoJSON.FeatureCollection
).features
  .map((country, index): WorldCountryPath => ({
    id: String(country.id ?? index),
    d: pathGenerator(country as never) ?? "",
  }))
  .filter((country) => country.d.length > 0);

export const WORLD_BORDERS_PATH =
  pathGenerator(
    mesh(atlas as never, atlas.objects.countries as never, (a, b) => a !== b) as never,
  ) ?? "";

export const WORLD_GRATICULE_PATH = pathGenerator(geoGraticule10() as never) ?? "";

export function projectWorldCoordinates(lat: number, lng: number) {
  const point = projection([lng, lat]);

  if (!point) {
    return { x: 500, y: 260 };
  }

  return {
    x: Math.min(956, Math.max(44, point[0])),
    y: Math.min(472, Math.max(44, point[1])),
  };
}
