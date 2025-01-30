import { queryOptions } from "@/services/categories/categories.query";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  return useQuery(queryOptions.all());
};
