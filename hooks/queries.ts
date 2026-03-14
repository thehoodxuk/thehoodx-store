import { useQuery } from "@tanstack/react-query";
import {
  ProductsResponseSchema,
  ProductSchema,
  CategorySchema,
  ProductFiltersSchema,
  Product,
  Category,
} from "@/lib/schema";

// --- Helper Functions ---
const fetchLocalProducts = async (): Promise<Product[]> => {
  const res = await fetch("/products.json");
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data as Product[];
};

// --- Products Queries ---

export function useProducts(params?: Record<string, any>) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const allProducts = await fetchLocalProducts();
      let filtered = [...allProducts];

      // Local filtering logic matching what the backend might do
      if (params?.category) {
        filtered = filtered.filter((p) => p.categoryId === params.category);
      }
      if (params?.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
      }
      if (params?.colors?.length) {
        filtered = filtered.filter((p) =>
          p.colors?.some((c) => params.colors.includes(c))
        );
      }
      if (params?.sizes?.length) {
        filtered = filtered.filter((p) =>
          p.sizes?.some((s) => params.sizes.includes(s))
        );
      }
      if (params?.minPrice !== undefined) {
        filtered = filtered.filter((p) => p.price >= params.minPrice);
      }
      if (params?.maxPrice !== undefined) {
        filtered = filtered.filter((p) => p.price <= params.maxPrice);
      }

      const total = filtered.length;
      const limit = params?.limit || 12;
      const page = params?.page || 1;
      const totalPages = Math.ceil(total / limit);

      const startIndex = (page - 1) * limit;
      const paginatedProducts = filtered.slice(startIndex, startIndex + limit);

      return ProductsResponseSchema.parse({
        products: paginatedProducts,
        page,
        limit,
        total,
        totalPages,
      });
    },
  });
}

export function useFeaturedProducts(limit: number = 4) {
  return useQuery({
    queryKey: ["products", "featured", limit],
    queryFn: async () => {
      const allProducts = await fetchLocalProducts();
      // Using just taking the first N products as featured since there's no featured flag in json
      const featured = allProducts.slice(0, limit);
      return ProductsResponseSchema.pick({ products: true }).parse({
        products: featured,
      });
    },
  });
}

export function useProductFilters() {
  return useQuery({
    queryKey: ["products", "filters"],
    queryFn: async () => {
      const products = await fetchLocalProducts();
      
      const sizesSet = new Set<string>();
      const colorsSet = new Set<string>();
      
      products.forEach(p => {
        p.sizes?.forEach(s => sizesSet.add(s));
        p.colors?.forEach(c => colorsSet.add(c));
      });

      const categories: Category[] = [
        { id: "tshirt", name: "T-Shirts", slug: "tshirt" },
        { id: "shorts", name: "Shorts", slug: "shorts" }
      ];

      return ProductFiltersSchema.parse({
        priceRange: { min: 0, max: 200 }, // Static range, you can compute this dynamically if needed
        sizes: Array.from(sizesSet).sort(),
        colors: Array.from(colorsSet).sort(),
        categories: categories,
      });
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const products = await fetchLocalProducts();
      const product = products.find((p) => p.id === id);
      
      if (!product) throw new Error("Product not found");

      // Related products: same category but not self, limit to 4
      const related = products
        .filter((p) => p.categoryId === product.categoryId && p.id !== id)
        .slice(0, 4);

      return {
        product: ProductSchema.parse(product),
        related: related.map((p) => ProductSchema.parse(p)),
      };
    },
    enabled: !!id,
  });
}

// --- Categories Queries ---

// Static categories corresponding to the products
const LOCAL_CATEGORIES: Category[] = [
  { id: "tshirt", name: "T-Shirts", slug: "tshirt" },
  { id: "shorts", name: "Shorts", slug: "shorts" }
];

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return LOCAL_CATEGORIES.map((c) => CategorySchema.parse(c));
    },
  });
}

export function useCategory(idOrSlug: string) {
  return useQuery({
    queryKey: ["categories", idOrSlug],
    queryFn: async () => {
      const category = LOCAL_CATEGORIES.find(
        (c) => c.id === idOrSlug || c.slug === idOrSlug
      );
      if (!category) throw new Error("Category not found");
      return CategorySchema.parse(category);
    },
    enabled: !!idOrSlug,
  });
}

export function useCategoryProducts(
  idOrSlug: string,
  params?: Record<string, any>
) {
  return useQuery({
    queryKey: ["categories", idOrSlug, "products", params],
    queryFn: async () => {
      const category = LOCAL_CATEGORIES.find(
        (c) => c.id === idOrSlug || c.slug === idOrSlug
      );
      if (!category) throw new Error("Category not found");

      const allProducts = await fetchLocalProducts();
      let filtered = allProducts.filter((p) => p.categoryId === category.id);
      
      const total = filtered.length;
      const limit = params?.limit || 12;
      const page = params?.page || 1;
      const totalPages = Math.ceil(total / limit);

      const startIndex = (page - 1) * limit;
      const paginatedProducts = filtered.slice(startIndex, startIndex + limit);

      return ProductsResponseSchema.parse({
        products: paginatedProducts,
        page,
        limit,
        total,
        totalPages,
        category: category,
      });
    },
    enabled: !!idOrSlug,
  });
}
