import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../utils/productService";

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
