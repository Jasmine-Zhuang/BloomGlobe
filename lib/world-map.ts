import {
  geoDistance,
  geoGraticule10,
  geoNaturalEarth1,
  geoOrthographic,
  geoPath,
  type GeoProjection,
} from "d3-geo";
import { feature, mesh } from "topojson-client";
import countriesAtlas from "world-atlas/countries-110m.json";

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 520;
const MAP_PADDING = 28;

const atlas = countriesAtlas as {
  objects: { countries: object };
};

const countriesFeatureCollection = feature(atlas as never, atlas.objects.countries as never) as unknown as GeoJSON.FeatureCollection;
const bordersFeature = mesh(
  atlas as never,
  atlas.objects.countries as never,
  (a, b) => a !== b,
) as never;
const graticuleFeature = geoGraticule10() as never;

export type MapMode = "map" | "globe";

export interface GlobeCenter {
  lat: number;
  lng: number;
}

export interface ProjectedPoint {
  x: number;
  y: number;
  visible: boolean;
}

export interface MapGeometry {
  countries: Array<{ id: string; d: string }>;
  bordersPath: string;
  graticulePath: string;
}

export function createMapProjection(mode: MapMode, center?: GlobeCenter) {
  if (mode === "globe") {
    return geoOrthographic()
      .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2])
      .scale(220)
      .clipAngle(90)
      .rotate(center ? [-center.lng, -center.lat, 0] : [20, -8, 0])
      .precision(0.5);
  }

  return geoNaturalEarth1().fitExtent(
    [
      [MAP_PADDING, MAP_PADDING],
      [MAP_WIDTH - MAP_PADDING, MAP_HEIGHT - MAP_PADDING],
    ],
    countriesFeatureCollection as never,
  );
}

function buildPath(projection: GeoProjection, featureValue: never) {
  return geoPath(projection)(featureValue) ?? "";
}

export function getMapGeometry(mode: MapMode, center?: GlobeCenter): MapGeometry {
  const projection = createMapProjection(mode, center);
  const pathGenerator = geoPath(projection);

  return {
    countries: countriesFeatureCollection.features
      .map((country, index) => ({
        id: String(country.id ?? index),
        d: pathGenerator(country as never) ?? "",
      }))
      .filter((country) => country.d.length > 0),
    bordersPath: buildPath(projection, bordersFeature),
    graticulePath: buildPath(projection, graticuleFeature),
  };
}

export function projectWorldCoordinates(
  lat: number,
  lng: number,
  mode: MapMode = "map",
  center?: GlobeCenter,
): ProjectedPoint {
  const projection = createMapProjection(mode, center);
  return projectWorldCoordinatesWithProjection(projection, lat, lng, mode, center);
}

export function projectWorldCoordinatesWithProjection(
  projection: GeoProjection,
  lat: number,
  lng: number,
  mode: MapMode = "map",
  center?: GlobeCenter,
): ProjectedPoint {

  if (mode === "globe") {
    const focus = center ?? { lat: 8, lng: -20 };
    const distance = geoDistance(
      [focus.lng, focus.lat],
      [lng, lat],
    );

    if (distance > Math.PI / 2) {
      return { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2, visible: false };
    }
  }

  const point = projection([lng, lat]);

  if (!point) {
    return { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2, visible: false };
  }

  return {
    x: point[0],
    y: point[1],
    visible: true,
  };
}

export const WORLD_MAP_DIMENSIONS = {
  width: MAP_WIDTH,
  height: MAP_HEIGHT,
  padding: MAP_PADDING,
};
