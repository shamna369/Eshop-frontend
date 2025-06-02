import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { server } from "../../server";
async function fetchOrder() {
  const res = await axios.get(`${server}/order/paidorder-date`);
  //console.log("hello from pie chart");
  //console.log(res.data.paidOrders);
  return res?.data?.paidOrders;
}

export function useGetOrderInDays() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["orderdates"],
    queryFn: fetchOrder,
  });
  return { data, isLoading };
}
