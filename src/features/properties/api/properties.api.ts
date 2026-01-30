import {
  PropertyResponse,
  PropertyDetailResponse,
} from "../types/property.types";

export async function propertiesApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const isServer = typeof window === "undefined";
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_PROPERTIES_API_URL || ""
    : ""; // Empty for relative calls on client

  // On client, we prefix with /api to use our proxy
  const finalEndpoint =
    !isServer && endpoint.startsWith("/properties")
      ? `/api${endpoint}`
      : endpoint;

  const token = isServer ? process.env.NEXT_PER_TOKEN || "" : "";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (isServer && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${finalEndpoint}`, {
    ...options,
    headers,
    next: isServer ? { revalidate: 3600 } : undefined,
  });

  // Defensive: Log the actual response body for debugging
  const clonedRes = res.clone();
  try {
    const json = await clonedRes.json();
  } catch (e) {
    console.log(
      `API Response [${endpoint}] (not JSON):`,
      await res.clone().text(),
    );
  }

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
    return propertiesApi<PropertyDetailResponse>(`/properties/${id}`);
  },
};
