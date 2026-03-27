import { http } from "./http";
import type { Category } from "@/types/category.type";

export const getCategories = async (): Promise<Category[]> => {
    const { data } = await http.get<Category[]>("/products/categories");
    return data;
}