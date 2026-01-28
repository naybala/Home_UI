import axios from "axios";
import { Product, ProductList } from "../types/product.types";

const BASE_URL = "https://fakestoreapi.com";

export const ProductsAPI = {
  getProducts: async (): Promise<ProductList> => {
    const response = await axios.get<ProductList>(`${BASE_URL}/products`);
    return response.data;
  },

  getProduct: async (id: string | number): Promise<Product> => {
    const response = await axios.get<Product>(`${BASE_URL}/products/${id}`);
    return response.data;
  },
};
