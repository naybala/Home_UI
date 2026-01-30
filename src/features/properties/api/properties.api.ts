import {
  PropertyResponse,
  PropertyDetailResponse,
} from "../types/property.types";
import { apiClient } from "@/utils/api.client";
import { PropertyService } from "./properties.service";

const isServer = typeof window === "undefined";

export const PropertiesAPI = {
  getProperties: async (page = 1, limit = 20): Promise<PropertyResponse> => {
    if (isServer) {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      return PropertyService.getProperties(params);
    }

    // On client, we use our proxy to handle the secret token
    const endpoint = `/properties?page=${page}&limit=${limit}`;
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
