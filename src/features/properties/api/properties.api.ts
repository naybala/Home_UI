import {
  PropertyResponse,
  PropertyDetailResponse,
} from "../types/property.types";
import { apiClient } from "@/utils/api.client";
import { PropertyService } from "./properties.service";

const isServer = typeof window === "undefined";

export const PropertiesAPI = {
  getProperties: async (
    page = 1,
    limit = 20,
    search?: string,
  ): Promise<PropertyResponse> => {
    if (isServer) {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (search) {
        params.set("search", search);
      }
      return PropertyService.getProperties(params);
    }

    // On client, we use our proxy to handle the secret token
    let endpoint = `/properties?page=${page}&limit=${limit}`;
    if (search) {
      endpoint += `&search=${encodeURIComponent(search)}`;
    }
    return apiClient<PropertyResponse>(`/api${endpoint}`, false);
  },

  getPropertyDetail: async (id: string): Promise<PropertyDetailResponse> => {
    if (isServer) {
      return PropertyService.getPropertyDetail(id);
    }

    // On client, we use our proxy
    return apiClient<PropertyDetailResponse>(`/api/properties/${id}`, false);
  },
};
