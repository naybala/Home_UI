import { apiClient } from "@/utils/api.client";
import { Requester } from "@/utils/api.types";
import {
  AssociationIndexResponse,
  AssociationDetailResponse,
  AssociationMutationResponse,
  AssociationPayload,
  AssociationListParams,
} from "../types/association.types";

export const AssociationsAPI = {
  getAll: async (
    params?: AssociationListParams,
    requester: Requester = apiClient
  ): Promise<AssociationIndexResponse> => {
    const { token, ...restParams } = params || {};
    const searchParams = new URLSearchParams();
    if (restParams) {
      Object.keys(restParams).forEach((key) => {
        const value = restParams[key as keyof typeof restParams];
        if (value) {
          searchParams.append(key, String(value));
        }
      });
    }
    const queryString = searchParams.toString();
    const returnResponse = await requester(
      `/associations${queryString ? `?${queryString}` : ""}`,
      {
        method: "GET",
      }
    );
    return returnResponse as AssociationIndexResponse;
  },

  getOne: (
    id: string,
    requester: Requester = apiClient
  ): Promise<AssociationDetailResponse> =>
    requester(`/associations/${id}`, {
      method: "GET",
    }) as Promise<AssociationDetailResponse>,

  create: (
    body: AssociationPayload,
    requester: Requester = apiClient
  ): Promise<AssociationMutationResponse> =>
    requester("/associations", {
      method: "POST",
      body,
    }) as Promise<AssociationMutationResponse>,

  update: (
    id: string,
    body: AssociationPayload,
    requester: Requester = apiClient
  ): Promise<AssociationMutationResponse> =>
    requester(`/associations/${id}`, {
      method: "PUT",
      body,
    }) as Promise<AssociationMutationResponse>,

  delete: (id: string, requester: Requester = apiClient) =>
    requester(`/associations/${id}`, { method: "DELETE" }),

  countries: (requester: Requester = apiClient) =>
    requester("/countries/prepare", { method: "GET" }),
};
