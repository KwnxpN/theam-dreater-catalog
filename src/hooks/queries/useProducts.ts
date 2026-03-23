import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
    getProductById,
    getProducts,
} from "../../api/product.api";
import type { GetProductParams } from "../../types/product.type";

export const useProducts = (params?: GetProductParams, category?: string) => {
    return useQuery({
        queryKey: ["products", params, category],
        queryFn: () => getProducts(params, category),
        placeholderData: keepPreviousData
    });
};

export const useProductById = (id: number) => {
    return useQuery({
        queryKey: ["products", id],
        queryFn: () => getProductById(id),
    });
}