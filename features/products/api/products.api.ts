import { Product, ProductList } from "../types/product.types";
import { apiServer } from "@/utils/api.server";

export const ProductsAPI = {
  getProducts: async (): Promise<ProductList> => {
    const res = await apiServer<ProductList>(`/products`);
    return res;
  },

  getProduct: async (id: string | number): Promise<Product> => {
    const res = await apiServer<Product>(`/products/${id}`);
    return res;
  },
};
