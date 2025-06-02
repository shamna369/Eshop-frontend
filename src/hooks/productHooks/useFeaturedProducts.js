import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getHighRatedProducts } from "../../services/productApiServices";

export const useFeaturedProducts = function () {
  const queryClient = useQueryClient();

  // Queries
  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: getHighRatedProducts,
  });
  return { data, isPending, error };
};
