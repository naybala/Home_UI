import { Product, ProductList } from "../types/product.types";
import { apiServer } from "@/utils/api.server";

export const ProductsAPI = {
  getProducts: async (): Promise<ProductList> => {
    const res = await apiServer<ProductList>(`/products`, {
      next: { revalidate: 60 },
    });
    return res;
  },

  getProduct: async (id: string | number): Promise<Product> => {
    const res = await apiServer<Product>(`/products/${id}`, {
      next: { revalidate: 60 },
    });
    return res;
  },
};
