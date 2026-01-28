import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { AssociationsAPI } from "../api/associations.api";
import { associationKeys } from "./association.keys";
import {
  AssociationIndexResponse,
  AssociationListParams,
} from "../types/association.types";

export function useAssociationList(params?: AssociationListParams) {
  return useQuery<AssociationIndexResponse>({
    queryKey: associationKeys.list(params),
    queryFn: () => AssociationsAPI.getAll(params),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    staleTime: 10_000,
  });
}
