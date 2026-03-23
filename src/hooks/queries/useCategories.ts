import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCategories } from "../../api/category.api";

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        placeholderData: keepPreviousData
    });
};