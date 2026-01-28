import { useQuery } from "@tanstack/react-query";
import { AssociationsAPI } from "../api/associations.api";
import { associationKeys } from "./association.keys";

export function useCountries() {
  return useQuery({
    queryKey: associationKeys.countries,
    queryFn: () => AssociationsAPI.countries(),
    staleTime: 1000 * 60 * 10,
  });
}
