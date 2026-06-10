import { City } from "../types";

const baseURL = "https://api.cityapi.org/v1"

export const fetchCities = async (): Promise<City[]> => {
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
    population: Number(c.population)
  }));
};

export const fetchCity = async (id: string): Promise<City> => {
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
    population: Number(json.data.population)
  };
};