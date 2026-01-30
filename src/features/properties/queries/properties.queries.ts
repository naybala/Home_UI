import { useQuery } from "@tanstack/react-query";
import { PropertiesAPI } from "../api/properties.api";
import { Property, PropertyList } from "../types/property.types";

export const PROPERTY_KEYS = {
  all: ["properties"] as const,
  list: () => [...PROPERTY_KEYS.all, "list"] as const,
  details: () => [...PROPERTY_KEYS.all, "detail"] as const,
  detail: (id: string | number) => [...PROPERTY_KEYS.details(), id] as const,
};

export const useProperties = (initialData?: PropertyList) => {
  return useQuery({
    queryKey: PROPERTY_KEYS.list(),
    queryFn: async () => {
      const response = await PropertiesAPI.getProperties();
      return response.data.data;
    },
    initialData,
  });
};

export const usePropertyDetail = (id: string, initialData?: Property) => {
  return useQuery({
    queryKey: PROPERTY_KEYS.detail(id),
    queryFn: async () => {
      const response = await PropertiesAPI.getPropertyDetail(id);
      return response.data;
    },
    enabled: !!id,
    initialData,
  });
};
