import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { server } from "../../server";
const getUserDetails = async function () {
  const res = await axios.get(`${server}/user/getuser`, {
    withCredentials: true,
  });

  return res?.data?.data;
};
export const useGetUserData = function () {
  const queryClient = new QueryClient();
  const {
    data = "",
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserDetails,
    retry: false,
  });
  return { data, isLoading, isError };
};
