import axios from "axios";
import { useState } from "react";
import { server } from "../../server";
import { useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchAllProducts(id) {
  const res = await axios.get(`${server}/products/total-products`);

  return res?.data?.total;
}

//use query for fetching user order
export function useGetAllProductCount() {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery({
    queryKey: ["productcount"],
    queryFn: fetchAllProducts,
  });
  return { data, isLoading };
}
