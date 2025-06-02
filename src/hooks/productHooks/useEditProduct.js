import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "react-toastify";
import { server } from "../../server";

async function editProduct({ id, data }) {
  try {
    const res = await axios.patch(`${server}/products/${id}`, { ...data });
  } catch (err) {
    throw new Error("Error in updating product");
  }
}
export const useEditProduct = function () {
  const queryClient = useQueryClient();
  // Mutations
  const {
    mutate: editProductMutate,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: (variables) => editProduct(variables),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successfully product updated");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update product");
    },
  });
  return { editProductMutate, isError, isSuccess, isPending };
};
