import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
//create a new address api call
async function postAddress(data) {
  try {
    const res = await axios.post(`${server}/user/add-user-address`, data, {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to add address");
  }
}
//delete a address by id api call
async function deleteAddress(id) {
  try {
    const res = await axios.patch(`${server}/user/delete-user-address/${id}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to delete address");
  }
}
//hook creating address
export const useAddressPost = function () {
  const queryClient = useQueryClient();
  const {
    mutate: createAddressMutate,
    data,
    isError,
    error,
  } = useMutation({
    mutationFn: postAddress,
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successfully adddress added");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add address");
    },
  });
  return { createAddressMutate, isError, data };
};
//delete address hook
export const useAddressDelete = function () {
  const queryClient = useQueryClient();
  const {
    mutate: deleteAddressMutate,
    data,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (id) => deleteAddress(id),
    onSuccess: (data, variables) => {
      // Invalidate and refetch
      toast.success("successfully adddress deleted");

      // Optionally, invalidate the query to refetch fresh data
      queryClient.invalidateQueries(["user", variables.id]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete address");
    },
  });
  return { deleteAddressMutate };
};
