import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { CheckoutSessionSchema } from "@/lib/schema";

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: async (items: any[]) => {
      const data = await apiClient.post("/checkout/create-session", {
        items,
      });
      return CheckoutSessionSchema.parse(data);
    },
  });
}
