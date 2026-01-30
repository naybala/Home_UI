import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { PropertiesAPI } from "../api/properties.api";
import {
  Property,
  PropertyList,
  PropertyDetail,
  PropertyResponse,
} from "../types/property.types";

export const PROPERTY_KEYS = {
  all: ["properties"] as const,
  list: () => [...PROPERTY_KEYS.all, "list"] as const,
  infinite: () => [...PROPERTY_KEYS.all, "infinite"] as const,
  details: () => [...PROPERTY_KEYS.all, "detail"] as const,
  detail: (id: string | number) => [...PROPERTY_KEYS.details(), id] as const,
};

export const useProperties = (initialData?: PropertyList) => {
  return useQuery({
    queryKey: PROPERTY_KEYS.list(),
    queryFn: async () => {
      const response = await PropertiesAPI.getProperties();
      return (
        (response.data && Array.isArray(response.data.data)
          ? response.data.data
          : null) || []
      );
    },
    initialData,
    // staleTime: 0,
    // refetchOnWindowFocus: true,
  });
};

export const useInfiniteProperties = (initialData?: PropertyResponse) => {
  return useInfiniteQuery({
    queryKey: PROPERTY_KEYS.infinite(),
    queryFn: async ({ pageParam = 1 }) => {
      return await PropertiesAPI.getProperties(pageParam as number);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data;
      return page < totalPages ? page + 1 : undefined;
    },
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
    // staleTime: 0,
    // refetchOnWindowFocus: true,
  });
};

export const usePropertyDetail = (id: string, initialData?: PropertyDetail) => {
  return useQuery({
    queryKey: PROPERTY_KEYS.detail(id),
    queryFn: async () => {
      const response = await PropertiesAPI.getPropertyDetail(id);
      return response.data;
    },
    enabled: !!id,
    initialData,
    // staleTime: 0,
    // refetchOnWindowFocus: true,
  });
};
