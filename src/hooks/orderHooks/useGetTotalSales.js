import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { server } from "../../server";
async function fetchTotalSales() {
  const res = await axios.get(`${server}/order/total-sales`);

  return res?.data?.totalSales;
}

export function useGetTotalSales() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["totalSale"],
    queryFn: () => fetchTotalSales(),
  });
  return { data, isLoading };
}
