import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { server } from "../../server";
//fetch all orders of a user
async function fetchUserOrder() {
  const res = await axios.get(`${server}/order/user`, {
    withCredentials: true,
  });

  return res?.data;
}

//use query for fetching all orders of user with userid
export function useGetUserOrder() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["orders"],
      queryFn: fetchUserOrder,

      keepPreviousData: true,
    });
  return { isLoading, isError, data, error, isFetching, isPlaceholderData };
}
