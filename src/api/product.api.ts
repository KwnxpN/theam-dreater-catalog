import { http } from "./http";
import type { ProductsResponse, Product, GetProductParams } from "../types/product.type";

export const getProducts = async (params?: GetProductParams, category?: string): Promise<ProductsResponse> => {
    const endpoint = category && category.trim() !== "all"
    ? `/products/category/${category}`
    : "/products";
    const { data } = await http.get<ProductsResponse>(endpoint, { params });
    return data;
}

export const getProductById = async (id: number): Promise<Product> => {
    const { data } = await http.get(`/products/${id}`);
    return data;
}