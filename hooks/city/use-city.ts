import { useQuery } from "@tanstack/react-query";
import { fetchCity } from "../../api/cities";

export function useCity(id: string) {
  return useQuery({
    queryKey: ["city", id],
    queryFn: () => fetchCity(id),
    enabled: !!id,
  });
}