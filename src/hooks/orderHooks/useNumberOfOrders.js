import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { server } from "../../server";
//fetch all orders of a user
async function fetchOrderCount() {
  const res = await axios.get(`${server}/order/count-order`);
  //console.log("hello from ordercount");
  // console.log(res?.data);
  return res.data;
}

//use query for fetching user order
export function useNumberOfOrders() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["totalorder"],
    queryFn: () => fetchOrderCount(),
  });
  return { isLoading, data };
}
