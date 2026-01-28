import { useQuery } from "@tanstack/react-query";
import { ProductsAPI } from "../api/products.api";

export const PRODUCT_KEYS = {
  all: ["products"] as const,
  list: () => [...PRODUCT_KEYS.all, "list"] as const,
  details: () => [...PRODUCT_KEYS.all, "detail"] as const,
  detail: (id: string | number) => [...PRODUCT_KEYS.details(), id] as const,
};

export const useProducts = () => {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(),
    queryFn: () => ProductsAPI.getProducts(),
  });
};

export const useProductDetail = (id: string | number) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: () => ProductsAPI.getProduct(id),
    enabled: !!id,
  });
};
