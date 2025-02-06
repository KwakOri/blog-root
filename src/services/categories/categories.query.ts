import { getAllCategories } from "@/services/categories/categories.service";

export const categoryQueryKeys = {
  all: ["category"] as const,
  category: () => [...categoryQueryKeys.all, "category"] as const,
  categoryById: (id: number) => [...categoryQueryKeys.category(), id] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: categoryQueryKeys.all,
    queryFn: () => getAllCategories(),
  }),
};
