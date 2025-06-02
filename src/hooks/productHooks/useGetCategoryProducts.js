import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { getAllProductsByCategory } from "../../services/productApiServices";

export function useGetCategoryProducts(category) {
  // Access the client
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  // Queries
  const { isPending, isError, data, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["products", page, category],
      queryFn: () => getAllProductsByCategory(page, category),
      keepPreviousData: true,
    });

  return {
    isPending,
    isError,
    data,
    error,
    setPage,
    page,
    isFetching,
    isPlaceholderData,
  };
}
