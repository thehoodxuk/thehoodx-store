import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import {
  ProductsResponseSchema,
  ProductSchema,
  CategorySchema,
  ProductFiltersSchema,
  Product,
} from "@/lib/schema";

// --- Products Queries ---

export function useProducts(params?: Record<string, any>) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const data = await apiClient.get("/products", { params });
      return ProductsResponseSchema.parse(data);
    },
  });
}

export function useFeaturedProducts(limit?: number) {
  return useQuery({
    queryKey: ["products", "featured", limit],
    queryFn: async () => {
      const data = await apiClient.get("/products/featured", {
        params: { limit },
      });
      return ProductsResponseSchema.pick({ products: true }).parse(data);
    },
  });
}

export function useProductFilters() {
  return useQuery({
    queryKey: ["products", "filters"],
    queryFn: async () => {
      const data = await apiClient.get("/products/filters");
      return ProductFiltersSchema.parse(data);
    },
  });
}

// Single Product gets product and related
export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const data: any = await apiClient.get(`/products/${id}`);
      return {
        product: ProductSchema.parse(data.product),
        related: data.related
          ? data.related.map((p: any) => ProductSchema.parse(p))
          : [],
      };
    },
    enabled: !!id,
  });
}

// --- Categories Queries ---

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data: any = await apiClient.get("/categories");
      return data.categories.map((c: any) => CategorySchema.parse(c));
    },
  });
}

export function useCategory(idOrSlug: string) {
  return useQuery({
    queryKey: ["categories", idOrSlug],
    queryFn: async () => {
      const data: any = await apiClient.get(`/categories/${idOrSlug}`);
      return CategorySchema.parse(data.category);
    },
    enabled: !!idOrSlug,
  });
}

export function useCategoryProducts(
  idOrSlug: string,
  params?: Record<string, any>,
) {
  return useQuery({
    queryKey: ["categories", idOrSlug, "products", params],
    queryFn: async () => {
      const data = await apiClient.get(`/categories/${idOrSlug}/products`, {
        params,
      });
      return ProductsResponseSchema.parse(data);
    },
    enabled: !!idOrSlug,
  });
}
