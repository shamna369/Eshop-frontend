import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import { getAllProducts } from "../../services/productApiServices";
import { useState } from "react";
export function useProducts() {
  // Access the client
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  // Queries
  const { isPending, isError, data, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["products", page],
      queryFn: () => getAllProducts(page),
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
