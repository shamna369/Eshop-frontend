import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { getAllSearchProducts } from "../../services/productApiServices";

export function useGetNameList() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const debouncedFilter = useDebounce(search, 500);

  const { isPending, data, error } = useQuery({
    queryKey: ["products", debouncedFilter],
    queryFn: () => getAllSearchProducts(debouncedFilter),
    enabled: Boolean(debouncedFilter),
  });

  return { isPending, data, error, search, setSearch };
}
