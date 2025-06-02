import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { server } from "../../server";

const getAllUserDetails = async function () {
  const res = await axios.get(`${server}/user/all-users`, {
    withCredentials: true,
  });

  return res.data.data;
};

export const useGetAllUsers = function () {
  const queryClient = new QueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUserDetails,
  });
  return { data, isLoading: isPending };
};
