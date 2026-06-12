import { City } from "../types";

const baseURL = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000"

export const fetchCities = async (): Promise<City[]> => {
  try {
    const res = await fetch(
      `${baseURL}/records?where=country_code%3D%27ET%27%20and%20population%3E100000&limit=50`
    );

    const json = await res.json();

    return json.results.map((c: any): City => ({
      id: String(c.geoname_id),
      name: c.name,
      country: c.country_code,
      latitude: Number(c.coordinates.lat),
      longitude: Number(c.coordinates.lon),
      population: Number(c.population),
      timezone_id: c.timezone,
      elevation: c.dem ?? c.elevation
    } as any));
  } catch (err) {
    console.error("Failed to fetch cities from API:", err);
    throw err;
  }
};

export const fetchCity = async (id: string): Promise<City> => {
  try {
    const res = await fetch(
      `${baseURL}/records?where=geoname_id%3D%27${id}%27`
    );

    const json = await res.json();
    const c = json.results[0];
    if (!c) {
      throw new Error(`City not found: ${id}`);
    }

    return {
      id: String(c.geoname_id),
      name: c.name,
      country: c.country_code,
      latitude: Number(c.coordinates.lat),
      longitude: Number(c.coordinates.lon),
      population: Number(c.population),
      timezone_id: c.timezone,
      elevation: c.dem ?? c.elevation
    } as any;
  } catch (err) {
    console.error(`Failed to fetch city details for ID ${id} from API:`, err);
    throw err;
  }
};