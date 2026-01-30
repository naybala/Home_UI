import { apiServer } from "@/utils/api.server";
import {
  PropertyResponse,
  PropertyDetailResponse,
} from "../types/property.types";

export const PropertyService = {
  /**
   * Fetches properties from the external API (Server-side only)
   */
  getProperties: async (params: URLSearchParams): Promise<PropertyResponse> => {
    const page = params.get("page") || "1";
    const limit = params.get("limit") || "20";

    // Convert all search params to a query string
    const query = params.toString();
    const endpoint = `/properties?${query}`;

    return apiServer<PropertyResponse>(endpoint, false, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PER_TOKEN}`,
      },
      next: { revalidate: 3600 },
    });
  },

  /**
   * Fetches a single property detail from the external API (Server-side only)
   */
  getPropertyDetail: async (id: string): Promise<PropertyDetailResponse> => {
    return apiServer<PropertyDetailResponse>(`/properties/${id}`, false, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PER_TOKEN}`,
      },
      next: { revalidate: 3600 },
    });
  },
};
