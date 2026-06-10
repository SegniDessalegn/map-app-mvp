import { City } from "../types";

const baseURL = "https://api.cityapi.org/v1"

const MOCK_CITIES: City[] = [
  {
    id: "1",
    name: "Addis Ababa",
    country: "ET",
    latitude: 9.03,
    longitude: 38.74,
    population: 3384569,
    timezone_id: "Africa/Addis_Ababa",
    elevation: 2355
  } as any,
  {
    id: "2",
    name: "Dire Dawa",
    country: "ET",
    latitude: 9.60,
    longitude: 41.86,
    population: 277000,
    timezone_id: "Africa/Addis_Ababa",
    elevation: 1204
  } as any,
  {
    id: "3",
    name: "Mek'ele",
    country: "ET",
    latitude: 13.49,
    longitude: 39.47,
    population: 219800,
    timezone_id: "Africa/Addis_Ababa",
    elevation: 2084
  } as any,
  {
    id: "4",
    name: "Gondar",
    country: "ET",
    latitude: 12.60,
    longitude: 37.47,
    population: 207000,
    timezone_id: "Africa/Addis_Ababa",
    elevation: 2133
  } as any,
  {
    id: "5",
    name: "Adama",
    country: "ET",
    latitude: 8.54,
    longitude: 39.27,
    population: 220000,
    timezone_id: "Africa/Addis_Ababa",
    elevation: 1712
  } as any,
  {
    id: "6",
    name: "Hawassa",
    country: "ET",
    latitude: 7.05,
    longitude: 38.47,
    population: 165000,
    timezone_id: "Africa/Addis_Ababa",
    elevation: 1708
  } as any,
  {
    id: "7",
    name: "Bahir Dar",
    country: "ET",
    latitude: 11.59,
    longitude: 37.39,
    population: 170000,
    timezone_id: "Africa/Addis_Ababa",
    elevation: 1800
  } as any,
  {
    id: "8",
    name: "Jimma",
    country: "ET",
    latitude: 7.67,
    longitude: 36.83,
    population: 120000,
    timezone_id: "Africa/Addis_Ababa",
    elevation: 1780
  } as any
];

export const fetchCities = async (): Promise<City[]> => {
  try {
    const res = await fetch(
      `${baseURL}/cities?country=ET&population_min=100000`
    );

    const json = await res.json();

    return json.data.map((c: any): City => ({
      id: String(c.id),
      name: c.name,
      country: c.country_code,
      latitude: Number(c.latitude),
      longitude: Number(c.longitude),
      population: Number(c.population),
      timezone_id: c.timezone_id,
      elevation: c.elevation
    } as any));
  } catch (err) {
    console.warn("Failed to fetch cities from API, falling back to mock data:", err);
    return MOCK_CITIES;
  }
};

export const fetchCity = async (id: string): Promise<City> => {
  try {
    const res = await fetch(
      `${baseURL}/cities/${id}`
    );

    const json = await res.json();

    return {
      id: String(json.data.id),
      name: json.data.name,
      country: json.data.country_code,
      latitude: Number(json.data.latitude),
      longitude: Number(json.data.longitude),
      population: Number(json.data.population),
      timezone_id: json.data.timezone_id,
      elevation: json.data.elevation
    } as any;
  } catch (err) {
    console.warn(`Failed to fetch city details for ID ${id} from API, falling back to mock data:`, err);
    const matched = MOCK_CITIES.find(c => c.id === id);
    if (matched) return matched;
    throw err;
  }
};