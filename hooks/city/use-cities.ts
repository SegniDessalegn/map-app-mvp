import { useQuery } from "@tanstack/react-query";
import { fetchCities } from "../../api/cities";

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  });
}