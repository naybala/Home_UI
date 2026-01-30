import {
  PropertyResponse,
  PropertyDetailResponse,
} from "../types/property.types";

export async function propertiesApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_PROPERTIES_API_URL || "";
  const token = process.env.NEXT_PER_TOKEN || "";
  console.log(baseUrl, token, endpoint);

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    next: { revalidate: 3600 }, // Cache properties for an hour by default
  });

  console.log(res);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${res.status}`);
  }

  return res.json();
}

export const PropertiesAPI = {
  getProperties: async (page = 1, limit = 20): Promise<PropertyResponse> => {
    // Adjust endpoint based on real API structure if known
    return propertiesApi<PropertyResponse>(
      `/properties?page=${page}&limit=${limit}`,
    );
  },

  getPropertyDetail: async (id: string): Promise<PropertyDetailResponse> => {
    return propertiesApi<PropertyDetailResponse>(`/properties?id=${id}`);
  },
};
