import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { server } from "../../server";
//fetch all orders of a user
async function fetchUserOrder(id) {
  const res = await axios.get(`${server}/order/details/${id}`);
  console.log(res.data.order);
  return res.data.order;
}

//use query for fetching order by orderid
export function useGetOrderById(id) {
  const queryClient = useQueryClient();
  const { isPending, isError, data, error, isFetching } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchUserOrder(id),
  });
  return { isPending, isError, data, error, isFetching };
}
