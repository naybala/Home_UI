import { useQuery } from "@tanstack/react-query";
import { AssociationsAPI } from "../api/associations.api";
import { associationKeys } from "./association.keys";
import { AssociationDetailResponse } from "../types/association.types";

export function useAssociationDetail(id?: string) {
  return useQuery<AssociationDetailResponse>({
    enabled: !!id,
    queryKey: id ? associationKeys.detail(id) : [],
    queryFn: () => AssociationsAPI.getOne(id!),
  });
}
