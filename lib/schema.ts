import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type Category = z.infer<typeof CategorySchema>;

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string().optional(),
  hoverImage: z.string().optional(),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  stock: z.number().optional(),
  categoryId: z.string().optional(),
  category: CategorySchema.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type Product = z.infer<typeof ProductSchema>;

export const PaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  page: z.number().optional(),
  limit: z.number().optional(),
  total: z.number().optional(),
  totalPages: z.number().optional(),
  category: CategorySchema.optional(), // for get category products
});

export const ProductFiltersSchema = z.object({
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
  }),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  categories: z.array(CategorySchema),
});

export const CheckoutSessionSchema = z.object({
  sessionId: z.string().optional(),
  url: z.string().optional(),
  status: z.string().optional(),
  customerEmail: z.string().optional(),
});
export type CheckoutSession = z.infer<typeof CheckoutSessionSchema>;
