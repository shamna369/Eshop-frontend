import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { server } from "../../server";
//fetch all orders for admin
async function fetchAllOrder() {
  const res = await axios.get(`${server}/order/all-orders`);

  return res.data;
}
//use query for fetching all order
export function useGetAllOrder() {
  const queryClient = useQueryClient();
  const { isPending, isError, data, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["allorders"],
      queryFn: () => fetchAllOrder(),
      keepPreviousData: true,
    });
  return { isPending, isError, data, error, isFetching, isPlaceholderData };
}
