import { http } from "./http";
import type { ProductsResponse, Product, GetProductParams } from "../types/product.type";

export const getProducts = async (params?: GetProductParams, category?: string): Promise<ProductsResponse> => {
    const { search, ...restParams } = params ?? {};
    const normalizedCategory = category?.trim();
    const normalizedSearch = search?.trim();
    const hasCategory = Boolean(normalizedCategory && normalizedCategory !== "all");
    const hasSearch = Boolean(normalizedSearch);

    const endpoint = hasCategory
        ? `/products/category/${encodeURIComponent(normalizedCategory as string)}`
        : hasSearch
            ? "/products/search"
            : "/products";

    const requestParams = hasSearch
        ? hasCategory
            ? { ...restParams, search: normalizedSearch }
            : { ...restParams, q: normalizedSearch }
        : restParams;

    const { data } = await http.get<ProductsResponse>(endpoint, { params: requestParams });
    return data;
}

export const getProductById = async (id: number): Promise<Product> => {
    const { data } = await http.get(`/products/${id}`);
    return data;
}