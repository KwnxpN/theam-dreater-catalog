import { http } from "./http";
import type { ProductsResponse, Product, GetProductParams } from "../types/product.type";

export const getProducts = async (params?: GetProductParams): Promise<ProductsResponse> => {
    const { data } = await http.get<ProductsResponse>("/products", { params });
    return data;
}

export const getProductById = async (id: number): Promise<Product> => {
    const { data } = await http.get(`/products/${id}`);
    return data;
}