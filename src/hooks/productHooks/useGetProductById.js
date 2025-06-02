import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductDetailsById } from "../../services/productApiServices";

export const useGetProductById = function (id) {
  const queryClient = useQueryClient();

  // Queries
  const { data, isPending, error } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductDetailsById(id),
    enabled: !!id,
  });
  return { data, isPending, error };
};
