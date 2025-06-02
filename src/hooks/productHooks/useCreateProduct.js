import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "react-toastify";
import { server } from "../../server";

async function createProduct(data) {
  console.log(data);
  try {
    const res = await axios.post(`${server}/products/create-product`, data);
  } catch (err) {
    //  console.log(err?.response?.data);
    throw new Error("Error in creating product");
  }
}
export const useCreateProduct = function () {
  const queryClient = useQueryClient();
  // Mutations
  const {
    mutate: createProductMutate,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: (data) => createProduct(data),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successfully product created");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create product");
    },
  });
  return { createProductMutate };
};
