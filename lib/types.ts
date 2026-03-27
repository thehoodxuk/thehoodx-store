import { Product, Category as ApiCategory } from "./schema";

export type CategorySlug = "tshirt" | "shorts" | "hoodie";

// Re-export Product so other files don't break their imports
export type { Product, ApiCategory as Category };

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export const CATEGORIES: { value: CategorySlug | string; label: string }[] = [
  { value: "tshirt", label: "T-Shirts" },
  { value: "shorts", label: "Shorts" },
  { value: "hoodie", label: "Hoodies" },
];
